import { urls, globals } from './config.js';
import { util } from './util.js';
import { storage } from './crud.js';
import { productShim } from '../shims/product.js';

const products = {
	setDefaults: function(products){
		let defaulted = products.map(item => {
	    	item.productName = item.productName || 'Coming Soon';
	    	item.productDescription = item.productDescription || 'Description Coming Soon';
	    	item.currencySymbol = item.currencySymbol || 0;
	    	item.campaignId = globals.campaignId;
	    	return item;
	    });
	    return defaulted;
	},
	filter: function(jDataProducts){
		//we have a list of objects. Let's turn them into an array.
		let productArray = util.arrayFromObjectList(jDataProducts);

		//only shop products with an image.
	    let filteredProducts = productArray.filter(item => { return item.productImagePath; });
	    
	    //TODO: Remove this!!!
	    //CRM isn't providing prices, lets put some fake ones in there for now.
		productShim.addPrices(filteredProducts);

		//store products for use later.
	    storage.setProducts(filteredProducts);

	    //return the results with defaults
	    let defaults = products.setDefaults(filteredProducts);

	    return defaults;
	}
};

export { products };

	