//TODO: sessionStorage or sessionStorage? 
//Use campaign 1 or 6 to display "NO products available"
//Use campaign 4,9 to work on some alignment issues.

//productId
//productName
//productDescription
//productImagePath
//campaignId
//price
//shippingPrice
//currencySymbol 

import { validate } from './validation.js';
import { storage } from './crud.js';
import { locale } from './locale.js';

let message;

//this will likely be set per website.
const globals = {
	campaignId: '2',
	apiUserId: 'ddunnom_api',
	apiPassword: 'LevelIt!!99',
	//domainName: 'http://localhost',
	domainName: '*',
	TAKETHISOUT: 4.44
};

const baseUrl = `?campaignId=${globals.campaignId}&loginId=${globals.apiUserId}&password=${globals.apiPassword}`;

const urls = {
	productUrl: `https://api.konnektive.com/product/query/${baseUrl}`,
	importLead: `https://api.konnektive.com/leads/import/${baseUrl}`,
	importOrder: `https://api.konnektive.com/order/import/${baseUrl}`
};

const templates = {
	getHtmlTemplate: function(name, context) {
		name = `templates/${name}.handlebars`;
		return $(DD[name](context)).html();
	},
	getCheckoutForm: function(jData){
		return this.getHtmlTemplate('checkoutForm', jData);
	},
	getProductMarkupTemplate: function(jData){
		let result = jData.reduce((accumulator, current) => { return accumulator += this.getHtmlTemplate('productMarkupTemplate', current); },'');
		return result;
	},
	getCheckoutFormtop: function(jData){
		return this.getHtmlTemplate('checkoutForm-top', jData);
	},
	getProductAndTotals: function(productMarkup){
		return this.getHtmlTemplate('productAndTotals', {"productMarkup": productMarkup});
	},
	getProduct: function(jData){
		return this.getHtmlTemplate('product', jData);
	},
	getModal: function(jData){
		return this.getHtmlTemplate('modal', jData);
	},
	getMainProduct: function(jData){
		return this.getHtmlTemplate('mainProduct', jData);
	},
	getCreditCardMarkup: function(jData){
		return this.getHtmlTemplate('creditCard', jData);
	},
	getShipToChoiceContainer: function(contactInfo){
		return this.getHtmlTemplate('shipToChoiceContainer', contactInfo);
	},
	getThankYouPage: function(jData){
		return this.getHtmlTemplate('thankYouPage', jData);
	},
	getFooterMarkupTemplate: function(jData){
		return this.getHtmlTemplate('footer', jData);
	}
};

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

const modal = {
	display: function(title, markup, forwardButtonJSON, backButtonJSON) {
			let attributes = {};
			attributes.forwardAttributes = (forwardButtonJSON && forwardButtonJSON.attributes) ? this.extractAttributes(forwardButtonJSON.attributes) : null;
			attributes.backwardAttributes = (backButtonJSON && backButtonJSON.attributes) ? this.extractAttributes(backButtonJSON.attributes) : null;
			attributes.forwardButton = (forwardButtonJSON && forwardButtonJSON.name) ? 
				`<button class="forward navigation" ${attributes.forwardAttributes || ''}>${forwardButtonJSON.name}</button>` : '';
			attributes.backButton = (backButtonJSON && backButtonJSON.name) ? 
				`<button class="backward navigation" ${attributes.backwardAttributes || ""}>${backButtonJSON.name}</button>` : '';
			attributes.title = title;
			attributes.markup = markup;

			let modalMarkup = templates.getModal(attributes);

			//TODO: Set these up as an event
			$('.modal-content').empty().append(modalMarkup);
			// modal close
		    $('.close').click(function() {
		        $('#main-modal').css('display', 'none');
		        $('body').removeClass('removeScroll');
		    });
		    $('#main-modal').css('display', 'block');
	},
	extractAttributes: function(jData){
		if (jData){
			let accumulator = '';
			jData.map(item => {
				Object.entries(item).forEach(([key, value]) => {
					accumulator += (`${key}="${value}" `);
				});
			});
			return accumulator;
		}
	}
};

