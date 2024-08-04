//https://www.fxp.co.il/member.php?u=789624
// Todo: share
// Temporary
const data = `
https://yoursmiles.org/tsmile/heart/t4524.gif
`
function waitForVBEditor() {
	return new Promise(resolve => {
		const interval = setInterval(() => {
			if (typeof window.vB_Editor !== 'undefined') {
				clearInterval(interval);
				resolve(window.vB_Editor);
			}
		}, 100);
	});
}

waitForVBEditor().then(object => {
	const editor = Object.values(vB_Editor).at(0);
	const images = data.trim().split('\n');
	for (const image of images) {
		if (!image) continue;
		editor.config.smiley_descriptions.push(`[img]${image}[/img]`);
		editor.config.smiley_images.push(`https://wsrv.nl/?url=${image}&w=30`);
	}	
});