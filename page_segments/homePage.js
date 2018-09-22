import { templates } from '../templates/_templateController.js';

const homePage = {
	display: function(){
		let footerContent = templates.getMarkup_footer();
		$('.footer').empty().append(footerContent);
	}
};

export { homePage };