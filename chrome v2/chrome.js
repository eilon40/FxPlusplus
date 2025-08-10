// Simulate Tampermonkey's functions
const GM_registerMenuCommand = () => {};
const unsafeWindow = window;

function GM_getValue(key, def) {
	return localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key)) : def;
}
function GM_setValue(key, val) {
	localStorage.setItem(key, JSON.stringify(val));
}
function GM_addStyle(css) {
	try {
		chrome.runtime.sendMessage({ action: "injectCSS", css });
		return {
			remove: () => chrome.runtime.sendMessage({ action: "removeCSS", css })
		}
	} catch (e) {
		return GM_addElement("style", { textContent: css });
	}
}
function GM_addElement(tag, attrs = {}, container = document.body) {
	const el = document.createElement(tag);
	Object.entries(attrs).forEach(([k, v]) => {
		if (k === "textContent") el.textContent = v;
		if (k === "class") el.className = v;
		else el.setAttribute(k, v);
	});
	container.appendChild(el);
	return el;
}
// TODO: Implement the following functions
function addValueChangeListener(key, callback) {
	window.addEventListener('storage', console.log);
};
function GM_addValueChangeListener() {}

