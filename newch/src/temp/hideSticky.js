

function execScript() {
	document.querySelectorAll(".threadbit .sticky").forEach(function(element) {
		const days = getDaysSinceComment(element);
		const title = element.querySelector(".title").innerText;
		if (days > settings.hideSticky.days) {
			var hideSticky = !(title.includes("חוק") && !settings.hideSticky.includingRules);
						
			// if (title.includes("חוק") && !settings.hideSticky.includingRules) {
				// hideSticky = false;
			// }
			if (hideSticky) {
				element.classList.add("hiddenSticky");
			}
		}
	})



	return function onDestroy() {
	}
}
function execSetting() {
	// const element = document.getElementById('hidePinnedDays');
	// element.addEventListener('change', function() {
		
	// })
}

				
export default {
	setting: {
		name: 'הסתר אשכולות נעוצים',
		description: 'אשכולות נעוצים ישנים יותר מהערך שנבחר יוסתרו. יהיה אפשר לראות אותם בריחוף מעליהם. לפחות 5 ימים.',
		permission: 'hideSticky',
		execute: execSetting,
		sub: {
			name: 'בני יותר מ',
			description: '',
			permission: 'hidePinnedDays',
			type: 'number'
		}
	},
	authorId: 967488,
	match: 'forumdisplay',
	loaded: true,
	execute: execScript
}
