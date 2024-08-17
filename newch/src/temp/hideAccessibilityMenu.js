import { addStyle } from '../utils';

function execScript() {
	const styleElement = addStyle(".nagish-button { display: none; }");

	return function onDestroy() {
		styleElement.remove();
	}
}


export default {
	setting: {
		name: 'הסתר את תפריט הנגישות',
		description: 'תפריט הנגישות (הכפתור השחור עם סימן האדם בכיסא הגלגלים) יוסתר.',
		permission: 'hideAccessibilityMenu'
	},
	authorId: 967488,
	version: '2024-08-08',
	match: '*',
	loaded: false,
	execute: execScript
}