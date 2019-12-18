import { products } from '../js/products.js';
import { product_categories } from '../js/product_categories.js';
import { broadcast } from '../js/message.js';

const konnektiveInterface = {
	getProducts: async function(url){
		let productArray;
		let response = await fetch(url);
		if (!response.ok){
			broadcast.error({result: "ERROR", message: `error in local.js.`});
		} else {
			const responseJson = await response.json();
			if (responseJson.result !== "SUCCESS"){
				broadcast.error({result: "ERROR", message: `error in local.js: ${responseJson.result} - ${responseJson.message}`});
			}
			productArray = products.build(responseJson.message.items);
			product_categories.gatherAndSave(productArray);
		}


		return productArray;
	}
};

export { konnektiveInterface };

