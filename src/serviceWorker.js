chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request);
    if (request.hasOwnProperty("updateBadge")) {
        // chrome.browserAction.getBadgeText({}, function(number) {
            // var badgeCount = parseInt(number);
            // if (isNaN(badgeCount))
                // badgeCount = 0;
			const s = ""+ Math.floor(Math.random() * 11);
			console.log(s);
			changeBadge(s);
            // utils.getNotificationsTrackedThreads(function(tracked) {
                // if (badgeCount - tracked.length > request.updateBadge) //badge shows more notifications than are actually present, user probably read a notification
                    // checkNotificationCount(); //update the badge
            // });
        // });
    }
});
// chrome.action.setBadgeBackgroundColor({ color: "green" });

const changeBadge = (str) => {
	// console.log(chrome.action);
    chrome.action.setBadgeText({ text: str });
}
