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
    function httpGetAsync(theUrl, callback)
    {
		fetch(theUrl)
			.then(response => response.text())
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

    //gets a users's id from a member.php?u=XXXXXXXXX address
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
        var noti = [];
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

    //returns notifications from each kind, and total from FXP itself
    function getNotificationsNormal(callback)
    {
        const noti = {
            pms: 0,
            likes: 0,
            notifications: 0,
            total: function() {
				return this.pms + this.likes + this.notifications;
			}
        };
		httpGetAsync(fxpDomain + "feed_live.php", function (data) {
			const notificationCount = JSON.parse(data);
            noti.pms = parseInt(notificationCount.pm);
			noti.likes = parseInt(notificationCount.like);
			noti.notifications = parseInt(notificationCount.noti);

            console.log(noti.total() + " normal notifications");
			callback(noti);
        });
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
    function getDeepestChild(element)
    {
        if (element.children().length === 0)
            return element;

        var target = element.children(),
            next = target;

        while (next.length)
        {
            target = next;
            next = next.children();
        }

        return target;
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

    //builds a wrapper object for custom default style
    function buildStyleWrapper(styleProp, noFonts, wysibbBox)
    {
        //wysibbBox = true for wysibb boxes which do not support specific styles.

        var styleWrapper;
        var styleElements = [];

        //build the elements according to the style
        if (styleProp.color !== "#333333") //disable if the color is the default color
        {
            styleElements.push($("<span>", { style: "color:" + styleProp.color }));
        }
        if (styleProp.size !== 2 && !wysibbBox) //disable if the size is the default size
        {
            styleElements.push($("<font>", { size: styleProp.size }));
        }
        if (styleProp.underline)
        {
            styleElements.push($("<u>"));
        }
        if (styleProp.italic && !wysibbBox)
        {
            styleElements.push($("<em>"));
        }
        if (styleProp.bold)
        {
            styleElements.push($("<strong>"));
        }
        if (styleProp.font !== "Arial" && !noFonts && !wysibbBox) //disable if default font or a page with no fonts enabled
        {
            styleElements.push($("<span>", { style: "font-family: '" + styleProp.font + "'" }));
        }

        if (styleElements.length > 0)
        {
            //wrap elements inside each other
            styleWrapper = styleElements[0];
            for (var i = 1; i < styleElements.length; i++)
            {
                getDeepestChild(styleWrapper).append(styleElements[i]);
            }
        }

        return styleWrapper;
    }

    //wraps the target around the deepest element of the wrapper
    function deepWrap(target, wrapper)
    {
        target.parentNode.insertBefore(wrapper, target);
        getDeepestChild($(wrapper))[0].appendChild(target);
    }

    //fixes the caret's position when applying a style to the editor
    function fixCaret(styleElement)
    {
        var doc = styleElement.ownerDocument || styleElement.document; //get the document
        var win = doc.defaultView || doc.parentWindow; //get the window

        var range = doc.createRange(); //create new range
        var selection = win.getSelection(); //get the current range

        //set the caret to the end of the element
        range.setStart(styleElement, styleElement.textContent.length);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

    }

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
        deepWrap,
        fixCaret
    };
}();
