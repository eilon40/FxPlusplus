import { fetcher } from '../utils';

//Todo: move to main
(async function () {
	const REFRESH_INTERVAL = 15 * 60 * 1000; // 5 minutes in milliseconds
	const storageKey = 'refreshFriends';
	const storedTime = localStorage.getItem(storageKey);

	if (storedTime) {
		const now = new Date();
		const lastRefreshTime = new Date(storedTime);
		const timeSinceLastRefresh = now.getTime() - lastRefreshTime.getTime();

		if (timeSinceLastRefresh < REFRESH_INTERVAL) {
			console.log('Friends list is still fresh, skipping refresh.');
			return;
		}
	}

	const userLink = document.querySelector('.log_in6 a').href;
    const validatedUserLink = new URL(userLink);
    validatedUserLink.searchParams.set('tab', 'friends');
    validatedUserLink.searchParams.set('pp', 100);

    const html = await fetcher(validatedUserLink);
    const regex = /<h4><a href="member\.php\?u=(\d+)"/g;
    const friendMatches = html.matchAll(regex);
    const friendIds = [];

    for (const match of friendMatches) {
      const friendId = match[1];
      friendIds.push(friendId);
    }

    console.log('Fetched friend IDs:', friendIds);

    localStorage.setItem('friendIds', JSON.stringify(friendIds));
    localStorage.setItem(storageKey, new Date());
})();

const img = new Image();
img.src = 'https://w7.pngwing.com/pngs/236/25/png-transparent-computer-icons-avatar-friends-love-text-logo-thumbnail.png';
img.classList.add('friend');

function execScript() {
	console.log("run");
	const friendIds = JSON.parse(localStorage.getItem("friendIds"));
		
	document.querySelectorAll(".username_container .username").forEach(usernameElement => {
		const userId = usernameElement.href.split("=").pop();
		console.log(`Checking user ID: ${userId}`);

		if (friendIds.includes(userId)) {
			usernameElement.appendChild(img.cloneNode());
		}
	});
	
	return function onDestroy() {
		const friends = document.querySelectorAll('.friend');
		friends.forEach(friend => friend.remove());
	}
}


export default {
	setting: {
		name: '',
		description: '',
		permission: 'friends'
	},
	authorId: 967488,
	version: '2024-08-08',
	match: 'show',
	loaded: true,
	execute: execScript
}
