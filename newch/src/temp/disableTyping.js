import { injectScript } from '../utils';

function execScript() {
	const scriptElement = injectScript('disable_typing.js');
	
	return function onDestroy() {
		scriptElement.remove();
	}
}


export default {
	setting: {
		name: 'אל תודיע שאני מקליד',
		description: 'מבטל את ההודעה שאתה מקליד באשכולות והודעות פרטיות לבחירתך. עדיין תוכל לראות אנשים אחרים מקלידים (אם הם לא הפעילו את אפשרות זו).',
		permission: 'disableLiveTyping',
		sub: {
			name: 'כולל בצ\'אט הפרטי',
			description: '',
			permission: 'disableLiveTypingPm',
			type: 'checkbox'
		}
	},
	authorId: 967488,
	match: 'thread',
	loaded: true,
	execute: execScript
}


