// ==UserScript==
// @name         FxPlus+ for Tampermonkey
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  מעולם לא היה קל יותר לגלוש ב-FxP.
// @author       You
// @match        https://www.fxp.co.il/*
// @supportURL   https://github.com/eilon40/FxPlusplus
// @require      https://update.greasyfork.org/scripts/439099/1203718/MonkeyConfig%20Modern%20Reloaded.js
// @icon         https://lh3.googleusercontent.com/j-CdJwaXX0eoqlMDLLYfbYTuuaFUM5Ep-Mph1UNktCZSYbm665WoIwGGw4d1iXxQWkLMDYior_xS8OKfWCBf1i4srw=s120
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_addElement
// @grant        GM_getResourceText
// @grant        GM_registerMenuCommand
// @grant        GM_addValueChangeListener
// @run-at       document-start
// @resource pms https://update.greasyfork.org/scripts/476628/1259426/fxp%20anti-delete%20PMs.user.js
// ==/UserScript==
// @noframes
// CKEDITOR.tools.callFunction(131,'almoni-dl'); //font
const cfg = new MonkeyConfig({
    title: 'הגדרות FxPlus+',
    menuCommand: true,
    params: {
        hideBigImages: {
            label: "הסתר את הכתבות הגדולות מדך הבית",
            type: 'checkbox',
            default: false
        },
        hideGames: {
            label: "הסתר את אזור המשחקים מדף הבית",
            type: 'checkbox',
            default: false

        },
        hideArticles: {
            label: "הסתר כתבות מדף הבית",
            type: 'checkbox',
            default: false
        },
        resizeSignatures: {
            label: "חותך חתימות גדולות",
            type: 'checkbox',
            default: false
        },
        hideAds: {
            label: "הסתר מודעות",
            type: 'checkbox',
            default: false
        },
        hideNagish: {
            label: "הסתר את תפריט הנגישות",
            type: 'checkbox',
            default: false
        },
        showFriends: {
            label: "הצג חברים באשכולת",
            type: 'checkbox',
            default: false
        },
        showAutoPinned: {
            label: "הצג יותר משלושה אשכולות נעוצים",
            type: 'checkbox',
            default: false
        },
        disableLiveTyping: {
            label: "אל תודיע שאני מקליד",
            type: 'checkbox',
            default: false
        },
        showDeletedPost: {
            label: "הצג פוסט שנמחק",
            type: 'checkbox',
            default: false
        },
        showLikeLimit: {
            label: "הצג מגבלת לייקים",
            type: 'checkbox',
            default: false
        },
        connectedStaff: {
            label: "הצג צוות מחובר",
            type: 'checkbox',
            default: false
        },
        audioChange: { // https://www.tzevaadom.co.il/static/sounds/calm.wav
            label: ":קישור לקובץ שמע עבור התראה",
            type: 'text',
            default: ''
        },
        hideCategories: { // 4428, 13
            label: ":רשימה של קטגוריות להסתרה",
            type: 'text',
            default: ''
        },
        smiles: { // https://yoursmiles.org/tsmile/heart/t4524.gif
            label: ":רשימה של קישורים לסמיילים",
            type: "text",
            default: "",
            long: 3
        },
        fontSize: {
            type: 'select',
            choices: [ 'ללא', 1, 2, 3, 4, 5, 6, 7 ],
            default: 'ללא'
        },
        pms: {
            label: "מציג הודעות פרטיות שנמחקו",
            type: "checkbox",
            default: false
        }
    }
});
/*
TODO:
- Implement audio file upload
- Support multiple users
- Improve placement of "Delete Post" button
- Like add http to check
- disable/enable on the same page and prevent reload
- Add features:
  - Auto night mode
  - Auto reader mode
  - BBCode support
  - Hide sticky posts
  - Display forum statistics
  - Add autoStyle to chat
https://chat.deepseek.com/a/chat/s/2c5d083b-58bf-41c2-9d77-7d650cc012bb
*/
const rawWindow = unsafeWindow;
const queryParams = new URLSearchParams(location.search);

function waitForObject(path) {
    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            const obj = path.split('.').reduce((o, key) => (o && key in o ? o[key] : undefined), rawWindow);
            if (typeof obj !== "undefined") {
                clearInterval(timer);
                resolve(obj);
            }
        }, 100);
    });
}

function onMatchIfLoggedIn(match, permissions, callback) {
    rawWindow.LOGGEDIN && onMatch(match, permissions, callback);
}

