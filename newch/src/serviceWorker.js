import io from 'socket.io-client';
import {fetcher, fxpDomain, getNotifications, changeBadge, sendNotification } from './utils';

const factorySettings = {
    backgroundNotifications: true,
    overviewNotificationBoot: true,
    resizeSignatures: false,
    peekCloseMethod: "double",
    showSpoilers: true,
    hideSuggested: false,
    classicIcons: false,
    showForumStats: true,
    hideAccessibilityMenu: false,
    disableLiveTyping: false,
    disableLiveTypingPm: false,
	connectedStaff: false,
    hideSticky: {
        active: false,
        includingRules: false,
        days: 14
    },
    showAutoPinned: false,
    autoNightmode: {
        active: false,
        start: "17:05",
        end: "23:30"
    },
    readtime: {
        speed: 220,
        activePrefixes: ["מדריך"],
        newsForums: true
    },
    threadFilters: {
        users: [
        ],
        keywords: [
        ],
        filterSticky: false
    },
    commentFilters: [
        {
            id: 967488,
            subnick: {
                value: "היוצר של +FxPlus",
                color: "#00afff",
                size: 11
            },
            hideSignature: false,
            disableStyle: false,
            hideComments: false
        }
    ],
    customDefaultStyle: {
        active: false,
        activeQuickComment: false,
        activePrivateChat: false,
        bold: false,
        italic: false,
        underline: false,
        font: "Arial",
        size: 2,
        color: "#333333"
    },
    customBg: {
        day: "",
        night: ""
    },
};


chrome.storage.sync ||= chrome.storage.local;

let socket;


const settings = await chrome.storage.local.get(null);
//make sure settings has values
// let settingsReset = false;
// for (var prop in factorySettings) {
	// if (settings.hasOwnProperty(prop)) {
		// if (settings[prop] === null) {
			// settings[prop] = factorySettings[prop];
			// settingsReset = true;
			// console.warn(prop + ": value has been reset");
		// }
	// } else {
		// settings[prop] = factorySettings[prop];
		// settingsReset = true;
		// console.warn(prop + ": value has been reset");
	// }
// }
// if (settingsReset) chrome.storage.sync.set({ "settings": settings });


if (settings.backgroundNotifications) {
	console.info("background notifications enabled");
	checkNotificationCount();
	await connectSocket();
}

if (settings.overviewNotificationBoot) {
	alertUnreadNotifications();
}

chrome.storage.onChanged.addListener(async function (changes, areaName)
{
    if (!changes.hasOwnProperty("settings")) return;
	const also = socket === undefined || !socket.connected;
	if (changes.settings.newValue.backgroundNotifications && also) {
		console.log("connecting socket");
		await connectSocket();
	} else if (socket && socket.connected) {
		console.log("disconnecting socket");
		socket.disconnect();
	}
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.hasOwnProperty("forceUpdateBadge")) {
		checkNotificationCount();
	}
	if (request.hasOwnProperty("changeBadge")) {
		changeBadge(request.changeBadge)
	}
	if (request.hasOwnProperty("sendTotalNotifications")) {
		alertUnreadNotifications();
    }
});


	chrome.action.setBadgeBackgroundColor({ color: "#007cff" });

//callback function runs only if there are no FXP tabs open
function noTabsOpen(callback) {
	chrome.tabs.query({ url: fxpDomain + "*" }, function (query) {
        if (query.length < 1) callback();
    });
}

