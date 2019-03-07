import { message } from '../js/message.js';
import { visuals } from '../page_segments/visuals/visuals.js';

const visualsController = {
	registerPageDisplayListeners: function(){
		message.listen('displayVisuals', function(){ visuals.display(); });
	}
};

export { visualsController };