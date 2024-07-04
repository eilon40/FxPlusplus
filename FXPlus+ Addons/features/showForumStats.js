//https://github.com/SilverTuxedo/FxPlusplus/blob/master/chrome/js/main_fxp.js#L347
const total = document.querySelectorAll('#threads .threadtitle').length;
elementReady("#forumStats i")
	.then(element => {
		element.innerHTML = "נתונים סטטיסטיים של " + total + " אשכולות:";
	})