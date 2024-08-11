import { addStyle, createOptionElement } from '../utils';

function execScript() {

	const styleElement = addStyle("#stickies li.threadbit:nth-child(n+4) { display: block; } .morestick { display: none; }");
	//$(".morestick").remove();
	
	return function onDestroy() {
		styleElement.remove();
	}
}
				
export default {
	setting: {
		name: 'הצג יותר משלושה אשכולות נעוצים',
		description: 'בטל את ההסתרה האוטומטית של האשכול הנעוץ הרביעי והלאה.',
		permission: 'showAutoPinned'
	},
	authorId: 967488,
	version: '2024-08-08',
	match: '*',
	loaded: false,
	execute: execScript
}
