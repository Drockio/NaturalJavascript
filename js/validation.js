
let validate = {
	checkValidation: function(item, regex){
		let result = regex.test(item);
		return result;
	}, 

	showInvalidMessage: function(item){
		item.placeholder = item.dataset['requiredMessage'];
		item.classList.add('validation-error');
		item.value = '';
	},
	getRegex: function (validationType){
		let regex = '';
		switch(validationType){
			case 'city':
			case 'name':
				regex = /^[a-zA-Z ]{2,30}$/;
				break;
			case 'email':
				regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				break;
			case 'address':
				regex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
				break;
			case 'zip':
				regex = /^\s*?\d{5}(?:[-\s]\d{4})?\s*?$/;
				break;
			case 'phone':
				regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; 
				break;
			case 'credit-card':
				regex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
				break;
			case 'security-code':
				regex = /^[0-9]{3,4}$/;
				break;
			default:
		}
		return regex;
	},
	formItem: function(item){
		//validation required if requiredType is present on element
		let regex = this.getRegex(item.dataset["requiredType"]);
		
		if (regex){
			let success = this.checkValidation(item.value, regex);
			if (!success){
				this.showInvalidMessage(item);
				return false;
			}
		}
		return true;
	},
	clearErrors: function(targetForm){
		$(this.getFormInputs(targetForm)).each(function(index,value){
			this.classList.remove("validation-error");
		});
	},
	getFormInputs: function(targetForm){
		return `#${targetForm} :input`;
	},
	validateForm: function(targetForm){
		let formValid = true;
		$(this.getFormInputs(targetForm)).each(function(){
			if (!validate.formItem(this)){
				formValid = false;
			}
		});
		if (formValid){
			this.clearErrors(targetForm);
		}
		return formValid;
	}
};

export { validate };

