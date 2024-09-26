const requireModule = require.context('./temp/', false, /\.js$/);
const modulePaths = requireModule.keys();
const triggerFunctions = [];
//todo color setting popup
(async (documentReady) => {
	const settings = await chrome.storage.local.get(null);

	for (const modulePath of modulePaths) {
		const { loaded, execute, match, setting } = requireModule(modulePath).default;
		// console.log(loaded, execute, match, setting);
		const tmp = settings[setting?.permission];
		const defaultFunction = await documentReady(loaded, execute, match);
		let triggerFunction = null;
		
		if (setting === undefined || (typeof tmp === "object" ? tmp.active : tmp)) {
			triggerFunction = defaultFunction();
		}

		triggerFunctions.push({ triggerFunction, defaultFunction, permission: setting?.permission });
	}
	
})(documentReady);

function documentReady(shouldWait, callback, runOnly) {
	return new Promise((resolve, reject) => {
		const urlPath = '/' + location.href.split('/').pop();
		runOnly = new RegExp(runOnly.replace('*', '.*').replace('index', '/(?:index.php)?').replace('thread', 'show(post|thread)'));

		if (!runOnly.test(urlPath)) { // runOnly && !urlPath.includes(runOnly)
			const notFound = () => notFound; 
			resolve(notFound);
		}
			
		const handler = (hasEvent) => {
			if (hasEvent) {
				document.removeEventListener('DOMContentLoaded', handler);
			}
			resolve(callback);
		}

		if (!shouldWait || /complete|interactive/.test(document.readyState)) {
			handler();
		}
			
		document.addEventListener('DOMContentLoaded', handler);
	});
}

chrome.storage.onChanged.addListener(changes => {
	const matchingIndex = triggerFunctions.findIndex(func => changes.hasOwnProperty(func.permission));

    if (matchingIndex === -1) return; 

    const matchingModule = triggerFunctions[matchingIndex];

    if (matchingModule.triggerFunction === null) {
		console.log('Module initialization detected:', matchingModule.permission);
		const updatedFunction = matchingModule.defaultFunction();
        triggerFunctions[matchingIndex].triggerFunction = updatedFunction;
        return;
    }

    const permissionChange = changes[matchingModule.permission];

    if (matchingModule.triggerFunction.name === 'execute' && permissionChange.newValue === true) {
		console.log('Calling onStart due to permission granted');
		const updatedFunction = matchingModule.defaultFunction();
		triggerFunctions[matchingIndex].triggerFunction = updatedFunction;
	} else if (permissionChange.newValue === false) {
		console.log('Calling onDestroy due to permission revoked');
		(window || document).dispatchEvent(new Event('disableScript'));
		matchingModule.triggerFunction();
		triggerFunctions[matchingIndex].triggerFunction = matchingModule.defaultFunction;
	}
});
