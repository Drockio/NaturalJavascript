var storage = {
	getProducts: function() {
			return JSON.parse(sessionStorage.getItem('products')) || [];
		},
	setProducts: function(filtered) {
			sessionStorage.setItem('products', JSON.stringify(filtered));
		},
	setCart: function(shoppingCart) {
			sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
		},
	getCart: function() { 
			return JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
	},
	setGeneric: function(label, jsonArray){
			sessionStorage.setItem(label, JSON.stringify(jsonArray));
	},
	getGeneric: function(label){
			return JSON.parse(sessionStorage.getItem(label)) || [];
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
	setMessage: function(message){
		sessionStorage.setItem('message', JSON.stringify(message));
	},
	getMessage: function(){
		return JSON.parse(sessionStorage.getItem('message'));
	},
	setError: function(message){
		sessionStorage.setItem('error', JSON.stringify(message));
	},
	getError: function(){
		return JSON.parse(sessionStorage.getItem('error'));
	}
};

export { storage };

