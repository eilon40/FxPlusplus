export function getDupeSortedDictionary(arr) {
	return Object.entries(arr.reduce((counts, value) => {
		counts[value] = (counts[value] || 0) + 1;
		return counts;
	}, {})).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function fetcher(url, type = 'text') {
	return fetch(url).then(response => response[type]())
}

export function elementReady(selector) {
	return new Promise(function (resolve, reject) {
		const element = document.querySelector(selector)
		if (document.contains(element)) {
			return resolve(element);
		}
		new MutationObserver(function (mutations, observer) {
			const node = document.querySelector(selector)
			if (document.contains(node)) {
				observer.disconnect();
				resolve(node);
			}
		})
		.observe(document.documentElement, {
			childList: true,
			subtree: true
		});
	});
}

export function splitIntoChunks(arr, chunkSize) {
	return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, index) =>
		arr.slice(index * chunkSize, (index + 1) * chunkSize)
	);
}

export function addStyle(style, specialId = null, container = document.documentElement) {
	const css = document.createElement('style');
	css.textContent = style;

	if (specialId) {
		css.id = specialId;
	}

	container.appendChild(css);

	return css;
}

export function injectScript(filename) {
	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = chrome.runtime.getURL(filename);

	document.head.appendChild(script);

	return script;
}

export const fxpDomain = "https://www.fxp.co.il/";

export function getNotifications() {
	return fetcher(fxpDomain + "feed_live.php", "json")
		.then(data => ({
			pms: parseInt(data.pm),
			likes: parseInt(data.like),
			notifications: parseInt(data.noti),
			get total() {
				return this.pms + this.likes + this.notifications;
			}
		}));
}

export function sendNotification(title, message, url, list) {
    const randomId = crypto.randomUUID()
	
    const notificationObject = {
        type: "basic",
        iconUrl: "notificationImg.png",
        title,
        message,
        isClickable: true
    };

    if (list) {
        notificationObject.type = "list";
        notificationObject.items = list;
    }

    chrome.notifications.create(randomId, notificationObject);

    chrome.notifications.onClicked.addListener(function (notificationId) {
        if (notificationId === randomId && url.length > 0) {
            window.open(url) //todo
            setTimeout(function () { chrome.notifications.clear(randomId); }, 200);
        }
    });
}

export function changeBadge(value) {
    chrome.action.setBadgeText({ text: value.toString() });
}



function getStorage(key) {
	return chrome.storage.local.get(key).then(data => data[key] || {});
}