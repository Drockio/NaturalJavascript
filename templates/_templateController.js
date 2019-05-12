const templates = {
	//DD is defined in the grunt job that compiles the templates in compiledHandlebars.js.
	getHtmlTemplate: function(name, context) {
		name = `templates/${name}.handlebars`;
		return $(DD[name](context)).html().trim();
	},
	getHtml: function(name, context) {
		name = `templates/${name}.handlebars`;
		return $(DD[name](context)).html().trim();
	},

	getHTML_products: function(jData){
		let result = jData.reduce((accumulator, current) => { return accumulator += this.getHtml('product/products', current); },'');
		return result;
	},
	getHTML_shoppingCartPage: function(productMarkup){
		return this.getHtml('checkout/shoppingCartPage', {"productMarkup": productMarkup});
	},
	getHTML_importUserPage: function(jData){
		return this.getHtml('importUserPage', jData);
	}
};

export { templates };