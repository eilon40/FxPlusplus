const requireModule = require.context('./temp/', false, /.js$/);
// Todo http request (icon, name, id)
const contributors = {
    '967488': {
        icon: 'https://i.imagesup.co/images/0__059e0b4c4312d6.jpg',
        name: 'SilverTuxedo'
    },
	'1129410': {
        icon: 'https://i.imagesup.co/images2/0__05f479b039e01c.jpg',
        name: 'earthquake deadly'
    }
};

let settings;

document.addEventListener('input', async function({ target }) {
	if (!/checkbox|number/.test(target.type)) return;
	const isObject = typeof settings[target.id] === 'object';
	const newValue = target.type === 'checkbox' ? target.checked : target.valueAsNumber
	const data = isObject ? { ...settings[target.id], active: newValue } : newValue
	console.log(data);
	settings[target.id] = data;
	chrome.storage.local.set({ [target.id]: data });
});

requireModule.keys().forEach(async moduleName => {
	if (!settings) {
		settings = await chrome.storage.local.get(null);
	}
    const module = requireModule(moduleName).default;

    let authorSection = document.getElementById(module.authorId);
    if (!authorSection) {
        authorSection = document.createElement('section');
        authorSection.id = module.authorId;
        authorSection.className = 'row g-6';
		var node_8 = document.createElement('CENTER');
		var node_9 = document.createElement('A');
		node_9.setAttribute('href', 'https://www.fxp.co.il/member.php?u=' + module.authorId);
		node_8.appendChild(node_9);
		const contributor = contributors[module.authorId];
		var node_10 = document.createElement('IMG');
		node_10.setAttribute('src', contributor.icon);
		node_10.setAttribute('width', '40');
		node_10.setAttribute('title', contributor.name);
		node_10.setAttribute('alt', contributor.name);
		var hr = document.createElement('HR');
		node_9.appendChild(node_10);
		node_8.appendChild(hr);
		authorSection.appendChild(node_8);
		
        document.querySelector('.container-xl .row').appendChild(authorSection);
    }
	const setting = module?.setting;

    if (!setting || !setting.name || !setting.description || !setting.permission) {
        console.log(`Module '${moduleName}' is missing required settings.`);
        return;
    }


	var node_1 = document.createElement('DIV');
	node_1.setAttribute('class', 'col-lg-6');
	node_1.dir = 'rtl';
	var node_2 = document.createElement('DIV');
	node_2.setAttribute('class', 'card card-header-actions mb-4');
	node_1.appendChild(node_2);

	var node_3 = document.createElement('DIV');
	node_3.setAttribute('class', 'card-header d-flex justify-content-between align-items-center');
	node_2.appendChild(node_3);
	
	var node_4 = document.createTextNode(setting.name);
	node_3.appendChild(node_4);

	var node_5 = document.createElement('DIV');
	node_5.setAttribute('class', 'form-check form-switch');
	node_3.appendChild(node_5);
	console.log(settings[setting.permission], settings);
	const checkbox = settings[setting.permission] || false;
	var node_6 = document.createElement('INPUT');
	node_6.setAttribute('class', 'form-check-input');
	node_6.setAttribute('id', setting.permission);
	node_6.setAttribute('type', 'checkbox');
	node_6.checked = checkbox
	node_5.appendChild(node_6);

	var node_7 = document.createElement('LABEL');
	node_7.setAttribute('class', 'form-check-label');
	node_7.setAttribute('for', setting.permission);
	node_5.appendChild(node_7);

	var node_8 = document.createElement('DIV');
	node_8.setAttribute('class', 'card-body');
	node_8.innerHTML = `<label class='small mb-2'>${setting.description}</label>`;		
	node_2.appendChild(node_8);

    if (setting.sub) {

		var node_9 = document.createElement('FORM');
		node_8.appendChild(node_9);

		var node_10 = document.createElement('DIV');
		node_10.setAttribute('class', 'mb-0');
		node_9.appendChild(node_10);

		var node_11 = document.createElement('DIV');
		node_11.setAttribute('class', 'form-check mb-2');
		node_10.appendChild(node_11);

		var node_12 = document.createElement('INPUT');
		node_12.setAttribute('class', 'form-check-input');
		node_12.setAttribute('id', setting.sub.permission);
		node_12.setAttribute('type', setting.sub.type);
		node_6.addEventListener('click', function() {
			node_12.checked = settings[setting.sub.permission] || false;
			node_12.disabled = !node_12.disabled;
		})
		node_12.checked = settings[setting.sub.permission] || false;
		node_12.disabled = !checkbox;
		node_11.appendChild(node_12);


		var node_13 = document.createElement('LABEL');
		node_13.setAttribute('class', 'form-check-label');
		node_13.setAttribute('for', setting.sub.permission);
		node_11.appendChild(node_13);

		var node_14 = document.createTextNode(setting.sub.name);
		node_13.appendChild(node_14);
	
    }
	authorSection.appendChild(node_1);
	if (setting.execute) {
		setting.execute();
	}
});