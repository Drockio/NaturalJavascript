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
	},

	recordForm: function(targetForm) {
		let target = `#${targetForm} :input`;
		let arr = [];
		$(target).each(function(){
			arr.push({"name": this.name, "value": this.value});
		});
		sessionStorage.setItem(targetForm, JSON.stringify(arr));
	},
	restoreForm: function(targetForm){
		let restoreData = JSON.parse(sessionStorage.getItem(targetForm))
		  .map(item => {
		  	$(`input[name=${item.name}`).val(item.value);
		  });
	},
};

export { storage };

