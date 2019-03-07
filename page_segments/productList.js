import { util } from '../js/util.js';
import { message, broadcast } from '../js/message.js';
import { storage } from '../js/crud.js'
import { shoppingCartPage } from './shoppingCartPage.js';
import { shoppingCart } from '../js/shoppingCart.js';
import { templates } from '../templates/_templateController.js';
import { urls, interfaces } from '../interfaces/_interfaceConfig.js';
import { konnektiveInterface } from '../interfaces/konnektive.js';

const productList = {
	retrieveAndDisplay: async function(){
		//retrieve product list
		//let packedProducts = await konnektiveInterface.getProducts(urls.productUrl);
		let packedProducts = await interfaces.getProducts(urls.productUrl);

		//oh no, no products returned
		if (!packedProducts){
			broadcast.error({result: 'NO DATA', message: 'No data returned in productList.js'});
		}
		else 
		{
			let products = util.arrayFromObjectList(packedProducts);
			productList.display(products);
		}
	},
	display: function(products){

			//generate HMTL
			let productMarkup = (products.length !== 0) ? 
							products.map(item => templates.getHtml('product/product', item)):
							templates.getHtml('product/productsEmpty');

		    //display results
		    $('.product-list').empty().append(productMarkup);

			//add-to-cart links
		  	$('.product-list').on('click', '.purchase', function(){
		  		shoppingCart.addItemTo(this.dataset["productid"] || 0, this.dataset["campaignid"] || 0);
		  		message.post('displayShoppingCartPage');
		  	});
	}
};

export { productList };