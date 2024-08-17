const requireModule = require.context('./temp/', false, /.js$/);

const triggerFunctions = [];
const allModules = requireModule.keys().map(moduleName => {
	
	const module = requireModule(moduleName).default;
	documentReady(module.loaded, module.execute, module.match)
		.then(function(triggerFunction) {
			const temp = triggerFunction();
			triggerFunctions.push({triggerFunction: temp, permission: module.setting.permission, temp: triggerFunction });	
		})
		.catch(function () {})
	return module;
});

function documentReady(shouldWait, callback, runOnly) {
	return new Promise((resolve, reject) => {
		const urlPath = location.href.split('/').pop();
		runOnly = runOnly.replace('*', '');

		if (runOnly && !urlPath.includes(runOnly)) {
			reject(new Error('URL path does not match runOnly condition'));
		}

		if (!shouldWait) {
			resolve(callback);
		} else if (document.readyState === 'complete' || document.readyState === 'interactive') {
			resolve(callback);
		}

		const handler = () => {
			document.removeEventListener('DOMContentLoaded', handler);
			resolve(callback);
		};
		
		document.addEventListener('DOMContentLoaded', handler);
	});
}

chrome.storage.onChanged.addListener(changes => {
	const relevantModuleIndex = triggerFunctions.findIndex(triggerFunction =>
		changes.hasOwnProperty(triggerFunction.permission)
	);

	if (relevantModuleIndex < 0) return; // no module matches the permission or triggerFunction is invalid
	const relevantModule = triggerFunctions[relevantModuleIndex];
	
	const permissionChange = changes[relevantModule.permission];
	console.log(`Storage change detected for permission: '${permissionChange.newValue}'`);
	if (relevantModule.triggerFunction.name === 'execute') {
		console.log('Calling onStart');
		const temp = relevantModule.temp();
		triggerFunctions[relevantModuleIndex].triggerFunction = temp; 
	} else {
		console.log('Calling onDestroy');
		(window || document).dispatchEvent(new Event('disableScript'));
		relevantModule.triggerFunction();
		triggerFunctions[relevantModuleIndex].triggerFunction = relevantModule.temp;
	}
});