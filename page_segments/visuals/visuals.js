import { templates } from '../../templates/_templateController.js';
import { dd$ } from '../../js/extensions.js';

const visuals = {
	display: function(){
		//set up visuals
		dd$('.container').setTemplate('visuals');

		var context = this.initDrawing();
		this.drawRectangle(context, 50, 50, 150, 100, 'blue');
		this.displayText(context, 'Drockio', 60, 80, 'title');
		this.displayText(context, 'lorum ipsum', 60, 100);

		return this;
	},
	initDrawing: function(){
		var canvas = document.getElementById('visuals');
		canvas.width = 500;
		canvas.height = 750;
		var context = canvas.getContext('2d');
		return context;
	},
	drawRectangle: function(context, x, y, width, height, color){
		context.fillStyle = color;
		context.fillRect(x, y, width, height);
	},
	displayText: function(context, text, x, y, style){
		switch (style){
			case 'title':
				fontStyle.setTitle(context);
			default:
				fontStyle.setDefault(context);
		}
		
		context.fillText(text, x, y);
	}
}

//TODO: Figure out how to set multiple fonts or delete this functionatlity.
//Fontstyle seems to be set once per context.
const fontStyle = {
	setTitle: function(context){
		context.fillStyle = 'black';
		context.font = '30px Arial';
	},
	setDefault: function(context){
		context.fillStyle = 'black';
		context.font = '14px Helvetica';
	}
}
export { visuals };