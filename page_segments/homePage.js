import { templates } from '../templates/_templateController.js';

//Note, the 'template' of this page IS index.html.
const homePage = {
	display: function(){
		//set up footer
		let footerHtml = templates.getHtml('footer');
		$('footer').empty().append(footerHtml);

		let headerHtml = templates.getHtml('header');
		$('header').empty().append(headerHtml);
	}
};

export { homePage }; 