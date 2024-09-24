
function execScript() {
	const targetPostId = new URLSearchParams(location.search).get('p');
	const isPostExist = document.contains(document.getElementById('post_' + targetPostId));

	if (!targetPostId || isPostExist) {
		console.log(targetPostId, isPostExist)
		return;
	}
	const elements = Array.from(document.querySelectorAll('.postbit'));
	const postIds = elements.map(el => parseInt(el.id.replace('post_', '')));
	const index = postIds.filter(pid => pid < targetPostId).length - 1;

	const newElement = document.createElement('li'); 
	newElement.textContent = 'התגובה שאתה מנסה לראות נמחקה.'; 
	newElement.id = 'post_' + targetPostId
	newElement.className = 'postbit postbitim postcontainer'
	newElement.style = "background-color: #ffdddd; border: 1px solid #ff0000; padding: 10px; border-radius: 5px; color: #333; font-weight: bold; text-align: center;"
	const targetElement = elements.at(index);
	targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling);
	
	return function onDestroy() {
		targetElement.remove();
	}
}
export default {
	setting: {
		name: 'הודעה מחוקה באשכול', 
		description: 'מוסיף סימון מיוחד להודעה שנמחקה, ומאפשר לראות איפה הייתה ההודעה שנמחקה.',		
		permission: 'posts'
	},
	authorId: 1129410,
	match: 'thread',
	loaded: true,
	execute: execScript
}
