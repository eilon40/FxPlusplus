function fetcher(url) {
	return fetch(url) //"https://www.fxp.co.il/" + pathname
		.then(response => response.text())
}

function elementReady(selector) {
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
