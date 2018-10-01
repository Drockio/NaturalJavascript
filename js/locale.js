//TODO: Move the following functions and prototypes to extensions.js when npm test
//allows includes (instead of require);
//TODO: Review Konnektive info about state.

// Element.prototype.removeChildren = function (){
// 	while (this.firstChild) {
//     	this.removeChild(this.firstChild);
// 	}
// };

String.prototype.toHTML = function() {
    let template = document.createElement('template');
    let html = this.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.childNodes; 
};

function disable(element){
	element.classList.add("disabledElement");
	element.disabled = true;
}

function enable(element){
	element.classList.remove("disabledElement");
	element.disabled = false;
}

function ensureIsElement(target){
	return (typeof target === 'object') ? target[0] : target;
}

let locale = {
	getCountryBlob: function(countryCode){
		// let localeList = [];
		// locale.countries.forEach(item => {
		// 	let code = Object.entries(item)[1];
		// 	if (code[1] === countryCode){
		// 		//console.log(item.locales);
		// 		//console.log(item['locale-label']);
		// 		localeList.push(item.locales);
		// 	}
		// });

		return locale.countries.find(item => {
			return Object.entries(item)[1][1] === countryCode;
		});

		//console.log(states);
		//debugger;
		//return states.locales;
		//return localeList[0] ? localeList[0].map(item => `<option value="${item.stateCode}">${item.name}</option>`) : null;
	},
	getStateSelectList: function(countryCode, stateCode){
		let localeList = locale.getCountryBlob(countryCode);
		if (localeList.locales){
			return localeList ? localeList.locales.map(item => `<option value="${item.stateCode}" ${(item.stateCode === stateCode) ? 'selected' : ''}>${item.name}</option>`) : null;
		}
	},
	getCountriesSelectList: function(countryCode){ 
		return locale.countries.map(item => `<option value="${item.code}"${(item.code === countryCode) ? 'selected' : ''}>${item.name}</option>`);
	},
	setStatesSelectList: function(countryCode, stateElement, labelElement){
		stateElement = ensureIsElement(stateElement);
		//stateElement.removeChildren();
		let countryBlob = locale.getCountryBlob(countryCode);
		if (countryBlob && countryBlob.locales){
			labelElement = ensureIsElement(labelElement);
			enable(stateElement);
			stateElement.innerHTML = locale.getStateSelectList(countryBlob.code);
		}
		else {
			disable(stateElement);
		}
	},
	countries: [
		{"name": "Afghanistan", "code": "AF"},
		{"name": "Åland Islands", "code": "AX"},
		{"name": "Albania", "code": "AL"},
		{"name": "Algeria", "code": "DZ"},
		{"name": "American Samoa", "code": "AS"},
		{"name": "AndorrA", "code": "AD"},
		{"name": "Angola", "code": "AO"},
		{"name": "Anguilla", "code": "AI"},
		{"name": "Antarctica", "code": "AQ"},
		{"name": "Antigua and Barbuda", "code": "AG"},
		{"name": "Argentina", "code": "AR"},
		{"name": "Armenia", "code": "AM"},
		{"name": "Aruba", "code": "AW"},
		{"name": "Australia", "code": "AU"},
		{"name": "Austria", "code": "AT"},
		{"name": "Azerbaijan", "code": "AZ"},
		{"name": "Bahamas", "code": "BS"},
		{"name": "Bahrain", "code": "BH"},
		{"name": "Bangladesh", "code": "BD"},
		{"name": "Barbados", "code": "BB"},
		{"name": "Belarus", "code": "BY"},
		{"name": "Belgium", "code": "BE"},
		{"name": "Belize", "code": "BZ"},
		{"name": "Benin", "code": "BJ"},
		{"name": "Bermuda", "code": "BM"},
		{"name": "Bhutan", "code": "BT"},
		{"name": "Bolivia", "code": "BO"},
		{"name": "Bosnia and Herzegovina", "code": "BA"},
		{"name": "Botswana", "code": "BW"},
		{"name": "Bouvet Island", "code": "BV"},
		{"name": "Brazil", "code": "BR"},
		{"name": "British Indian Ocean Territory", "code": "IO"},
		{"name": "Brunei Darussalam", "code": "BN"},
		{"name": "Bulgaria", "code": "BG"},
		{"name": "Burkina Faso", "code": "BF"},
		{"name": "Burundi", "code": "BI"},
		{"name": "Cambodia", "code": "KH"},
		{"name": "Cameroon", "code": "CM"},
		{"name": "Canada", "code": "CA", "locale-label": "Province/Territories", "locales": [
			{"name":"Alberta","stateCode":"AB"},
			{"name":"British Columbia","stateCode":"BC"},
			{"name":"Manitoba","stateCode":"MB"},
			{"name":"New Brunswick","stateCode":"NB"},
			{"name":"Newfoundland and Labrador","stateCode":"NL"},
			{"name":"Northwest Territories","stateCode":"NT"},
			{"name":"Nova Scotia","stateCode":"NS"},
			{"name":"Nunavut","stateCode":"NU"},
			{"name":"Ontario","stateCode":"ON"},
			{"name":"Prince Edward Island","stateCode":"PE"},
			{"name":"Quebec","stateCode":"QC"},
			{"name":"Saskatchewan","stateCode":"SK"},
			{"name":"Yukon","stateCode":"YT"}
		]},
		{"name": "Cape Verde", "code": "CV"},
		{"name": "Cayman Islands", "code": "KY"},
		{"name": "Central African Republic", "code": "CF"},
		{"name": "Chad", "code": "TD"},
		{"name": "Chile", "code": "CL"},
		{"name": "China", "code": "CN"},
		{"name": "Christmas Island", "code": "CX"},
		{"name": "Cocos (Keeling) Islands", "code": "CC"},
		{"name": "Colombia", "code": "CO"},
		{"name": "Comoros", "code": "KM"},
		{"name": "Congo", "code": "CG"},
		{"name": "Congo, The Democratic Republic of the", "code": "CD"},
		{"name": "Cook Islands", "code": "CK"},
		{"name": "Costa Rica", "code": "CR"},
		{"name": "Cote D'Ivoire", "code": "CI"},
		{"name": "Croatia", "code": "HR"},
		{"name": "Cuba", "code": "CU"},
		{"name": "Cyprus", "code": "CY"},
		{"name": "Czech Republic", "code": "CZ"},
		{"name": "Denmark", "code": "DK"},
		{"name": "Djibouti", "code": "DJ"},
		{"name": "Dominica", "code": "DM"},
		{"name": "Dominican Republic", "code": "DO"},
		{"name": "Ecuador", "code": "EC"},
		{"name": "Egypt", "code": "EG"},
		{"name": "El Salvador", "code": "SV"},
		{"name": "Equatorial Guinea", "code": "GQ"},
		{"name": "Eritrea", "code": "ER"},
		{"name": "Estonia", "code": "EE"},
		{"name": "Ethiopia", "code": "ET"},
		{"name": "Falkland Islands (Malvinas)", "code": "FK"},
		{"name": "Faroe Islands", "code": "FO"},
		{"name": "Fiji", "code": "FJ"},
		{"name": "Finland", "code": "FI"},
		{"name": "France", "code": "FR"},
		{"name": "French Guiana", "code": "GF"},
		{"name": "French Polynesia", "code": "PF"},
		{"name": "French Southern Territories", "code": "TF"},
		{"name": "Gabon", "code": "GA"},
		{"name": "Gambia", "code": "GM"},
		{"name": "Georgia", "code": "GE"},
		{"name": "Germany", "code": "DE"},
		{"name": "Ghana", "code": "GH"},
		{"name": "Gibraltar", "code": "GI"},
		{"name": "Greece", "code": "GR"},
		{"name": "Greenland", "code": "GL"},
		{"name": "Grenada", "code": "GD"},
		{"name": "Guadeloupe", "code": "GP"},
		{"name": "Guam", "code": "GU"},
		{"name": "Guatemala", "code": "GT"},
		{"name": "Guernsey", "code": "GG"},
		{"name": "Guinea", "code": "GN"},
		{"name": "Guinea-Bissau", "code": "GW"},
		{"name": "Guyana", "code": "GY"},
		{"name": "Haiti", "code": "HT"},
		{"name": "Heard Island and Mcdonald Islands", "code": "HM"},
		{"name": "Holy See (Vatican City State)", "code": "VA"},
		{"name": "Honduras", "code": "HN"},
		{"name": "Hong Kong", "code": "HK"},
		{"name": "Hungary", "code": "HU"},
		{"name": "Iceland", "code": "IS"},
		{"name": "India", "code": "IN"},
		{"name": "Indonesia", "code": "ID"},
		{"name": "Iran, Islamic Republic Of", "code": "IR"},
		{"name": "Iraq", "code": "IQ"},
		{"name": "Ireland", "code": "IE"},
		{"name": "Isle of Man", "code": "IM"},
		{"name": "Israel", "code": "IL"},
		{"name": "Italy", "code": "IT"},
		{"name": "Jamaica", "code": "JM"},
		{"name": "Japan", "code": "JP"},
		{"name": "Jersey", "code": "JE"},
		{"name": "Jordan", "code": "JO"},
		{"name": "Kazakhstan", "code": "KZ"},
		{"name": "Kenya", "code": "KE"},
		{"name": "Kiribati", "code": "KI"},
		{"name": "Korea, Democratic People's Republic of", "code": "KP"},
		{"name": "Korea, Republic of", "code": "KR"},
		{"name": "Kuwait", "code": "KW"},
		{"name": "Kyrgyzstan", "code": "KG"},
		{"name": "Lao People's Democratic Republic", "code": "LA"},
		{"name": "Latvia", "code": "LV"},
		{"name": "Lebanon", "code": "LB"},
		{"name": "Lesotho", "code": "LS"},
		{"name": "Liberia", "code": "LR"},
		{"name": "Libyan Arab Jamahiriya", "code": "LY"},
		{"name": "Liechtenstein", "code": "LI"},
		{"name": "Lithuania", "code": "LT"},
		{"name": "Luxembourg", "code": "LU"},
		{"name": "Macao", "code": "MO"},
		{"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
		{"name": "Madagascar", "code": "MG"},
		{"name": "Malawi", "code": "MW"},
		{"name": "Malaysia", "code": "MY"},
		{"name": "Maldives", "code": "MV"},
		{"name": "Mali", "code": "ML"},
		{"name": "Malta", "code": "MT"},
		{"name": "Marshall Islands", "code": "MH"},
		{"name": "Martinique", "code": "MQ"},
		{"name": "Mauritania", "code": "MR"},
		{"name": "Mauritius", "code": "MU"},
		{"name": "Mayotte", "code": "YT"},
		{"name": "Mexico", "code": "MX"},
		{"name": "Micronesia, Federated States of", "code": "FM"},
		{"name": "Moldova, Republic of", "code": "MD"},
		{"name": "Monaco", "code": "MC"},
		{"name": "Mongolia", "code": "MN"},
		{"name": "Montserrat", "code": "MS"},
		{"name": "Morocco", "code": "MA"},
		{"name": "Mozambique", "code": "MZ"},
		{"name": "Myanmar", "code": "MM"},
		{"name": "Namibia", "code": "NA"},
		{"name": "Nauru", "code": "NR"},
		{"name": "Nepal", "code": "NP"},
		{"name": "Netherlands", "code": "NL"},
		{"name": "Netherlands Antilles", "code": "AN"},
		{"name": "New Caledonia", "code": "NC"},
		{"name": "New Zealand", "code": "NZ"},
		{"name": "Nicaragua", "code": "NI"},
		{"name": "Niger", "code": "NE"},
		{"name": "Nigeria", "code": "NG"},
		{"name": "Niue", "code": "NU"},
		{"name": "Norfolk Island", "code": "NF"},
		{"name": "Northern Mariana Islands", "code": "MP"},
		{"name": "Norway", "code": "NO"},
		{"name": "Oman", "code": "OM"},
		{"name": "Pakistan", "code": "PK"},
		{"name": "Palau", "code": "PW"},
		{"name": "Palestinian Territory, Occupied", "code": "PS"},
		{"name": "Panama", "code": "PA"},
		{"name": "Papua New Guinea", "code": "PG"},
		{"name": "Paraguay", "code": "PY"},
		{"name": "Peru", "code": "PE"},
		{"name": "Philippines", "code": "PH"},
		{"name": "Pitcairn", "code": "PN"},
		{"name": "Poland", "code": "PL"},
		{"name": "Portugal", "code": "PT"},
		{"name": "Puerto Rico", "code": "PR"},
		{"name": "Qatar", "code": "QA"},
		{"name": "Reunion", "code": "RE"},
		{"name": "Romania", "code": "RO"},
		{"name": "Russian Federation", "code": "RU"},
		{"name": "RWANDA", "code": "RW"},
		{"name": "Saint Helena", "code": "SH"},
		{"name": "Saint Kitts and Nevis", "code": "KN"},
		{"name": "Saint Lucia", "code": "LC"},
		{"name": "Saint Pierre and Miquelon", "code": "PM"},
		{"name": "Saint Vincent and the Grenadines", "code": "VC"},
		{"name": "Samoa", "code": "WS"},
		{"name": "San Marino", "code": "SM"},
		{"name": "Sao Tome and Principe", "code": "ST"},
		{"name": "Saudi Arabia", "code": "SA"},
		{"name": "Senegal", "code": "SN"},
		{"name": "Serbia and Montenegro", "code": "CS"},
		{"name": "Seychelles", "code": "SC"},
		{"name": "Sierra Leone", "code": "SL"},
		{"name": "Singapore", "code": "SG"},
		{"name": "Slovakia", "code": "SK"},
		{"name": "Slovenia", "code": "SI"},
		{"name": "Solomon Islands", "code": "SB"},
		{"name": "Somalia", "code": "SO"},
		{"name": "South Africa", "code": "ZA"},
		{"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
		{"name": "Spain", "code": "ES"},
		{"name": "Sri Lanka", "code": "LK"},
		{"name": "Sudan", "code": "SD"},
		{"name": "Suriname", "code": "SR"},
		{"name": "Svalbard and Jan Mayen", "code": "SJ"},
		{"name": "Swaziland", "code": "SZ"},
		{"name": "Sweden", "code": "SE"},
		{"name": "Switzerland", "code": "CH"},
		{"name": "Syrian Arab Republic", "code": "SY"},
		{"name": "Taiwan, Province of China", "code": "TW"},
		{"name": "Tajikistan", "code": "TJ"},
		{"name": "Tanzania, United Republic of", "code": "TZ"},
		{"name": "Thailand", "code": "TH"},
		{"name": "Timor-Leste", "code": "TL"},
		{"name": "Togo", "code": "TG"},
		{"name": "Tokelau", "code": "TK"},
		{"name": "Tonga", "code": "TO"},
		{"name": "Trinidad and Tobago", "code": "TT"},
		{"name": "Tunisia", "code": "TN"},
		{"name": "Turkey", "code": "TR"},
		{"name": "Turkmenistan", "code": "TM"},
		{"name": "Turks and Caicos Islands", "code": "TC"},
		{"name": "Tuvalu", "code": "TV"},
		{"name": "Uganda", "code": "UG"},
		{"name": "Ukraine", "code": "UA"},
		{"name": "United Arab Emirates", "code": "AE"},
		{"name": "United Kingdom", "code": "GB"},
		{"name": "United States", "code": "US", "locale-label": "State", "locales": [
			{"name":"Alabama","stateCode":"AL"},
			{"name":"Alaska","stateCode":"AK"},
			{"name":"Arizona","stateCode":"AZ"},
			{"name":"Arkansas","stateCode":"AR"},
			{"name":"California","stateCode":"CA"},
			{"name":"Colorado","stateCode":"CO"},
			{"name":"Connecticut","stateCode":"CT"},
			{"name":"Delaware","stateCode":"DE"},
			{"name":"District of Columbia","stateCode":"DC"},
			{"name":"Florida","stateCode":"FL"},
			{"name":"Georgia","stateCode":"GA"},
			{"name":"Hawaii","stateCode":"HI"},
			{"name":"Idaho","stateCode":"ID"},
			{"name":"Illinois","stateCode":"IL"},
			{"name":"Indiana","stateCode":"IN"},
			{"name":"Iowa","stateCode":"IA"},
			{"name":"Kansas","stateCode":"KS"},
			{"name":"Kentucky","stateCode":"KY"},
			{"name":"Lousiana","stateCode":"LA"},
			{"name":"Maine","stateCode":"ME"},
			{"name":"Maryland","stateCode":"MD"},
			{"name":"Massachusetts","stateCode":"MA"},
			{"name":"Michigan","stateCode":"MI"},
			{"name":"Minnesota","stateCode":"MN"},
			{"name":"Mississippi","stateCode":"MS"},
			{"name":"Missouri","stateCode":"MO"},
			{"name":"Montana","stateCode":"MT"},
			{"name":"Nebraska","stateCode":"NE"},
			{"name":"Nevada","stateCode":"NV"},
			{"name":"New Hampshire","stateCode":"NH"},
			{"name":"New Jersey","stateCode":"NJ"},
			{"name":"New Mexico","stateCode":"NM"},
			{"name":"New York","stateCode":"NY"},
			{"name":"North Carolina","stateCode":"NC"},
			{"name":"North Dakota","stateCode":"ND"},
			{"name":"Ohio","stateCode":"OH"},
			{"name":"Oklahoma","stateCode":"OK"},
			{"name":"Oregon","stateCode":"OR"},
			{"name":"Pennsylvania","stateCode":"PA"},
			{"name":"Rhode Island","stateCode":"RI"},
			{"name":"South Carolina","stateCode":"SC"},
			{"name":"South Dakota","stateCode":"SD"},
			{"name":"Tennessee","stateCode":"TN"},
			{"name":"Texas","stateCode":"TX"},
			{"name":"Utah","stateCode":"UT"},
			{"name":"Vermont","stateCode":"VT"},
			{"name":"Virginia","stateCode":"VA"},
			{"name":"Washington","stateCode":"WA"},
			{"name":"West Virginia","stateCode":"WV"},
			{"name":"Wisconsin","stateCode":"WI"},
			{"name":"Wyoming","stateCode":"WY"}
		]},
		{"name": "United States Minor Outlying Islands", "code": "UM"},
		{"name": "Uruguay", "code": "UY"},
		{"name": "Uzbekistan", "code": "UZ"},
		{"name": "Vanuatu", "code": "VU"},
		{"name": "Venezuela", "code": "VE"},
		{"name": "Viet Nam", "code": "VN"},
		{"name": "Virgin Islands, British", "code": "VG"},
		{"name": "Virgin Islands, U.S.", "code": "VI"},
		{"name": "Wallis and Futuna", "code": "WF"},
		{"name": "Western Sahara", "code": "EH"},
		{"name": "Yemen", "code": "YE"},
		{"name": "Zambia", "code": "ZM"},
		{"name": "Zimbabwe", "code": "ZW"}
	],
	months: [
		{"1":"January"},
		{"2":"February"},
		{"3":"March"},
		{"4":"April"},
		{"5":"May"},
		{"6":"June"},
		{"7":"July"},
		{"8":"August"},
		{"9":"September"},
		{"10":"October"},
		{"11":"November"},
		{"12":"December"}
	]
};

export { locale };


