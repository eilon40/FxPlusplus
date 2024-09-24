import { addStyle } from '../utils';

function execScript() {
	const styleElement = addStyle("#stickies li.threadbit:nth-child(n+4) { display: block; }");
	const element = document.querySelector('.morestick');
	element.remove();

	return function onDestroy() {
		styleElement.remove();
		// document.querySelector('div.anoucmentinposts').prepend(element) 
	}
}
				
export default {
	setting: {
		name: 'הצג יותר משלושה אשכולות נעוצים',
		description: 'בטל את ההסתרה האוטומטית של האשכול הנעוץ הרביעי והלאה.',
		permission: 'showAutoPinned'
	},
	authorId: 967488,
	match: 'forumdisplay',
	loaded: true,
	execute: execScript
}
