
function execScript() {
	//observer to handle images that change their src after page is ready (fxp's load while scrolling feature)
	const signatureObserver = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.attributeName === "src") {
				resizeSignature(mutation.target.closest(".signaturecontainer"));
				// if (document.querySelectorAll(".signaturecontainer img[src='clear.gif']").length === 0) { //there are no images in signatures that can change their src
					// observers.signatures.disconnect(); 
				// }
			}
		});
	});

	//handle all signatures
	document.querySelectorAll(".signaturecontainer").forEach(resizeSignature)
	//handle videos that load in signatures (gifs)
	document.querySelectorAll('.signaturecontainer video').forEach(element => {
		element.addEventListener('loadeddata', function() {
			resizeSignature(element.closest('.signaturecontainer'));
		})
	})
		 
	//handle images that load in signatures 
	document.querySelectorAll('.signaturecontainer img').forEach(element => {
		element.addEventListener('load', function() {
			resizeSignature(element.closest('.signaturecontainer'));
		})
		//observe images since their src can change
		signatureObserver.observe(this, { attributes: true });
	})
						
						// //resizeSignature(addedComment.find(".signaturecontainer"));                              
						// addedComment.find(".signaturecontainer img").one("load", function () {                
						// resizeSignature($(this).parents(".signaturecontainer"));               
					
	function resizeSignature(signatureElement) {
		if (signatureElement.style.display === "none") {
			return;
		}
			
		const signature = signatureElement.closest(".signature");

		signatureElement.style.height = "auto";
		signatureElement.style.transform = "scale(1,1)";
		signatureElement.title = "";
		signature.style.overflow = "visible";
		signature.style.height = "auto";

		const signHeight = signatureElement.offsetHeight;
		if (signHeight > 295) {
			const outByScale = 295 / signHeight;
			signatureElement.style.transformOrigin = "top";
			signatureElement.style.transform = `scale(${outByScale}, ${outByScale})`;
			signature.style.overflow = "hidden";
			signature.style.height = "295px";
			signatureElement.title = "חתימה זו הוקטנה באופן אוטומטי.";
		}
	}
	
	return function onDestroy() {
		scriptElement.remove();
	}
}

export default {
	setting: {
		name: 'הקטן חתימות גדולות אוטומטית',
		description: 'חתימות שחורגות מהגובה החוקי המקסימלי, 295px, יוקטנו באופן אוטומטי.',
		permission: 'resizeSignatures'
	},
	authorId: 967488,
	match: 'thread',
	loaded: true,
	execute: execScript
}
