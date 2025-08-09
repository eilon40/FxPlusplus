const checkbox = (label) => ({ label, default: false, type: 'checkbox' });
const text = (label, defaultValue = '', opt = {}) => ({ label, default: defaultValue, type: 'text', ...opt });
const cfg = new MonkeyConfig({
    title: 'הגדרות FxPlus+',
    menuCommand: true,
    params: {
        hideBigImages: checkbox("הסתר את הכתבות הגדולות מדך הבית"),
        hideGames: checkbox("הסתר את אזור המשחקים מדף הבית"),
        hideArticles: checkbox("הסתר כתבות מדף הבית"),
        resizeSignatures: checkbox("חותך חתימות גדולות"),
        hideAds: checkbox("הסתר מודעות"),
        hideNagish: checkbox("הסתר את תפריט הנגישות"),
        showFriends: checkbox("הצג חברים באשכולת"),
        showAutoPinned: checkbox("הצג יותר משלושה אשכולות נעוצים"),
        disableLiveTyping: checkbox("אל תודיע שאני מקליד"),
        showDeletedPost: checkbox("הצג פוסט שנמחק"),
        showLikeLimit: checkbox("הצג מגבלת לייקים"),
        connectedStaff: checkbox("הצג צוות מחובר"),
        showCounts: checkbox('מציג את מספר הפוסטים ואת כמות המשתמשים המחוברים'),
        pms: checkbox("מציג הודעות פרטיות שנמחקו"),
        showForumStats: checkbox('הצג סטטיסטיקות פורומים'),
        weeklyChallenge: checkbox('מציג אתגרים שבועיים בתוך הפורום'),
        audioChange: text(":קישור לקובץ שמע עבור התראה"), // https://www.tzevaadom.co.il/static/sounds/calm.wav
        hideCategories: text(":רשימה של קטגוריות להסתרה"), // 4428, 13
        smiles: text(':רשימה של קישורים לסמיילים', '', { long: 3 }), // https://yoursmiles.org/tsmile/heart/t4524.gif
        nightMode: checkbox('הפעל את מצב הלילה אוטומטית'),
        startTime: text('Start Time:', '17:00'),
        endTime: text("End Time:", '23:50')
    }
});

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        cfg.open("window", {
            windowFeatures: { width: 500 }
        });
    }
});

