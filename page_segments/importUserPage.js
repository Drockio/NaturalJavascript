import { urls, globals } from '../js/config.js';
import { message } from '../js/message.js';
import { validate } from '../js/validation.js';
import { storage } from '../js/crud.js';
import { locale } from '../js/locale.js';
import { util } from '../js/util.js';
import { templates } from '../templates/_templateController.js';
import { modal } from '../page_segments/modal.js';
import { shoppingCartPage } from './shoppingCart.js';

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
        	if (this.postStandardInputs())
        	{
        		message.post('displayCreditCardPage');
        	}
        	return true;
        } 
        else 
        {
        	event.preventDefault();
        	return false;
    	}
	},
	populateStandardInputs: function(){
		let standardInputs = storage.getGeneric('standardInputs');
		util.setUIValueByName('firstName', standardInputs['firstName']);
		util.setUIValueByName('lastName', standardInputs['lastName']);
		util.setUIValueByName('address1', standardInputs['address1']);
		util.setUIValueByName('address2', standardInputs['address2']);
		util.setUIValueByName('postalCode', standardInputs['postalCode']);
		util.setUIValueByName('city', standardInputs['city']);
		util.setUIValueByName('state', standardInputs['state']);				//view link for state
		util.setUIValueByName('country', standardInputs['country']);
		util.setUIValueByName('emailAddress', standardInputs['emailAddress']);//online campaigns
		util.setUIValueByName('phoneNumber', standardInputs['phoneNumber']);
	},
	display: function() {
		let shoppingCart = storage.getCart();
		shoppingCart.campaignid = globals.campaignId;
		let checkoutFormTemplate = templates.getCheckoutForm({'title': 'Registration Information', 'formName': 'registration'});
		let productMarkup = templates.getProductMarkupTemplate(shoppingCart);
		let checkoutFormTop = templates.getCheckoutFormtop({"checkoutForm": checkoutFormTemplate, productsInCart: productMarkup});

		let continueButton = {'name': 'Continue', 'attributes': [{ 'form': 'registration-form' }, {'type': 'submit'}]};
		modal.display('Checkout', checkoutFormTop, continueButton, { 'name': 'Back'});
		shoppingCartPage.displayTotal();

		$('#state').append(locale.getStatesSelectList());
		$('#country').append(locale.getCountriesSelectList('CA'));

		//retrieve user information if available
		this.populateStandardInputs();
		util.scrollTopModal();

		$('.navigation.backward').click(function(){
			message.post('displayCart');
		});

		$('#registration-form :input').on('focus', function(){
			$(this).removeClass('validation-error');
		});

		$('#registration-form').submit(function(event){
			if (!importUserPage.submitRegistrationForm())
			{
				message.post('scrollToTop');
			}
	    });
	},
};

export { importUserPage };