import { products } from '../js/products.js';
import { product_categories } from '../js/product_categories.js';
import { broadcast } from '../js/message.js';

const konnektiveInterface = {
	getProducts: async function(url){
		debugger;
		let productArray;
		let result = await $.getJSON(url, function(response){
			if (response.result === 'SUCCESS'){
				productArray = products.build(response.message);
				product_categories.gatherAndSave(productArray);
			}
			else {
				broadcast.error({result: "ERROR", message: `error in konnektive.js: ${response.result} - ${response.message}`});
			}
		})
		.fail(function(jqxhr, textStatus, error){
			broadcast.error({result: "FAIL", message: `error in konnektive.js: ${textStatus} - ${error}`});
		})
		.catch(function(){});

		return productArray;
	}
};

export { konnektiveInterface };

