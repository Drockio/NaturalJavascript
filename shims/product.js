import { globals } from '../js/config.js';
import { util } from '../js/util.js';


const productShim = {
	//CRM isn't providing prices, lets put some fake ones in there for now.
	addPrices: function(products){
		const MIN = 3, MAX = 125;
		products.forEach(item => item.price = util.randomNumber(MIN, MAX));
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
		['orange', 'round', 'one', 'extra'],
		['orange', 'round', 'two', 'extra', 'unique']
	]
}

export { productShim };