const broadcast = {
	error: function(data){
		let jsonData = JSON.parse(data);
		if (jsonData){

			let errors = Object.entries(jsonData['message']).map(([key, value]) => {
				return `<span>${key} ${value}. </span>`; }
			).join(''); //join removes unwanted commas. darn commas!
			let html = `<div class="error"><h3>${jsonData['result']}</h3>${errors}</div>`;
			$('.modal-message').html(html);

			storage.setError(data);
			util.scrollTopModal();
		}
	},
	message: function(data){
		console.log(data);
		//joyous day!
		//TODO: put loading message on thank you page until this is received.
		storage.setMessage(data);
		util.scrollTopModal();
	}
};

const cart = {
	isCartEmpty: function() {
		return storage.getCart().length < 1;
		},
	alterQuantity: function(productId, int){
			let shoppingCart = storage.getCart();
			let index = shoppingCart.findIndex(element => { return element.productId.toString() === productId; });
			shoppingCart[index].quantity = (shoppingCart[index].quantity + int) > 0 ? (shoppingCart[index].quantity + int) : 0;
			storage.setCart(shoppingCart);
			//TODO: Declare an event for this and set that way.
			$(`.product-modifier input[data-productId='${productId}']`).val(shoppingCart[index].quantity);
			this.displayTotal();
		},
	productId: function(context){
		return context.closest('[data-productId]').dataset['productid'];
	},
	plusItem: function(){
		cart.alterQuantity(cart.productId(this), 1);
	},
	minusItem: function(){
		cart.alterQuantity(cart.productId(this), -1);
	},
	remove: function(productId){
			let shoppingCart = storage.getCart();
			shoppingCart = shoppingCart.filter(item => item.productId.toString() !== productId);
			storage.setCart(shoppingCart);
			//TODO: Declare an event for this and set that way.
			if (shoppingCart.length >= 1) { 
				this.display(); 
			} 
			else 
			{ 
				$('#main-modal').css('display', 'none');
				$('body').removeClass('removeScroll');
			}
		},
	removeItem: function(){
		cart.remove(cart.productId(this));
	},
	addItemTo: function(productId){
			let updated = false;
			let products = storage.getProducts();
			let shoppingCart = storage.getCart();

			//already in the cart, increment
			shoppingCart.map(item => {
				if (!updated && item.productId === Number(productId))
				{
					item.quantity += 1;
					updated = true;
				}
			});
			//item not found in the cart
			if (!updated){
				let chosenProduct = products.filter(item => item.productId === Number(productId));
				chosenProduct[0].quantity = 1;
				shoppingCart.push(chosenProduct[0]);
			}
			storage.setCart(shoppingCart);
		},
	getCleanedCart: function(){
		let cart = storage.getCart();
		let filtered = cart.filter(item => item.quantity > 0);
		storage.setCart(filtered);
		return filtered;
	},
	getProductMarkup: function(shoppingCart){
		let productMarkup = shoppingCart.reduce((accumulator, current) => {
			current.campaignId = globals.campaignId;
			current.price = (current.price) ? current.price : 0;
			return accumulator += templates.getProduct(current);
		},'');
		let productMarkupPlusTotals = templates.getProductAndTotals(productMarkup);
		return productMarkupPlusTotals;
			
	},
	displayTotal: function(){
		let shoppingCart = storage.getCart();
		let total = '$' + shoppingCart.reduce((accumulator,current) => {
			if (util.isNumber(current.quantity) && util.isNumber(current.price))
			{
				return accumulator + current.quantity * current.price;
			} else { return accumulator; }
		},0).toFixed(2);

		$('.grandTotal').text(total);
	},
	addEventListeners: function(){
		$('.modal-footer .navigation').click(function() {
			message.post('displayCheckout');
		});
		$('.minus').on('click', this.minusItem);
		$('.plus').on('click', this.plusItem);
		$('.delete').on('click', this.removeItem);
	},
	display: function(options){
		$('body').addClass('removeScroll');
		const SHOPPING_CART_HEADER = 'Add to Order';
		const shoppingCart = this.getCleanedCart();
		if (!this.isCartEmpty())
		{
			modal.display(SHOPPING_CART_HEADER, this.getProductMarkup(shoppingCart), { 'name': 'Checkout'});
			this.displayTotal();
			this.addEventListeners();
		} else {
			modal.display(SHOPPING_CART_HEADER, `<h2 class='modal-single-message'>No items in cart</h2>`);
		}
	}
};

