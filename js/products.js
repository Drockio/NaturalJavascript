import { urls, globals } from './config.js';
import { util } from './util.js';
import { storage } from './crud.js';

const products = {
	filter: function(response){
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

	    return defaulted;
	}
};

export { products };

	