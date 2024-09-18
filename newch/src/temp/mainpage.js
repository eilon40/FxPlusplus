import { addStyle } from '../utils';

function execScript() {
	const styleElement = addStyle("#slide { height: auto; } .mainsik { display: none; }");

	return function onDestroy() {
		styleElement.remove();
	}
}
	
export default {
	setting: {
		name: 'דף הבית', 
		description: 'Todo',
		permission: 'mainpage',
	},
	authorId: 967488,
	version: '2024-08-08',
	match: '*',
	loaded: false,
	execute: execScript
}
