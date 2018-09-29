import { templates } from '../templates/_templateController.js';

//Note, the 'template' of this page IS index.html.
const homePage = {
	display: function(){
		//set up footer
		let footerContent = templates.getHTML_footer();
		$('footer').empty().append(footerContent);
	}
};

export { homePage }; 