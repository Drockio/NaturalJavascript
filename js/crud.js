var storage = {
	getGeneric: function(label){
		return JSON.parse(sessionStorage.getItem(label)) || [];
	},
	setGeneric: function(label, jsonArray){
		sessionStorage.setItem(label, JSON.stringify(jsonArray));
	},

	getProducts: function() {
		return this.getGeneric('products'); 
	},
	setProducts: function(filtered) {
		this.setGeneric('products', filtered);
	},

	setMasterCategoryArray: function(categoryArray) {
		storage.setGeneric('masterCategoryArray', categoryArray);
	},
	getMasterCategoryArray: function() {
		return storage.getGeneric('masterCategoryArray');
	},

	getCart: function() {
		return this.getGeneric('shoppingCart');
	},
	setCart: function(shoppingCart) {
		this.setGeneric('shoppingCart', shoppingCart);
	},

	getError: function(){
		return this.getGeneric('error');
	},
	setError: function(message){
		this.setGeneric('error', message);
	},

	getMessage: function(){
		return this.getGeneric('message');
	},
	setMessage: function(message){
		this.setGeneric('message', message);
	}
};

export { storage };

