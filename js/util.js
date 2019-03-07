const util = {
	disableShroud: function(){
		$('#shroud').removeClass('shroudEnabled').hide();
		$('#loader').removeClass('loading').hide();
	},
	enableShroud: function(){
		$('#shroud').addClass('shroudEnabled').show();
		$('#loader').addClass('loading').show();
	},
	scrollTopModal: function(){
		$('#main-modal').animate({
		    scrollTop: $('.modal-content').offset().top
		}, 1000);
	},
	getUrlParameter: function(sParam) {
	    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        arrParameterPair,
	        result;
	    sURLVariables.map(sParameterPair => {
	    	arrParameterPair = sParameterPair.split('=');
	    	if (arrParameterPair[0] === sParam) {
	            result = arrParameterPair[1] === undefined ? true : arrParameterPair[1];
	        }
	    });
	    return result;
	},
	isNumber: function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	},
	// returns random number with min, max inclusive
	randomNumber: function(min, max){
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	arrayFromObjectList: function(objectList){
	    const result = [];
		const keys = Object.keys(objectList);
		for (let prop in keys) {
	      	if (hasOwnProperty.call(keys, prop)) {
	        	let item = objectList[keys[prop]];
	        	result.push(item); 
	      	}
		}
		return result;
	},

	setUIValueByName: function(identifier, value){
		if (value && document.querySelector(`[name="${identifier}"]`)){
			document.querySelector(`[name="${identifier}"]`).value = value;
		}
	},
	setUIById: function(id, value){
		if (value && id && document.getElementById(id)){
			document.getElementById(id).value = value;
		}
	},
	selectByName: function(identifier){
		return document.querySelector(`[name="${identifier}"]`).value;
	},
	getRadio: function(name){
		return document.querySelector(`input[name="${name}"]:checked`).value;
	},
	registerScroll: function(triggerElement, targetElement){
		$(triggerElement).click(function() {
		  $('html, body').animate({
		    scrollTop: $(targetElement).offset().top
		  }, 1000);
		});
	}
};

export { util };