import { globals } from '../js/config.js';


const productShim = {
	//CRM isn't providing prices, lets put some fake ones in there for now.
	addPrices: function(products){
		products.forEach(item => item.price = globals.TAKETHISOUT);
	}
}

export { productShim };
