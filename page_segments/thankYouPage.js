import { urls, globals } from '../js/config.js';
import { templates } from '../templates/_templateController.js';
import { storage } from '../js/crud.js';
import { modal } from '../page_segments/modal.js';
import { dd$ } from '../js/extensions.js';

const thankYouPage = {
	display: function(){
		let shoppingCart = storage.getCart();
		let productsInCart = templates.getHTML_products(shoppingCart);
		let thankYouPageTemplate = templates.getHtml('checkout/thankYouPage', ({productsInCart: productsInCart}));
		modal
			.display('Thank You!', thankYouPageTemplate, { 'name': 'Close'})
			.addEventListeners();

		//These might have defunct info OR they might be useful?
		$('.error').val(storage.getMessage());
		$('.message').val(storage.getError()); 
	}
};

export { thankYouPage };