import { templates } from '../templates/_templateController.js';
import { dd } from '../js/extensions.js';
import { util } from '../js/util.js';
import { message } from '../js/message.js';

//Note, the 'template' of this page IS index.html.
const homePage = {
	display: function(){
		//set up footer
		let footerHtml = templates.getHtml('footer');
		$('footer').empty().append(footerHtml);

		let headerHtml = templates.getHtml('header');
		$('header').empty().append(headerHtml);

		return this;
	},
	addEventListeners(){
		//handle shopping cart click
	  	dd('#shoppingCartClick').onEvent('click', function(){
	  		message.post('displayShoppingCartPage');
	  	});

		//first parameter is where a click occurs and second is
		//where page scrolls to.
	  	util.registerScroll('#clickAbout', '.about');
	  	util.registerScroll('#clickProducts', '.products');
	  	util.registerScroll('#clickContact', '.contact');
	  	util.registerScroll('.clickTop', '.container');
	}
};

export { homePage }; 