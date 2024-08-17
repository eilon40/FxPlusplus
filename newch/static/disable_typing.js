function altFunctionForTypingSenderFxPlusplus() {
    return;
}
const tmp = window?.sendUserIsTypingInShowthread;
const temp = window?.typeingsend;
window.sendUserIsTypingInShowthread = altFunctionForTypingSenderFxPlusplus;
window.typeingsend = altFunctionForTypingSenderFxPlusplus;

window.addEventListener('disableScript', () => {
  	window.sendUserIsTypingInShowthread = tmp;
	window.typeingsend = temp;
});
