import { fetcher } from '../utils';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '10px');
svg.setAttribute('height', '10px');
svg.setAttribute('viewBox', '0 0 24 24');

const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('fill', '#00FF00');
path.setAttribute('d', 'm2 12a10 10 0 1 1 10 10 10 10 0 0 1 -10-10z');

svg.appendChild(path);

function execScript() {
	const usernameElements = document.querySelectorAll('.flo .username');

	usernameElements.forEach(async usernameElement => {
		const username = usernameElement.innerText;
		const userLink = usernameElement.href;

		const html = await fetcher(userLink);
		if (html.includes(username + ' מחובר/ת')) {
			usernameElement.insertAdjacentHTML('beforeend', svg.outerHTML);
		}
	});
	
	return function onDestroy() {
		usernameElements.forEach(({ lastChild }) => {
			if (lastChild.tagName === 'svg') {
				lastChild.remove();	
			}
		})
	}
}

				
export default {
	setting: {
		name: 'מסמן צוות מחובר',
		description: 'בתוך הפורום, חברי צוות המחוברים יזוהו על ידי אייקון ירוק קטן המוצג לצד שמם.',
		permission: 'connectedStaff'
	},
	authorId: 1129410,
	version: '2024-08-08',
	match: 'forumdisplay',
	loaded: true,
	execute: execScript
}