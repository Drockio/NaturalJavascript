//this will likely be set per website.
const globals = {
	apiServer: `https://localhost`,
	crm: `konnektive`,
	campaignId: '2',
	apiUserId: 'ddunnom_api',
	apiPassword: 'LevelIt!!99',
	//domainName: 'http://localhost',
	domainName: '*',
	defaultCountryCode: 'US',
	TAKETHISOUT: 4.44
};

const baseUrl = `?campaignId=${globals.campaignId}&loginId=${globals.apiUserId}&password=${globals.apiPassword}`;

// direct from konnektive
// const urls = {
// 	productUrl: `${globals.apiServer}/${globals.crm}/products/${globals.campaignId}`,
// 	importLead: `https://api.konnektive.com/leads/import/${baseUrl}`,
// 	importOrder: `https://api.konnektive.com/order/import/${baseUrl}`
// };

const urls = {
	errorProductUrl: `https://api.konnektive.com/product/query/`,
	productUrl: `https://api.konnektive.com/product/query/${baseUrl}`,
	//productUrl: `${globals.apiServer}/${globals.crm}/products/${globals.campaignId}`,
	importLead: `https://api.konnektive.com/leads/import/${baseUrl}`,
	//importLead: `${globals.apiServer}/${globals.crm}/postLead`,
	importOrder: `https://api.konnektive.com/order/import/${baseUrl}`
};

export { urls, baseUrl, globals };