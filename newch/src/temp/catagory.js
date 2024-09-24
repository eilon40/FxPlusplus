import { addStyle } from '../utils';

function execScript() {
	const key = 'categories';
	//todo chrome storge
	//todo permission parm
	const data = JSON.parse(localStorage.getItem(key) || '[]');
	
	const tmp = data.map(cid => `.hp_category:has(a[href*="${cid}"]), #cat${cid}`);
	const styleElement = addStyle(tmp.join(',')+ ' { display: none } .hi4 {height: 337px}');
	
	return function onDestroy() {
		styleElement.remove();
	}
}
				
export default {
	setting: {
		name: 'הסתרת קטגוריות', 
		description: 'Todo',		
		permission: 'catgory'
	},
	authorId: 1129410,
	match: 'index',
	loaded: false,
	execute: execScript
}
