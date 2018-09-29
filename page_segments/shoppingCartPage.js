import { urls, globals } from '../js/config.js';
import { storage } from '../js/crud.js';
import { util } from '../js/util.js';
import { element } from '../js/element.js';
import { message } from '../js/message.js';
import { modal } from '../page_segments/modal.js';
import { templates } from '../templates/_templateController.js';
import { shoppingCart } from '../js/shoppingCart.js';

const shoppingCartPage = {
	display: function(options){
		const SHOPPING_CART_HEADER = 'Add to Cart';
		const cart = shoppingCart.getCleanedCart();
		if (!shoppingCart.isCartEmpty())
		{
			modal.display(SHOPPING_CART_HEADER, shoppingCartPage.getShoppingCartPage(cart), { 'name': 'Checkout'});
			shoppingCartPage.displayTotal();
		} else {
			modal.display(SHOPPING_CART_HEADER, templates.getHtml('shoppingCartEmpty'));
		}
		return this;
	},
	addEventListeners: function(){ 
		$('.modal-footer .navigation').click(function() {
			message.post('displayImportUserPage');
		});
		$('.minus').on('click', shoppingCartPage.minusItem);
		$('.plus').on('click', shoppingCartPage.plusItem);
		$('.delete').on('click', shoppingCartPage.removeItem);
	},
	getShoppingCartPage: function(shoppingCart){
		let productMarkup = shoppingCart.reduce((accumulator, current) => {
			current.campaignId = globals.campaignId;
			current.price = (current.price) ? current.price : 0;
			return accumulator += templates.getHtml('productWithModifiers', current);
		},'');
		let productMarkupPlusTotals = templates.getHTML_shoppingCartPage(productMarkup);
		return productMarkupPlusTotals;
	},
	setCheckoutButtonStatus: function(total){
		//lets hide the checkout button if there is a 0 total
		let _element = new element();
		let target = $('button.forward')
		if (total > 0){
			_element.enable(target[0]);
		} else {
			_element.disable(target[0]);
		}
	},
	displayTotal: function(){
		let total = shoppingCart.getTotal();
		$(shoppingCart.displayTotalTarget).text('$' + total);
		shoppingCartPage.setCheckoutButtonStatus(total);
	},
	productId: function(context){
		return context.closest('[data-productId]').dataset['productid'];
	},
	plusItem: function(){
		shoppingCart.alterQuantity(shoppingCartPage.productId(this), 1);
		shoppingCartPage.displayTotal();
	},
	minusItem: function(){
		shoppingCart.alterQuantity(shoppingCartPage.productId(this), -1);
		shoppingCartPage.displayTotal();
	},
	removeItem: function(){
		shoppingCart.remove(shoppingCartPage.productId(this));
	}
};

export { shoppingCartPage };