function onMatch(match, permission, callback) {
    // console.log(match, permission, callback);
    const hasPermission = permission === "none" || cfg.get(permission);
    if (!shouldRun(match) || !hasPermission) return;

    const docReady = /complete|interactive/.test(document.readyState);
    const runImmediately = !callback.toString().includes("document");

    let teardown = () => {};
    const executeFeature = () => {
        teardown();
        teardown = callback() || (() => {});
    };

    if (runImmediately || docReady) {
        executeFeature();
    } else {
        document.addEventListener('DOMContentLoaded', executeFeature);
    }

    GM_addValueChangeListener(permission, (key, oldVal, newVal) => {
        const func = newVal ? executeFeature : teardown;
        func();
    });
}

function injectStyle(match, permissions, css) {
    onMatch(match, permissions, function() {
        const styleElement = GM_addStyle(css);
        return () => styleElement?.remove();
    });
}

function shouldRun(matchPattern) {
    const urlPath = '/' + location.href.split('/').pop();
    const pattern = new RegExp(matchPattern.replace('*', '.*'));
    return pattern.test(urlPath);
}

function fetcher(url) {
    return fetch(url).then(response => response.text());
}

// Author ID: 967488
injectStyle("forumdisplay", "showAutoPinned", "#stickies li.threadbit:nth-child(n+4) { display: list-item !important; } .morestick { display: none !important; }");
injectStyle("*", "hideAds", "#adfxp, #related_main, .trc_related_container, .trc_spotlight_widget, .videoyoudiv, .OUTBRAIN { display: none !important }");
injectStyle("*", "hideNagish", ".nagish-button { display: none; }");
injectStyle("/(?:index.php)?", "hideCategories", `${cfg.get("hideCategories").split(", ").map(cId => `.hp_category:has(a[href="forumdisplay.php?f=${cId}"])`).join(',')} { display: none }`) // #cat${cId}, .hi4 { height: 337px }
injectStyle("/(?:index.php)?", "hideArticles", "#slide { height:auto !important; } .mainsik { display: none; }");
injectStyle("/(?:index.php)?", "hideBigImages", ".big-image-class { display: none; }");
injectStyle("/(?:index.php)?", "hideGames", "#slide ~ div h1, .fxp2021_Games { display: none !important;");
// חותך חתימות גדולות לגודל המותר וזה תלוי במשתמש במקום באתר לשנות את החתימה שתתאים
injectStyle("show(post|thread)|member.php", "resizeSignatures", ".signaturecontainer { max-width: 500px; max-height: 295px; overflow: hidden; }");

