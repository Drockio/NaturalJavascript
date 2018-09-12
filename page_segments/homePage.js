import { templates } from '../templates/_templateController.js';

const homePage = {
	display: function(){
		let footerContent = templates.getFooterMarkupTemplate();
		$('.footer').empty().append(footerContent);
	}
};

export { homePage };