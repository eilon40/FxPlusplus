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

function GM_addElement(parentOrTag, tagOrAttrs, attrs) {
    let parent, tag, attributes;

    if (typeof parentOrTag === "string") {
        parent = document.body || document.head;
        tag = parentOrTag;
        attributes = tagOrAttrs || {};
    } else {
        parent = parentOrTag;
        tag = tagOrAttrs;
        attributes = attrs || {};
    }

    const el = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        if (key in el) {
            el[key] = value;
        } else {
            el.setAttribute(key, value);
        }
    }

    (parent || document.body || document.head).appendChild(el);
    return el;
}
// TODO: Implement the following functions
function addValueChangeListener(key, callback) {
	window.addEventListener('storage', console.log);
};
function GM_addValueChangeListener() {}

