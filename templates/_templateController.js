const templates = {
	getHtmlTemplate: function(name, context) {
		name = `templates/${name}.handlebars`;
		return $(DD[name](context)).html();
	},
	getCheckoutForm: function(jData){
		return this.getHtmlTemplate('checkoutForm', jData);
	},
	getProductMarkupTemplate: function(jData){
		let result = jData.reduce((accumulator, current) => { return accumulator += this.getHtmlTemplate('productMarkupTemplate', current); },'');
		return result;
	},
	getCheckoutFormtop: function(jData){
		return this.getHtmlTemplate('checkoutForm-top', jData);
	},
	getProductAndTotals: function(productMarkup){
		return this.getHtmlTemplate('productAndTotals', {"productMarkup": productMarkup});
	},
	getProduct: function(jData){
		return this.getHtmlTemplate('product', jData);
	},
	getModal: function(jData){
		return this.getHtmlTemplate('modal', jData);
	},
	getMainProduct: function(jData){
		return this.getHtmlTemplate('mainProduct', jData);
	},
	getCreditCardMarkup: function(jData){
		return this.getHtmlTemplate('creditCard', jData);
	},
	getShipToChoiceContainer: function(contactInfo){
		return this.getHtmlTemplate('shipToChoiceContainer', contactInfo);
	},
	getThankYouPage: function(jData){
		return this.getHtmlTemplate('thankYouPage', jData);
	},
	getFooterMarkupTemplate: function(jData){
		return this.getHtmlTemplate('footer', jData);
	}
};

export { templates };