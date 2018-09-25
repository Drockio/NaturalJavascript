import { products } from '../js/products.js';

const konnektiveInterface = {
	getProducts: async function(url){
		let result = await $.getJSON(url, products.filter)
								.fail(function(jqxhr, textStatus, error){
									var err = textStatus + ", " + error;
									console.log( "Product_list request Failed: " + err );
								});
		return result;
	}
};

export { konnektiveInterface };