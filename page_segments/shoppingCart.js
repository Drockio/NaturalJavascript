import { urls, globals } from '../js/config.js';
import { storage } from '../js/crud.js';
import { util } from '../js/util.js';
import { message } from '../js/message.js';
import { modal } from '../page_segments/modal.js';
import { templates } from '../templates/_templateController.js';


const shoppingCartPage = {
	isCartEmpty: function() {
		return storage.getCart().length < 1;
		},
	alterQuantity: function(productId, int){
			let shoppingCart = storage.getCart();
			let index = shoppingCart.findIndex(element => { return element.productId.toString() === productId; });
			shoppingCart[index].quantity = (shoppingCart[index].quantity + int) > 0 ? (shoppingCart[index].quantity + int) : 0;
			storage.setCart(shoppingCart);
			//TODO: Declare an event for this and set that way.
			$(`.product-modifier input[data-productId='${productId}']`).val(shoppingCart[index].quantity);
			this.displayTotal();
		},
	productId: function(context){
		return context.closest('[data-productId]').dataset['productid'];
	},
	plusItem: function(){
		shoppingCartPage.alterQuantity(shoppingCartPage.productId(this), 1);
	},
	minusItem: function(){
		shoppingCartPage.alterQuantity(shoppingCartPage.productId(this), -1);
	},
	remove: function(productId){
			let shoppingCart = storage.getCart();
			shoppingCart = shoppingCart.filter(item => item.productId.toString() !== productId);
			storage.setCart(shoppingCart);
			//TODO: Declare an event for this and set that way.
			if (shoppingCart.length >= 1) { 
				this.display(); 
			} 
			else 
			{ 
				$('#main-modal').css('display', 'none');
				$('body').removeClass('removeScroll');
			}
		},
	removeItem: function(){
		shoppingCartPage.remove(shoppingCartPage.productId(this));
	},
	addItemTo: function(productId){
			let updated = false;
			let products = storage.getProducts();
			let shoppingCart = storage.getCart();

			//already in the cart, increment
			shoppingCart.map(item => {
				if (!updated && item.productId === Number(productId))
				{
					item.quantity += 1;
					updated = true;
				}
			});
			//item not found in the cart
			if (!updated){
				let chosenProduct = products.filter(item => item.productId === Number(productId));
				chosenProduct[0].quantity = 1;
				shoppingCart.push(chosenProduct[0]);
			}
			storage.setCart(shoppingCart);
		},
	getCleanedCart: function(){
		let cart = storage.getCart();
		let filtered = cart.filter(item => item.quantity > 0);
		storage.setCart(filtered);
		return filtered;
	},
	getProductMarkup: function(shoppingCart){
		let productMarkup = shoppingCart.reduce((accumulator, current) => {
			current.campaignId = globals.campaignId;
			current.price = (current.price) ? current.price : 0;
			return accumulator += templates.getProduct(current);
		},'');
		let productMarkupPlusTotals = templates.getProductAndTotals(productMarkup);
		return productMarkupPlusTotals;
			
	},
	displayTotal: function(){
		let shoppingCart = storage.getCart();
		let total = '$' + shoppingCart.reduce((accumulator,current) => {
			if (util.isNumber(current.quantity) && util.isNumber(current.price))
			{
				return accumulator + current.quantity * current.price;
			} else { return accumulator; }
		},0).toFixed(2);

		$('.grandTotal').text(total);
	},
	addEventListeners: function(){
		$('.modal-footer .navigation').click(function() {
			message.post('displayImportUserPage');
		});
		$('.minus').on('click', this.minusItem);
		$('.plus').on('click', this.plusItem);
		$('.delete').on('click', this.removeItem);
	},
	display: function(options){
		$('body').addClass('removeScroll');
		const SHOPPING_CART_HEADER = 'Add to Order';
		const shoppingCart = this.getCleanedCart();
		if (!this.isCartEmpty())
		{
			modal.display(SHOPPING_CART_HEADER, this.getProductMarkup(shoppingCart), { 'name': 'Checkout'});
			this.displayTotal();
			this.addEventListeners();
		} else {
			modal.display(SHOPPING_CART_HEADER, `<h2 class='modal-single-message'>No items in cart</h2>`);
		}
	}
};

export { shoppingCartPage };