import { urls, globals } from '../js/config.js';
import { message } from '../js/message.js';
import { validate } from '../js/validation.js';
import { storage } from '../js/crud.js';
import { locale } from '../js/locale.js';
import { util } from '../js/util.js';
import { dd$ } from '../js/extensions.js';
import { templates } from '../templates/_templateController.js';
import { modal } from '../page_segments/modal.js';
import { shoppingCartPage } from './shoppingCartPage.js';
import { shoppingCart } from '../js/shoppingCart.js';

const importUserPage = {
	display: function() {
		let cart = storage.getCart();
		let checkoutFormTemplate = templates.getHtml('checkout/importUserForm', ({'title': 'Registration Information', 'formName': 'registration'}));
		let productMarkup = templates.getHTML_products(cart);
		let checkoutFormTop = templates.getHtml('checkout/importUserPage', ({"checkoutForm": checkoutFormTemplate, productsInCart: productMarkup}));
		let standardInputs = storage.getGeneric('standardInputs');
		let countryCode = standardInputs['countryCode'] || globals.defaultCountryCode;
		let state = standardInputs['state'];

		let continueButton = {'name': 'Continue', 'attributes': [{ 'form': 'registration-form' }, {'type': 'submit'}]};
		modal
			.display('Checkout', checkoutFormTop, continueButton, { 'name': 'Back'})
			.addEventListeners();
		importUserPage.displayTotal();

		importUserPage.populateStandardInputs(standardInputs);
		dd$('#country').appendArray(locale.getCountriesSelectList(countryCode));
		dd$('#state').appendArray(locale.getStateSelectList(countryCode, state));

		return this;
	},
	addEventListeners: function(){
		//set the locale when the country changes
		dd$('#country').on('change', function(){
			locale.setStatesSelectList($('#country :selected').val(), $('#state'), $('#lblState'));
		});

		dd$('.navigation.backward').on('click', (function(){
			message.post('displayShoppingCartPage');
		}));

		//remove any error messages if they exist
		$('#registration-form :input').on('focus', function(){
			$(this).removeClass('validation-error');
		});

		//display creditcard page if validate otherwise scroll to top.
		//validate.validateform displays necessary messages
		$('#registration-form').submit(function(){
			if (importUserPage.submitRegistrationForm())
			{
				message.post('displayCreditCardPage');
			}
			else 
			{
				message.post('scrollToTop');
			}
	    });
	},
	submitRegistrationForm: function(){
		//handle results of form validation
		if (validate.validateForm('registration'))
        {
        	// store user input
        	importUserPage.storeStandardInputs();

        	return true;
        	// enable when konnektive pulls off their poopy pants 
        	//return importUserPage.postStandardInputs();
        } 
        else 
        {
        	event.preventDefault();
        	return false;
    	}
	},
	storeStandardInputs: function(){
		//retrieve user input
		let standardInputs = {
			"firstName": util.selectByName("firstName"),
			"lastName": util.selectByName("lastName"),
			"address1": util.selectByName("address1"),
			"address2": util.selectByName("address2"),
			"city": util.selectByName("city"),
			"state": util.selectByName("state"), //view link for state
			"postalCode": util.selectByName("postalCode"),		
			"country": util.selectByName("country"),
			"countryCode": document.querySelectorAll('#country option:checked')[0].value,
			"emailAddress": util.selectByName("emailAddress"), //online campaigns
			"phoneNumber": util.selectByName("phoneNumber"), 	//phone campaigns
			"ipAddress": '127.0.0.1',	//TODO: for online campaigns (must validate)
			"campaignId": globals.campaignId
			};
		storage.setGeneric('standardInputs', standardInputs);
		return standardInputs;
	},
	postStandardInputs: function(){
		//post the results to ecommerce crm
		let standardInputs = storage.getGeneric('standardInputs');
		let results = $.ajax({
			type: "POST",
			url: urls.importLead,
			data: standardInputs,
		})
		.done(function(data){
			if (JSON.parse(data).result === 'SUCCESS'){
				creditCardPage.setRegistrationSpecific(JSON.parse(data));
				return true;
			}
			else {
				broadcast.error(data);
				return false;
			}
		})
		.fail(function(response){
			broadcast.error({result: "ERROR", message: response.statusText});
			return false;
		});
	},
	populateStandardInputs: function(standardInputs){
		//grab previous inputs from storage and populate fields
		util.setUIValueByName('firstName', standardInputs['firstName']);
		util.setUIValueByName('lastName', standardInputs['lastName']);
		util.setUIValueByName('address1', standardInputs['address1']);
		util.setUIValueByName('address2', standardInputs['address2']);
		util.setUIValueByName('postalCode', standardInputs['postalCode']);
		util.setUIValueByName('city', standardInputs['city']);
		util.setUIValueByName('emailAddress', standardInputs['emailAddress']);//online campaigns
		util.setUIValueByName('phoneNumber', standardInputs['phoneNumber']);
	},
	displayTotal: function() {
		//display shopping cart total
		dd$(shoppingCart.displayTotalTarget).text(shoppingCart.getTotal());
	}
};

export { importUserPage };