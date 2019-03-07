//this will likely be set per website.

// defaultApplication options:
// ===========================
// greens
// visuals

var globals = {
	defaultApplication: 'visuals',
	apiServer: `https://localhost`,
	crm: `local`, //choices: konnecktive, local
	//domainName: 'http://localhost',
	domainName: '*',
	defaultCountryCode: 'US'
};

//moved to interfaces/_chooser.js
//const baseUrl = `?campaignId=${globals.campaignId}&loginId=${globals.apiUserId}&password=${globals.apiPassword}`;

// var urls = {
// 	errorProductUrl: `https://api.konnektive.com/product/query/`,
// 	productUrl: `https://api.konnektive.com/product/query/${baseUrl}`,
// 	//productUrl: `${globals.apiServer}/${globals.crm}/products/${globals.campaignId}`,
// 	importLead: `https://api.konnektive.com/leads/import/${baseUrl}`,
// 	//importLead: `${globals.apiServer}/${globals.crm}/postLead`,
// 	importOrder: `https://api.konnektive.com/order/import/${baseUrl}`
// };

export { globals };