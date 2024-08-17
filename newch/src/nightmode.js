// import { addStyle } from '../utils';

// function execScript() {
	// let styleElement;

	// if (localStorage.getItem("nightmodeEnabled") == "true") {
		// if (settings.customBg.night.length > 0) {
            // var bgStyle = "body { background: url('" + settings.customBg.night + "') #000 }";
            // addStyle(bgStyle);
        // }
    // }
    // else if (settings.customBg.day.length > 0)
    // {
        // var bgStyle = "body { background: url('" + settings.customBg.day + "') }";
        // addStyle(bgStyle);
    // }

	// return function onDestroy() {
		// styleElement.remove();
	// }
// }

// function enableNightMode(settings) {
	// const nightModeEnabled = localStorage.getItem("nightmodeEnabled") === "true";
	// const temp = nightModeEnabled && settings.customBg.night.length > 0 ? 


  // const backgroundStyle = 
    // ? `body { background: url('${settings.customBg.night}') #000 }`
    // : settings.customBg.day.length > 0
      // ? `body { background: url('${settings.customBg.day}') }`

  // if (backgroundStyle) {
    // const styleElement = addStyle(backgroundStyle);

    // return function onDestroy() {
      // styleElement.remove();
    // };
  // }

  // return; // Early exit if no background style is created
// }
		
// export default {
	// setting: {
		// name: '',
		// description: '',
		// permission: 'customBg'
	// },
	// authorId: 967488,
	// version: '2024-08-08',
	// match: 'forumdisplay',
	// loaded: true,
	// execute: execScript
// }