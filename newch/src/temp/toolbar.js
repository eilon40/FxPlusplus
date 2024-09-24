import { addStyle } from '../utils';

function execScript() {
	const url = chrome.runtime.getURL("html/settings.html");
	var node_1 = document.createElement('DIV');
	node_1.setAttribute('class', 'fxpSpopupSeperator');

	var node_2 = document.createElement('DIV');
	node_2.setAttribute('style', 'text-align: center;');

	var node_3 = document.createElement('A');
	node_3.setAttribute('class', 'niceButton darkBlueBtn');
	node_3.setAttribute('style', 'font-size: 1em; color: #fff; margin-top: 0');
	node_3.setAttribute('target', '_blank');
	node_3.setAttribute('href', url);
	node_2.appendChild(node_3);

	var node_4 = document.createTextNode((new String("הגדרות +FxPlus")));
	node_3.appendChild(node_4);

	var node_5 = document.createElement('A');
	node_5.setAttribute('target', '_blank');
	node_5.setAttribute('href', url + '#multiuser');
	node_2.appendChild(node_5);

	var node_6 = document.createTextNode((new String("החלף משתמש")));
	node_5.appendChild(node_6);

	document.querySelector('#settings_pop .popupbody').append(node_1, node_2);
}


export default {
	authorId: 967488,
	match: '*',
	loaded: true,
	execute: execScript
}

