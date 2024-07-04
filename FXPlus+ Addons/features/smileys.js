const data = `
https://yoursmiles.org/tsmile/heart/t4524.gif
`
if (document.querySelectorAll('.postbit').length > 0) {
	const editor = Object.values(vB_Editor).at(0);
	const images = data.trim().split('\n');
	for (const image of images) {
		if (!image) continue;
		editor.config.smiley_descriptions.push(`[img]${image}[/img]`);
		editor.config.smiley_images.push(`https://wsrv.nl/?url=${image}&w=30`);
	}
}
// if (typeof CKEDITOR !== 'undefined') {}

