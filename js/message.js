import { globals } from './config.js';

const message = {
	post: function(message, jData){
		//note: you could send a JSON object as value of first param.
		window.parent.postMessage({"action": message, "data": jData},`${globals.domainName}`); 
	},

	listen: function(action, fn){
		window.addEventListener("message", function(event){
			const eventAction = event.data["action"];
			if (eventAction === action){
				fn();
			}
		});
	},
};

export { message };