const creditCardPage = {
	display: function() {
		let shoppingCart = storage.getCart();
		shoppingCart.campaignid = globals.campaignId;
		let productsInCart = templates.getProductMarkupTemplate(shoppingCart);
		let shipToChoiceContainer = templates.getShipToChoiceContainer(storage.getGeneric('standardInputs'));
		let checkoutFormTemplate = templates.getCheckoutForm({'title': 'Alternate Shipping Information', 'formName': 'altShipping', 'includeEmail': 'true'});
		let creditCardMarkup = templates.getCreditCardMarkup({productsInCart: productsInCart, shipToChoiceContainer: shipToChoiceContainer, "checkoutForm": checkoutFormTemplate});
		let continueButton = {'name': 'Place Order', 'attributes': [{'type': 'submit'}]};
		modal.display('Checkout', creditCardMarkup, continueButton, { 'name': 'Back'});
		cart.displayTotal();
		this.attachMonths();
		this.attachYears();

		//alt shipping address
		$('#state').append(locale.getStatesSelectList());
		$('#country').append(locale.getCountriesSelectList('CA'));

		$('.navigation.backward').click(function(){
			message.post('displayCheckout');
		});
		$('button[type="submit"]').on('click', function(){
			creditCardPage.submit();
		});
		$('button[name="edit"]').on('click', function(){
			message.post('displayCheckout');
		});
		$('input[name="billShipSame').on('click', creditCardPage.toggleBillShipSame);
		util.scrollTopModal();
		this.mockData();
	},
	mockData: function(){
		//TODO Set validation for credit cards
		util.setUIById('cardNumber_id', '5346131158777180');
		util.setUIById('firstName_id', 'spanky mc');
		util.setUIById('lastName_id', 'spankerson');
		util.setUIById('cardSecurityCode_id', '5577');
		util.setUIById('first-name', 'anotherPerson');
		util.setUIById('last-name', 'theirLastName');
		util.setUIById('address', '2nd best house');
		util.setUIById('apartment-suite', 'B apartment');
		util.setUIById('city', 'star prairie');
		util.setUIById('country', 'CA'); //TODO check to see if you use two letter country and state codes
		util.setUIById('state', 'MN');
		util.setUIById('zip', '54020');
		util.setUIById('phone', '555-1212');
	},
	getUrl: function(productsUrlSegement){
		return urls.importOrder + productsUrlSegement;
	},
	determineSuccess: function(data){
		let jsonResult = JSON.parse(data);
		if (jsonResult && jsonResult['result'] === 'ERROR'){
			broadcast.error(data);
			return false;
		}
		else
		{
			broadcast.message(data);
			return true;
		}
	},
	post: function(ccData, url){
		message.post('displayShroud');
		//make ajax call
		let results = $.ajax({
			type: "POST",
			url: url,
			data: ccData,
		})
		.done(function(response){
			message.post('hideShroud');
			if (creditCardPage.determineSuccess(response))
			{
				message.post('thankYouPage');
			}
		})
		.fail(function(response){
			message.post('hideShroud');
			broadcast.error(response);
		});
	},
	mapProducts: function(){
		//example output: &product1_id=256&product1_qty=3&product2_id=152&product2_qty=1
		let shoppingCart = storage.getCart();
		let accumulator = '';
		for (let i = 1; i < shoppingCart.length + 1; i += 1){
			accumulator += `&product${i}_id=${shoppingCart[i-1].productId}&product${i}_qty=${shoppingCart[i-1].quantity}`;
		} 
		return accumulator;
	},
	submit: function(){
		let billingShipSame = util.getRadio('billShipSame') === 'true' ? true : false;
		
		let billingShipValidated = !billingShipSame ? validate.validateForm('altShipping-form') : true;
		let ccValidated = validate.validateForm('creditCard');
		if (billingShipValidated && ccValidated){

			let binaryBillingShipSame = billingShipSame ? '1' : '0';
			let addShipData = billingShipSame === 'false' ? true : false;
			let ccData = {
				'paySource': 'CREDITCARD',
				'billingShipSame': binaryBillingShipSame
			};
			//if (!binaryBillingShipSame)  {ccData = $.extend(ccData, {'billingShipSame': binaryBillingShipSame})}
			if (addShipData){
				ccData = $.extend(ccData, this.getAltShippingInputs());
			}

			//name, address, email phone, campaignId
			let standardInputs = $.extend(ccData, storage.getGeneric('standardInputs'));

			//TODO QA this to make sure it works
			//orderId, etc retrieved from Konnektive
			let registrationInfo = $.extend(standardInputs, this.getRegistrationSpecific());

			//credit card number, etc..
			let creditCardInfo = $.extend(registrationInfo, this.getCreditCardPaySource());

			//format products that get sent on URL
			let productsUrlSegement = this.mapProducts();

			let api_url = this.getUrl(productsUrlSegement);

			this.post(ccData, api_url);
		}
	},
	billShipSameDisplay: function(action){
		let display = 'none';
		if (action === 'show'){
			display = 'flex';
		}
		$('#checkoutFormContainer').css('display', display);
	},
	toggleBillShipSame: function(){
		let display = $(this).val() === "true" ? false : true;
		$('#checkoutFormContainer').toggle(display);
	},
	getAltShippingInputs: function(){
		let altShippingInputs = {
			"shipFirstName": util.selectByName("firstName"),
			"shipLastName": util.selectByName("lastName"),
			"shipAddress1": util.selectByName("address1"),
			"shipAddress2": util.selectByName("address2"),
			"shipCity": util.selectByName("city"),
			"shipState": util.selectByName("state"), //view link for state
			"shipPostalCode": util.selectByName("postalCode"),		
			"shipCountry": util.selectByName("country")
			};
		storage.setGeneric('altShippingInputs', altShippingInputs);
		return altShippingInputs;
	},
	attachMonths: function(){
		let monthList = util.getListOfMonths();
		$('#cardMonth_id').append(monthList);
	},
	attachYears: function(){
		let yearList = util.getNextXYears(12);
		$('#cardYear_id').append(yearList);
	},
	getPaySource: function(paysource){
		switch(paysource.toUpperCase()){
			case 'CHECK':
				return 'CHECK';
			case 'DIRECTDEBIT':
				return 'DIRECTDEBIT';
			case 'CREDITCARD':
				return 'CREDITCARD';
			default:
				return 'ERROR_CONDITION';
		}
	},
	setRegistrationSpecific: function(jsonData){
		let registrationSpecific = {
			"result": jsonData.result,
			"agentUserId": jsonData.message.agentUserId,
			"customerId": jsonData.message.customerId,
			"orderId": jsonData.message.orderId
		};
		storage.setGeneric('registrationSpecific', registrationSpecific);
	},
	getRegistrationSpecific: function(){
		let registrationSpecific = storage.getGeneric('registrationSpecific');
	},
	//don't store this!!!!
	getCreditCardPaySource: function(){
		let creditCardPaySource = {
			"cardNumber": util.selectByName('cardNumber'),
			"cardMonth": util.selectByName('cardMonth'),
			"cardYear": util.selectByName('cardYear'),
			"cardSecurityCode": util.selectByName('cardSecurityCode')
		};
		return creditCardPaySource;
	}
};

