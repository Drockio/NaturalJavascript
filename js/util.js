import { locale } from './locale.js';

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
	getUrlParameter: function getUrlParameter(sParam) {
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
	getListOfMonths: function(language){
		let accumulator = '';
		let currentMonth = new Date().getMonth() + 1;
		locale.months.map(item => {
			let monthCode = Object.keys(item)[0];
			let month = Object.values(item)[0];
			let selected = (Number(monthCode) === currentMonth) ? 'selected' : '';
			accumulator += `<option value="${monthCode}" ${selected}>${month}</option>`;
		});
		return accumulator;
	},
	getNextXYears: function(numYears){
		let year = new Date().getFullYear();
		let accumulator = '';
		for (let y = year; y < year + 15; y += 1){
			accumulator += `<option>${y}</option>`;
		}
		return accumulator;
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