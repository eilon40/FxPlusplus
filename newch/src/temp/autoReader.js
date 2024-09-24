//https://greasyfork.org/en/scripts/466827-%D7%9E%D7%A7%D7%A8%D7%99%D7%90-%D7%90%D7%A9%D7%9B%D7%95%D7%9C%D7%95%D7%AA
function execScript() {
	const ismobile = typeof ISMOBILEFXP !== 'undefined';
	function stop() {
		speechSynthesis.cancel();
	}
	function play() {
		const text = [...document.querySelectorAll('.postbit')].map(element => {
			const author = ismobile ? '.xsaid' : '.username';
			const start = 'המשתמש ' + element.querySelector(author).textContent + ' כתב'
			return start + '\n' + element.querySelector(ismobile ? '.content' : '.postcontent').textContent;
		}).join('\n');
		console.log(text);
		const speech = new SpeechSynthesisUtterance(text);
		speech.lang = 'he';
		speech.onstart = function() {
			link.innerText = 'עצור הקראה';
			link.onclick = stop;
		}
		speech.onend = function() {
			link.innerText = 'הקרא אשכול';
			link.onclick = play;
		}
		speech.onerror = function() {
			link.innerText = 'הקרא אשכול';
			link.onclick = play;
		}
		speechSynthesis.speak(speech);
	}
	window.onunload = stop;
	const link = document.createElement("a");
	link.innerText = 'הקרא אשכול';
	link.onclick = play;
	link.className = "newcontent_textcontrol";
	link.style.width = "136px";
	if ('speechSynthesis' in window && document.querySelectorAll('.postbit').length > 0) {
		if (ismobile) {
			document.querySelector('.page_title_fxp').after(link);
		} else {
			document.querySelector(window.LOGGEDIN ? '#open-thread-controls' : '#above_postlist').after(link);
		}
	}
	
	return function onDestroy() {
		link.remove();
		stop();
	}
}


export default {
	setting: {
		name: 'הקראה של האשכול',
		description: 'מאפשר לשמוע את התוכן של האשכול',
		permission: 'autoReader',
	},
	authorId: 1129410,
	match: 'thread',
	loaded: true,
	execute: execScript
}