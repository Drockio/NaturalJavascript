this["DD"] = this["DD"] || {};

this["DD"]["templates/checkoutForm-top.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<script id=\"checkoutFormTop\" type=\"text/x-handlebars-template\">\n	<div class=\"checkoutForm-container\">\n		<div class=\"checkoutForm\">\n			"
    + ((stack1 = ((helper = (helper = helpers.checkoutForm || (depth0 != null ? depth0.checkoutForm : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"checkoutForm","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n		</div>\n		<div class=\"productsInCart\">\n			<h2 class=\"underline\">Checkout Items</h2>\n			<div class=\"rounded\">\n				"
    + ((stack1 = ((helper = (helper = helpers.productsInCart || (depth0 != null ? depth0.productsInCart : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productsInCart","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n			</div>\n			<div class=\"checkoutTotals\">\n				<span>Total:</span>\n				<span class=\"grandTotal\"></span>\n			</div>\n		</div>\n	</div>\n</script>";
},"useData":true});

this["DD"]["templates/checkoutForm.handlebars"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "      		<div class=\"field\" for=\"email\">\n		      	<label for=\"email\">Email*</label>\n		      	<input type=\"email\" id=\"email\" placeholder=\"Email\" name=\"emailAddress\" data-required-type=\"email\" data-required-message=\"Please provide a valid.\"></input>\n	      	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<script id=\"checkoutForm\" type=\"text/x-handlebars-template\">\n   <div id=\"registration\">\n      <form id=\""
    + alias4(((helper = (helper = helpers.formName || (depth0 != null ? depth0.formName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formName","hash":{},"data":data}) : helper)))
    + "-form\" novalidate>\n      	<fieldset>\n      		<h2 class=\"underline\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.includeEmail : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	      	<div class=\"field\">\n		      	<label for=\"first-name\">First name*</label>\n		      	<input type=\"text\" id=\"first-name\" placeholder=\"First name\" name=\"firstName\" data-required-type=\"name\" data-required-message=\"Please provide a first name.\"></input>\n	      	</div>\n	      	<div class=\"field\">\n		      	<label for=\"last-name\">Last name*</label>\n		      	<input type=\"text\" id=\"last-name\" placeholder=\"Last name\" name=\"lastName\" data-required-type=\"name\" data-required-message=\"Please provide a last name.\"></input>\n	      	</div>\n	      	<div class=\"field\">\n		      	<label for=\"address\">Address*</label>\n		      	<input type=\"text\" id=\"address\" placeholder=\"Address\" name=\"address1\" data-required-type=\"address\" data-required-message=\"Please provide a valid address.\"></input>\n	      	</div>\n	      	<div class=\"field\">\n		      	<label for=\"apartment-suite\">Apartment or suite</label>\n		      	<input type=\"text\" id=\"apartment-suite\" placeholder=\"Apt, suite, etc. (optional)\" name=\"address2\"></input>\n	      	</div>\n	      	<div class=\"field\">\n		      	<label for=\"city\">City*</label>\n		      	<input type=\"text\" id=\"city\" placeholder=\"City\" name=\"city\" data-required-type=\"city\" data-required-message=\"Please provide a city.\"></input>\n	      	</div>\n	      	<div class=\"field\">\n		      	<label for=\"country\">Country</label>\n		      	<select id=\"country\" name=\"country\"></select>\n	      	</div>\n	      	<div class=\"field\">\n		      	<label for=\"state\" id=\"lblState\">State</label>\n		      	<select id=\"state\" name=\"state\"></select>\n	      	</div>\n	      	<div class=\"field\">\n		      	<label for=\"zip\">Zip code*</label>\n		      	<input type=\"text\" id=\"zip\" placeholder=\"ZIP code\" name=\"postalCode\" data-required-type=\"zip\" data-required-message=\"Please provide a valid zip code.\"></input>\n	      	</div>\n	      	<div class=\"field\" for=\"phone\">\n		      	<label for=\"phone\">Phone*</label>\n		      	<input type=\"tel\" id=\"phone\" placeholder=\"Phone\" name=\"phoneNumber\" data-required-type=\"phone\" data-required-message=\"Please enter a phone number.\"></input>\n	      	</div>\n	      </fieldset>\n      </form>\n   </div>\n</script>\n\n\n";
},"useData":true});

this["DD"]["templates/creditCard.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<script id=\"creditCard\" type=\"text/x-handlebars-template\">\n	<div class=\"creditCardContainer\">\n		<div class=\"productsInCart\">\n			<h2 class=\"underline\">Checkout items:</h2>\n			<div class=\"rounded\">\n				"
    + ((stack1 = ((helper = (helper = helpers.productsInCart || (depth0 != null ? depth0.productsInCart : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productsInCart","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n			</div>\n			<div class=\"checkoutTotals\">\n				<span>Total:</span>\n				<span class=\"grandTotal\"></span>\n			</div>\n		</div>\n		<form id=\"creditCard\" novalidate>\n			<fieldset>\n				<h2 class=\"underline\">Enter your card information</h2>\n				<div class=\"field\">\n					<label for=\"cardNumber_id\">Card number</label>\n					<input type=\"text\" id=\"cardNumber_id\" name=\"cardNumber\" data-required-type=\"credit-card\" data-required-message=\"Please enter a valid credit card number.\">\n					</input>\n				</div>\n				<div class=\"horizontalRow\">\n					<div class=\"field\">\n						<label for=\"firstName_id\">First Name</label>\n						<input type=\"text\" id=\"firstName_id\" name=\"firstName\" class=\"spacer\" data-required-type=\"name\" data-required-message=\"Enter first name.\"></input>\n					</div>\n					<div class=\"field\">\n						<label for=\"lastName_id\">Last Name</label>\n						<input type=\"text\" id=\"lastName_id\" name=\"lastName\" data-required-type=\"name\" data-required-message=\"Enter last name.\"></input>\n					</div>\n				</div>\n				<div class=\"horizontalRow\">\n					<div class=\"field\">\n						<label for=\"cardMonth_id\">Month</label>\n						<select id=\"cardMonth_id\" name=\"cardMonth\" class=\"spacer\"></select>\n					</div>\n					<div class=\"field\">\n						<label for=\"cardYear_id\">Year</label>\n						<select id=\"cardYear_id\" name=\"cardYear\" ></select>\n						</input>\n					</div>\n				</div>\n				<div class=\"field short\">\n					<label for=\"cardSecurityCode_id\">Security code</label>\n					<input type=\"text\" id=\"cardSecurityCode_id\" name=\"cardSecurityCode\" data-required-type=\"security-code\" data-required-message=\"Enter security code.\"></input>\n				</div>\n			</fieldset>\n		</form>\n		"
    + ((stack1 = ((helper = (helper = helpers.shipToChoiceContainer || (depth0 != null ? depth0.shipToChoiceContainer : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipToChoiceContainer","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n		<div id=\"checkoutFormContainer\">\n			"
    + ((stack1 = ((helper = (helper = helpers.checkoutForm || (depth0 != null ? depth0.checkoutForm : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"checkoutForm","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n		</div>\n	</div>\n</script>\n\n\n\n";
},"useData":true});

this["DD"]["templates/footer.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<script id=\"footer\" type=\"text/x-handlebars-template\">\n    <div class=\"related-links\">\n        <ul>\n            <li>\n                <a href=\"https://store.draxe.com/\" target=\"_blank\">dr. axe</a>\n            </li>\n            <li>\n                <a href=\"https://athleticgreens.com/\" target=\"_blank\">athletic greens</a>\n            </li>\n            <li>\n                <a href=\"https://truenutrition.com/\" target=\"_blank\">truenutrition</a>\n            </li>\n            <li>\n                <a href=\"https://www.truthnutra.com\" target=\"_blank\">truthnutra</a>\n            </li>\n        </ul>\n    </div>\n</script>\n\n\n\n";
},"useData":true});

this["DD"]["templates/mainProduct.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<script id=\"mainProduct\" type=\"text/x-handlebars-template\">\n	<div class=\"product\">\n		<img src=\""
    + alias4(((helper = (helper = helpers.productImagePath || (depth0 != null ? depth0.productImagePath : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productImagePath","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.productName || (depth0 != null ? depth0.productName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productName","hash":{},"data":data}) : helper)))
    + "\" />\n		<div class=\"productInfo\">\n			<h3>"
    + alias4(((helper = (helper = helpers.productName || (depth0 != null ? depth0.productName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productName","hash":{},"data":data}) : helper)))
    + "</h3>\n			<p class=\"description\">"
    + alias4(((helper = (helper = helpers.productDescription || (depth0 != null ? depth0.productDescription : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productDescription","hash":{},"data":data}) : helper)))
    + "</p>\n			<input type=\"button\" class=\"purchase\" data-campaignId="
    + alias4(((helper = (helper = helpers.campaignId || (depth0 != null ? depth0.campaignId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"campaignId","hash":{},"data":data}) : helper)))
    + " data-productId="
    + alias4(((helper = (helper = helpers.productId || (depth0 != null ? depth0.productId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productId","hash":{},"data":data}) : helper)))
    + " value=\""
    + alias4(((helper = (helper = helpers.currencySymbol || (depth0 != null ? depth0.currencySymbol : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencySymbol","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + "\"></input> \n		</div>\n	</div>\n</script>\n\n\n";
},"useData":true});

this["DD"]["templates/modal.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<script id=\"modal\" type=\"text/x-handlebars-template\">\n	<div>\n		<div class=\"modal-header\">\n          <span class=\"close\">&times;</span>\n          <h2>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n        </div>\n        <div class=\"modal-message\"></div>\n        <div class=\"modal-body\">"
    + ((stack1 = ((helper = (helper = helpers.markup || (depth0 != null ? depth0.markup : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"markup","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n        <div class=\"modal-footer\">"
    + ((stack1 = ((helper = (helper = helpers.forwardButton || (depth0 != null ? depth0.forwardButton : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"forwardButton","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ((stack1 = ((helper = (helper = helpers.backButton || (depth0 != null ? depth0.backButton : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backButton","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n    </div>\n</script>\n\n\n";
},"useData":true});

this["DD"]["templates/product.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<script id=\"product\" type=\"text/x-handlebars-template\">\n	<div class=\"product-container\" data-campaignId="
    + alias4(((helper = (helper = helpers.campaignId || (depth0 != null ? depth0.campaignId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"campaignId","hash":{},"data":data}) : helper)))
    + " data-productId="
    + alias4(((helper = (helper = helpers.productId || (depth0 != null ? depth0.productId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productId","hash":{},"data":data}) : helper)))
    + ">\n		<div class=\"imageContainer\">\n			<img src=\""
    + alias4(((helper = (helper = helpers.productImagePath || (depth0 != null ? depth0.productImagePath : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productImagePath","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.productName || (depth0 != null ? depth0.productName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productName","hash":{},"data":data}) : helper)))
    + "\" />\n		</div>\n		<div class=\"product-details\">\n    		<h3>"
    + alias4(((helper = (helper = helpers.productName || (depth0 != null ? depth0.productName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productName","hash":{},"data":data}) : helper)))
    + "</h3>\n    		<p class=\"price\">"
    + alias4(((helper = (helper = helpers.currencySymbol || (depth0 != null ? depth0.currencySymbol : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencySymbol","hash":{},"data":data}) : helper)))
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + "</p>\n	    </div>\n		<div class=\"product-modifier\">\n			<button class=\"minus\">-</button>\n			<input type=\"textbox\" data-productId=\""
    + alias4(((helper = (helper = helpers.productId || (depth0 != null ? depth0.productId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productId","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\" disabled/>\n			<button class=\"plus\">+</button>\n		</div>\n		<div class=\"deleteContainer\">\n			<span class=\"delete\">×</span>\n		</div>\n	</div>\n</script>";
},"useData":true});

this["DD"]["templates/productAndTotals.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<script id=\"productAndTotals\" type=\"text/x-handlebars-template\">\n	<div class=\"shoppingCart\">\n	   <div class=\"productsAndTotals\">\n	   		<h2 class=\"underline\">Your Items</h2>\n			<div class=\"rounded\">\n				"
    + ((stack1 = ((helper = (helper = helpers.productMarkup || (depth0 != null ? depth0.productMarkup : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"productMarkup","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n			</div>\n			<div>\n				<div class=\"checkoutTotals\">\n					<span>Total:</span>\n					<span class=\"grandTotal\"></span>\n				</div>\n			</div>\n		</div>\n	</div>\n</script>\n\n\n";
},"useData":true});

this["DD"]["templates/productMarkupTemplate.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<script id=\"productMarkupTemplate\" type=\"text/x-handlebars-template\">\n	<div class=\"product-container\" data-campaignId="
    + alias4(((helper = (helper = helpers.campaignId || (depth0 != null ? depth0.campaignId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"campaignId","hash":{},"data":data}) : helper)))
    + " data-productId="
    + alias4(((helper = (helper = helpers.productId || (depth0 != null ? depth0.productId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productId","hash":{},"data":data}) : helper)))
    + ">\n		<div class=\"product-details\">\n			<img src=\""
    + alias4(((helper = (helper = helpers.productImagePath || (depth0 != null ? depth0.productImagePath : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productImagePath","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.productName || (depth0 != null ? depth0.productName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productName","hash":{},"data":data}) : helper)))
    + "\" />\n			<div class=\"product-details-info\">\n				<h3>"
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + " X "
    + alias4(((helper = (helper = helpers.productName || (depth0 != null ? depth0.productName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productName","hash":{},"data":data}) : helper)))
    + "</h3>\n				&nbsp;-<p class=\"price\">"
    + alias4(((helper = (helper = helpers.currencySymbol || (depth0 != null ? depth0.currencySymbol : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencySymbol","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + "</p>\n			</div>\n		</div>\n	</div>\n</script>";
},"useData":true});

this["DD"]["templates/shipToChoiceContainer.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<script id=\"shipToChoiceContainer\" type=\"text/x-handlebars-template\">\n	<div class=\"shipToChoiceContainer\">\n		<h2 class=\"underline\">Ship to address</h2>\n		<div class=\"rounded visualBackground\">\n			<div class=\"shipToChoiceRow\">\n				<input type=\"radio\" name=\"billShipSame\" value=\"true\" checked=\"checked\"></input>\n				<div class=\"addressBlock\">\n					<p>"
    + alias4(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "</p>\n					<p>"
    + alias4(((helper = (helper = helpers.address1 || (depth0 != null ? depth0.address1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"address1","hash":{},"data":data}) : helper)))
    + "</p>\n					<p>"
    + alias4(((helper = (helper = helpers.address2 || (depth0 != null ? depth0.address2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"address2","hash":{},"data":data}) : helper)))
    + "</p>\n					<p><span>"
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + "</span> <span>"
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "</span> </p>\n					<p><span>"
    + alias4(((helper = (helper = helpers.postalCode || (depth0 != null ? depth0.postalCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postalCode","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.country || (depth0 != null ? depth0.country : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"country","hash":{},"data":data}) : helper)))
    + "</span></p>\n				</div>\n				<div class=\"edit\">\n					<p><button id=\"editAddress\" name=\"edit\">edit</button></p>\n				</div>\n			</div>\n			<div class=\"shipToChoiceRow narrow\">\n				<input type=\"radio\" name=\"billShipSame\" value=\"false\"></input>\n				<p class=\"altShipAddressLabel\">Ship to alternate address</p>\n			</div>\n		</div>\n	</div>\n</script>";
},"useData":true});

this["DD"]["templates/thankYouPage.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<script id=\"thankYouPage\" type=\"text/x-handlebars-template\">\n	<h2>Your products will be on their way shortly</h2>\n		<div class=\"rounded\">\n			"
    + ((stack1 = ((helper = (helper = helpers.productsInCart || (depth0 != null ? depth0.productsInCart : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"productsInCart","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n		</div>\n</script>";
},"useData":true});