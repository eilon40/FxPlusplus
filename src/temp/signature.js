import { addStyle } from '../utils';

const publishedThreadUrl = "https://www.fxp.co.il/showthread.php?t=16859147";

function execScript() {

var node_1 = document.createElement('DIV');
node_1.setAttribute('id', 'creditAddon');

var node_2 = document.createElement('DIV');
node_1.appendChild(node_2);

var node_3 = document.createElement('DIV');
node_3.setAttribute('class', 'addCreditBtn');
node_3.setAttribute('id', 'addLimg');
node_3.addEventListener("click", function(e) {
    const iframeBody = document.querySelector(".cke_contents iframe").contentDocument.body;
    const creditLink = document.createElement("a");
    creditLink.href = publishedThreadUrl;
    creditLink.target = "_blank";

    const creditImg = document.createElement("img");
    creditImg.src = e.srcElement.src;
    creditImg.border = 0;

    creditLink.appendChild(creditImg);
    iframeBody.appendChild(creditLink);
});
 
node_1.appendChild(node_3);

var node_4 = document.createElement('IMG');
node_4.setAttribute('src', 'https://images.weserv.nl/?url=i.imgur.com/bsVtJ5o.png');
node_3.appendChild(node_4);

var node_5 = document.createElement('SPAN');
node_5.setAttribute('class', 'addCreditDesc');
node_3.appendChild(node_5);

var node_6 = document.createTextNode((new String("128x128")));
node_5.appendChild(node_6);

var node_7 = document.createElement('DIV');
node_7.setAttribute('class', 'addCreditBtn');
node_7.setAttribute('id', 'addMimg');
node_7.addEventListener("click", function(e) {
    const iframeBody = document.querySelector(".cke_contents iframe").contentDocument.body;
    const creditLink = document.createElement("a");
    creditLink.href = publishedThreadUrl;
    creditLink.target = "_blank";

    const creditImg = document.createElement("img");
    creditImg.src = e.srcElement.src;
    creditImg.border = 0;

    creditLink.appendChild(creditImg);
    iframeBody.appendChild(creditLink);
});
node_1.appendChild(node_7);

var node_8 = document.createElement('IMG');
node_8.setAttribute('src', 'https://images.weserv.nl/?url=i.imgur.com/O7FsbY8.png');
node_7.appendChild(node_8);

var node_9 = document.createElement('SPAN');
node_9.setAttribute('class', 'addCreditDesc');
node_7.appendChild(node_9);

var node_10 = document.createTextNode((new String("48x48")));
node_9.appendChild(node_10);

var node_11 = document.createElement('DIV');
node_11.setAttribute('class', 'addCreditBtn');
node_11.setAttribute('id', 'addTextCredit');
node_11.addEventListener("click", function() {
    const iframeBody = document.querySelector(".cke_contents iframe").contentDocument.body;
    const creditLink = document.createElement("a");
    creditLink.href = publishedThreadUrl;
    creditLink.target = "_blank";
    creditLink.textContent = "+FxPlus";
    iframeBody.appendChild(creditLink);
});

node_1.appendChild(node_11);

var node_12 = document.createElement('SPAN');
node_12.setAttribute('class', 'addCreditDesc');
node_11.appendChild(node_12);
	
document.querySelector('form[action*="signature"] .editor_smiliebox').appendChild(node_1);

    // var element = $("<div>", { id: "creditAddon" }).append(
                // $("<div>").text(" שתף את הכיף!™ והוסף קרדיט לתוסף +FxPlus בחתימה שלך:")
            // ).append(
                // $("<div>", { class: "addCreditBtn", id: "addLimg" }).append(
                    // $("<img>", { src: "https://images.weserv.nl/?url=i.imgur.com/bsVtJ5o.png" })
                // ).append(
                    // $("<span>", { class: "addCreditDesc" }).text("128x128")
                // ).click(function ()
                // {
                    // $(".cke_contents iframe").contents().find("body").append(
                        // $("<a>", { href: publishedThreadUrl, target: "_blank" }).append(
                            // $("<img>", { border: 0, src: $(this).find("img").attr("src") })
                        // )
                    // );
                // })
            // ).append(
                // $("<div>", { class: "addCreditBtn", id: "addMimg" }).append(
                    // $("<img>", { src: "https://images.weserv.nl/?url=i.imgur.com/O7FsbY8.png" })
                // ).append(
                    // $("<span>", { class: "addCreditDesc" }).text("48x48")
                // ).click(function ()
                // {
                    // $(".cke_contents iframe").contents().find("body").append(
                        // $("<a>", { href: publishedThreadUrl, target: "_blank" }).append(
                            // $("<img>", { border: 0, src: $(this).find("img").attr("src") })
                        // )
                    // );
                // })
            // ).append(
                // $("<div>", { class: "addCreditBtn", id: "addTextCredit" }).append(
                    // $("<span>", { class: "addCreditDesc" }).text("טקסט")
                // ).click(function ()
                // {
                    // $(".cke_contents iframe").contents().find("body").append(
                        // $("<a>", { href: publishedThreadUrl, target: "_blank" }).text("+FxPlus")
                    // );
                // })
            // );
            // $('form[action*="signature"] .editor_smiliebox').before(element);

	return function onDestroy() {
		element.remove();
	}
}


export default {
	setting: {
		name: '',
		description: '',
		permission: ''
	},
	authorId: 967488,
	version: '2024-08-08',
	match: 'signature',
	loaded: true,
	execute: execScript
}