/*
CKEDITOR.tools.callFunction(41, this); //131,'almoni-dl'
The system that automatically disables and enables the feature is currently not working in either version.
TODO:
- Implement audio file upload
- Support multiple users
- disable/enable on the same page and prevent reload
- BBCode support
- Hide sticky posts
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

function setCookie(name, value, minutes) {
    const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(n) {
    return decodeURIComponent(document.cookie.split('; ').find(c => c.startsWith(n + '='))?.split('=')[1] || '');
}

function onMatchIfLoggedIn(match, permissions, callback) {
    rawWindow.LOGGEDIN && onMatch(match, permissions, callback);
}

function onMatch(match, permission, callback) {
    const hasPermission = permission === "none" || cfg.get(permission);
    if (!shouldRun(match) || !hasPermission) return;

    const docReady = /complete|interactive/.test(document.readyState);
    const runImmediately = !callback.toString().includes("document");

    let teardown = () => {};
    const executeFeature = () => {
        teardown();
        teardown = callback() || (() => {});
    };

    if (runImmediately || docReady) executeFeature();
    else document.addEventListener('DOMContentLoaded', executeFeature);

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

function fetcher(url, opt = {}) {
    return fetch(url, opt).then(response => response.text());
}
// Author ID: 967488
injectStyle("forumdisplay", "showAutoPinned", "#stickies li.threadbit:nth-child(n+4) { display: list-item !important; } .morestick { display: none !important; }");
injectStyle("*", "hideAds", "#adfxp, #related_main, .trc_related_container, .trc_spotlight_widget, .videoyoudiv, .OUTBRAIN { display: none !important }");
injectStyle("*", "hideNagish", ".nagish-button { display: none; }");
injectStyle("/(?:index.php)?", "hideCategories", `${cfg.get("hideCategories").split(", ").map(cId => `.hp_category:has(a[href="forumdisplay.php?f=${cId}"])`).join(',')} { display: none }`) // #cat${cId}, .hi4 { height: 337px }
injectStyle("/(?:index.php)?", "hideArticles", "#slide { height:auto !important; } .mainsik { display: none; }");
injectStyle("/(?:index.php)?", "hideBigImages", "#slide { height:auto !important; } .big-image-class { display: none; }");
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

onMatchIfLoggedIn("*", "showFriends", async function () {
    const storageKey = "refreshFriends";
    if (getCookie(storageKey)) return;

    const allFriendIds = [];
    const regex = /<h4><a href="member\.php\?u=(\d+)"/g;
    let page = 1;
    
    while (true) {
        const url = `https://www.fxp.co.il/profile.php?do=buddylist&pp=100&page=${page}`;
        const html = await fetcher(url);

        const matches = Array.from(html.matchAll(regex)).map(m => m[1]);
        matches.forEach(id => allFriendIds.push(id));

        if (matches.length < 100) break;

        page++;
    }

    GM_setValue('friendIds', JSON.stringify(allFriendIds));
    setCookie(storageKey, Date.now(), 15);
});

onMatchIfLoggedIn("show(post|thread)", "showFriends", function() {
    const friendIds = JSON.parse(GM_getValue("friendIds", '[0]'));
    const styleElement = GM_addStyle(`
        ${friendIds.map(id => '.username[href$="' + id + '"]::after').join(', ')} {
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
        set: function(value) {
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
    let originalDescriptions = editor.config.smiley_descriptions,
        originalImages = editor.config.smiley_images;

    for (const image of images) {
        if (!image) continue;
        editor.config.smiley_descriptions.push(`[img]${image}[/img]`);
        editor.config.smiley_images.push(`https://wsrv.nl/?url=${image}&w=30`);
    }

    return () => {
        editor.config.smiley_descriptions = originalDescriptions;
        editor.config.smiley_images = originalImages;
    }
})
onMatchIfLoggedIn("show(post|thread)", "showLikeLimit", async function() {
    const brokenHeartUrl = 'url("https://em-content.zobj.net/source/google/387/broken-heart_1f494.png")';
    let toRemove = [];
    // For now, this is good. In the future, consider verifying the full name and not just if it includes certain text (to detect fake accounts).
    function checkLike(postid) {
        return fetcher("https://www.fxp.co.il/ajax.php", {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: `do=wholikepost&postid=${postid}&securitytoken=${rawWindow.SECURITYTOKEN}`,
        }).then(response => response.includes(rawWindow.my_user_name));
    }

    document.addEventListener("click", async function(event) {
        const element = event.target;

        const onclickAttr = element.getAttribute('onclick');
        if (onclickAttr != 'makelike(this.id);') return;

        const postid = element.id.split('_').shift();
        if (await checkLike(postid)) return; //may cause issues (time)

        const sibling = element.nextElementSibling;
        sibling.style.backgroundImage = brokenHeartUrl;
        toRemove.push(sibling);
    });

    return () => {
        toRemove.forEach(el => el.style.backgroundImage = '');
        toRemove = [];
    }
})
// https://greasyfork.org/en/scripts/476628-fxp-anti-delete-pms
onMatchIfLoggedIn("do=showpm&pmid=", "pms", async function() {
    await waitForObject("socket");
    new Function(GM_getResourceText("pms")).apply(rawWindow);
})
onMatch("show(post|thread)", "showDeletedPost", function() {
    const targetPostId = queryParams.get('p');
    const isPostExist = document.contains(document.getElementById('post_' + targetPostId));
    if (!targetPostId || isPostExist) return;
    const elements = Array.from(document.querySelectorAll('.postbit'));
    const postIds = elements.map(el => parseInt(el.id.replace('post_', '')));
    const index = postIds.filter(pid => pid < targetPostId).length - 1;
    // if (index === 0) index = 1; //need to be test
    const newElement = GM_addElement("li", {
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
        usernameElements.forEach(({
            lastChild
        }) => lastChild.tagName === 'svg' && lastChild.remove());
    }
});
onMatch("*", "showCounts", function() {
    const scripts = document.querySelectorAll('script[type="text/javascript"]:not([src])');
    const script = Array.from(scripts).find(e => e.textContent.includes("counts"));
    if (!script) return;

    const lines = script.innerText.split("\n");
    const counts = {};
    for (const line of lines) {
        const match = line.match(/counts\["(.+?)"\]\s*=\s*(\d+);/);
        if (match) counts[match[1]] = parseInt(match[2]);
    }

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.bottom = "10px";
    container.style.right = "10px";
    container.style.background = "white";
    container.style.border = "1px solid #ccc";
    container.style.padding = "10px 15px";
    container.style.boxShadow = "0 0 5px rgba(0,0,0,0.2)";
    container.style.borderRadius = "8px";
    container.style.zIndex = "9999";
    container.style.fontFamily = "Arial, sans-serif";
    container.style.fontSize = "14px";
    container.style.transition = "opacity 1s";

    container.innerHTML = `
        <strong>סטטיסטיקה:</strong><br>
        מחוברים: ${counts["#total_online"]?.toLocaleString() ?? 'N/A'}<br>
        פוסטים: ${counts["#total_posts"]?.toLocaleString() ?? 'N/A'}
    `;

    document.body.appendChild(container);
    setTimeout(() => {
        container.style.opacity = "0";
        container.addEventListener("transitionend", container.remove);
    }, 5000);
});
/*
the old messy code with all those functions
maybe one day I'll have AI rewrite it in cleaner vanilla JavaScript with fewer indentations.
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
*/
onMatch("forumdisplay", "showForumStats", function() {
    GM_addStyle(`
        #forumStatsContainer {
    width: 100%;
    clear: both;
    background: #feffe5;
    border: 1px solid #C4C4C4;
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-sizing: border-box;
}

#forumStats {
    padding: 1em;
    text-align: center;
    position: relative;
    padding-bottom: 1.5em;
}

.statTable {
    border: 1px solid #f1f1f1;
    margin: 0 0.5em;
    margin-bottom: 1em;
    border-top: 0;
    border-bottom: 0;
}

.statTable th {
    font-weight: bold;
    text-align: center;
    padding: 0.5em;
}

.statTable td {
    padding: 0.1em 0.5em;
}

#detailedStatsBtn {
    position: absolute;
    bottom: 0;
    left: 50%;
    border-bottom: none !important;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    transform: translateX(-50%);
}
    
.dimScreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.75);
    z-index: 111;
    display: none;
}

#popupBox {
    z-index: 1200;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.popupContainer {
    pointer-events: all;
    animation: fadeInTop 0.3s;
    display: none;
}

    .popupContainer.greenTopPopup .popupTop {
        background: #1d9655;
    }

    .popupContainer.orangeTopPopup .popupTop {
        background: #ea861c;
    }

    .popupContainer.alertTopPopup .popupTop {
        background: #ef1700;
    }

.popupTop {
    background: #1CA4EA;
    color: #fff;
    font-size: 1.4em;
    border-top-left-radius: 0.2em;
    border-top-right-radius: 0.2em;
    padding: 0.5em 2em;
    text-align: center;
}

    .popupTop .subtitle {
        font-size: 0.5em;
        color: rgba(255, 255, 255, 0.64);
    }

.popupImg {
    width: 3em;
    height: 3em;
    background: inherit;
    padding: 0.2em;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: -1.8em;
}

.popupBottom {
    background: #fff;
    border-bottom-left-radius: 0.2em;
    border-bottom-right-radius: 0.2em;
    padding: 1em 2em;
    text-align: center;
    max-height: calc(80vh - 3em);
    max-width: 90vw;
    box-sizing: border-box;
    overflow: auto;
}
`)

    function getDupeSortedDictionary(arr) {
        const counts = new Map();

        for (const item of arr) counts.set(item, (counts.get(item) || 0) + 1);

        const sortedArr = Array.from(counts, ([value, count]) => ({ value, count }));

        sortedArr.sort((a, b) => {
            return b.count === a.count ? 
                a.value.localeCompare(b.value) : b.count - a.count
        });

        return sortedArr;
    }


    //adds a window with a specific id and dims the background
    function openPopupWindow(id, img, title, content, additionalClass) {
        if ($("#popupBox").length === 0) {
            $("body").append($("<div>", {
                id: "popupBox"
            }));
        }

        //do not open a popup if one already exists
        if ($(".popupContainer").length === 0) {
            $("body").append($("<div>", {
                class: "dimScreen",
                id: "dim_" + id
            }).click(function() {
                removePopupWindow(id);
            }));

            var popup =
                $("<div>", {
                    class: "popupContainer",
                    id: id
                }).append(
                    $("<div>", {
                        class: "popupTop"
                    }).append(
                        $("<div>", {
                            class: "popupImg"
                        }).append(
                            $("<img>", {
                                src: img
                            })
                        )
                    ).append(
                        $("<div>", {
                            class: "popupTitle"
                        }).append(title)
                    )
                ).append(
                    $("<div>", {
                        class: "popupBottom"
                    }).append(content)
                );

            if (additionalClass)
                popup.addClass(additionalClass);

            $("#popupBox").append(popup);

            $("#dim_" + id).fadeIn(300, function() {
                $("#" + id).show();
            });
        }
    }

    //removes completely a popup window
    function removePopupWindow(id) {
        if ($("#" + id).length > 0) {
            $("#" + id).remove();
            $("#dim_" + id).fadeOut(300, function() {
                $(this).remove();
            });
            return true;
        }
        return false;
    }
    const total = document.querySelectorAll('#threads .threadtitle').length;
    $(".threads_list_fxp").after(
        $("<div>", {
            id: "forumStatsContainer"
        }).append(
            $("<div>", {
                id: "forumStats"
            }).append(
                $("<i>").text(`נתונים סטטיסטיים של ${total} אשכולות:`)
            )
        )
    );

    //PUBLISHERS

    var publishers = []; //array of all posters that posted in the forum
    $("#threads .threadinfo .username").each(function() {
        publishers.push($(this).text());
    });
    var publishersDict = getDupeSortedDictionary(publishers);

    line = $("<div>");
    if (publishersDict.length > 1 && publishersDict[0].count > 1) {
        line.append($("<span>").text("המפרסם הדומיננטי ביותר הוא "));
        //add names until the count is not the largest
        for (var i = 0; i < publishersDict.length && (publishersDict[i].count === publishersDict[0].count); i++) {
            if (i > 0)
                line.append($("<span>").text(" או "));
            line.append($("<b>").text(publishersDict[i].value));
        }
        line.append($("<span>").text(" עם " + publishersDict[0].count + " אשכולות."));
    } else {
        line.append($("<span>").text("אין מפרסם דומיננטי במיוחד."));
    }
    $("#forumStats").append(line);

    //COMMENTORS

    var commentors = []; //array of all commentors that last posted in threads
    $("#threads .threadlastpost .username").each(function() {
        commentors.push($(this).text());
    });

    var commentorsDict = getDupeSortedDictionary(commentors);

    line = $("<div>");
    if (commentorsDict.length > 1 && commentorsDict[0].count > 1) {
        line.append($("<span>").text("המגיב האחרון הדומיננטי ביותר הוא "));
        for (var i = 0; i < commentorsDict.length && (commentorsDict[i].count === commentorsDict[0].count); i++) {
            if (i > 0)
                line.append($("<span>").text(" או "));
            line.append($("<b>").text(commentorsDict[i].value));
        }
        line.append($("<span>").text(" עם " + commentorsDict[0].count + " תגובות אחרונות."));
    } else {
        line.append($("<span>").text("אין מגיב אחרון דומיננטי במיוחד."));
    }
    $("#forumStats").append(line);

    //WORDS

    var words = []; //array of all words in titles
    $("#threads .title").each(function() {
        var titleWords = $(this).text().match(/([^\s.,\/#?!$%\^&\*+;:{}|=\-_`~()]+)/g); //get words in title
        if (titleWords !== null) {
            titleWords.forEach(function(word) {
                if (word.length > 1) //push words to the array of all the words
                    words.push(word);
            });
        }
    });

    var wordsDict = getDupeSortedDictionary(words);

    var line = $("<div>");
    if (wordsDict.length > 1 && wordsDict[0].count > 1) {
        line.append($("<span>").text("המילה הנפוצה ביותר בכותרות היא "));
        for (var i = 0; i < wordsDict.length && (wordsDict[i].count === wordsDict[0].count); i++) {
            if (i > 0)
                line.append($("<span>").text(" או "));
            line.append($("<b>").text(wordsDict[i].value));
        }
        line.append($("<span>").text(" עם " + wordsDict[0].count + " אזכורים."));
    } else {
        line.append($("<span>").text("אין מילה נפוצה במיוחד בכותרות."));
    }
    $("#forumStats").append(line);

    //PREFIXES

    var prefixes = []; //array of all prefixes of threads
    $("#threads .prefix").each(function() {
        var prefix = $(this).text().trim();
        prefix = prefix.replace("|", ""); //remove |
        prefix = prefix.replace("סקר: ", "").trim(); //remove poll prefix
        prefixes.push(prefix);
    });

    var prefixesDict = getDupeSortedDictionary(prefixes);

    line = $("<div>");
    if (prefixesDict.length > 1 && prefixesDict[0].count > 1) {
        line.append($("<span>").text("התיוג הנפוץ ביותר הוא "));
        for (var i = 0; i < prefixesDict.length && (prefixesDict[i].count === prefixesDict[0].count); i++) {
            if (i > 0)
                line.append($("<span>").text(" או "));
            line.append($("<b>").text(prefixesDict[i].value));
        }
        line.append($("<span>").text(" שנמצא ב-" + prefixesDict[0].count + " אשכולות."));
    } else {
        line.append($("<span>").text("אין תיוג נפוץ במיוחד."));
    }
    $("#forumStats").append(line);

    //VIEW COMMENT RATIO

    var commentsCount = 0;
    var viewsCount = 0;

    var cc, vc;

    $("#threads .threadstats").each(function() {
        cc = parseInt($(this).find("li:eq(0)").text().replace(",", "").replace(/^\D+/g, ""));
        vc = parseInt($(this).find("li:eq(1)").text().replace(",", "").replace(/^\D+/g, ""));
        if (!isNaN(cc))
            commentsCount += cc;
        if (!isNaN(vc))
            viewsCount += vc;
    });

    var viewsCommentsRatio = Math.round(viewsCount / commentsCount);
    if (viewsCommentsRatio < 1)
        viewsCommentsRatio = 1; //make sure that it's not rounded to 0

    if (isNaN(viewsCommentsRatio))
        viewsCommentsRatio = "∞";

    line = $("<div>");
    line.append($("<span>").text("יחס הצפיות לתגובה הוא תגובה כל "));
    line.append($("<b>").text(viewsCommentsRatio + " צפיות"));
    line.append($("<span>").text("."));
    $("#forumStats").append(line);


    //shorten the words dictionary
    var shortWordsDict = [];
    for (var i = 0; i < wordsDict.length && wordsDict[i].count > 1; i++) {
        shortWordsDict.push(wordsDict[i]);
    }
    wordsDict = shortWordsDict;

    //button for detailed statistics
    $("#forumStats").append(
        $("<div>", {
            class: "smallPlusButton",
            id: "detailedStatsBtn"
        }).text("+").click(function() {

            var pContent = $("<div>");

            pContent.append($("<div>").text("להלן פירוט הסטטיסטיקות לפורום זה:"));

            var flexTableContainer = $("<div>", {
                style: "display: flex; flex-wrap: wrap;"
            });

            //add table skeleton
            flexTableContainer.append($("<table>", {
                class: "statTable",
                id: "publishersStatTable"
            }).append(
                $("<tr>").append(
                    $("<th>").text("מפרסם")
                ).append(
                    $("<th>").text("אשכולות")
                )));

            flexTableContainer.append($("<table>", {
                class: "statTable",
                id: "commentorsStatTable"
            }).append(
                $("<tr>").append(
                    $("<th>").text("מגיב")
                ).append(
                    $("<th>").text("תגובות אחרונות")
                )));

            flexTableContainer.append($("<table>", {
                class: "statTable",
                id: "wordsStatTable"
            }).append(
                $("<tr>").append(
                    $("<th>").text("מילה")
                ).append(
                    $("<th>").text("אזכורים")
                )));

            flexTableContainer.append($("<table>", {
                class: "statTable",
                id: "prefixesStatTable"
            }).append(
                $("<tr>").append(
                    $("<th>").text("תיוג")
                ).append(
                    $("<th>").text("אשכולות")
                )));

            //add table content
            for (var i = 0; i < publishersDict.length; i++) {
                flexTableContainer.find("#publishersStatTable").append(
                    $("<tr>").append(
                        $("<td>").text(publishersDict[i].value)
                    ).append(
                        $("<td>").text(publishersDict[i].count)
                    )
                );
            }

            for (var i = 0; i < commentorsDict.length; i++) {
                flexTableContainer.find("#commentorsStatTable").append(
                    $("<tr>").append(
                        $("<td>").text(commentorsDict[i].value)
                    ).append(
                        $("<td>").text(commentorsDict[i].count)
                    )
                );
            }

            for (var i = 0; i < wordsDict.length; i++) {
                flexTableContainer.find("#wordsStatTable").append(
                    $("<tr>").append(
                        $("<td>").text(wordsDict[i].value)
                    ).append(
                        $("<td>").text(wordsDict[i].count)
                    )
                );
            }

            for (var i = 0; i < prefixesDict.length; i++) {
                flexTableContainer.find("#prefixesStatTable").append(
                    $("<tr>").append(
                        $("<td>").text(prefixesDict[i].value)
                    ).append(
                        $("<td>").text(prefixesDict[i].count)
                    )
                );
            }

            pContent.append(flexTableContainer);
            pContent.append(
                $("<div>", {
                    class: "closeBtn"
                }).text("סגור").click(function() {
                    removePopupWindow("detailedStats");
                })
            );
            openPopupWindow("detailedStats",
                "https://raw.githubusercontent.com/SilverTuxedo/FxPlusplus/refs/heads/master/chrome/images/graph.svg",
                "סטטיסטיקות מפורטות לפורום " + document.querySelector("[property=\"og:title\"]").content.replace("קהילת", "").trim(),
                pContent);
        }));
    return () => document.querySelectorAll("#forumStatsContainer, #popupBox").forEach(e => e.remove())
})
onMatch("*", "nightMode", function () {
    const toggleDarkMode = (isEnabled) => setCookie("bb_darkmode",  isEnabled ? "1" : "0", 1440);

    function timeInMinutes(timeString) {
        if (!timeString) return 0;
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    const darkModeThemeEl = document.querySelector("#darkmode_theme");

    function exec() {
        const now = new Date();
        const minutesCurrent = now.getHours() * 60 + now.getMinutes();

        const minutesStart = timeInMinutes(cfg.get("startTime"));
        const minutesEnd = timeInMinutes(cfg.get("endTime"));

        const rangeActive = minutesEnd < minutesStart
            ? (minutesCurrent >= minutesStart || minutesCurrent < minutesEnd)
            : (minutesCurrent >= minutesStart && minutesCurrent < minutesEnd);

        const nightModeActive = getCookie("bb_darkmode") == "1"

        if (nightModeActive && !rangeActive) {
            darkModeThemeEl?.classList?.remove('ofset');
            document.body.classList.remove('darkmode');
            document.querySelector('[href*="darkmode"]')?.remove();
            toggleDarkMode(false);
        } else if (!nightModeActive && rangeActive) {
            darkModeThemeEl?.classList?.add('ofset');
            document.body.classList.add('darkmode');
            if (!document.querySelector('[href*="darkmode"]')) {
                GM_addElement("link", {
                    rel: 'stylesheet',
                    href: '//static.fcdn.co.il/dyn/projects/css/desktop/darkmode.css'
                });
            }
            toggleDarkMode(true);
        }
    };

    exec();
    const interval = setInterval(exec, 20 * 1000);

    return () => clearInterval(interval);

});
onMatch("forumdisplay", "weeklyChallenge", async function() {
    const getTodayDMY = () => new Date().toLocaleDateString('en-GB').split('/').join('-');
    
    function parseDMY(dateStr) {
        const [day, month, year] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    function checkDateDifference(dateStr1, dateStr2) {
        const date1 = parseDMY(dateStr1);
        const date2 = parseDMY(dateStr2);
        return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24 * 7);
    }

    const target = document.querySelector(".flo > .description_clean");

    const container = GM_addElement(target, "div", {
        style: "direction: rtl; text-align: right; max-width: 300px; padding: 10px;"
    });

    GM_addElement(container, "h3", {
            textContent: "אשכול השבוע",
            style: "margin-top: 0;"
        });

    GM_addElement(container, "div", {
        id: "thread-week",
        textContent: "טוען...",
        style: "margin-bottom: 12px; color: #222;"
    });
    // GM_addElement(container, "img", {
    //     src: "https://i.imagesup.co/images2/84dc2f601852f01ca8bba4bd395a4d5756784812.png",
    //     width:"150px"
    // })
    GM_addElement(container, "h3", {
        textContent: "משתמש השבוע"
    });

    GM_addElement(container, "div", {
        id: "member-week",
        textContent: "טוען...",
        style: "color: #222;"
    });

    const errorBox = GM_addElement(container, "div", {
        id: "weekly-error",
        style: "color: red; margin-top: 10px; display: none;"
    });

    const CACHE_KEY = "weeklyChallengeCache" + rawWindow.FORUM_ID_FXP;
    const cachedData = getCookie(CACHE_KEY);
    if (cachedData) {
        try {
            const { thread, member } = JSON.parse(cachedData);
            document.getElementById("thread-week").textContent = thread;
            document.getElementById("member-week").textContent = member;
            return;
        } catch (e) {}
    }

    const domParser = new DOMParser();

    const stickies = Array.from(document.querySelectorAll('.stickies .threadinfo'))
    .filter(node => /אשכול השבוע|משקיען השבוע|7 ימי ווינר|משקיען ואשכול/.test(node.textContent))
    .map(node => node.parentElement);
    if (stickies.length > 1 || stickies.length === 0) {
        container.style.display = "none";
        return; // maybe in the future, this will handle values greater than 1
    }

    const sticky = stickies.shift();
    const element = sticky.querySelector('a.lastpostdate');
    const url = element.href?.replace(/#post.*/, '');
    if (!url) {
        errorBox.style.display = "block";
        errorBox.innerHTML = 'האשכול השבועי לא מכיל אף הכרזה, יש לפנות ל<a href="https://www.fxp.co.il/forumdisplay.php?f=18" target="_blank">צוות תמיכה</a>';
        return;
    }
    const time = element.parentElement.textContent;
    const date = time.split(" ").shift().replace(/אתמול|היום/, getTodayDMY());
    if (checkDateDifference(getTodayDMY(), date) >= 2) {
        errorBox.style.display = "block";
        errorBox.innerHTML = 'האשכול השבועי לא עודכן זמן רב, יש לפנות ל<a href="https://www.fxp.co.il/forumdisplay.php?f=18" target="_blank">צוות תמיכה</a>';
        return;
    }
    const response = await fetcher(url + "&pp=1");
    const doc = domParser.parseFromString(response, "text/html");

    const threads = doc.querySelectorAll(".postcontent a[href*='showthread.php']");
    const members = doc.querySelectorAll(".postcontent a[href*='member.php']");
    /*
    TODO:
    - Handle multiple thread links properly current implementation only processes the first link and does not cover all cases.
    - Replace textContent below with real URL
    */
    let thread = threads.length > 0 ? threads[0].textContent.trim().replace(/^"|"$/g, "") : "לא נמצא אשכול";
    let member = members.length > 0 ? members[0].textContent.trim() : "לא נמצא משתמש";

    document.getElementById("thread-week").textContent = thread;
    document.getElementById("member-week").textContent = member;
    setCookie(CACHE_KEY, JSON.stringify({ thread, member }), 5);
})