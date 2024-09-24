import { addStyle } from '../utils';

// console.log(window?.USER_ID_FXP || '0');

function execScript() {
	const userLink = document.querySelector('.log_in6 a').href;
	const db = 'likes' + (userLink.split("u=").at(1) || '0'); //TODO: chrome storage
	const likeLimit = 10;
	const selector = '.button-like-holder > span[onclick="makelike(this.id);"]';

	let likes = JSON.parse(localStorage.getItem(db)) || [];
	let styleElement;
	const updateLikeButton = () => {
		if (likes.length >= likeLimit) {
			styleElement = addStyle(`${selector} { background-image: url("https://em-content.zobj.net/source/google/387/broken-heart_1f494.png"); }`);
		}
	};

	const updateTimer = () => {
		const oldestLike = Math.min(...likes);
		if (Date.now() > oldestLike) {
			likes = likes.filter(like => like !== oldestLike);
			localStorage.setItem(db, JSON.stringify(likes));
			if (likes.length === 0) {
				clearInterval(timer);
			}
		}
	};

	const timer = setInterval(updateTimer, likeLimit * 3000);

	updateLikeButton();
	updateTimer();

	document.querySelectorAll(selector).forEach(element => {
		element.addEventListener('click', function() {	
			if (likes.length >= likeLimit) return;
			likes.push(Date.now() + likeLimit * 60 * 1000);
			localStorage.setItem(db, JSON.stringify(likes));
			updateLikeButton();
		})
	})
	
	return function onDestroy() {
		styleElement?.remove();
	}
}


export default {
	setting: {
		name: 'מגבלת לייקים',
		description: 'משתמש בסמל לייק שבור כדי ליידע על הגעה למגבלת הלייקים.',
		permission: 'likes'
	},
	authorId: 1129410,
	match: 'thread',
	loaded: true,
	execute: execScript
}