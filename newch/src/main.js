(async () => {
	const requireModule = require.context('./temp/', false, /.js$/);
	const settings = await chrome.storage.local.get(null);
	const triggerFunctions = [];
	const allModules = requireModule.keys().map(moduleName => {
		const module = requireModule(moduleName).default;
		documentReady(module.loaded, module.execute, module.match)
			.then(function(triggerFunction) {
				let temp = null;
				if (settings[module.setting.permission] || module.setting.permission === '') {
					temp = triggerFunction();
				}
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
		const matchingModuleIndex = triggerFunctions.findIndex(triggerFunction => changes.hasOwnProperty(triggerFunction.permission));

		if (matchingModuleIndex === -1) {
			return; //No module matches the permission or triggerFunction is invalid
		}	
		const matchingModule = triggerFunctions[matchingModuleIndex];

		if (matchingModule.triggerFunction === null) {
			console.log('Module initialization detected for permission:', matchingModule.permission);
			const updatedFunction = matchingModule.temp();
			triggerFunctions[matchingModuleIndex].triggerFunction = updatedFunction;
			return;
		}
		const permissionChange = changes[matchingModule.permission];

		if (matchingModule.triggerFunction.name === 'execute' && permissionChange.newValue === true) {
			console.log('Calling onStart due to permission granted');
			const updatedFunction = matchingModule.temp();
			triggerFunctions[matchingModuleIndex].triggerFunction = updatedFunction;
		} else if (permissionChange.newValue === false) {
			console.log('Calling onDestroy due to permission revoked');
			(window || document).dispatchEvent(new Event('disableScript'));
			matchingModule.triggerFunction();
			triggerFunctions[matchingModuleIndex].triggerFunction = matchingModule.temp;
		}
	})

})();