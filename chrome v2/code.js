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
            label: ':רשימה של קישורים לסמיילים',
            type: 'text',
            default: '',
            long: 3
        },
        showCounts: {
            label: 'מציג את מספר הפוסטים ואת כמות המשתמשים המחוברים',
            type: 'checkbox',
            default: false,
        },
        pms: {
            label: "מציג הודעות פרטיות שנמחקו",
            type: "checkbox",
            default: false
        },
        showForumStats: {
            label: 'הצג סטטיסטיקות פורומים',
            type: "checkbox",
            default: false
        },
        nightMode: {
            label: 'הפעל את מצב הלילה אוטומטית',
            type: "checkbox",
            default: false
        },
        // startTime: {
        //     label: 'Start Time:',
        //     type: 'time',
        //     default: '7:00'
        // },
        // endTime: {
        //     label: 'End Time:',
        //     type: 'time',
        //     default: '23:50'
        // }
    }
});

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        cfg.open("window", {
            windowFeatures: {
                width: 500, 
                height: 500
            }
        });
    }
});

/*
CKEDITOR.tools.callFunction(41, this); //131,'almoni-dl'
The system that automatically disables and enables the feature is currently not working in either version.
TODO:
- Implement audio file upload
- Support multiple users
- Like add http to check
- disable/enable on the same page and prevent reload
- Add features:
  - Auto reader mode
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

function onMatchIfLoggedIn(match, permissions, callback) {
    rawWindow.LOGGEDIN && onMatch(match, permissions, callback);
}

// window.addEventListener('storage', (e) => {
// 	console.log('Storage changed!');
// 	console.log('Key:', e.key);
// 	console.log('Old Value:', e.oldValue);
// 	console.log('New Value:', e.newValue);
// 	console.log('Storage Area:', e.storageArea);
// 	console.log('URL:', e.url);
// });

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
        console.log(css);
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
        let allFriendIds = [],
            temp = []
        let page = 1,
            match;
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
    let css = friendIds.map(id => '.username[href$="' + id + '"]::after').join(', ')
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
// https://greasyfork.org/en/scripts/476628-fxp-anti-delete-pms
onMatchIfLoggedIn("do=showpm&pmid=", "pms", async function() {
    await waitForObject("socket");
    new Function(GM_getResourceText("pms")).apply(rawWindow);
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
    const script = Array.from(scripts).find(e => e.innerText.includes("counts"));
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
        var counts = {}; //count each one
        for (var i = 0; i < arr.length; i++) {
            counts[arr[i]] = (counts[arr[i]] || 0) + 1;
        }

        var sortedArr = []; //add all properties to an array
        for (var prop in counts) {
            sortedArr.push({
                value: prop,
                count: counts[prop]
            });
        }
        sortedArr.sort(function(a, b) //sort the array according to the counts or alphabetically
            {
                if (b.count === a.count) {
                    if (b.value < a.value)
                        return 1;
                    else if (b.value > a.value)
                        return -1;
                    else
                        return 0;
                } else
                    return b.count - a.count;
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
    console.log(publishers, publishersDict);

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
    function toggleDarkMode(isEnabled) {
        const newValue = isEnabled ? "1" : "0";
        const date = new Date();
        date.setTime(new Date().getTime() + 172800000);
        document.cookie = `bb_darkmode=${newValue}; expires=${date.toUTCString()}`;
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

    const minutesStart = timeInMinutes('7:00');
    const minutesEnd = timeInMinutes('23:50');

    const exec = function() {
        const rangeActive = minutesEnd < minutesStart
        ? (minutesStart <= minutesCurrent || minutesCurrent < minutesEnd)
        : (minutesCurrent >= minutesStart && minutesCurrent < minutesEnd);

        if (!isNightModeEnabled() && !rangeActive) {
            document.body.classList.remove('darkmode');
            toggleDarkMode(false);
        } else if (rangeActive) {
            document.body.classList.add('darkmode');
            GM_addStyle('@import url("//static.fcdn.co.il/dyn/projects/css/desktop/darkmode.css");');
            toggleDarkMode(true);
        }

    }
    exec()
    const interval = setInterval(exec, 15 * 1000)

    return () => {
        clearInterval(interval);
        interval = null;
    };
});