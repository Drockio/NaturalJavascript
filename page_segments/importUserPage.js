import { urls, globals } from '../js/config.js';
import { message } from '../js/message.js';
import { validate } from '../js/validation.js';
import { storage } from '../js/crud.js';
import { locale } from '../js/locale.js';
import { util } from '../js/util.js';
import { templates } from '../templates/_templateController.js';
import { modal } from '../page_segments/modal.js';
import { shoppingCartPage } from './shoppingCartPage.js';
import { shoppingCart } from '../js/shoppingCart.js';

const importUserPage = { 
	postStandardInputs: function(){
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
	getStandardInputs: function(){
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
	submitRegistrationForm: function(){
		if (validate.validateForm('registration'))
        {
        	this.getStandardInputs();
        	//TODO: Put this back in after konnektive import user works.
        	//if (this.postStandardInputs())
        	//{
        		//message.post('displayCreditCardPage');
        	//}
        	return true;
        } 
        else 
        {
        	event.preventDefault();
        	return false;
    	}
	},
	populateStandardInputs: function(standardInputs){
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
		$(shoppingCart.displayTotalTarget).text(shoppingCart.getTotal());
	},
	display: function() {
		let shoppingCart = storage.getCart();
		shoppingCart.campaignid = globals.campaignId;
		let checkoutFormTemplate = templates.getHTML_importUserForm({'title': 'Registration Information', 'formName': 'registration'});
		let productMarkup = templates.getHTML_products(shoppingCart);
		let checkoutFormTop = templates.getHTML_importUserPage({"checkoutForm": checkoutFormTemplate, productsInCart: productMarkup});
		let standardInputs = storage.getGeneric('standardInputs');
		let countryCode = standardInputs['countryCode'] || globals.defaultCountryCode;
		let state = standardInputs['state'];

		let continueButton = {'name': 'Continue', 'attributes': [{ 'form': 'registration-form' }, {'type': 'submit'}]};
		modal.display('Checkout', checkoutFormTop, continueButton, { 'name': 'Back'});
		importUserPage.displayTotal();

		this.populateStandardInputs(standardInputs);
		$('#country').append(locale.getCountriesSelectList(countryCode));
		$('#state').append(locale.getStateSelectList(countryCode, state));

	  	$('#country').on('change', function(){
			locale.setStatesSelectList($('#country :selected').val(), $('#state'), $('#lblState'));
		});

		util.scrollTopModal();

		$('.navigation.backward').click(function(){
			message.post('displayShoppingCartPage');
		});

		$('#registration-form :input').on('focus', function(){
			$(this).removeClass('validation-error');
		});

		$('#registration-form').submit(function(event){
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
};

export { importUserPage };