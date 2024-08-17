function execScript() {
	let totalNotifications = 0;
    let noti;
	document.querySelectorAll('.noticount').forEach(element => {
		noti = parseInt(element.innerText);
		totalNotifications += isNaN(noti) ? 0 : noti;
	})
	// console.log(totalNotifications);
	chrome.runtime.sendMessage({ updateBadge: totalNotifications }); //update the badge

	return function onDestroy() {

	}
}
				
function execSetting() {
	const element = document.getElementById('sendTestNotification');
	element.addEventListener('click', function() {
		sendNotification("הודעת בדיקה!", "הידעת? הגולש הממוצע באינטרנט ממצמץ רק 7 פעמים בדקה! ממוצע המצמוץ הנורמלי הוא 20 - כמעט פי 3.", "");
	})
}
		
//todo import utils
function sendNotification(title, message, url, list) {
    var randomId = Math.random().toString(36).substr(2, 10); //generates a random 10 character id

    var notificationObject = {
        type: "basic",
        iconUrl: "../notificationImg.png",
        title: title,
        message: message,
        isClickable: true
    };

    if (list) {
        notificationObject.type = "list";
        notificationObject.items = list;
    }

    chrome.notifications.create(randomId, notificationObject);

    chrome.notifications.onClicked.addListener(function(notificationId) {
        if (notificationId === randomId && url.length > 0) {
            window.open(url); //open the url
            setTimeout(function() {
                chrome.notifications.clear(randomId);
            }, 200); //close notification
        }
    });
}
		
export default {
	setting: {
		name: 'שלח התראות גם כאשר האתר סגור', 
		description: 'התראות לגבי לייקים, ציטוטים ודואר נכנס יופיעו גם כאשר אינך גולש באתר. <a id="sendTestNotification">לחץ כאן לשליחת הודעת בדיקה.</a>',
		permission: 'backgroundNotifications',
		execute: execSetting
	},
	authorId: 967488,
	version: '2024-08-08',
	match: '*',
	loaded: false,
	execute: execScript
}
