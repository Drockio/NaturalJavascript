// Element.prototype.removeChildren = function (){
// 	while (this.firstChild) {
//     	this.removeChild(this.firstChild);
// 	}
// };

String.prototype.toHTML = function() {
    let template = document.createElement('template');
    let html = this.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.childNodes; 
};

const css = {
	setVar: function(varName, varValue){
		var html = document.getElementsByTagName('html')[0];
		html.style.cssText = "--main-background-color: red";
	}
};

const dom_element = {
	disable: function(element){
		if (element && element.classList)
		{
			element.classList.add("disabledElement");
			element.disabled = true;
		}
	},
	enable: function(element){
		if (element && element.classList)
		{
			element.classList.remove("disabledElement");
			element.disabled = false;
		}
	},
	ensureIsElement: function(target){
		return (typeof target === 'object') ? target[0] : null;
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
	removeChildren: function(element){
		while (element.firstChild){
			element.removeChild(element.firstChild);
		}
	}
};

export { dom_element };