const checkout = { 
	postStandardInputs: function(){
		let standardInputs = storage.getGeneric('standardInputs');
		let results = $.ajax({
			type: "POST",
			url: urls.importLead,
			data: standardInputs,
		})
		.done(function(data){
			creditCardPage.setRegistrationSpecific(JSON.parse(data));
		})
		.fail(function(response){
			//TODO: Make this fail!
			console.log('fail');
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
        	this.postStandardInputs();
        	message.post('displayCreditCardPage');
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
		cart.displayTotal();

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
			if (!checkout.submitRegistrationForm())
			{
				message.post('scrollToTop');
			}
	    });
	},
};

let product = {
	load: function(){
		$.getJSON(urls.productUrl, function (response) {
	    	const result = [];
	    	const keys = Object.keys(response.message);
	    	for (let prop in keys) {
		      	if (hasOwnProperty.call(keys, prop)) {
		        	let item = response.message[keys[prop]];
		        	result.push(item);
		      	}
	    	}

	    	//only shop products with in amage
		    let filtered = result.filter(item => { return item.productImagePath; });
		    
		    //put some values in there 
			filtered.forEach(item => item.price = globals.TAKETHISOUT);

		    storage.setProducts(filtered);
		    let defaulted = filtered.map(item => {
		    	item.productName = item.productName || 'Coming Soon';
		    	item.productDescription = item.productDescription || 'Description Coming Soon';
		    	item.currencySymbol = item.currencySymbol || 0;
		    	item.campaignId = globals.campaignId;
		    	return item;
		    });

		    let defaultedMarkup = defaulted.map(item => templates.getMainProduct(item));

		    //display results
		    $('.product-list').empty().append(defaultedMarkup);
		})
		.fail(function(response){console.log('error: ' + response.statusText);});

		//add to cart links
	  	$('.product-list').on('click', '.purchase', function(){
	  		cart.addItemTo(this.dataset["productid"] || 0, this.dataset["campaignid"] || 0);
	  		message.post('displayCart');
	  	});
	}
};

