chrome.runtime.onMessage.addListener((message, sender) => {
	if (!sender.tab || !sender.tab.id) return;

	const tabId = sender.tab.id;
	if (message.action === "injectCSS") {
        chrome.scripting.insertCSS({
            css: message.css,
            origin: 'USER',
			target: { tabId },
        }).then(() => {
			console.log('CSS injected successfully');
		}).catch((error) => {
			console.error('Error injecting CSS:', error);
		});
	}

	if (message.action === "removeCSS") {
        chrome.scripting.removeCSS({
            css: message.css,
            origin: 'USER',
			target: { tabId },
        }).then(() => {
			console.log('CSS removed successfully');
		}).catch((error) => {
			console.error('Error removed CSS:', error);
		});
	}

	return true;
});

// chrome.omnibox: onInputCancelled, onInputChanged, onDeleteSuggestion, setDefaultSuggestion
chrome.omnibox.onInputEntered.addListener(async function (text) {
	const newURL = 'https://www.google.com/search?q=' + encodeURIComponent('site:fxp.co.il ' + text)
	const [tab] = await chrome.tabs.query({
		active: true,
        currentWindow: true
    });

	chrome.tabs.update(tab.id, { url: newURL });
});    
