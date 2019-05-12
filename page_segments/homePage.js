import { templates } from '../templates/_templateController.js';
import { dd$ } from '../js/extensions.js';
import { util } from '../js/util.js';
import { message } from '../js/message.js';

//Note, the 'template' of this page IS index.html.
const homePage = {
	display: function(){

		//set up main
		let product_site_main = templates.getHtml('homePage');
		$('.container').empty().append(product_site_main);

		//set up footer
		let footerHtml = templates.getHtml('footer');
		$('footer').empty().append(footerHtml);

		//set up header
		let headerHtml = templates.getHtml('header');
		$('header').empty().append(headerHtml);

		return this;
	},
	addEventListeners(){
		//handle shopping cart click
	  	dd$('#shoppingCartClick').on('click', function(){
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