let thankYouPage = {
	success: function(){
		let shoppingCart = storage.getCart();
		shoppingCart.campaignid = globals.campaignId;
		let productsInCart = templates.getProductMarkupTemplate(shoppingCart);
		let thankYouPageTemplate = templates.getThankYouPage({productsInCart: productsInCart});
		modal.display('Thank You!', thankYouPageTemplate, { 'name': 'Close'});

		//These might have defunct info OR they might be useful?
		$('.error').val(storage.getMessage());
		$('.message').val(storage.getError());
	}
};

let homePage = {
	display: function(){
		let footerContent = templates.getFooterMarkupTemplate();
		$('.footer').empty().append(footerContent);
	}
};

message = {
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
	registerDisplayListeners: function(){
		message.listen('displayCart', function(){cart.display();});
		message.listen('displayCheckout', function(){checkout.display();});
		message.listen('displayCreditCardPage', function(){creditCardPage.display();});
		message.listen('displayProducts', function(){product.load();});
		message.listen('thankYouPage', function(){thankYouPage.success();});
		message.listen('displayShroud', function(){ util.enableShroud(); });
		message.listen('hideShroud', function(){ util.disableShroud(); });
		message.listen('scrollToTop', function(){util.scrollToTop();});
	},
	registerInteractionListeners: function() {
		$('#shopping-cart-click').click(function(){
	    	message.post('displayCart');
	  	});

	  	util.registerScroll('#click-home', '.container');
	  	util.registerScroll('#click-about', '.about');
	  	util.registerScroll('#click-products', '.products');
	  	util.registerScroll('#click-contact', '.email');
	  	util.registerScroll('.click-top', '.container');
	}
};

//main load function
window.onload=function(){
  	$(document).ready(function(){
  		//future admin option
  		//let setup = util.getUrlParameter('setup');
  		
  		message.registerDisplayListeners();
  		message.registerInteractionListeners();

  		message.post('displayProducts');
  		homePage.display();
	});
};

export { cart, creditCardPage };


