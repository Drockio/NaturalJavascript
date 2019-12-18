import { storage } from '../js/crud.js';
import { util } from '../js/util.js';
import { dd$ } from '../js/extensions.js';
import { dom_element } from '../js/dom_element.js';
import { message } from '../js/message.js';
import { modal } from '../page_segments/modal.js';
import { templates } from '../templates/_templateController.js';
import { shoppingCart } from '../js/shoppingCart.js';

const shoppingCartPage = {
	display: function(options){
		const SHOPPING_CART_HEADER = 'Add to Cart';
		const cart = shoppingCart.getCleanedCart();

		//attributes are: title, backButtonText || null, forwardButtonText || null
		modal.display(modal.setAttributes('Shopping Cart', null, 'Checkout')).addEventListeners();

		let shoppingCartHtml = shoppingCart.isCartEmpty() ? 
								templates.getHtml('checkout/shoppingCartEmpty') : 
								shoppingCartPage.getShoppingCartPage(cart);
								
		dd$('.modal-body .content').insertHTML(shoppingCartHtml);

		shoppingCartPage.displayTotal();

		return this;
	},
	addEventListeners: function(){
		dd$('.modal-footer .navigation').on('click', function() {
			message.post('displayImportUserPage');
		});
		dd$('.minus').on('click', shoppingCartPage.minusItem);
		dd$('.plus').on('click', shoppingCartPage.plusItem);
		dd$('.delete').on('click', shoppingCartPage.removeItem);
	},
	getShoppingCartPage: function(shoppingCart){
		let productMarkup = shoppingCart.reduce((accumulator, current) => {
			current.price = (current.price) ? current.price : 0;
			return accumulator += templates.getHtml('product/productWithModifiers', current);
		},'');
		let productMarkupPlusTotals = templates.getHTML_shoppingCartPage(productMarkup);
		return productMarkupPlusTotals;
	},
	setCheckoutButtonStatus: function(total){
		//lets hide the checkout button if there is a 0 total
		let target = dd$('button.forward');
		if (total > 0){
			dom_element.enable(target[0]);
		} else {
			dom_element.disable(target[0]);
		}
	},
	displayTotal: function(){
		let total = shoppingCart.getTotal();
		dd$(shoppingCart.displayTotalTarget).text('$' + total);
		shoppingCartPage.setCheckoutButtonStatus(total);
	},
	displayQuantity: function(productId, quantity){
		dd$(`.product-modifier input[data-productId='${productId}']`).val(quantity);
	},
	productId: function(context){
		return context.closest('[data-productId]').dataset['productid'];
	},
	plusItem: function(){
		let productId = shoppingCartPage.productId(this);
		let quantity = shoppingCart.alterQuantity(productId, 1);
		shoppingCartPage.displayQuantity(productId, quantity);
		shoppingCartPage.displayTotal();
	},
	minusItem: function(){
		let productId = shoppingCartPage.productId(this);
		let quantity = shoppingCart.alterQuantity(productId, -1);
		shoppingCartPage.displayQuantity(productId, quantity);
		shoppingCartPage.displayTotal();
	},
	removeItem: function(){
		shoppingCart.remove(shoppingCartPage.productId(this));
	}
};

export { shoppingCartPage };