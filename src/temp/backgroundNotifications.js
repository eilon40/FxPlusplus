function execScript() {
	let totalNotifications = 0;
    let noti;
	document.querySelectorAll('.noticount').forEach(element => {
		noti = parseInt(element.innerText);
		totalNotifications += isNaN(noti) ? 0 : noti;
	})
	chrome.runtime.sendMessage({ updateBadge: totalNotifications }); //update the badge

	return function onDestroy() {

	}
}
				
export default {
	setting: {
		name: 'שלח התראות גם כאשר האתר סגור', 
		description: 'התראות לגבי לייקים, ציטוטים ודואר נכנס יופיעו גם כאשר אינך גולש באתר. <a id="sendTestNotification">לחץ כאן לשליחת הודעת בדיקה.</a>',
		permission: 'backgroundNotifications'
	},
	authorId: 967488,
	version: '2024-08-08',
	match: '*',
	loaded: false,
	execute: execScript
}
