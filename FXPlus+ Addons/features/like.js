const userLink = document.querySelector('.log_in6 a').href;
// console.log(window?.USER_ID_FXP || '0');
const db = 'likes' + (userLink.split("u=").at(1) || '0'); //TODO: chrome storage
const likeLimit = 10;
const selector = '.button-like-holder > span[onclick="makelike(this.id);"]';


let likes = JSON.parse(localStorage.getItem(db)) || [];

const updateLikeButton = () => {
	if (likes.length >= likeLimit) {
        const style = document.createElement('style');
        style.textContent = `${selector} { background-image: url("https://em-content.zobj.net/source/google/387/broken-heart_1f494.png"); }`;
        document.head.appendChild(style);
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