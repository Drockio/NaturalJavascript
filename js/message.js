import { globals } from './config.js';
import { util } from './util.js';
import { storage } from './crud.js';

const message = {
	post: function(message, jData){
		//note: you could send a JSON object as value of second param.
		window.parent.postMessage({"action": message, "payload": jData},`${globals.domainName}`);
	},

	listen: function(action, fn){ 
		window.addEventListener("message", function(event){
			const eventAction = event.data["action"];
			const eventData = event.data["payload"];
			if (eventAction === action){
				fn(eventData);
			}
		});
	},
};

const broadcast = {
	error: function(data){
		let jsonData = typeof(data) === 'string' ? JSON.parse(data) : data;
		if (jsonData){
			let html = `<div class="error"><h3>${jsonData['result']}</h3>${jsonData['message']}</div>`;
			$('.message-blank').html(html);

			console.log(`${jsonData['result']} - ${jsonData['message']}`);

			storage.setError(data);
			util.scrollTopModal();
		}
	},
	message: function(data){
		console.log(`message: ${data}`);
		storage.setMessage(data);
		util.scrollTopModal();
	}
};

export { message, broadcast };