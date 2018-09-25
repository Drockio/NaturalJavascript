
function element(){
	this.enable = function(element){
		element.classList.remove("disabledElement");
		element.disabled = false;
	};

	this.disable = function(element){
		element.classList.add("disabledElement");
		element.disabled = true;
	};
}

export { element };
