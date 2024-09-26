//if sync storage not supported, fallback to local.
chrome.storage.sync = (function () {
    return chrome.storage.sync || chrome.storage.local;
})();

chrome.action.setBadgeBackgroundColor({ color: "#007cff" });

const fxpDomain = "https://www.fxp.co.il/";

const notifications = document.getElementById('notifications');
const backgroundNotifications = document.getElementById('backgroundNotifications');
document.querySelector('.switch').addEventListener('click', function() {
	this.classList.remove('noAnimation')
})
// $(".counter").hide();
document.getElementById('settingsLink').href = chrome.runtime.getURL("settings.html");

let updateBadge = true;
//https://developer.chrome.com/docs/extensions/how-to/ui/notifications
//https://developer.chrome.com/docs/extensions/reference/api/action#method-setBadgeText

var settings;
chrome.storage.sync.get("settings", function (data)
{
    if (data)
        settings = data.settings || {};

    if (settings.backgroundNotifications) {
        backgroundNotifications.checked = true;
    } else {
        updateBadge = false;
    }

    backgroundNotifications.addEventListener('change', function() {
		const enabled = this.checked;
        chrome.storage.sync.get("settings", function (data)
        {
            settings = data.settings || {};
            settings.backgroundNotifications = enabled;
            chrome.storage.sync.set({ "settings": settings }, function ()
            {
                console.info("settings saved");
            });
        });
    });
});
		//todo untils import

    function getDomainCookies(domain, name, callback)
    {
        chrome.cookies.get({ "url": domain, "name": name }, function (cookie)
        {
            if (callback) {
				callback(cookie?.value || null);
            }
        });
    }

    function getNotifications(callback) {
		return fetcher(fxpDomain + "feed_live.php", "json")
			.then(data => ({
				pms: parseInt(data.pm),
				likes: parseInt(data.like),
				notifications: parseInt(data.noti),
				total: function() {
					return this.pms + this.likes + this.notifications;
				}
			}))
    }

//todo import utils
function fetcher(url,  type = "text") {
	return fetch(url).then(response => response[type]())
}

getDomainCookies(fxpDomain, "bb_userid", async function (id) //get user ID (safe id)
{
    if (id === null) {
		const countersContainer = document.getElementById('countersContainer');
		countersContainer.innerHTML = '';
		
		const newDiv = document.createElement('div');
		newDiv.classList.add('counter', 'fullWidth');

		const counterNum = document.createElement('div');
		counterNum.classList.add('counterNum');
		counterNum.textContent = 'אופס!';

		const counterName = document.createElement('div');
		counterName.classList.add('counterName');
		counterName.textContent = 'אתה לא מחובר ל-FxP.';

		newDiv.appendChild(counterNum);
		newDiv.appendChild(counterName);
		countersContainer.appendChild(newDiv);

		const notificationDiv = document.createElement('div');
		notificationDiv.classList.add('del_noti');

		const link = document.createElement('a');
		link.href = 'https://www.fxp.co.il/';
		link.target = '_blank';
		link.style.textAlign = 'center';
		link.textContent = 'אם אתה מחובר ובעיה זו עדיין נשארת, נסה להתנתק ולהתחבר מחדש, או לאפס cookies.';

		notificationDiv.appendChild(link);
		notifications.appendChild(notificationDiv);
        return;
    }

	const domParser = new DOMParser();
	const getSeperator = () => Object.assign(document.createElement('div'), { className: 'seperator'})

	const normal = await getNotifications()

	document.getElementById("likeCount").textContent = normal.likes;
	document.getElementById("notificationCount").textContent = normal.notifications;
	document.getElementById("pmCount").textContent = normal.pms;
	// $(".counter").show();

	const notificationSum = normal.total();
	const badgeText = updateBadge && notificationSum > 0 ? notificationSum.toString() : "";
	chrome.action.setBadgeText({ text: badgeText });

	const promises = [];
	if (normal.likes > 0) {
		promises.push(fetcher(fxpDomain + "likesno.php?userid=" + id));
	}
	if (normal.notifications > 0) {
		promises.push(fetcher(fxpDomain + "notifc.php?userid=" + id));
	}

	const responses = await Promise.all(promises);
	responses.forEach(response => {
		const doc = domParser.parseFromString(response, "text/html");
		const newNotifications = doc.querySelectorAll('li.newnoti_link');

		newNotifications.forEach(element => {
			formatNoti(element);
			notifications.append(element, getSeperator());
		});
	});
		
	if (normal.pms > 0) {
		const pmNotification = document.createElement('div');
		pmNotification.classList.add('del_noti');

		const pmLink = document.createElement('a');
		pmLink.href = 'https://www.fxp.co.il/chat.php';
		pmLink.target = '_blank';
		pmLink.style = 'text-align: center';
		pmLink.textContent = normal.pms + ' הודעות פרטיות שלא נקראו';
		pmNotification.appendChild(pmLink);
		
		notifications.append(pmNotification, getSeperator());
	}
});

function formatNoti(element) {
	const images = element.querySelectorAll('img');
	images.forEach(img => {
		img.src = img.src.startsWith('https://') ? img.src : 'https://' + img.src;
		img.style.top = '8px';
	});

	const anchors = element.querySelectorAll('a');
	anchors.forEach(a => {
		a.style.backgroundColor = '';
		a.style.textAlign = 'center';
		a.setAttribute('target', '_blank');
		a.setAttribute('href', fxpDomain + a.getAttribute('href'));
  	});
}