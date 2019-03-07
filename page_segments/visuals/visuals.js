import { templates } from '../../templates/_templateController.js';
import { dd$ } from '../../js/extensions.js';

const visuals = {
	display: function(){
		//set up visuals
		let visualsHtml = templates.getHtml('visuals');
		$('.container').empty().append(visualsHtml);

		return this;
	},
}

export { visuals };