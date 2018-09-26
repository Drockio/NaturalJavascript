import { products } from '../js/products.js';
import { broadcast } from '../js/message.js';

const konnektiveInterface = {
	getProducts: async function(url){
		let returnVal;
		let result = await $.getJSON(url, function(response){
			if (response.result === 'SUCCESS'){
				returnVal = products.filter(response.message);
			}
			else {
				broadcast.error({result: "ERROR", message: `error in konnektive.js: ${response.result} - ${response.message}`});
			}
		})
		.fail(function(jqxhr, textStatus, error){
			broadcast.error({result: "FAIL", message: `error in konnektive.js: ${textStatus} - ${error}`});
		})
		.catch(function(){});

		return returnVal;
	}
};

export { konnektiveInterface };
