import { sendNotification } from '../utils';

function execScript() {
	
	let pms;
	
	function updateBadge() {
		let totalNotifications = 0, tmp;
		document.querySelectorAll('.noticount').forEach(element => {
			tmp = parseInt(element.innerText);
			totalNotifications += isNaN(tmp) ? 0 : tmp;
		})
		totalNotifications ||= "";
		chrome.runtime.sendMessage({ changeBadge: totalNotifications })
	}
	
	function handleClick() {
		const counter = this.querySelector('.counter');
		if (counter.innerText === '0') return;
		setTimeout(updateBadge, 2500)
	}
	
	updateBadge();
	
	const holder = document.getElementById('list_holder');
	if (holder) {
		holder.addEventListener('load', function() {
			const doc = holder.contentWindow.document;
			pms = doc.querySelectorAll('li.pm');
			
			pms.forEach(pm => {
				pm.addEventListener('click', handleClick);
			})
		})
	}
	return function onDestroy() {
		if (holder) {
			console.log(pms);
			pms.forEach(pm => {
				pm.removeEventListener('click', handleClick);
			})
		}
	}
}
				
function execSetting() {
	const element = document.getElementById('sendTestNotification');
	element.addEventListener('click', function() {
		sendNotification("הודעת בדיקה!", "הידעת? הגולש הממוצע באינטרנט ממצמץ רק 7 פעמים בדקה! ממוצע המצמוץ הנורמלי הוא 20 - כמעט פי 3.", "");
	})
}
				
export default {
	setting: {
		name: 'שלח התראות גם כאשר האתר סגור', 
		description: 'התראות לגבי לייקים, ציטוטים ודואר נכנס יופיעו גם כאשר אינך גולש באתר. <a id="sendTestNotification">לחץ כאן לשליחת הודעת בדיקה.</a>',
		permission: 'backgroundNotifications',
		execute: execSetting
	},
	// background: function() {},
	authorId: 967488,
	match: '*',
	loaded: true,
	execute: execScript
}
