(()=>{var t={6810:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"הודעות פרטיות",description:"מציג הודעות פרטיות שנמחקו",permission:"AntiDeletePms"},authorId:1129410,match:"private_chat.php?do=showpm",loaded:!1,execute:function(){const t=(0,o.TD)("\n\t\t<style type='text/css'>\n\t\t\t.talk-bubble-alt {\n\t\t\t\tmargin-top: 10px;\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tposition: relative;\n\t\t\t\tmin-width: 115px;\n\t\t\t\twidth: auto;\n\t\t\t\theight: auto;\n\t\t\t\tbackground-color: #EE4B2B;\n\t\t\t\tmax-width: 90%;\n\t\t\t\tword-wrap: break-word;\n\t\t\t\tclear: both;\n\t\t\t\tbox-shadow: -1px 1px .5px rgba(0,0,0,.33);\n\t\t\t\t-moz-box-shadow: -1px 1px .5px rgba(0,0,0,.33);\n\t\t\t\t-webkit-box-shadow: -1px 1px .5px rgba(0,0,0,.33)\n\t\t\t}\n\n\t\t\t.right-top-alt {\n\t\t\t\tmargin-right: 17px;\n\t\t\t\tfloat: right;\n\t\t\t\tbackground-color: #EE4B2B\n\t\t\t}\n\n\t\t\t.right-top-alt .talktext .date {\n\t\t\t\tleft: 28px\n\t\t\t}\n\n\t\t\t.right-top-alt .talktext .read,.right-top-alt .talktext .unread,.right-top-alt .talktext .loading {\n\t\t\t\tbackground-size: 16px;\n\t\t\t\twidth: 16px;\n\t\t\t\theight: 16px;\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 12px;\n\t\t\t\tbottom: 3px;\n\t\t\t\tbackground-repeat: no-repeat\n\t\t\t}\n\n\t\t\t.left-top-alt {\n\t\t\t\tmargin-left: 17px;\n\t\t\t\tfloat: left\n\t\t\t}\n\n\t\t\t.tri-right-alt.left-top:after {\n\t\t\t\tcontent: ' ';\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 0;\n\t\t\t\theight: 0;\n\t\t\t\tleft: -10px;\n\t\t\t\tright: auto;\n\t\t\t\ttop: 0;\n\t\t\t\tbottom: auto;\n\t\t\t\tborder: 10px solid;\n\t\t\t\tborder-color: #fff transparent transparent transparent\n\t\t\t}\n\n\t\t\t.tri-right-alt.right-top:after {\n\t\t\t\tcontent: ' ';\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 0;\n\t\t\t\theight: 0;\n\t\t\t\tleft: auto;\n\t\t\t\tright: -10px;\n\t\t\t\ttop: 0;\n\t\t\t\tbottom: auto;\n\t\t\t\tborder: 10px solid;\n\t\t\t\tborder-color: #def5cd transparent transparent transparent\n\t\t\t}\n\n\t\t\t.talk-bubble.deleted:after {\n\t\t\t\tcontent: \" \";\n\t\t\t\tborder-color: #EE4B2B transparent transparent transparent;\n\t\t\t}\n\n\t\t\t.talk-bubble.deleted {\n\t\t\t\tbackground-color: #EE4B2B;\n\t\t\t}\n\t\t</style>"),e=t=>$("[data-text-id="+t+"]"),n=t=>{const e=t.hasClass("left-top")?"left-top-alt":"right-top-alt";t.removeClass("tri-right").removeClass("right-top").removeClass("left-top").removeClass("talk-bubble"),t.addClass("talk-bubble-alt").addClass("tri-right-alt"),t.addClass(e)},r=()=>{$(".talk-bubble:has(.deleted-message)").each(((t,o)=>{const r=o.getAttribute("data-text-id");(t=>{const e=(t=>t.attr("id").substring(3))(t);(t=>new Promise(((e,n)=>{$.get("https://www.fxp.co.il/private.php?do=showpm&pmid="+t).then((t=>{const n=/<blockquote class="postcontent restore"\s+>(.*?)<\/blockquote>/gs.exec(t);e(n[1])}),(t=>{n(t)}))})))(e).then((o=>{const r=$("#pm_"+e),a=t.find(".talktext"),s=getCorrectMessageInLive({message:o});a.find(".deleted-message").remove(),a.append("<p>"+s.trim()+"</p>"),n(r)}))})(e(r))}))};return r(),(()=>{const t=t=>{const o=e(t);n(o)},o=socket.listeners("lisendeletemessage");for(let e=0;e<o.length;++e)o[e]=t;window.updateMessageDeletedFromShowPmIframe=t,window.getMorePrivateMessage=()=>{$.ajax({type:"GET",url:"private_chat.php?do=showpm&pmid="+pmid_chat+"&startwith="+counter_get_more_pm+"&only_li=1&web=1",dataType:"json",success:function(t){var e=$($(".talk-bubble")[0]).attr("id");$(".chat-data").prepend(t.lis),r(),$(".talk-bubble").removeClass("waitforload"),$(".chat-data").prepend($("#load-more-message")),playerfxp(),setTimeout((function(){}),100),counter_get_more_pm+=50,"no"==t.havemore&&$("#load-more-message").remove(),$(".chat-data").prepend($(".holder-title")),$("html, body").scrollTop($("#"+e).offset().top-$(".menu").outerHeight()-10)}})}})(),function(){t.remove()}}}},9403:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={setting:{name:"הקראה של האשכול",description:"מאפשר לשמוע את התוכן של האשכול",permission:"autoReader"},authorId:1129410,match:"thread",loaded:!0,execute:function(){const t="undefined"!=typeof ISMOBILEFXP;function e(){speechSynthesis.cancel()}window.onunload=e;const n=document.createElement("a");return n.innerText="הקרא אשכול",n.onclick=function o(){const r=[...document.querySelectorAll(".postbit")].map((e=>{const n=t?".xsaid":".username";return"המשתמש "+e.querySelector(n).textContent+" כתב\n"+e.querySelector(t?".content":".postcontent").textContent})).join("\n");console.log(r);const a=new SpeechSynthesisUtterance(r);a.lang="he",a.onstart=function(){n.innerText="עצור הקראה",n.onclick=e},a.onend=function(){n.innerText="הקרא אשכול",n.onclick=o},a.onerror=function(){n.innerText="הקרא אשכול",n.onclick=o},speechSynthesis.speak(a)},n.className="newcontent_textcontrol",n.style.width="136px","speechSynthesis"in window&&document.querySelectorAll(".postbit").length>0&&(t?document.querySelector(".page_title_fxp").after(n):document.querySelector(window.LOGGEDIN?"#open-thread-controls":"#above_postlist").after(n)),function(){n.remove(),e()}}}},7291:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"שלח התראות גם כאשר האתר סגור",description:'התראות לגבי לייקים, ציטוטים ודואר נכנס יופיעו גם כאשר אינך גולש באתר. <a id="sendTestNotification">לחץ כאן לשליחת הודעת בדיקה.</a>',permission:"backgroundNotifications",execute:function(){document.getElementById("sendTestNotification").addEventListener("click",(function(){(0,o._Y)("הודעת בדיקה!","הידעת? הגולש הממוצע באינטרנט ממצמץ רק 7 פעמים בדקה! ממוצע המצמוץ הנורמלי הוא 20 - כמעט פי 3.","")}))}},authorId:967488,match:"*",loaded:!0,execute:function(){let t;function e(){let t,e=0;document.querySelectorAll(".noticount").forEach((n=>{t=parseInt(n.innerText),e+=isNaN(t)?0:t})),e||="",chrome.runtime.sendMessage({changeBadge:e})}function n(){"0"!==this.querySelector(".counter").innerText&&setTimeout(e,2500)}e();const o=document.getElementById("list_holder");return o&&o.addEventListener("load",(function(){const e=o.contentWindow.document;t=e.querySelectorAll("li.pm"),t.forEach((t=>{t.addEventListener("click",n)}))})),function(){o&&(console.log(t),t.forEach((t=>{t.removeEventListener("click",n)})))}}}},9686:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={authorId:1129410,match:"*",loaded:!0,execute:function(){return document.querySelectorAll(".signature_holder,blockquote.restore .signaturecontainer").forEach((t=>{t.addEventListener("contextmenu",(async t=>{t.preventDefault();let e=t.srcElement;"blockquote"!=e.tagName&&(e=e.closest(".signature_holder,blockquote.restore .signaturecontainer"));const n=function(t){const e=/<table\s+(?:class="([^"]+)"?\s*)?(?:width="(\d+)"?\s*)?(?:align="([^"]+)"?\s*)?>(.*?)<\/table>/gis,n=/<table\s+(?:width="(\d+)"?\s*)?(?:align="([^"]+)"?\s*)?(?:class="([^"]+)"?\s*)?>(.*?)<\/table>/gis;for(let o=0;o<10;o++)t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=t.replace(/<tr.*?>(.*?)<\/tr>/gis,"[tr]$1[/tr]")).replace(/<td.*?>(.*?)<\/td>/gis,"[td]$1[/td]")).replace(/<b>/g,"[b]").replace(/<\/b>/g,"[/b]")).replace(/<div class="mainimg" style="display: inline-block;">(.*?)<\/div>/gis,"$1")).replace(/<i>(.*?)<\/i>/gis,"[i]$1[/i]")).replace(/<u.*?>(.*?)<\/u>/gis,"[u]$1[/u]")).replace(/<img src="(.*?)".*?>/gis,"[IMG]$1[/IMG]")).replace(/<div style="text-align: (.*?);">(.*?)<\/div>/gis,"[$1]$2[/$1]")).replace(/<span style="font-family: (.*?)".*?>(.*?)<\/span>/gis,"[font=$1]$2[/font]")).replace(/<tbody.*?>(.*?)<\/tbody>/gis,"$1")).replace(/<a href="(.*?)".*?>(.*?)<\/a>/gis,'[URL="$1"]$2[/URL]')).replace(/<font size="(.*?)">(.*?)<\/font>/gis,"[size=$1]$2[/size]")).replace(/<font color="(.*?)">(.*?)<\/font>/gis,"[color=$1]$2[/color]")).replace(/<br>/gis,"")).replace(/&gt;/gis,">")).replace(/<div class="cms_table">(.*?)<\/div>/gis,"$1")).replace(n,((t,e,n,o,r)=>{const a=[];return o&&a.push(`class: ${o.replace("cms_table_","")}`),e&&a.push(`width: ${e}`),n&&a.push(`align: ${n}`),console.log(a),`[TABLE="${a.join(", ")}"]${r}[/TABLE]`}))).replace(e,((t,e,n,o,r)=>{const a=[];return e&&a.push(`class: ${e.replace("cms_table_","")}`),n&&a.push(`width: ${n}`),o&&a.push(`align: ${o}`),console.log(a),`[TABLE="${a.join(", ")}"]${r}[/TABLE]`}));return t}(e.innerHTML);try{await navigator.clipboard.writeText(n.trim()),console.log("Text copied to clipboard successfully!"),alert("הועתק בהצלחה")}catch(t){console.error("Failed to copy text to clipboard:",t)}console.log(n)}))})),function(){}}}},8175:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"הסתרת קטגוריות",description:"Todo",permission:"catgory"},authorId:1129410,match:"index",loaded:!1,execute:function(){const t=JSON.parse(localStorage.getItem("categories")||"[]").map((t=>`.hp_category:has(a[href*="${t}"]), #cat${t}`)),e=(0,o.TD)(t.join(",")+" { display: none } .hi4 {height: 337px}");return function(){e.remove()}}}},6056:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={setting:{permission:"catgory"},authorId:1128410,match:"forumdisplay",loaded:!0,execute:function(){if(!document.contains(document.getElementById("forumbits")))return;const t="categories";let e=JSON.parse(localStorage.getItem(t)||"[]");const n=new URLSearchParams(location.search).get("f"),o=()=>e.includes(n)?"הצג":"אל תציג",r=document.createElement("A");r.setAttribute("class","niceButton darkBlueBtn"),r.setAttribute("style","font-size: 1em; color: #fff; margin-top: 0"),r.addEventListener("click",(function(){e.includes(n)?e=e.filter((t=>t!=n)):e.push(n),r.innerText=o(),localStorage.setItem(t,JSON.stringify(e))}));const a=document.createTextNode(new String(o()));return r.appendChild(a),document.getElementById("left_block_1").append(r),function(){r.remove()}}}},6396:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"מסמן צוות מחובר",description:"בתוך הפורום, חברי צוות המחוברים יזוהו על ידי אייקון ירוק קטן המוצג לצד שמם.",permission:"connectedStaff"},authorId:1129410,match:"forumdisplay",loaded:!0,execute:function(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("width","10px"),t.setAttribute("height","10px"),t.setAttribute("viewBox","0 0 24 24");const e=document.createElementNS("http://www.w3.org/2000/svg","path");e.setAttribute("fill","#00FF00"),e.setAttribute("d","m2 12a10 10 0 1 1 10 10 10 10 0 0 1 -10-10z"),t.appendChild(e);const n=document.querySelectorAll(".flo .username");return n.forEach((async e=>{const n=e.innerText,r=e.href;(await(0,o.GO)(r)).includes(n+" מחובר/ת")&&e.insertAdjacentHTML("beforeend",t.outerHTML)})),function(){n.forEach((({lastChild:t})=>{"svg"===t.tagName&&t.remove()}))}}}},576:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={setting:{name:"תגובה מחוקה באשכול",description:"מוסיף סימון מיוחד להודעה שנמחקה, ומאפשר לראות איפה הייתה ההודעה שנמחקה.",permission:"posts"},authorId:1129410,match:"thread",loaded:!0,execute:function(){const t=new URLSearchParams(location.search),e=t.get("p"),n=document.contains(document.getElementById("post_"+e));if(!e||n)return void console.log(e,n);const o=Array.from(document.querySelectorAll(".postbit")),r=o.map((t=>parseInt(t.id.replace("post_","")))).filter((t=>t<e)).length-1,a=document.createElement("li");a.textContent="התגובה שאתה מנסה לראות נמחקה.",a.id="post_"+e,a.className="postbit postbitim postcontainer",a.style="background-color: #ffdddd; border: 1px solid #ff0000; padding: 10px 0; border-radius: 5px; color: #333; font-weight: bold; text-align: center;";const s=o.at(r);return s.parentNode.insertBefore(a,s.nextSibling),t.has("t")||setTimeout((function(){s.scrollIntoView()}),500),function(){s.remove()}}}},408:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"אל תודיע שאני מקליד",description:"מבטל את ההודעה שאתה מקליד באשכולות והודעות פרטיות לבחירתך. עדיין תוכל לראות אנשים אחרים מקלידים (אם הם לא הפעילו את אפשרות זו).",permission:"disableLiveTyping",sub:{name:"כולל בצ'אט הפרטי",description:"",permission:"disableLiveTypingPm",type:"checkbox"}},authorId:967488,match:"thread",loaded:!0,execute:function(){const t=(0,o.f8)("disable_typing.js");return function(){t.remove()}}}},9310:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"מדגיש רשימת חברים",description:"מוסיף סימון מיוחד להודעות שנשלחו על ידי חברים",permission:"friends"},authorId:1129410,match:"thread",loaded:!0,execute:function(){!async function(){const t="refreshFriends",e=localStorage.getItem(t);if(e){const t=new Date,n=new Date(e);if(t.getTime()-n.getTime()<9e5)return void console.log("Friends list is still fresh, skipping refresh.")}const n=document.querySelector(".log_in6 a").href,r=new URL(n);r.searchParams.set("tab","friends"),r.searchParams.set("pp",100);const a=(await(0,o.GO)(r)).matchAll(/<h4><a href="member\.php\?u=(\d+)"/g),s=[];for(const t of a){const e=t[1];s.push(e)}console.log("Fetched friend IDs:",s),localStorage.setItem("friendIds",JSON.stringify(s)),localStorage.setItem(t,new Date)}();const t=new Image;t.src="https://w7.pngwing.com/pngs/236/25/png-transparent-computer-icons-avatar-friends-love-text-logo-thumbnail.png",t.classList.add("friend");const e=JSON.parse(localStorage.getItem("friendIds"));return document.querySelectorAll(".username_container .username").forEach((n=>{const o=n.href.split("=").pop();console.log(`Checking user ID: ${o}`),e.includes(o)&&n.appendChild(t.cloneNode())})),function(){document.querySelectorAll(".friend").forEach((t=>t.remove()))}}}},4840:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"הסתר את תפריט הנגישות",description:"תפריט הנגישות (הכפתור השחור עם סימן האדם בכיסא הגלגלים) יוסתר.",permission:"hideAccessibilityMenu"},authorId:967488,match:"*",loaded:!1,execute:function(){const t=(0,o.TD)(".nagish-button { display: none; }");return function(){t.remove()}}}},2404:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={setting:{name:"הסתר אשכולות נעוצים",description:"אשכולות נעוצים ישנים יותר מהערך שנבחר יוסתרו. יהיה אפשר לראות אותם בריחוף מעליהם. לפחות 5 ימים.",permission:"hideSticky",execute:function(){},sub:{name:"בני יותר מ",description:"",permission:"hidePinnedDays",type:"number"}},authorId:967488,match:"forumdisplay",loaded:!0,execute:function(){return document.querySelectorAll(".threadbit .sticky").forEach((function(t){const e=getDaysSinceComment(t),n=t.querySelector(".title").innerText;e>settings.hideSticky.days&&(!n.includes("חוק")||settings.hideSticky.includingRules)&&t.classList.add("hiddenSticky")})),function(){}}}},4756:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"הסר את Outbrain",description:"שירות הצעת הכתבות והאשכולות של Outbrain יוסר לחלוטין מהדף.",permission:"hideSuggested"},authorId:967488,match:"*",loaded:!1,execute:function(){const t=(0,o.TD)(["#related_main",".trc_related_container",".trc_spotlight_widget",".videoyoudiv",".OUTBRAIN"].join(", ")+" { display: none !important }");return function(){t.remove()}}}},275:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"מגבלת לייקים",description:"משתמש בסמל לייק שבור כדי ליידע על הגעה למגבלת הלייקים.",permission:"likes"},authorId:1129410,match:"thread",loaded:!0,execute:function(){const t="likes"+(document.querySelector(".log_in6 a").href.split("u=").at(1)||"0"),e='.button-like-holder > span[onclick="makelike(this.id);"]';let n,r=JSON.parse(localStorage.getItem(t))||[];const a=()=>{r.length>=10&&(n=(0,o.TD)(`${e} { background-image: url("https://em-content.zobj.net/source/google/387/broken-heart_1f494.png"); }`))},s=()=>{const e=Math.min(...r);Date.now()>e&&(r=r.filter((t=>t!==e)),localStorage.setItem(t,JSON.stringify(r)),0===r.length&&clearInterval(i))},i=setInterval(s,3e4);return a(),s(),document.querySelectorAll(e).forEach((e=>{e.addEventListener("click",(function(){r.length>=10||(r.push(Date.now()+6e5),localStorage.setItem(t,JSON.stringify(r)),a())}))})),function(){n?.remove()}}}},4013:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"כתבות",description:"מסתיר כתבות ישנות מדף הבית.",permission:"mainpage"},authorId:1129410,match:"index",loaded:!1,execute:function(){const t=(0,o.TD)("#slide { height: auto; } .mainsik { display: none; }");return function(){t.remove()}}}},3500:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={setting:{name:"הקטן חתימות גדולות אוטומטית",description:"חתימות שחורגות מהגובה החוקי המקסימלי, 295px, יוקטנו באופן אוטומטי.",permission:"resizeSignatures"},authorId:967488,match:"thread",loaded:!0,execute:function(){const t=new MutationObserver((function(t){t.forEach((function(t){"src"===t.attributeName&&e(t.target.closest(".signaturecontainer"))}))}));function e(t){if("none"===t.style.display)return;const e=t.closest(".signature");t.style.height="auto",t.style.transform="scale(1,1)",t.title="",e.style.overflow="visible",e.style.height="auto";const n=t.offsetHeight;if(n>295){const o=295/n;t.style.transformOrigin="top",t.style.transform=`scale(${o}, ${o})`,e.style.overflow="hidden",e.style.height="295px",t.title="חתימה זו הוקטנה באופן אוטומטי."}}return document.querySelectorAll(".signaturecontainer").forEach(e),document.querySelectorAll(".signaturecontainer video").forEach((t=>{t.addEventListener("loadeddata",(function(){e(t.closest(".signaturecontainer"))}))})),document.querySelectorAll(".signaturecontainer img").forEach((n=>{n.addEventListener("load",(function(){e(n.closest(".signaturecontainer"))})),t.observe(this,{attributes:!0})})),function(){scriptElement.remove()}}}},7927:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"הצג יותר משלושה אשכולות נעוצים",description:"בטל את ההסתרה האוטומטית של האשכול הנעוץ הרביעי והלאה.",permission:"showAutoPinned"},authorId:967488,match:"forumdisplay",loaded:!0,execute:function(){const t=(0,o.TD)("#stickies li.threadbit:nth-child(n+4) { display: block; }");return document.querySelector(".morestick").remove(),function(){t.remove()}}}},9502:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"הצג סטטיסטיקות פורומים",description:"בתחתית כל פורום יוצגו סטטיסטיקות. למשל: פותח האשכולות הדומיננטי ביותר, התיוג הנפוץ ביותר, ויחס התגובות לצפיות.",permission:"showForumStats"},authorId:967488,match:"forumdisplay",loaded:!0,execute:function(){const t=document.querySelectorAll("#threads .threadtitle").length,e=document.querySelector(".threads_list_fxp"),n=document.createElement("div");n.id="forumStatsContainer";const r=document.createElement("div");r.id="forumStats";const a=document.createElement("i");a.textContent=`נתונים סטטיסטיים של ${t} אשכולות:`,r.appendChild(a),n.appendChild(r),e.parentNode.insertBefore(n,e.nextSibling),console.log(e);const s=t=>Array.from(document.querySelectorAll(t)).map((t=>t.innerText)),i=(0,o.Y4)(s("#threads .threadinfo .username")),c=(0,o.Y4)(s("#threads .threadlastpost .username")),d=s("#threads .title").map((t=>t.match(/([^\s.,\/#?!$%\^&\*+;:{}|=\-_`~()]+)/g).filter((t=>t.length>1)))),l=(0,o.Y4)(d),u=(0,o.Y4)(s("#threads .prefix").map((t=>t.replace(/\||סקר: /,""))));if(m=$("<div>"),i.length>1&&i[0].count>1){m.append($("<span>").text("המפרסם הדומיננטי ביותר הוא "));for(var p=0;p<i.length&&i[p].count===i[0].count;p++)p>0&&m.append($("<span>").text(" או ")),m.append($("<b>").text(i[p].value));m.append($("<span>").text(" עם "+i[0].count+" אשכולות."))}else m.append($("<span>").text("אין מפרסם דומיננטי במיוחד."));if($("#forumStats").append(m),m=$("<div>"),c.length>1&&c[0].count>1){for(m.append($("<span>").text("המגיב האחרון הדומיננטי ביותר הוא ")),p=0;p<c.length&&c[p].count===c[0].count;p++)p>0&&m.append($("<span>").text(" או ")),m.append($("<b>").text(c[p].value));m.append($("<span>").text(" עם "+c[0].count+" תגובות אחרונות."))}else m.append($("<span>").text("אין מגיב אחרון דומיננטי במיוחד."));$("#forumStats").append(m);var m=$("<div>");if(l.length>1&&l[0].count>1){for(m.append($("<span>").text("המילה הנפוצה ביותר בכותרות היא ")),p=0;p<l.length&&l[p].count===l[0].count;p++)p>0&&m.append($("<span>").text(" או ")),m.append($("<b>").text(l[p].value));m.append($("<span>").text(" עם "+l[0].count+" אזכורים."))}else m.append($("<span>").text("אין מילה נפוצה במיוחד בכותרות."));if($("#forumStats").append(m),m=$("<div>"),u.length>1&&u[0].count>1){for(m.append($("<span>").text("התיוג הנפוץ ביותר הוא ")),p=0;p<u.length&&u[p].count===u[0].count;p++)p>0&&m.append($("<span>").text(" או ")),m.append($("<b>").text(u[p].value));m.append($("<span>").text(" שנמצא ב-"+u[0].count+" אשכולות."))}else m.append($("<span>").text("אין תיוג נפוץ במיוחד."));$("#forumStats").append(m);var h,f,g=0,b=0;$("#threads .threadstats").each((function(){h=parseInt($(this).find("li:eq(0)").text().replace(",","").replace(/^\D+/g,"")),f=parseInt($(this).find("li:eq(1)").text().replace(",","").replace(/^\D+/g,"")),isNaN(h)||(g+=h),isNaN(f)||(b+=f)}));var x=Math.round(b/g);x<1&&(x=1),isNaN(x)&&(x="∞"),(m=$("<div>")).append($("<span>").text("יחס הצפיות לתגובה הוא תגובה כל ")),m.append($("<b>").text(x+" צפיות")),m.append($("<span>").text(".")),$("#forumStats").append(m);var v=[];for(p=0;p<l.length&&l[p].count>1;p++)v.push(l[p]);return l=v,$("#forumStats").append($("<div>",{class:"smallPlusButton",id:"detailedStatsBtn"}).text("+").click((function(){var t=$("<div>");t.append($("<div>").text("להלן פירוט הסטטיסטיקות לפורום זה:"));var e=$("<div>",{style:"display: flex; flex-wrap: wrap;"});e.append($("<table>",{class:"statTable",id:"publishersStatTable"}).append($("<tr>").append($("<th>").text("מפרסם")).append($("<th>").text("אשכולות")))),e.append($("<table>",{class:"statTable",id:"commentorsStatTable"}).append($("<tr>").append($("<th>").text("מגיב")).append($("<th>").text("תגובות אחרונות")))),e.append($("<table>",{class:"statTable",id:"wordsStatTable"}).append($("<tr>").append($("<th>").text("מילה")).append($("<th>").text("אזכורים")))),e.append($("<table>",{class:"statTable",id:"prefixesStatTable"}).append($("<tr>").append($("<th>").text("תיוג")).append($("<th>").text("אשכולות"))));for(var n=0;n<i.length;n++)e.find("#publishersStatTable").append($("<tr>").append($("<td>").text(i[n].value)).append($("<td>").text(i[n].count)));for(n=0;n<c.length;n++)e.find("#commentorsStatTable").append($("<tr>").append($("<td>").text(c[n].value)).append($("<td>").text(c[n].count)));for(n=0;n<l.length;n++)e.find("#wordsStatTable").append($("<tr>").append($("<td>").text(l[n].value)).append($("<td>").text(l[n].count)));for(n=0;n<u.length;n++)e.find("#prefixesStatTable").append($("<tr>").append($("<td>").text(u[n].value)).append($("<td>").text(u[n].count)));t.append(e),t.append($("<div>",{class:"closeBtn"}).text("סגור").click((function(){removePopupWindow("detailedStats")})));var o=chrome.runtime.getURL("images/graph.svg");openPopupWindow("detailedStats",o,"סטטיסטיקות מפורטות לפורום "+getForumName(),t)}))),function(){document.querySelector("#forumStatsContainer").remove()}}}},5441:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={setting:{name:"הפעל ספוילרים",description:'טקסט לבן יהפוך ל<span class="whiteSpoiler">ספוילר</span>.',permission:"showSpoilers"},authorId:967488,match:"thread",loaded:!0,execute:function(){const t=document.querySelectorAll("[color='#ffffff']");return t.forEach((t=>{const e=t.closest("table");e&&""!==e.style.backgroundColor&&t.classList.add("whiteSpoiler")})),function(){t.forEach((t=>{t.closest("table")&&t.classList.remove("whiteSpoiler")}))}}}},3985:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={authorId:967488,match:"signature",loaded:!0,execute:function(){console.log("sign");const t="https://www.fxp.co.il/showthread.php?t=16859147";var e=document.createElement("DIV");e.setAttribute("id","creditAddon");var n=document.createElement("DIV");e.appendChild(n);var o=document.createTextNode(new String("שתף את הכיף!™ והוסף קרדיט לתוסף +FxPlus בחתימה שלך:"));n.appendChild(o);var r=document.createElement("DIV");r.setAttribute("class","addCreditBtn"),r.setAttribute("id","addLimg"),r.addEventListener("click",(function(e){const n=e.target.parentElement.querySelector("img"),o=document.querySelector(".cke_contents iframe").contentDocument.body,r=document.createElement("a");r.href=t,r.target="_blank";const a=document.createElement("img");a.src=n.src,r.appendChild(a),o.appendChild(r)})),e.appendChild(r);var a=document.createElement("IMG");a.setAttribute("src","https://i.imagesup.co/images2/b059514f80af8c5ec69afc73356a4dfa3b771343.png"),r.appendChild(a);var s=document.createElement("SPAN");s.setAttribute("class","addCreditDesc"),r.appendChild(s);var i=document.createTextNode(new String("128x128"));s.appendChild(i);var c=document.createElement("DIV");c.setAttribute("class","addCreditBtn"),c.setAttribute("id","addMimg"),c.addEventListener("click",(function(e){const n=e.target.parentElement.querySelector("img"),o=document.querySelector(".cke_contents iframe").contentDocument.body,r=document.createElement("a");r.href=t,r.target="_blank";const a=document.createElement("img");a.src=n.src,r.appendChild(a),o.appendChild(r)})),e.appendChild(c);var d=document.createElement("IMG");d.setAttribute("src","https://i.imagesup.co/images2/7797f421f0e4895878e51d09266a35355b214d5a.png"),c.appendChild(d);var l=document.createElement("SPAN");l.setAttribute("class","addCreditDesc"),c.appendChild(l);var u=document.createTextNode(new String("48x48"));l.appendChild(u);var p=document.createElement("DIV");p.setAttribute("class","addCreditBtn"),p.setAttribute("id","addTextCredit"),p.addEventListener("click",(function(){const e=document.querySelector(".cke_contents iframe").contentDocument.body,n=document.createElement("a");n.href=t,n.target="_blank",n.textContent="+FxPlus",e.appendChild(n)})),e.appendChild(p);var m=document.createElement("SPAN");m.setAttribute("class","addCreditDesc"),p.appendChild(m);var h=document.createTextNode(new String("טקסט"));m.appendChild(h);const f=document.querySelector('form[action*="signature"] .editor_smiliebox');f.parentNode.insertBefore(e,f)}}},3415:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={setting:{name:"סמייילם אישיים",description:"TODO",permission:"smiley"},authorId:1129410,match:"forumdisplay",loaded:!0,execute:function(){return new Promise((t=>{const e=setInterval((()=>{void 0!==window.vB_Editor&&(clearInterval(e),t(window.vB_Editor))}),100)})).then((t=>{const e=Object.values(vB_Editor).at(0),n="\nhttps://yoursmiles.org/tsmile/heart/t4524.gif\n".trim().split("\n");for(const t of n)t&&(e.config.smiley_descriptions.push(`[img]${t}[/img]`),e.config.smiley_images.push(`https://wsrv.nl/?url=${t}&w=30`))})),function(){}}}},5060:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o={authorId:967488,match:"*",loaded:!0,execute:function(){const t=chrome.runtime.getURL("html/settings.html");var e=document.createElement("DIV");e.setAttribute("class","fxpSpopupSeperator");var n=document.createElement("DIV");n.setAttribute("style","text-align: center;");var o=document.createElement("A");o.setAttribute("class","niceButton darkBlueBtn"),o.setAttribute("style","font-size: 1em; color: #fff; margin-top: 0"),o.setAttribute("target","_blank"),o.setAttribute("href",t),n.appendChild(o);var r=document.createTextNode(new String("הגדרות +FxPlus"));o.appendChild(r);var a=document.createElement("A");a.setAttribute("target","_blank"),a.setAttribute("href",t+"#multiuser"),n.appendChild(a);var s=document.createTextNode(new String("החלף משתמש"));a.appendChild(s),document.querySelector("#settings_pop .popupbody").append(e,n)}}},5620:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var o=n(7413);const r={setting:{name:"WEEK TODO",description:"TODO",permission:"weekly"},authorId:1129410,match:"thread",loaded:!0,execute:async function(){var t=new DOMParser;const e=await(0,o.GO)(location.href),n=t.parseFromString(e,"text/html").querySelectorAll(".postcontent a[href*=fxp]"),r={user:"",thread:"",user_thread:""};if(n.length>=3)r.user=n[0],n[1].href.includes("member")?(r.user_thread=n[1],r.thread=n[2]):(r.user_thread=n[2],r.thread=n[1]),console.log(r.user,r.thread,r.user_thread);else if(2===n.length){const[t,e]=n;console.log(t,e)}else if(1===n.length){const t=n[0].href,e=t.includes("member");console.log(n[0].innerText,t,e)}else console.log("לא נמצא משתמש");return console.log(n.length),function(){}}}},1606:(t,e,n)=>{var o={"./AntiDeletePms.js":6810,"./autoReader.js":9403,"./backgroundNotifications.js":7291,"./bbcode.js":9686,"./catagory.js":8175,"./catgoryremove.js":6056,"./connectedStaff.js":6396,"./deletedpost.js":576,"./disableTyping.js":408,"./friends.js":9310,"./hideAccessibilityMenu.js":4840,"./hideSticky.js":2404,"./hideSuggested.js":4756,"./likes.js":275,"./mainpage.js":4013,"./resizeSignatures.js":3500,"./showAutoPinned.js":7927,"./showForumStats.js":9502,"./showSpoilers.js":5441,"./signature.js":3985,"./smileys.js":3415,"./toolbar.js":5060,"./weekly.js":5620};function r(t){var e=a(t);return n(e)}function a(t){if(!n.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}r.keys=function(){return Object.keys(o)},r.resolve=a,t.exports=r,r.id=1606},7413:(t,e,n)=>{"use strict";function o(t){return Object.entries(t.reduce(((t,e)=>(t[e]=(t[e]||0)+1,t)),{})).sort(((t,e)=>e[1]-t[1]||t[0].localeCompare(e[0])))}function r(t,e="text"){return fetch(t).then((t=>t[e]()))}function a(t,e=null,n=document.documentElement){const o=document.createElement("style");return o.textContent=t,e&&(o.id=e),n.appendChild(o),o}function s(t){const e=document.createElement("script");return e.type="text/javascript",e.src=chrome.runtime.getURL(t),document.head.appendChild(e),e}function i(t,e,n,o){const r=crypto.randomUUID(),a={type:"basic",iconUrl:"notificationImg.png",title:t,message:e,isClickable:!0};o&&(a.type="list",a.items=o),chrome.notifications.create(r,a),chrome.notifications.onClicked.addListener((function(t){t===r&&n.length>0&&(window.open(n),setTimeout((function(){chrome.notifications.clear(r)}),200))}))}n.d(e,{GO:()=>r,TD:()=>a,Y4:()=>o,_Y:()=>i,f8:()=>s})}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={exports:{}};return t[o](a,a.exports,n),a.exports}n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};const o=n(1606),r={967488:{icon:"https://i.imagesup.co/images/0__059e0b4c4312d6.jpg",name:"SilverTuxedo"},1129410:{icon:"https://i.imagesup.co/images2/0__05f479b039e01c.jpg",name:"earthquake deadly"}};let a;document.addEventListener("input",(async function({target:t}){if(!/checkbox|number/.test(t.type))return;const e="object"==typeof a[t.id],n="checkbox"===t.type?t.checked:t.valueAsNumber,o=e?{...a[t.id],active:n}:n;console.log(o),a[t.id]=o,chrome.storage.local.set({[t.id]:o})})),o.keys().forEach((async t=>{a||(a=await chrome.storage.local.get(null));const e=o(t).default;let n=document.getElementById(e.authorId);if(!n){n=document.createElement("section"),n.id=e.authorId,n.className="row g-6";var s=document.createElement("CENTER");(x=document.createElement("A")).setAttribute("href","https://www.fxp.co.il/member.php?u="+e.authorId),s.appendChild(x);const t=r[e.authorId];(b=document.createElement("IMG")).setAttribute("src",t.icon),b.setAttribute("width","40"),b.setAttribute("title",t.name),b.setAttribute("alt",t.name);var i=document.createElement("HR");x.appendChild(b),s.appendChild(i),n.appendChild(s),document.querySelector(".container-xl .row")?.appendChild(n)}const c=e?.setting;if(!(c&&c.name&&c.description&&c.permission))return void console.log(`Module '${t}' is missing required settings.`);var d=document.createElement("DIV");d.setAttribute("class","col-lg-6"),d.dir="rtl";var l=document.createElement("DIV");l.setAttribute("class","card card-header-actions mb-4"),d.appendChild(l);var u=document.createElement("DIV");u.setAttribute("class","card-header d-flex justify-content-between align-items-center"),l.appendChild(u);var p=document.createTextNode(c.name);u.appendChild(p);var m=document.createElement("DIV");m.setAttribute("class","form-check form-switch"),u.appendChild(m),console.log(a[c.permission],a);const h=a[c.permission]||!1;var f=document.createElement("INPUT");f.setAttribute("class","form-check-input"),f.setAttribute("id",c.permission),f.setAttribute("type","checkbox"),f.checked=h,m.appendChild(f);var g=document.createElement("LABEL");if(g.setAttribute("class","form-check-label"),g.setAttribute("for",c.permission),m.appendChild(g),(s=document.createElement("DIV")).setAttribute("class","card-body"),s.innerHTML=`<label class='small mb-2'>${c.description}</label>`,l.appendChild(s),c.sub){var b,x=document.createElement("FORM");s.appendChild(x),(b=document.createElement("DIV")).setAttribute("class","mb-0"),x.appendChild(b);var v=document.createElement("DIV");v.setAttribute("class","form-check mb-2"),b.appendChild(v);var y=document.createElement("INPUT");y.setAttribute("class","form-check-input"),y.setAttribute("id",c.sub.permission),y.setAttribute("type",c.sub.type),f.addEventListener("click",(function(){y.checked=a[c.sub.permission]||!1,y.disabled=!y.disabled})),y.checked=a[c.sub.permission]||!1,y.disabled=!h,v.appendChild(y);var $=document.createElement("LABEL");$.setAttribute("class","form-check-label"),$.setAttribute("for",c.sub.permission),v.appendChild($);var S=document.createTextNode(c.sub.name);$.appendChild(S)}n?.appendChild(d),c.execute&&c.execute()}))})();