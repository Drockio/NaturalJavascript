import { message } from '../js/message.js';
import { vic20 } from '../page_segments/vic20.js';

const vic20Controller = {

	registerPageDisplayListeners: function(){
		message.listen('displayInterface', function(){
			vic20.display();
		});
	}
}

export { vic20Controller };