import { urls, globals } from '../js/config.js';
import { templates } from '../templates/_templateController.js';
import { storage } from '../js/crud.js';
import { modal } from '../page_segments/modal.js';

const thankYouPage = {
	success: function(){
		let shoppingCart = storage.getCart();
		shoppingCart.campaignid = globals.campaignId;
		let productsInCart = templates.getProductMarkupTemplate(shoppingCart);
		let thankYouPageTemplate = templates.getThankYouPage({productsInCart: productsInCart});
		modal.display('Thank You!', thankYouPageTemplate, { 'name': 'Close'});

		//These might have defunct info OR they might be useful?
		$('.error').val(storage.getMessage());
		$('.message').val(storage.getError());
	}
};

export { thankYouPage };