const templates = {
	//DD here is defined in the grunt job that compiles the templates of all freakin' places.
	getHtmlTemplate: function(name, context) {
		name = `templates/${name}.handlebars`;
		return $(DD[name](context)).html().trim();
	},
	getHtml: function(name, context) {
		name = `templates/${name}.handlebars`;
		return $(DD[name](context)).html().trim();
	},

	getHTML_products: function(jData){
		let result = jData.reduce((accumulator, current) => { return accumulator += this.getHtml('products', current); },'');
		return result;
	},
	getHTML_shoppingCartPage: function(productMarkup){
		return this.getHtml('shoppingCartPage', {"productMarkup": productMarkup});
	},
	getHTML_importUserPage: function(jData){
		return this.getHtml('importUserPage', jData);
	}
};

export { templates };