async function connectSocket() {
	const html = await fetcher(fxpDomain + 'privacy.php');
    const send = html.match(/{"userid":"(.*)","froum":"(.*)"}/).shift();

	socket = io('https://socket5.fxp.co.il/', {
        reconnect: true,
        transports: ['websocket', 'polling', 'long-polling']
    });

    socket.on('connect', function () {
        socket.send(send);
        console.log('user connect');
    });


    socket.on('reconnecting', function () {
        socket.send(send);
        console.log('user reconnect');
    });

    // Handle events and send data accordingly
    socket.on('newreply', function (data) {
        checkNotificationCount();
        console.log("new reply from " + data.username);
        noTabsOpen(function () {
            sendNotification(
                "התראה חדשה!",
                'המשתמש ' + data.username + (data.quoted ? ' ציטט את הודעתך באשכול ' : ' הגיב באשכול ') + data.title,
                fxpDomain + 'showthread.php?t=' + data.thread_id + '&goto=newpost'
            );
        });
    });

    socket.on('newpm', function (data) {
        checkNotificationCount();
        console.log("new pm from " + data.username);
        noTabsOpen(function () {
            sendNotification(
                "דואר נכנס!",
                'קיבלת הודעה פרטית חדשה מהמשתמש ' + data.username,
                fxpDomain + 'chat.php?pmid=' + data.pmid
            );
        });
    });

    socket.on('new_like', function (data) {
        checkNotificationCount();
        console.log("new like from " + data.username);
        noTabsOpen(function () {
            sendNotification(
                "לייק חדש!",
                'המשתמש ' + data.username + ' אהב את ההודעה שלך!',
                fxpDomain + 'showthread.php?p=' + data.postid + '#post' + data.postid
            );
        });
    });

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    // Implement periodic pings to keep the connection active
    setInterval(function () {
        socket.emit('ping');
    }, 30000); // Adjust the interval as needed

    // Additional error handling and logging
    socket.on('disconnect', function () {
        console.log('Socket disconnected');
    });

    socket.on('error', function (err) {
        console.error('Socket error:', err);
    });
}
// async function connectSocket() {
    // socket = io('https://socket5.fxp.co.il/', { 
		// reconnect: true, 
		// transports: ['websocket']//,'polling', 'long-polling']
	// });
	// console.log(socket);
	// const html = await fetcher(fxpDomain + 'privacy.php');
	// const userid = html.match(/"userid":"(.*)","/).pop();//froum":"(.*)"}
	// const token = '{"userid":"'+userid+'","froum":""}'; 
	// console.log(token);
	// socket.on('connect', function() {
		// socket.send(token);
		// console.log('user connect');
	// });
       
	// socket.on('reconnecting', function() {
		// socket.send(token);
		// console.log('user reconnect');
	// });

	// socket.on('newreply', function(data) {
		// checkNotificationCount();
		// console.log("new reply from " + data.username);
		// noTabsOpen(function() {
			// sendNotification(
				// "התראה חדשה!",
				 // 'המשתמש ' + data.username + (data.quoted ? ' ציטט את הודעתך באשכול ' : ' הגיב באשכול ') + data.title,
				// fxpDomain + 'showthread.php?t=' + data.thread_id + '&goto=newpost'
			// );
		// });
	// });

	// socket.on('newpm', function(data) {
		// checkNotificationCount();
		// console.log("new pm from " + data.username);
		// noTabsOpen(function() {
			// sendNotification(
				// "דואר נכנס!",
				// 'קיבלת הודעה פרטית חדשה מהמשתמש ' + data.username,
				// fxpDomain + 'chat.php?pmid=' + data.pmid
			// );
		// });
	// });

	// socket.on('new_like', function(data) {
		// checkNotificationCount();
		// console.log("new like from " + data.username);
		// noTabsOpen(function() {
			// sendNotification(
				// "לייק חדש!",
				// 'המשתמש ' + data.username + ' אהב את ההודעה שלך!',
				// fxpDomain + 'showthread.php?p=' + data.postid + '#post' + data.postid
			// );
		// });
	// });
	// socket.on("connect_error", (err) => {
  // console.log(`connect_error due to ${err.message}`);
// });


	// socket.on('update_chat_page', function() {
		// checkNotificationCount();
		// console.log('update');
	// })
    // socket.onevent = console.log;
// }

