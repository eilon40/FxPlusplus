(()=>{var t={810:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(413);const r={setting:{name:"Todo",description:"Todo",permission:"AntiDeletePms"},authorId:967488,version:"2024-08-08",match:"private_chat.php?do=showpm",loaded:!1,execute:function(){const t=(0,o.TD)("\n\t\t<style type='text/css'>\n\t\t\t.talk-bubble-alt {\n\t\t\t\tmargin-top: 10px;\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tposition: relative;\n\t\t\t\tmin-width: 115px;\n\t\t\t\twidth: auto;\n\t\t\t\theight: auto;\n\t\t\t\tbackground-color: #EE4B2B;\n\t\t\t\tmax-width: 90%;\n\t\t\t\tword-wrap: break-word;\n\t\t\t\tclear: both;\n\t\t\t\tbox-shadow: -1px 1px .5px rgba(0,0,0,.33);\n\t\t\t\t-moz-box-shadow: -1px 1px .5px rgba(0,0,0,.33);\n\t\t\t\t-webkit-box-shadow: -1px 1px .5px rgba(0,0,0,.33)\n\t\t\t}\n\n\t\t\t.right-top-alt {\n\t\t\t\tmargin-right: 17px;\n\t\t\t\tfloat: right;\n\t\t\t\tbackground-color: #EE4B2B\n\t\t\t}\n\n\t\t\t.right-top-alt .talktext .date {\n\t\t\t\tleft: 28px\n\t\t\t}\n\n\t\t\t.right-top-alt .talktext .read,.right-top-alt .talktext .unread,.right-top-alt .talktext .loading {\n\t\t\t\tbackground-size: 16px;\n\t\t\t\twidth: 16px;\n\t\t\t\theight: 16px;\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 12px;\n\t\t\t\tbottom: 3px;\n\t\t\t\tbackground-repeat: no-repeat\n\t\t\t}\n\n\t\t\t.left-top-alt {\n\t\t\t\tmargin-left: 17px;\n\t\t\t\tfloat: left\n\t\t\t}\n\n\t\t\t.tri-right-alt.left-top:after {\n\t\t\t\tcontent: ' ';\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 0;\n\t\t\t\theight: 0;\n\t\t\t\tleft: -10px;\n\t\t\t\tright: auto;\n\t\t\t\ttop: 0;\n\t\t\t\tbottom: auto;\n\t\t\t\tborder: 10px solid;\n\t\t\t\tborder-color: #fff transparent transparent transparent\n\t\t\t}\n\n\t\t\t.tri-right-alt.right-top:after {\n\t\t\t\tcontent: ' ';\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 0;\n\t\t\t\theight: 0;\n\t\t\t\tleft: auto;\n\t\t\t\tright: -10px;\n\t\t\t\ttop: 0;\n\t\t\t\tbottom: auto;\n\t\t\t\tborder: 10px solid;\n\t\t\t\tborder-color: #def5cd transparent transparent transparent\n\t\t\t}\n\n\t\t\t.talk-bubble.deleted:after {\n\t\t\t\tcontent: \" \";\n\t\t\t\tborder-color: #EE4B2B transparent transparent transparent;\n\t\t\t}\n\n\t\t\t.talk-bubble.deleted {\n\t\t\t\tbackground-color: #EE4B2B;\n\t\t\t}\n\t\t</style>"),e=t=>$("[data-text-id="+t+"]"),n=t=>{const e=t.hasClass("left-top")?"left-top-alt":"right-top-alt";t.removeClass("tri-right").removeClass("right-top").removeClass("left-top").removeClass("talk-bubble"),t.addClass("talk-bubble-alt").addClass("tri-right-alt"),t.addClass(e)},r=()=>{$(".talk-bubble:has(.deleted-message)").each(((t,o)=>{const r=o.getAttribute("data-text-id");(t=>{const e=(t=>t.attr("id").substring(3))(t);(t=>new Promise(((e,n)=>{$.get("https://www.fxp.co.il/private.php?do=showpm&pmid="+t).then((t=>{const n=/<blockquote class="postcontent restore"\s+>(.*?)<\/blockquote>/gs.exec(t);e(n[1])}),(t=>{n(t)}))})))(e).then((o=>{const r=$("#pm_"+e),i=t.find(".talktext"),s=getCorrectMessageInLive({message:o});i.find(".deleted-message").remove(),i.append("<p>"+s.trim()+"</p>"),n(r)}))})(e(r))}))};return r(),(()=>{const t=t=>{const o=e(t);n(o)},o=socket.listeners("lisendeletemessage");for(let e=0;e<o.length;++e)o[e]=t;window.updateMessageDeletedFromShowPmIframe=t,window.getMorePrivateMessage=()=>{$.ajax({type:"GET",url:"private_chat.php?do=showpm&pmid="+pmid_chat+"&startwith="+counter_get_more_pm+"&only_li=1&web=1",dataType:"json",success:function(t){var e=$($(".talk-bubble")[0]).attr("id");$(".chat-data").prepend(t.lis),r(),$(".talk-bubble").removeClass("waitforload"),$(".chat-data").prepend($("#load-more-message")),playerfxp(),setTimeout((function(){}),100),counter_get_more_pm+=50,"no"==t.havemore&&$("#load-more-message").remove(),$(".chat-data").prepend($(".holder-title")),$("html, body").scrollTop($("#"+e).offset().top-$(".menu").outerHeight()-10)}})}})(),function(){t.remove()}}}},403:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={setting:{name:"הקראה של האשכול",description:"Todo",permission:"autoReader"},authorId:1129410,version:"2024-08-08",match:"show",loaded:!0,execute:function(){const t="undefined"!=typeof ISMOBILEFXP;function e(){speechSynthesis.cancel()}window.onunload=e;const n=document.createElement("a");return n.innerText="הקרא אשכול",n.onclick=function o(){const r=[...document.querySelectorAll(".postbit")].map((e=>{const n=t?".xsaid":".username";return"המשתמש "+e.querySelector(n).textContent+" כתב\n"+e.querySelector(t?".content":".postcontent").textContent})).join("\n");console.log(r);const i=new SpeechSynthesisUtterance(r);i.lang="he",i.onstart=function(){n.innerText="עצור הקראה",n.onclick=e},i.onend=function(){n.innerText="הקרא אשכול",n.onclick=o},i.onerror=function(){n.innerText="הקרא אשכול",n.onclick=o},speechSynthesis.speak(i)},n.className="newcontent_textcontrol",n.style.width="136px","speechSynthesis"in window&&document.querySelectorAll(".postbit").length>0&&(t?document.querySelector(".page_title_fxp").after(n):document.querySelector(window.LOGGEDIN?"#open-thread-controls":"#above_postlist").after(n)),function(){n.remove(),e()}}}},291:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={setting:{name:"שלח התראות גם כאשר האתר סגור",description:'התראות לגבי לייקים, ציטוטים ודואר נכנס יופיעו גם כאשר אינך גולש באתר. <a id="sendTestNotification">לחץ כאן לשליחת הודעת בדיקה.</a>',permission:"backgroundNotifications",execute:function(){document.getElementById("sendTestNotification").addEventListener("click",(function(){var t,e;t=Math.random().toString(36).substr(2,10),e={type:"basic",iconUrl:"../notificationImg.png",title:"הודעת בדיקה!",message:"הידעת? הגולש הממוצע באינטרנט ממצמץ רק 7 פעמים בדקה! ממוצע המצמוץ הנורמלי הוא 20 - כמעט פי 3.",isClickable:!0},chrome.notifications.create(t,e),chrome.notifications.onClicked.addListener((function(t){}))}))}},authorId:967488,version:"2024-08-08",match:"*",loaded:!1,execute:function(){let t,e=0;return document.querySelectorAll(".noticount").forEach((n=>{t=parseInt(n.innerText),e+=isNaN(t)?0:t})),chrome.runtime.sendMessage({updateBadge:e}),function(){}}}},396:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>s});var o=n(413);const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("width","10px"),r.setAttribute("height","10px"),r.setAttribute("viewBox","0 0 24 24");const i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("fill","#00FF00"),i.setAttribute("d","m2 12a10 10 0 1 1 10 10 10 10 0 0 1 -10-10z"),r.appendChild(i);const s={setting:{name:"מסמן צוות מחובר",description:"בתוך הפורום, חברי צוות המחוברים יזוהו על ידי אייקון ירוק קטן המוצג לצד שמם.",permission:"connectedStaff"},authorId:1129410,version:"2024-08-08",match:"forumdisplay",loaded:!0,execute:function(){const t=document.querySelectorAll(".flo .username");return t.forEach((async t=>{const e=t.innerText,n=t.href;(await(0,o.GO)(n)).includes(e+" מחובר/ת")&&t.insertAdjacentHTML("beforeend",r.outerHTML)})),function(){t.forEach((({lastChild:t})=>{"svg"===t.tagName&&t.remove()}))}}}},408:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(413);const r={setting:{name:"אל תודיע שאני מקליד",description:"מבטל את ההודעה שאתה מקליד באשכולות והודעות פרטיות לבחירתך. עדיין תוכל לראות אנשים אחרים מקלידים (אם הם לא הפעילו את אפשרות זו).",permission:"disableLiveTyping",sub:{name:"כולל בצ'אט הפרטי",description:"",permission:"disableLiveTypingPm"}},authorId:967488,version:"2024-08-08",match:"show",loaded:!0,execute:function(){console.log("disable_typing");const t=(0,o.f8)("disable_typing.js");return function(){console.log(" remove disable_typing"),t.remove()}}}},310:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(413);const r={setting:{name:"מדגיש רשימת חברים",description:"Todo",permission:"friends"},authorId:1129410,version:"2024-08-08",match:"show",loaded:!0,execute:function(){!async function(){const t="refreshFriends",e=localStorage.getItem(t);if(e){const t=new Date,n=new Date(e);if(t.getTime()-n.getTime()<9e5)return void console.log("Friends list is still fresh, skipping refresh.")}const n=document.querySelector(".log_in6 a").href,r=new URL(n);r.searchParams.set("tab","friends"),r.searchParams.set("pp",100);const i=(await(0,o.GO)(r)).matchAll(/<h4><a href="member\.php\?u=(\d+)"/g),s=[];for(const t of i){const e=t[1];s.push(e)}console.log("Fetched friend IDs:",s),localStorage.setItem("friendIds",JSON.stringify(s)),localStorage.setItem(t,new Date)}();const t=new Image;t.src="https://w7.pngwing.com/pngs/236/25/png-transparent-computer-icons-avatar-friends-love-text-logo-thumbnail.png",t.classList.add("friend");const e=JSON.parse(localStorage.getItem("friendIds"));return document.querySelectorAll(".username_container .username").forEach((n=>{const o=n.href.split("=").pop();console.log(`Checking user ID: ${o}`),e.includes(o)&&n.appendChild(t.cloneNode())})),function(){document.querySelectorAll(".friend").forEach((t=>t.remove()))}}}},840:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(413);const r={setting:{name:"הסתר את תפריט הנגישות",description:"תפריט הנגישות (הכפתור השחור עם סימן האדם בכיסא הגלגלים) יוסתר.",permission:"hideAccessibilityMenu"},authorId:967488,version:"2024-08-08",match:"*",loaded:!1,execute:function(){const t=(0,o.TD)(".nagish-button { display: none; }");return function(){t.remove()}}}},756:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(413);const r={setting:{name:"הסר את Outbrain",description:"שירות הצעת הכתבות והאשכולות של Outbrain יוסר לחלוטין מהדף.",permission:"hideSuggested"},authorId:967488,version:"2024-08-08",match:"*",loaded:!1,execute:function(){const t=(0,o.TD)(["#related_main",".trc_related_container",".trc_spotlight_widget",".videoyoudiv",".OUTBRAIN"].join(", ")+" { display: none !important }");return function(){t.remove()}}}},275:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(413);const r={setting:{name:"מגבלת לייקים",description:"משתמש בסמל לייק שבור כדי ליידע על הגעה למגבלת הלייקים.",permission:"likes"},authorId:1129410,version:"2024-08-08",match:"show",loaded:!0,execute:function(){const t="likes"+(document.querySelector(".log_in6 a").href.split("u=").at(1)||"0"),e='.button-like-holder > span[onclick="makelike(this.id);"]';let n,r=JSON.parse(localStorage.getItem(t))||[];const i=()=>{r.length>=10&&(n=(0,o.TD)(`${e} { background-image: url("https://em-content.zobj.net/source/google/387/broken-heart_1f494.png"); }`))},s=()=>{const e=Math.min(...r);Date.now()>e&&(r=r.filter((t=>t!==e)),localStorage.setItem(t,JSON.stringify(r)),0===r.length&&clearInterval(a))},a=setInterval(s,3e4);return i(),s(),document.querySelectorAll(e).forEach((e=>{e.addEventListener("click",(function(){r.length>=10||(r.push(Date.now()+6e5),localStorage.setItem(t,JSON.stringify(r)),i())}))})),function(){n?.remove()}}}},927:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(413);const r={setting:{name:"הצג יותר משלושה אשכולות נעוצים",description:"בטל את ההסתרה האוטומטית של האשכול הנעוץ הרביעי והלאה.",permission:"showAutoPinned"},authorId:967488,version:"2024-08-08",match:"forumdisplay",loaded:!0,execute:function(){const t=(0,o.TD)("#stickies li.threadbit:nth-child(n+4) { display: block; }");return document.querySelector(".morestick").remove(),function(){t.remove()}}}},502:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={setting:{name:"הצג סטטיסטיקות פורומים",description:"בתחתית כל פורום יוצגו סטטיסטיקות. למשל: פותח האשכולות הדומיננטי ביותר, התיוג הנפוץ ביותר, ויחס התגובות לצפיות.",permission:"showForumStats"},authorId:967488,version:"2024-08-08",match:"forumdisplay",loaded:!0,execute:function(){return function(){}}}},441:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={setting:{name:"הפעל ספוילרים",description:'טקסט לבן יהפוך ל<span class="whiteSpoiler">ספוילר</span>.',permission:"showSpoilers"},authorId:967488,version:"2024-08-08",match:"show",loaded:!0,execute:function(){const t=document.querySelectorAll("[color='#ffffff']");return t.forEach((t=>{const e=t.closest("table");e&&""!==e.style.backgroundColor&&t.classList.add("whiteSpoiler")})),function(){t.forEach((t=>{t.closest("table")&&t.classList.remove("whiteSpoiler")}))}}}},985:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});const o="https://www.fxp.co.il/showthread.php?t=16859147",r={setting:{name:"",description:"",permission:""},authorId:967488,version:"2024-08-08",match:"signature",loaded:!0,execute:function(){var t=document.createElement("DIV");t.setAttribute("id","creditAddon");var e=document.createElement("DIV");t.appendChild(e);var n=document.createElement("DIV");n.setAttribute("class","addCreditBtn"),n.setAttribute("id","addLimg"),n.addEventListener("click",(function(t){const e=document.querySelector(".cke_contents iframe").contentDocument.body,n=document.createElement("a");n.href=o,n.target="_blank";const r=document.createElement("img");r.src=t.srcElement.src,r.border=0,n.appendChild(r),e.appendChild(n)})),t.appendChild(n);var r=document.createElement("IMG");r.setAttribute("src","https://images.weserv.nl/?url=i.imgur.com/bsVtJ5o.png"),n.appendChild(r);var i=document.createElement("SPAN");i.setAttribute("class","addCreditDesc"),n.appendChild(i);var s=document.createTextNode(new String("128x128"));i.appendChild(s);var a=document.createElement("DIV");a.setAttribute("class","addCreditBtn"),a.setAttribute("id","addMimg"),a.addEventListener("click",(function(t){const e=document.querySelector(".cke_contents iframe").contentDocument.body,n=document.createElement("a");n.href=o,n.target="_blank";const r=document.createElement("img");r.src=t.srcElement.src,r.border=0,n.appendChild(r),e.appendChild(n)})),t.appendChild(a);var c=document.createElement("IMG");c.setAttribute("src","https://images.weserv.nl/?url=i.imgur.com/O7FsbY8.png"),a.appendChild(c);var d=document.createElement("SPAN");d.setAttribute("class","addCreditDesc"),a.appendChild(d);var l=document.createTextNode(new String("48x48"));d.appendChild(l);var u=document.createElement("DIV");u.setAttribute("class","addCreditBtn"),u.setAttribute("id","addTextCredit"),u.addEventListener("click",(function(){const t=document.querySelector(".cke_contents iframe").contentDocument.body,e=document.createElement("a");e.href=o,e.target="_blank",e.textContent="+FxPlus",t.appendChild(e)})),t.appendChild(u);var p=document.createElement("SPAN");return p.setAttribute("class","addCreditDesc"),u.appendChild(p),document.querySelector('form[action*="signature"] .editor_smiliebox').appendChild(t),function(){element.remove()}}}},606:(t,e,n)=>{var o={"./AntiDeletePms.js":810,"./autoReader.js":403,"./backgroundNotifications.js":291,"./connectedStaff.js":396,"./disableTyping.js":408,"./friends.js":310,"./hideAccessibilityMenu.js":840,"./hideSuggested.js":756,"./likes.js":275,"./showAutoPinned.js":927,"./showForumStats.js":502,"./showSpoilers.js":441,"./signature.js":985};function r(t){var e=i(t);return n(e)}function i(t){if(!n.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}r.keys=function(){return Object.keys(o)},r.resolve=i,t.exports=r,r.id=606},413:(t,e,n)=>{"use strict";function o(t){return fetch(t).then((t=>t.text()))}function r(t,e=null,n=document.documentElement){const o=document.createElement("style");return o.textContent=t,e&&(o.id=e),n.appendChild(o),o}function i(t){const e=document.createElement("script");return e.type="text/javascript",e.src=chrome.runtime.getURL(t),document.head.appendChild(e),e}n.d(e,{GO:()=>o,TD:()=>r,f8:()=>i})}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o](i,i.exports,n),i.exports}n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(async()=>{const t=n(606),e=await chrome.storage.local.get(null),o=[];t.keys().map((n=>{const r=t(n).default;var i,s,a;return(i=r.loaded,s=r.execute,a=r.match,new Promise(((t,e)=>{const n=location.href.split("/").pop();(a=a.replace("*",""))&&!n.includes(a)&&e(new Error("URL path does not match runOnly condition")),i&&"complete"!==document.readyState&&"interactive"!==document.readyState||t(s);const o=()=>{document.removeEventListener("DOMContentLoaded",o),t(s)};document.addEventListener("DOMContentLoaded",o)}))).then((function(t){let n=null;e[r.setting.permission]&&(n=t()),o.push({triggerFunction:n,permission:r.setting.permission,temp:t})})).catch((function(){})),r})),chrome.storage.onChanged.addListener((t=>{const e=o.findIndex((e=>t.hasOwnProperty(e.permission)));if(-1===e)return;const n=o[e];if(null===n.triggerFunction){console.log("Module initialization detected for permission:",n.permission);const t=n.temp();return void(o[e].triggerFunction=t)}const r=t[n.permission];if("execute"===n.triggerFunction.name&&!0===r.newValue){console.log("Calling onStart due to permission granted");const t=n.temp();o[e].triggerFunction=t}else!1===r.newValue&&(console.log("Calling onDestroy due to permission revoked"),(window||document).dispatchEvent(new Event("disableScript")),n.triggerFunction(),o[e].triggerFunction=n.temp)}))})()})();