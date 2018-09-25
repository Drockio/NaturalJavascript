import { storage } from '../js/crud.js';
import { util } from '../js/util.js';
import { message } from '../js/message.js';

const shoppingCart = {
	displayTotalTarget: '.grandTotal',
	getTotal: function(){
		let shoppingCart = storage.getCart();
		let total = '$' + shoppingCart.reduce((accumulator,current) => { 
			if (util.isNumber(current.quantity) && util.isNumber(current.price))
			{
				return accumulator + current.quantity * current.price;
			} else { return accumulator; }
		},0).toFixed(2);

		return total;
	},
	getIndex: function(cart, productId){
		return cart.findIndex(element => { return element.productId.toString() === productId; });
	},
	alterQuantity: function(productId, int){
		let cart = storage.getCart();
		let index = shoppingCart.getIndex(cart, productId);
		cart[index].quantity = (cart[index].quantity + int) > 0 ? (cart[index].quantity + int) : 0;
		storage.setCart(cart);
		//.product-modifier is necessary to not alter buttons on product page. Sorry for the janky.
		$(`.product-modifier input[data-productId='${productId}']`).val(cart[index].quantity);
	},
	remove: function(productId){
		let cart = storage.getCart();
		cart = cart.filter(item => item.productId.toString() !== productId);
		storage.setCart(cart);

		if (cart.length >= 1) {
			message.post('displayShoppingCartPage');
		} 
		else 
		{ 
			message.post('hideModal');
		}
	},
	addItemTo: function(productId){
		let updated = false;
		let products = storage.getProducts();
		let cart = storage.getCart();

		//already in the cart, increment
		cart.map(item => {
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
			cart.push(chosenProduct[0]);
		}
		storage.setCart(cart);
	},
	getCleanedCart: function(){
		let cart = storage.getCart();
		let filtered = cart.filter(item => item.quantity > 0);
		storage.setCart(filtered);
		return filtered;
	},
	isCartEmpty: function() {
		return storage.getCart().length < 1;
	}
};

export { shoppingCart };