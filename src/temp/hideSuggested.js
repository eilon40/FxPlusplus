import { addStyle } from '../utils';

function execScript() {
	const suggestedContentSelectors = [
		'#related_main',
        '.trc_related_container',
        '.trc_spotlight_widget',
        '.videoyoudiv',
        '.OUTBRAIN'
    ];
	
	const styleElement = addStyle(suggestedContentSelectors.join(', ') + ' { display: none !important }');

	return function onDestroy() {
		styleElement.remove();
	}
}
				
export default {
	setting: {
		name: 'הסר את Outbrain', 
		description: 'שירות הצעת הכתבות והאשכולות של Outbrain יוסר לחלוטין מהדף.',		
		permission: 'hideSuggested'
	},
	authorId: 967488,
	version: '2024-08-08',
	match: '*',
	loaded: false,
	execute: execScript
}