onMatchIfLoggedIn("private_chat.php?do=showpm|show(post|thread)", "disableLiveTyping", function() {
    const originalSendTypingInThread = rawWindow?.sendUserIsTypingInShowthread;
    const originalTypingSend = rawWindow?.typeingsend;

    rawWindow.sendUserIsTypingInShowthread = () => {};
    rawWindow.typeingsend = () => {};

    return () => {
        rawWindow.sendUserIsTypingInShowthread = originalSendTypingInThread;
        rawWindow.typeingsend = originalTypingSend;
    }
});
onMatchIfLoggedIn("signature", "none", function() {
    const publishedThreadUrl = "https://www.fxp.co.il/showthread.php?t=16859147";

    GM_addStyle(`
        #creditAddon { padding: .5em; text-align: center; }
        .addCreditBtn { margin: .2em 1em; background: #fff; border-radius: .2em; font-weight: 700; color: #004b67; border: 1px solid #c5c5c5; cursor: pointer; padding: 0; position: relative; width: 60px; height: 60px; display: inline-flex; justify-content: center; align-items: center; overflow: hidden; }
        .addCreditBtn img { border: 0; height: 100%; }
        .addCreditBtn .addCreditDesc { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: #fff; background: rgba(0,0,0,.4); opacity: 1; }
        .addCreditBtn .addCreditDesc:hover { opacity: 0; }
        .addCreditBtn#addTextCredit .addCreditDesc:hover { opacity: 1; }
        .addCreditBtn#addXLimg { width: 110px; }
    `);

    const creditAddon = GM_addElement('div', {
        id: 'creditAddon',
    })
    creditAddon.innerHTML = `
    <div>שתף את הכיף!™ והוסף קרדיט לתוסף +FxPlus בחתימה שלך:</div>
    <div class="addCreditBtn" id="addLimg">
        <img src="https://i.imagesup.co/images2/b059514f80af8c5ec69afc73356a4dfa3b771343.png">
        <span class="addCreditDesc">128x128</span>
    </div>
    <div class="addCreditBtn" id="addMimg">
        <img src="https://i.imagesup.co/images2/7797f421f0e4895878e51d09266a35355b214d5a.png">
        <span class="addCreditDesc">48x48</span>
    </div>
    <div class="addCreditBtn" id="addTextCredit">
        <span class="addCreditDesc">טקסט</span>
    </div>`

    creditAddon.querySelectorAll('#addLimg, #addMimg, #addTextCredit').forEach(element => {
        element.addEventListener('click', (event) => {
            const imgElement = event.target.parentElement.querySelector('img');
            const iframeBody = document.querySelector(".cke_contents iframe").contentDocument.body;
            const creditLink = document.createElement('a');
            creditLink.href = publishedThreadUrl;
            creditLink.target = '_blank';

            if (imgElement) {
                const img = document.createElement('img');
                img.src = imgElement.src;
                creditLink.appendChild(img);
            } else {
                creditLink.textContent = '+FxPlus';
            }
            iframeBody.appendChild(creditLink);
        });
    });
    const smilieBox = document.querySelector('form[action*="signature"] .editor_smiliebox');
    smilieBox.parentNode.insertBefore(creditAddon, smilieBox);
});
onMatchIfLoggedIn("show(post|thread)", "showFriends", function() {
    (async () => {
        const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds
        const storageKey = "refreshFriends";
        const storedTime = GM_getValue(storageKey);
        if (storedTime) {
            const timeSinceLastRefresh = new Date().getTime() - new Date(storedTime).getTime();
            if (timeSinceLastRefresh < REFRESH_INTERVAL) {
                return console.log('Friends list is still fresh, skipping refresh.');
            }
        }
        let allFriendIds = [], temp = []
        let page = 1, match;
        const regex = /<h4><a href="member\.php\?u=(\d+)"/g;
        while (temp.size < 100) {
            temp = [];
            const url = `https://www.fxp.co.il/profile.php?do=buddylist&pp=100&page=${page}`;
            const html = await fetcher(url);

            while ((match = regex.exec(html)) !== null) {
                temp.push(match[1]);
            }
            allFriendIds = allFriendIds.concat(temp);
            console.log(`Page ${page}: Total friend IDs collected so far: ${allFriendIds.size}`);

            // If the response seems to be exhausted or doesn't bring in new friends, break.
            if (!match) break;

            page++;
        }

        console.log('Fetched friend IDs:', allFriendIds);

        GM_setValue('friendIds', JSON.stringify(allFriendIds));
        GM_setValue(storageKey, Date.now());
    })();

    const friendIds = JSON.parse(GM_getValue("friendIds", '[]'));
    if (!friendIds) return;
    console.log('here', friendIds);
    let css = friendIds.map(id => '.username[href$="'+id+'"]::after').join(', ')
    console.log(css);
    let styleElement = GM_addStyle(`
        ${css} {
            content: "";
            display: inline-block;
            width: 20px;
            height: 20px;
            background-image: url('https://w7.pngwing.com/pngs/236/25/png-transparent-computer-icons-avatar-friends-love-text-logo-thumbnail.png');
            background-size: cover;
    }`)
    return () => styleElement?.remove()
})
onMatchIfLoggedIn("*", "audioChange", function() {
    let isFeatureEnabled = true;
    Object.defineProperty(HTMLAudioElement.prototype, 'src', {
        set: function (value) {
            if (isFeatureEnabled && value === "https://images4.fxp.co.il/nodejs/sound.mp3") {
                value = cfg.get("audioChange");
            }
            this.setAttribute('src', value);
        },
        get: () => this.getAttribute('src'),
        configurable: true,
        enumerable: true,
    });
    return () => {
        isFeatureEnabled = false;
    }
})
onMatchIfLoggedIn("show(post|thread)", "smiles", async function() {
    const images = cfg.get("smiles").trim().split('\n');
    if (images.length < 1) return;

    const editor = await waitForObject("vB_Editor.vB_Editor_QR");
    console.log("vB_Editor is available:", editor);
    let temp = editor.config.smiley_descriptions,
        tmp = editor.config.smiley_images;
    for (const image of images) {
        if (!image) continue;
        editor.config.smiley_descriptions.push(`[img]${image}[/img]`);
        editor.config.smiley_images.push(`https://wsrv.nl/?url=${image}&w=30`);
    }

    return () => {
        editor.config.smiley_descriptions = temp;
        editor.config.smiley_images = tmp;
    }
})
onMatchIfLoggedIn("show(post|thread)", "showLikeLimit", function() {
    const db = 'likes' + (window.USER_ID_FXP || '0');
    const likeLimit = 15;
    const selector = '.button-like-holder > span[onclick="makelike(this.id);"]';

    let likes = JSON.parse(GM_getValue(db, '[]'));
    let styleElement;
    const updateLikeButton = () => {
        console.log(likes);
        if (likes.length >= likeLimit) {
            styleElement = GM_addStyle(`${selector} { background-image: url("https://em-content.zobj.net/source/google/387/broken-heart_1f494.png"); }`);
        } else {
            // styleElement?.remove()
        }
    };

    const updateTimer = () => {
        const oldestLike = Math.min(...likes);
        if (Date.now() > oldestLike) {
            likes = likes.filter(like => like !== oldestLike);
            GM_setValue(db, JSON.stringify(likes));
            if (likes.length === 0) {
                clearInterval(timer);
            }
        }
    };

    const timer = setInterval(updateTimer, likeLimit * 3000);

    updateLikeButton();
    updateTimer();

    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('click', function() {
            if (likes.length >= likeLimit) return;
            likes.push(Date.now() + likeLimit * 60 * 1000);
            GM_setValue(db, JSON.stringify(likes));
            updateLikeButton();
        })
    })

    return () => styleElement?.remove();
})
onMatchIfLoggedIn("show(post|thread)", "none", async function() {
    const size = cfg.get("fontSize");
    if (size === "ללא") return;
    const editor = await waitForObject("CKEDITOR.tools");
    editor.callFunction(128, size);
    editor.callFunction(53, size);
})

