const usernameElements = document.querySelectorAll('.flo .username');

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '10px');
svg.setAttribute('height', '10px');
svg.setAttribute('viewBox', '0 0 24 24');

const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('fill', '#00FF00');
path.setAttribute('d', 'm2 12a10 10 0 1 1 10 10 10 10 0 0 1 -10-10z');

svg.appendChild(path);

usernameElements.forEach(async usernameElement => {
	const username = usernameElement.innerText;
	const userLink = usernameElement.href;

	const html = await fetcher(userLink);
	if (html.includes(username + ' מחובר/ת')) {
		usernameElement.insertAdjacentHTML('beforeend', svg.outerHTML);
	}
});