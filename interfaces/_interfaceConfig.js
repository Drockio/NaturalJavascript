import { globals } from '../js/config.js';
import { localInterface } from './local.js';
import { konnektiveInterface } from './konnektive.js';

var urls = {};
var interfaces = {};

var interfaceConfig = {
	chooseInterfaceUrls: function() {
		switch (globals.crm) {
			case 'local':
				//urls.productUrl = 'http://localhost/natural/data/json.html?display=local_products';
				urls.productUrl = 'http://localhost/natural/data/products/local_products.json';
				interfaces.getProducts = localInterface.getProducts;
				break;
			case 'konnektive':
				interfaces.getProducts = konnektiveInterface.getProducts;

				var konnektiveSettings = {
					campaignId: '2',
					apiUserId: 'ddunnom_api',
					apiPassword: 'LevelIt!!99'
				}

				const konnektiveBaseUrl = `?campaignId=${konnektiveSettings.campaignId}&loginId=${konnektiveSettings.apiUserId}&password=${konnektiveSettings.apiPassword}`;

				urls.errorProductUrl = `https://api.konnektive.com/product/query/`;
				urls.productUrl = `https://api.konnektive.com/product/query/${konnektiveBaseUrl}`;
				//productUrl: `${globals.apiServer}/${globals.crm}/products/${globals.campaignId}`,
				urls.importLead = `https://api.konnektive.com/leads/import/${konnektiveBaseUrl}`;
				//importLead: `${globals.apiServer}/${globals.crm}/postLead`,
				urls.importOrder = `https://api.konnektive.com/order/import/${konnektiveBaseUrl}`;

				// direct from konnektive
				// const urls = {
				// 	productUrl: `${globals.apiServer}/${globals.crm}/products/${globals.campaignId}`,
				// 	importLead: `https://api.konnektive.com/leads/import/${baseUrl}`,
				// 	importOrder: `https://api.konnektive.com/order/import/${baseUrl}`
				// };
				break;
		}
	}
}

export { interfaceConfig, urls, interfaces };