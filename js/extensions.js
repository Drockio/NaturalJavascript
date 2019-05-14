import { templates } from '../templates/_templateController.js';

function setCSSVar(name, value, unit) {
	var rootStyles = document.styleSheets[0].cssRules[0].style;
		rootStyles.setProperty(name, value + (unit || ''));
}

Element.prototype.onEvent = function(event, fn){
	this.addEventListener(event, fn);
};

Element.prototype.insertHTML = function(html){
	this.innerHTML = html;
};

Element.prototype.removeChildren = function (){
	while (this.firstChild) {
    	this.removeChild(this.firstChild);
	}
};

//TODO hook this up here instead of in util.js
Array.prototype.fromObjectList = function(objectList){
    const result = [];
	const keys = Object.keys(objectList);
	for (let prop in keys) {
      	if (hasOwnProperty.call(keys, prop)) {
        	let item = objectList[keys[prop]];
        	result.push(item); 
      	}
	}
	return result;
};

// Object.prototype.firstKey = function(item){
// 	return Object.entries(item)[0][0];
// };

// Object.prototype.firstValue = function(item){
// 	return Object.entries(item)[0][1];
// };

//INPORTANT: Can't assign this to a variable (and then pass it to a function scope).
// function doTemplate(templateLiteral, string) {
// 	console.log(templateLiteral);
// }

// let template = `somebody ${jsonData}`;
// let json = 'needs a walk';
// doTemplate(template, json);


//todo: see if you can get the following template from a handlebars template:
let _library = {
	el: '',
	setTemplate: function(templateName){
		_library.el.forEach(element => {
			let templateHtml = templates.getHtml(templateName);
			element.innerHTML = templateHtml.trim();
		});
	},
	setDropDownList: function(array, selectId){
		if (array){
			_library.el.forEach(element => {
				let html = `<select id="${selectId}">`;
				array.forEach(function(item) {
					let key = Object.entries(item)[0][0] || "";
					let value = Object.entries(item)[0][1] || "";
					html += `<option value="${key}">${value}</option>`;
				});
				html += '</select>';
				element.innerHTML = html;
	   		});
	   	}
	},
	getDropDownValue: function(){
		return _library.el[0].selectedOptions[0].value;
	},
	isJSON: function(dontKnow){
		return dontKnow && typeof dontKnow === 'object';
	},
	insertHTML: function(html){
		if (html){
     		_library.el[0].innerHTML = html;
     	}
     	else 
     	{
     		console.log('no html to process in extensions.js | insertHTML(html)');
     	}
   	},
   	appendArray: function(array){
   		if (array){
	   		let children = array.join('');
	   		_library.el.forEach(element => {
	   			element.innerHTML = children;
	   		});
   		}
   	},
   	val: function(value){
   		_library.el.forEach(element => {
   			element.value = value;
   		});
   	},
   	text: function(value){
   		_library.el.forEach(element => {
   			element.textContent = value;
   		});
   	},
   	on: function(event, fn){
   		_library.el.forEach(element => {
   			element.addEventListener(event, fn);
   		});
   	}
};

function dd$(selector, template){
	let elements = document.querySelectorAll(selector);
	_library.el = elements;
	if (!_library.el){
		console.warn(`"${selector}" was not found.`);
	}
	return Object.assign({}, elements, _library);
}

export { dd$ };