onMatch("show(post|thread)", "showDeletedPost", function() {
    const targetPostId = queryParams.get('p');
    const isPostExist = document.contains(document.getElementById('post_' + targetPostId));
    if (!targetPostId || isPostExist) {
        return;
    }
    const elements = Array.from(document.querySelectorAll('.postbit'));
    const postIds = elements.map(el => parseInt(el.id.replace('post_', '')));
    const index = postIds.filter(pid => pid < targetPostId).length - 1;
    // if (index === 0) index = 1; //need to be test
    const newElement = document.createElement('li');
    GM_addElement("li", {
        textContent: 'התגובה שאתה מנסה לראות נמחקה.',
        id: 'post_' + targetPostId,
        className: 'postbit postbitim postcontainer', //test how this show (innerHTML)
        style: "background-color: #ffdddd; border: 1px solid #ff0000; padding: 10px 0; border-radius: 5px; color: #333; font-weight: bold; text-align: center;"
    })
    const targetElement = elements.at(index);
    targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling);

    if (!queryParams.has('t')) {
        setTimeout(() => targetElement.scrollIntoView(), 500);
    }

    return () => newElement?.remove();
});
onMatch("forumdisplay", "connectedStaff", function() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '10px');
    svg.setAttribute('height', '10px');
    svg.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', '#00FF00');
    path.setAttribute('d', 'm2 12a10 10 0 1 1 10 10 10 10 0 0 1 -10-10z');

    svg.appendChild(path);

    const usernameElements = document.querySelectorAll('.flo .username');

    usernameElements.forEach(async usernameElement => {
        const username = usernameElement.innerText;
        const userLink = usernameElement.href;

        const html = await fetcher(userLink);
        if (html.includes(username + ' מחובר/ת')) {
            usernameElement.insertAdjacentHTML('beforeend', svg.outerHTML);
        }
    });

    return () => {
        usernameElements.forEach(({ lastChild }) => lastChild.tagName === 'svg' && lastChild.remove());
    }
});

//https://greasyfork.org/en/scripts/476628-fxp-anti-delete-pms
onMatchIfLoggedIn("do=showpm&pmid=", "pms", async function() {
    await waitForObject("socket");
    new Function(GM_getResourceText("pms")).apply(rawWindow);
})


function checkNewComments(threadbit) {
    const threadComments = GM_getValue("threadComments", []);
    const threadId = getThreadIdFromLink(threadbit.find(".title").attr("href"));

    let previousCommentCount = -1;

    if (checkTrackThreadUnread(threadId)) {
        // Look for the thread in the saved data
        for (const thread of threadComments) {
            if (thread.id === threadId) {
                previousCommentCount = thread.comments;
                break;
            }
        }

        // If previous comments were found, compare to current count
        if (previousCommentCount > -1) {
            const currentCommentCount = getThreadbitComments(threadbit);
            const newComments = currentCommentCount - previousCommentCount;

            // If there are new comments, tag the thread
            if (newComments > 0) tagNewComments(threadbit, newComments);
        }
    }
}

