import { createOptionElement } from '../utils';

function execScript() {
	const whiteElements = document.querySelectorAll("[color='#ffffff']");

	whiteElements.forEach(element => {
		const table = element.closest('table');
		if (table && table.style.backgroundColor !== '') {
			element.classList.add('whiteSpoiler');
		}
	});

	return function onDestroy() {
		whiteElements.forEach(element => {
			const table = element.closest('table');
			if (table) {
				element.classList.remove('whiteSpoiler');
			}
		});
	}
}


export default {
	setting: {
		name: 'הפעל ספוילרים',
		description: 'טקסט לבן יהפוך ל<span class="whiteSpoiler">ספוילר</span>.',
		permission: 'showSpoilers'
	},
	authorId: 967488,
	version: '2024-08-08',
	match: 'show',
	loaded: true,
	execute: execScript
}
