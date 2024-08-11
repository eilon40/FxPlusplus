const requireModule = require.context('./temp/', false, /.js$/);

// const triggerFunctions = [];

const allModules = requireModule.keys().map(moduleName => {
	const module = requireModule(moduleName).default;
	let triggerFunction = documentReady(module.loaded, module.execute, module.match);
	if (triggerFunction) {
		triggerFunction = triggerFunction();
		// triggerFunctions.push({triggerFunction, permission: module.setting.permission });	
	}
	return module;
});

function documentReady(shouldWait, callback, runOnly) {
	const urlPath = location.href.split('/').pop();
	runOnly = runOnly.replace('*', '.');

	if (runOnly && !urlPath.includes(runOnly)) {
		return false;
	}

	if (!shouldWait) {
		return callback;
	}

	if (document.readyState === 'interactive' || document.readyState === 'complete') {
		return callback;
	}
	
	return false;//documentReady(shouldWait, callback, runOnly);
}


chrome.storage.onChanged.addListener(changes => {
	// const relevantModuleIndex = triggerFunctions.findIndex(triggerFunction =>
		// changes.hasOwnProperty(triggerFunction.permission)
	// );
	// if (relevantModuleIndex < 0) return; // no module matches the permission or triggerFunction is invalid
	// const relevantModule = triggerFunctions[relevantModuleIndex];
	
	// const permissionChange = changes[relevantModule.permission];
	// console.log(`Storage change detected for permission: '${permissionChange.newValue}'`);
	// if (relevantModule.triggerFunction === relevantModule.temp) {
		// console.log('Calling onStart');
		// const temp = relevantModule.temp();
		// triggerFunctions[relevantModuleIndex] = temp; 

	// } else {
		// console.log('Calling onDestroy');
		// relevantModule.triggerFunction();
		// triggerFunctions[relevantModuleIndex] = relevantModule.temp;
	// }
});
// import { createOptionElement } from './utils';
// console.log(createOptionElement(...Object.values(module.setting)));
