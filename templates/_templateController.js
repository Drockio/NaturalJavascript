const templates = {
	//DD here is defined in the grunt job that compiles the templates of all freakin' places.
	getHtmlTemplate: function(name, context) {
		name = `templates/${name}.handlebars`;
		return $(DD[name](context)).html().trim();
	},

	//Naming convention: get<returnType>_<templateName>
	//Where returnType is HTML and templateName is the name of the template in 
	//the templates directory, minus the .handlebars extension. Append the name
	//with 'Page' if it is an entire page.
	getHTML_shoppingCartPage: function(productMarkup){
		return this.getHtmlTemplate('shoppingCartPage', {"productMarkup": productMarkup});
	},
	getHTML_shoppingCartEmpty: function(){
		return this.getHtmlTemplate('shoppingCartEmpty');
	},
	getHTML_importUserPage: function(jData){
		return this.getHtmlTemplate('importUserPage', jData);
	},
	getHTML_importUserForm: function(jData){
		return this.getHtmlTemplate('importUserForm', jData);
	},
	getHTML_productWithModifiers: function(jData){
		return this.getHtmlTemplate('productWithModifiers', jData);
	},
	getHTML_product: function(jData){
		return this.getHtmlTemplate('product', jData);
	},
	getHTML_products: function(jData){
		let result = jData.reduce((accumulator, current) => { return accumulator += this.getHtmlTemplate('products', current); },'');
		return result;
	},
	getHTML_noProductChosen: function(jData){
		return this.getHtmlTemplate('noProductChosen', jData);
	},
	getHTML_categories: function(jData){
		return templates.getHtmlTemplate('categories', jData);
	},
	getHTML_creditCardPage: function(jData){
		return this.getHtmlTemplate('creditCardPage', jData);
	},
	getHTML_shipToAddressChoice: function(contactInfo){
		return this.getHtmlTemplate('shipToAddressChoice', contactInfo);
	},
	getHTML_thankYouPage: function(jData){
		return this.getHtmlTemplate('thankYouPage', jData);
	},
	getHTML_modal: function(jData){
		return this.getHtmlTemplate('modal', jData);
	},
	getHTML_footer: function(jData){
		return this.getHtmlTemplate('footer', jData);
	}
};

export { templates };