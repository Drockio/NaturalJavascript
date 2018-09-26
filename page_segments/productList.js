import { urls, globals } from '../js/config.js';
import { util } from '../js/util.js';
import { message, broadcast } from '../js/message.js';
import { storage } from '../js/crud.js'
import { shoppingCartPage } from './shoppingCartPage.js';
import { shoppingCart } from '../js/shoppingCart.js';
import { templates } from '../templates/_templateController.js';
import { konnektiveInterface } from '../interfaces/konnektive.js';

const productList = {
	display: async function(){
		//retrieve product list
		let packedProducts = await konnektiveInterface.getProducts(urls.productUrl);

		//oh no, no products returned
		if (!packedProducts){
			broadcast.error({result: 'NO DATA', message: 'No data returned in productList.js'});
		}
		else 
		{
			//TODO: hook up as a prototype from extensions.js
			let products = util.arrayFromObjectList(packedProducts);

			//generate HMTL
			let productMarkup = products.map(item => templates.getHTML_product(item));

		    //display results
		    $('.product-list').empty().append(productMarkup);

			//add-to-cart links
		  	$('.product-list').on('click', '.purchase', function(){
		  		shoppingCart.addItemTo(this.dataset["productid"] || 0, this.dataset["campaignid"] || 0);
		  		message.post('displayShoppingCartPage');
		  	});
		}
	}
};

export { productList };