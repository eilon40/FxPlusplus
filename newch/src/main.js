const requireModule = require.context('./temp/', false, /\.js$/);
const modulePaths = requireModule.keys();
const triggerFunctions = [];

(async (documentReady) => {
	const settings = await chrome.storage.local.get(null);

	for (const modulePath of modulePaths) {
		const { loaded, execute, match, setting } = requireModule(modulePath).default;
		const defaultFunction = await documentReady(loaded, execute, match);
		let triggerFunction = null;
				
		if (setting === undefined || settings[setting?.permission]) {
			triggerFunction = defaultFunction();
		}

		triggerFunctions.push({ triggerFunction, defaultFunction, permission: setting?.permission });

	}
	
})(documentReady);

function documentReady(shouldWait, callback, runOnly) {
	return new Promise((resolve, reject) => {
		const urlPath = location.href.split('/').pop();
		runOnly = runOnly.replace('*', '');
			
		if (runOnly && !urlPath.includes(runOnly)) {
			const thing = () => thing; 
			resolve(thing);
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
