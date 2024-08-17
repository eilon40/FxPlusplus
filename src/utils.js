export function fetcher(url) {
	return fetch(url).then(response => response.text())
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

function getStorage(key) {
	return chrome.storage.local.get(key).then(data => data[key] || {});
}

// chrome.storage.onChanged.addListener(changes => {
  // for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
  // }
// });