//adds a new comments tag to threadbits that have them
function tagNewComments(threadbit, num) {
    var balloonText = "יש ";
    if (num === 1) balloonText += "תגובה אחת חדשה ";
    else balloonText += num + " תגובות חדשות ";
    balloonText += "שלא קראת באשכול זה.\nלחץ כדי לסמן כנקרא."

    const indicator = document.createElement('span');
    indicator.classList.add('newCommentsIndicator', 'balloonNoBorder');
    indicator.setAttribute('data-balloon-pos', 'left');
    indicator.setAttribute('data-balloon', balloonText);
    indicator.setAttribute('data-balloon-length', 'medium');
    indicator.textContent = `(${num})`;
    indicator.addEventListener('click', removeNewCommentTag);

    const titleElem = threadbit.querySelector('.title');
    titleElem.insertAdjacentElement('afterend', indicator);
}

//returns the number of comments that are read in a thread
function getCommentsReadCountOfThread(id, callback) {
    const threadComments = GM_getValue("threadComments", []);
    const thread = threadComments.find(item => item.id == id);
    const commentNum = thread ? thread.comments : -1;
    callback(commentNum);
}

//remove the new comments in brackets
function removeNewCommentTag(tagElement) {
    const threadbit = tagElement.closest('.threadbit');
    const comments = getThreadbitComments(threadbit);
    const titleLink = threadbit.querySelector('.title a');
    const id = getThreadIdFromLink(titleLink.getAttribute('href'));

    updateThreadCommentCount(id, comments);

    tagElement.style.transition = 'height 0.3s ease, opacity 0.3s ease';
    tagElement.style.overflow = 'hidden';
    tagElement.style.height = `${tagElement.offsetHeight}px`; // קיבוע הגובה הנוכחי
    void tagElement.offsetHeight;
    tagElement.style.height = '0';
    tagElement.style.opacity = '0';

    setTimeout(tagElement.remove, 300);
    updateThreadCommentCount(id, comments);
}

//compares the comment given with the number of read comments already tracked, and updates accordingly
function compareReadCommentsWithLast(threadId, lastIndex) {
    const threadComments = GM_getValue("threadComments", []);
    const thread = threadComments.find(item => item.id == threadId);
    const knownComments = thread ? thread.comments : -1;

    if (knownComments < lastIndex - 1) {
        const newCount = lastIndex - 1;
        updateThreadCommentCount(threadId, newCount);
        console.log(`updated comment num ${threadId} to ${newCount}`);
    }
}

//returns how many read comments there are for a thread
function getReadComments(threadId, callback){
    const threadComments = GM_getValue("threadComments", []);
    const thread = threadComments.find(item => item.id == threadId);
    const commentNum = thread ? thread.comments : -1;
    callback(commentNum);
}

/*
onMatchReady("*", "nightMode", function(hideBigImages, hideGames) {
    let styleElement;
    function toggleDarkMode(isEnabled) {
        const newValue = isEnabled ? "1" : "0";
        const date = new Date();
        date.setTime(new Date().getTime() + 172800000);
        document.cookie = `bb_darkmode=${newValue}; expires=${date.toUTCString()}`
    }
    function timeInMinutes(timeString) {
        if (!timeString) return 0;
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    function isNightModeEnabled() {
        const cookies = document.cookie.split(';');
        return cookies.some(cookie => cookie.trim().startsWith('bb_darkmode=1'));
    }

    const now = new Date();
    const minutesCurrent = now.getHours() * 60 + now.getMinutes();

    let rangeActive = false;
    const minutesStart = timeInMinutes('17:00'); //settings.autoNightmode.start
    const minutesEnd = timeInMinutes('23:50');
    //TODO ADD setTimeout

    rangeActive = minutesEnd < minutesStart ?
        (minutesStart <= minutesCurrent || minutesCurrent < minutesEnd) :
    (minutesCurrent >= minutesStart && minutesCurrent < minutesEnd);

    if (!isNightModeEnabled() && !rangeActive) {
        toggleDarkMode(false);
    } else if (rangeActive) {
        toggleDarkMode(true);
    }
    return () => {};
})
// const nightModeEnabled = localStorage.getItem("nightmodeEnabled") === "true";
// const temp = nightModeEnabled && settings.customBg.night.length > 0 ?
//         name: 'הפעל את מצב הלילה אוטומטית משעה <input type="time" id="nightStartTime" value="17:05" /> עד שעה <input type="time" id="nightEndTime" value="23:30" />',
//         default: {
// 			active: false,
// 			start: "17:05",
// 			end: "23:30"
// 		}
*/
