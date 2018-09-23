import { urls, globals } from '../js/config.js';
import { message } from '../js/message.js';
import { storage } from '../js/crud.js'
import { templates } from '../templates/_templateController.js';
import { shoppingCartPage } from './shoppingCartPage.js';
import { shoppingCart } from '../js/shoppingCart.js';


const products = {
	display: function(){
		$.getJSON(urls.productUrl, function (response) {
	    	const result = [];
	    	const keys = Object.keys(response.message);
	    	for (let prop in keys) {
		      	if (hasOwnProperty.call(keys, prop)) {
		        	let item = response.message[keys[prop]];
		        	result.push(item);
		      	}
	    	}

	    	//only shop products with an image
		    let filtered = result.filter(item => { return item.productImagePath; });
		    
		    //put some values in there 
			filtered.forEach(item => item.price = globals.TAKETHISOUT);

		    storage.setProducts(filtered);
		    let defaulted = filtered.map(item => {
		    	item.productName = item.productName || 'Coming Soon';
		    	item.productDescription = item.productDescription || 'Description Coming Soon';
		    	item.currencySymbol = item.currencySymbol || 0;
		    	item.campaignId = globals.campaignId;
		    	return item;
		    });

		    let defaultedMarkup = defaulted.map(item => templates.getHTML_product(item));

		    //display results
		    $('.product-list').empty().append(defaultedMarkup);
		})
		.fail(function(jqxhr, textStatus, error){
			var err = textStatus + ", " + error;
    		console.log( "Product_list request Failed: " + err );
		});

		//add to cart links
	  	$('.product-list').on('click', '.purchase', function(){
	  		shoppingCart.addItemTo(this.dataset["productid"] || 0, this.dataset["campaignid"] || 0);
	  		message.post('displayShoppingCartPage');
	  	});
	}
};

export { products };