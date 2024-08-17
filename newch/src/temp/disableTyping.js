import { injectScript } from '../utils';

function execScript() {
	console.log('disable_typing')
	const scriptElement = injectScript('disable_typing.js');
	
	return function onDestroy() {
			console.log(' remove disable_typing')

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
			permission: 'disableLiveTypingPm'
		}
	},
	authorId: 967488,
	version: '2024-08-08',
	match: 'show',
	loaded: true,
	execute: execScript
}


