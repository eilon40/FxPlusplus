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

function splitIntoChunks(arr, chunkSize) {
  return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, index) =>
    arr.slice(index * chunkSize, (index + 1) * chunkSize)
  );
}

