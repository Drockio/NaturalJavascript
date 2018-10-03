function setCSSVar(name, value, unit) {
	var rootStyles = document.styleSheets[0].cssRules[0].style;
		rootStyles.setProperty(name, value + (unit || ''));
}

//extend javascipts Element with the custom function called onEvent.
//the name onEvent was chosen because it likely won't collide with future versions
//of javascript function names to add event listeners since the existing one has existed
//since around 1995 and there really isn't need for another besides aliasing 
//(using a name that makes you smile AND what I did here to make you smile).
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

String.prototype.toHTML = function() {
    let template = document.createElement('template');
    let html = this.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.childNodes;
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

//INPORTANT: Can't assign this to a variable (and then pass it to a function scope).
// function doTemplate(templateLiteral, string) {
// 	console.log(templateLiteral);
// }

// let template = `somebody ${jsonData}`;
// let json = 'needs a walk';
// doTemplate(template, json);


//todo: see if you can get the followisng template from a handlebars template:
let _library = {
	el: '',
	setOptionList: function(jsonData){
		let options = this.isJSON(jsonData) ? 
			jsonData.reduce((selectList, currentOption) => {
				return selectList += (currentOption.selected) ? 
						`<option value="${currentOption.value}" selected="selected">${currentOption.name}</option>`:
						`<option value="${currentOption.value}">${currentOption.name}</option>`;
				},'') : null;
		this.el.innerHTML = options;
		return options;
	},
	walkJSONPath: function(jsonData){

	},
	isJSON: function(dontKnow){
		return dontKnow && typeof dontKnow === 'object';
	},
	insertHTML: function(html){
		if (html){
     		this.el.innerHTML = html;
     	}
     	else 
     	{
     		console.log('no html to process');
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

