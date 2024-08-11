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

export function addStyle(style, specialId = null, container = document.head) {
	const css = document.createElement('style');
	css.textContent = style; // Use textContent for modern browsers

	if (specialId) {
		css.id = specialId;
	}

	container.appendChild(css);

	return css;
}

export function injectScript(filename) {
	const script = document.createElement('script');
	script.src = chrome.runtime.getURL(filename);
	
	document.head.appendChild(script);

	return script;
}

export function createOptionElement(name, desc, perm) {
	const optionDiv = document.createElement('div');
	optionDiv.classList.add('setOption');

	const toggleDiv = document.createElement('div');
	toggleDiv.classList.add('optionToggle');

	const switchElement = document.createElement('div');
	switchElement.classList.add('switch');
	toggleDiv.appendChild(switchElement);
  
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.id = perm;

	const label = document.createElement('label');
	label.htmlFor = perm;

	switchElement.appendChild(checkbox);
	switchElement.appendChild(label);

	const optionNameDiv = document.createElement('div');
	optionNameDiv.classList.add('optionName');
	optionNameDiv.textContent = name;

	const optionExplainDiv = document.createElement('div');
	optionExplainDiv.classList.add('optionExplain');
	optionExplainDiv.textContent = desc;

	optionDiv.appendChild(toggleDiv);
	optionDiv.appendChild(optionNameDiv);
	optionDiv.appendChild(optionExplainDiv);

    return optionDiv;
}


function getStorage(key) {
	return chrome.storage.local.get(key).then(data => data[key] || {});
}

// chrome.storage.onChanged.addListener(changes => {
  // for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
  // }
// });


