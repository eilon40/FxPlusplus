function execScript() {
	const isCategoryExist = document.contains(document.getElementById('forumbits'));
	if (!isCategoryExist) {
		return;
	}
	const key = 'categories';

	let data = JSON.parse(localStorage.getItem(key) || '[]');
	const categoryId = new URLSearchParams(location.search).get('f');
	const getString = () => data.includes(categoryId) ? 'הצג' : 'אל תציג';

	const node = document.createElement('A');
	node.setAttribute('class', 'niceButton darkBlueBtn');
	node.setAttribute('style', 'font-size: 1em; color: #fff; margin-top: 0');
	node.addEventListener('click', function() {
		if (data.includes(categoryId)) {
			data = data.filter(cid => cid != categoryId)
		} else {
			data.push(categoryId);
		}
		node.innerText = getString();
		localStorage.setItem(key, JSON.stringify(data));
	})
	const node_1 = document.createTextNode((new String(getString())));
	node.appendChild(node_1);


	document.getElementById('left_block_1').append(node);
	
	return function onDestroy() {
		node.remove();
	}

}


export default {
	setting: {
		permission: 'catgory'
	},
	authorId: 1128410,
	match: 'forumdisplay',
	loaded: true,
	execute: execScript
}

