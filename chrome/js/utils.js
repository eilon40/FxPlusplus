/*
    Copyright 2015-2019 SilverTuxedo

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

 */

"use strict";

var utils = function ()
{
    //gets a cookie from a domain
    function getDomainCookies(domain, name, callback)
    {
        chrome.cookies.get({ "url": domain, "name": name }, function (cookie)
        {
            if (callback) {
				callback(cookie?.value || null);
            }
        });
    }

    //GET http function
    function httpGetAsync(theUrl, callback, type = "text")
    {
		fetch(theUrl)
			.then(response => response[type]())
			.then(callback);
    }

    //get a user name from user ID
    function getUserNameById(id, knownIds, callback)
    {
        if (id !== "" && id !== 0)
        {
            if (knownIds[id] === undefined)
            { //user's name is not already known
                httpGetAsync(fxpDomain + "member.php?u=" + id, function (response)
                { //request user's page
                    var domParser = new DOMParser();
                    var doc = $(domParser.parseFromString(response, "text/html"));
                    var userName = doc.find("#userinfo .member_username").text().trim();
                    if (userName.length > 0)
                    { //found user's name
                        console.log("new user in memory: " + userName + "#" + id);
                        knownIds[id] = userName;
                        chrome.storage.local.set({ "knownIds": knownIds }); //store new name
                        if (typeof callback === "function")
                            callback(userName);
                    }
                    else
                    { //did not find name, user probably does not exist
                        console.warn("failed to find name by id: " + id);
                        if (typeof callback === "function")
                            callback(null);
                    }
                });
            }
            else
            {
                if (typeof callback === "function")
                    callback(knownIds[id]);
            }
        }
        else
            if (typeof callback === "function")
                callback(null);
    }

    //get a user ID from user name
    function getUserIdByName(name, callback)
    {
        var useridRegex = /userid=[0-9]+/g; //matches userid={NUMBER}

        if (name !== "")
            httpGetAsync(fxpDomain + "member.php?username=" + name, function (response)
            { //request user's page
                var doc = $(domParser.parseFromString(response, "text/html"));
                var userLinkElement = doc.find("a[href*='userid='"); //look for a URL with the user's id
                if (userLinkElement.length > 0)
                { //found a URL with the user's id
                    var userId = userLinkElement.attr("href").match(useridRegex)[0].substr("userid=".length); //extract the ID from the url
                    var userRealName = doc.find("#userinfo .member_username").text().trim();
                    if (userRealName !== name)
                        name = userRealName;
                    console.log(name + "#" + userId);
                    if (typeof callback === "function")
                        callback({
                            name: name,
                            id: userId
                        });
                }
                else
                { //did not find such url, user probably does not exist
                    console.warn("failed to find id by name: '" + name + "'");
                    if (typeof callback === "function")
                        callback({
                            name: name,
                            id: null
                        });
                }
            });
        else
            if (typeof callback === "function")
                callback({
                    name: name,
                    id: null
                });
    }

    function getUserIdFromLink(link) {		
		const id = (new URLSearchParams(link)).get('u');
        if (id === null) {
			return NaN;
		}
		return parseInt(id);
    }

    //returns notification objects for tracked threads
    function getNotificationsTrackedThreads(callback)
    {
        const noti = [];
        var commentNum, url;
        chrome.storage.local.get("threadComments", function (data)
        {
            var threadComments = data.threadComments || [];
            chrome.storage.sync.get("settings", function (data2)
            {
                var settings = data2.settings;

                for (var i = 0; i < settings.trackedThreads.list.length; i++)
                {
                    for (var j = 0; j < threadComments.length; j++)
                    {
                        if (threadComments[j].id === settings.trackedThreads.list[i].threadId)
                        {
                            commentNum = settings.trackedThreads.list[i].totalComments - threadComments[j].comments;
                            url = fxpDomain + "showthread.php?t=" + settings.trackedThreads.list[i].threadId;
                            if (settings.trackedThreads.list[i].totalComments > 15) //add pages
                            {
                                url += "&page=" + Math.ceil(settings.trackedThreads.list[i].totalComments / 15);
                            }
                            if (commentNum > 0)
                            {
                                noti.push({
                                    threadTitle: settings.trackedThreads.list[i].title,
                                    threadId: settings.trackedThreads.list[i].threadId,
                                    totalComments: settings.trackedThreads.list[i].totalComments,
                                    newComments: commentNum,
                                    lastCommentor: settings.trackedThreads.list[i].lastCommentor,
                                    url: url
                                });
                            }
                            break;
                        }
                    }
                }

                //return the notifications
                console.log(noti.length + " tracked threads notifications");
                callback(noti);
            });
        });
    }

    function getNotificationsNormal(callback) {
        const noti = {
            pms: 0,
            likes: 0,
            notifications: 0,
            total: function() {
				return this.pms + this.likes + this.notifications;
			}
        };
		httpGetAsync(fxpDomain + "feed_live.php", function (data) {
            noti.pms = parseInt(data.pm);
			noti.likes = parseInt(data.like);
			noti.notifications = parseInt(data.noti);

            console.log(noti.total() + " normal notifications");
			callback(noti);
        }, "json");
    }

    //returns the addition of all notification types
    function getNotificationsTotalNum(callback)
    {
        var total = 0;
        getNotificationsNormal(function (n1)
        {
            total += n1.total();
            getNotificationsTrackedThreads(function (n2)
            {
                total += n2.length;
                callback(total);
            });
        });
    }

    //returns the deepest child of the element
	function getDeepestChild(element) {
		if (!element.hasChildNodes()) {
			return element;
		}

		let deepestChild = element.firstChild;

		while (deepestChild.hasChildNodes()) {
			deepestChild = deepestChild.firstChild;
		}

		return deepestChild;
	}
	
    //sets the content of the subnick container
    function setSubnickContainer(subnick, subnickContainer)
    {
        if (isURL(subnick.value)) //if it's a url, place as an image/video, not text
        {
            subnickContainer.empty();
            if (subnick.value.endsWith("mp4") || subnick.value.endsWith("webm"))
                subnickContainer.append($("<video>", { loop: true, autoplay: true }).append($("<source>", { src: subnick.value })));
            else
                subnickContainer.append($("<img>", { src: subnick.value }));
        }
        else
        {
            subnickContainer.text(subnick.value);
            subnickContainer.css({
                color: subnick.color,
                fontSize: subnick.size + "px",
                fontWeight: "bold"
            });
        }
    }


    //convert RGB color format to hexadecimal color format (X,X,X > #XXXXXX)
    function convertRgbToHex(rgb)
    {
        rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
        function hex(x)
        {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
	
	function createElement(el, opt = {}) {
		return Object.assign(document.createElement(el), opt);

	}
	

	function getDeepestChild(element) {
		if (!element.children.length) {
			return element;
		}
		return getDeepestChild(element.children[element.children.length - 1]);
	}

	function buildStyleWrapper(styles, disableFonts = false, isWysibbBox = true) {
		const styleElements = [];

		if (styles.color !== "#333333") {
			styleElements.push(createElement("span", { style: `color: ${styles.color}` }));
		}
		if (styles.size !== 2 && !isWysibbBox) {
			styleElements.push(createElement("font", { size: styles.size }));
		}
		if (styles.underline) {
			styleElements.push(createElement("u"));
		}
		if (styles.italic && !isWysibbBox) {
			styleElements.push(createElement("em"));
		}
		if (styles.bold) {
			styleElements.push(createElement("strong"));
		}
		if (styles.font !== "Arial" && !disableFonts && !isWysibbBox) {
			styleElements.push(createElement("span", { style: `font-family: '${styles.font}'` }));
		}

		if (!styleElements.length) {
			return null;
		}

		let styleWrapper = styleElements[0];
		for (let i = 1; i < styleElements.length; i++) {
			getDeepestChild(styleWrapper).appendChild(styleElements[i]);
		}
		return styleWrapper;
	}

    //wraps the target around the deepest element of the wrapper
    function deepWrap(target, wrapper)
    {
        target.parentNode.insertBefore(wrapper, target);
        getDeepestChild(wrapper).append(target);
    }

    //fixes the caret's position when applying a style to the editor
    return {
        getDomainCookies,
        httpGetAsync,
        getUserNameById,
        getUserIdByName,
        getUserIdFromLink,

        getNotificationsTrackedThreads,
        getNotificationsNormal,
        getNotificationsTotalNum,

        getDeepestChild,
        setSubnickContainer,
        convertRgbToHex,

        buildStyleWrapper,
        deepWrap
	};
}();
