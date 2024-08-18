import { addStyle } from '../utils';

function execScript() {

	const publishedThreadUrl = "https://www.fxp.co.il/showthread.php?t=16859147"
	var node_1 = document.createElement('DIV');
	node_1.setAttribute('id', 'creditAddon');

	var node_2 = document.createElement('DIV');
	node_1.appendChild(node_2);

	var node_3 = document.createTextNode((new String("שתף את הכיף!™ והוסף קרדיט לתוסף +FxPlus בחתימה שלך:")));
	node_2.appendChild(node_3);

	var node_4 = document.createElement('DIV');
	node_4.setAttribute('class', 'addCreditBtn');
	node_4.setAttribute('id', 'addLimg');
	node_4.addEventListener("click", function(e) {
		const element = e.target.parentElement.querySelector('img');
		const iframeBody = document.querySelector(".cke_contents iframe").contentDocument.body;
		const creditLink = document.createElement("a");
		creditLink.href = publishedThreadUrl;
		creditLink.target = "_blank";

		const creditImg = document.createElement("img");
		creditImg.src = element.src;

		creditLink.appendChild(creditImg);
		iframeBody.appendChild(creditLink);
	});

	node_1.appendChild(node_4);

	var node_5 = document.createElement('IMG');
	node_5.setAttribute('src', 'https://i.imagesup.co/images2/b059514f80af8c5ec69afc73356a4dfa3b771343.png');
	node_4.appendChild(node_5);

	var node_6 = document.createElement('SPAN');
	node_6.setAttribute('class', 'addCreditDesc');
	node_4.appendChild(node_6);

	var node_7 = document.createTextNode((new String("128x128")));
	node_6.appendChild(node_7);

	var node_8 = document.createElement('DIV');
	node_8.setAttribute('class', 'addCreditBtn');
	node_8.setAttribute('id', 'addMimg');
	node_8.addEventListener('click', function(e) {
		const element = e.target.parentElement.querySelector('img');

		const iframeBody = document.querySelector(".cke_contents iframe").contentDocument.body;
		const creditLink = document.createElement("a");
		creditLink.href = publishedThreadUrl;
		creditLink.target = "_blank";

		const creditImg = document.createElement("img");
		creditImg.src = element.src;
 
		creditLink.appendChild(creditImg);
		iframeBody.appendChild(creditLink);
	})
	node_1.appendChild(node_8);

	var node_9 = document.createElement('IMG');
	node_9.setAttribute('src', 'https://i.imagesup.co/images2/7797f421f0e4895878e51d09266a35355b214d5a.png');
	node_8.appendChild(node_9);

	var node_10 = document.createElement('SPAN');
	node_10.setAttribute('class', 'addCreditDesc');
	node_8.appendChild(node_10);

	var node_11 = document.createTextNode((new String("48x48")));
	node_10.appendChild(node_11);

	var node_12 = document.createElement('DIV');
	node_12.setAttribute('class', 'addCreditBtn');
	node_12.setAttribute('id', 'addTextCredit');
	node_12.addEventListener("click", function() {
		const iframeBody = document.querySelector(".cke_contents iframe").contentDocument.body;
		const creditLink = document.createElement("a");
		creditLink.href = publishedThreadUrl;
		creditLink.target = "_blank";
		creditLink.textContent = "+FxPlus";
		iframeBody.appendChild(creditLink);
	});
	node_1.appendChild(node_12);

	var node_13 = document.createElement('SPAN');
	node_13.setAttribute('class', 'addCreditDesc');
	node_12.appendChild(node_13);

	var node_14 = document.createTextNode((new String("טקסט")));
	node_13.appendChild(node_14);
	
	const smilieBox = document.querySelector('form[action*="signature"] .editor_smiliebox');
    smilieBox.parentNode.insertBefore(node_1, smilieBox);
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

