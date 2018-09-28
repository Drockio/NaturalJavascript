import { globals } from '../js/config.js';


const productShim = {
	//CRM isn't providing prices, lets put some fake ones in there for now.
	addPrices: function(products){
		products.forEach(item => item.price = globals.TAKETHISOUT);
	},
	addCategories: function(products){
		products.forEach((item, index) => {
			item.categories = productShim.categoryArray[index];
		});
	},
	categoryArray: [
		['orange', 'round'],
		['orange', 'round', 'four'],
		['orange', 'round', 'two'],
		['orange', 'round', 'four', 'extra'],
		['orange', 'round', 'two', 'extra', 'unique']
	]
}

export { productShim };
