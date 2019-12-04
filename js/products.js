import { util } from './util.js';
import { storage } from './crud.js';

const products = {
	setDefaults: function(products){
		let defaulted = products.map(item => {
	    	item.productName = item.productName || 'Coming Soon';
	    	item.productDescription = item.productDescription || 'Description Coming Soon';
	    	item.currencySymbol = item.currencySymbol || 0;
	    	return item;
	    });
	    return defaulted;
	},
	build: function(jDataProducts){
		//we have a list of objects. Let's turn them into an array.
		let array = util.arrayFromObjectList(jDataProducts);

		//only shop products with an image.
	    let productArray = array.filter(item => { return item.productImagePath; });

	    //return the results with defaults
	    productArray = products.setDefaults(productArray);

		//store products for use later.
	    storage.setProducts(productArray);

	    return productArray;
	},
	//These are distinct features that the CRM doesn't currently provide, not defaults.
	shim: function(productsArray){
	    //CRM isn't providing prices, lets put some fake ones in there for now.
		//productShim.addPrices(productsArray);
		//CRM isn't providing meta tags, lets put some fake ones in there for now.
		//productShim.addCategories(productsArray);
	}
};

export { products };

	