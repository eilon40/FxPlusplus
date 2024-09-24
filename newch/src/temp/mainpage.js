import { addStyle } from '../utils';

function execScript() {
	const styleElement = addStyle("#slide { height: auto; } .mainsik { display: none; }");

	return function onDestroy() {
		styleElement.remove();
	}
}
	
export default {
	setting: {
		name: 'כתבות', 
		description: 'מסתיר כתבות ישנות מדף הבית.',
		permission: 'mainpage',
	},
	authorId: 1129410,
	match: 'index',
	loaded: false,
	execute: execScript
}