// //updates the counter at the navbar
function checkNotificationCount()
{
	console.log('update noti');
	getNotifications().then(function(data) {
		const total = data.total;
		changeBadge(total > 0 ? total.toString() : "");
	});
}
async function alertUnreadNotifications() {
	const noti = await getNotifications()
	const notificationList = [];
	
	if (noti.notifications > 0) {
		notificationList.push({
			title: noti.notifications + "",
			message: noti.notifications === 1 ? 'התראה חדשה' : 'התראות חדשות'
		});
	}

	if (noti.likes > 0) {
		notificationList.push({
			title: noti.likes + "",
			message: noti.likes === 1 ? 'לייק חדש' : 'לייקים חדשים'
		});
	}

	if (noti.pms > 0) {

		notificationList.push({
			title: noti.pms + "",
			message: noti.pms === 1 ? 'הודעה פרטית חדשה' : 'הודעות פרטיות חדשות'
		});
	}

		
	if (notificationList.length > 0) {
		let listString = ""; //backup string in case the browser does not support list
		for (var i = 0; i < notificationList.length; i++) {
			if (i > 0) listString += "\n";
			listString += notificationList[i].title + " " + notificationList[i].message;
		}

		sendNotification("בזמן שלא היית מחובר...", listString, fxpDomain, notificationList);
	}
}



const ALL_RESOURCE_TYPES = [
  'main_frame',
  'sub_frame',
  'stylesheet',
  'script',
  'image',
  'font',
  'object',
  'xmlhttprequest',
  'ping',
  'csp_report',
  'media',
  'websocket',
  'webtransport',
  'webbundle',
  'other',
];

const addRules = [{
	id: 1,
    priority: 1,
    condition: {
		urlFilter: `||fxp.co.il`,
		isUrlFilterCaseSensitive: false,
    	resourceTypes: ALL_RESOURCE_TYPES,
    },
    action: {
		type: 'modifyHeaders',
		requestHeaders: [{
			header: 'user-agent',
			operation: 'append',
			value: 'fxpapp',
		}],
    }
}];
// if (true) {//blockads
// const rules = [
	// 'loadmill.com',
	// 'google-analytics.com', 
	// 'viglink.com',
	// 'upapi.net', 
	// 'aniview.com',
	// 'bkrtx.com',
	// 'googletagmanager.com',
	// 'adncdnend.azureedge.net', 
	// 'outbrain.com',
	// 'googletagservices.com^', 
	// '/fbevents.js'
// ]

	// for (let i = 0; i < rules.length; i++) {
		// const obj = {
			// id : addRules.length + 1,
			// priority: 1,
			// action: { 
				// type: "block"
			// },
			// condition: {
				// resourceTypes: ALL_RESOURCE_TYPES
			// }
		// }
		
		// const rule = rules[i];
		// const isRegex = rule.includes('/');
		// obj.condition[isRegex ? 'regexFilter' : 'urlFilter'] = isRegex ? rule : `||${rule}^`;
		// addRules.push(obj);
	// }
	// console.log(addRules);
// }
(async function() {
	await chrome.declarativeNetRequest.updateSessionRules({
        addRules,
		removeRuleIds: addRules.map(rule => rule.id)
	}); 
})();
//returns how many comments there are in a thread
// function getLastCommentDataForThreadById(threadId, callback) {
    // //url of the last page (fxp automatically redirects, assuming there are no more than 999999 pages)
    // var fullUrl = fxpDomain + "showthread.php?t=" + threadId + "&page=999999";
// var domParser = new DOMParser();

    // //get the thread
    // // utils.httpGetAsync(fullUrl, function (response)
    // // {
        // // var doc = domParser.parseFromString(response, "text/html");

        // // var commentCount = parseInt(doc.querySelector(".postbit:last-child .postcounter").textContent.substr(1)) - 1; //extract the number of comments from the index of the last post
        // // var last = doc.querySelector(".postbit:last-child .username").textContent.trim();

        // // var title = doc.querySelector(".titleshowt h1").textContent.trim();
        // // var prefix = doc.querySelector(".titleshowt .prefixtit").textContent.trim();

        // // callback({
            // // comments: commentCount,
            // // lastCommentor: last,
            // // title: title,
            // // prefix: prefix
        // // });
    // // });
// }