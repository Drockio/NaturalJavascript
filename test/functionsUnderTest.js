const locale = require('../js/locale.js').locale;
const message = require('../js/message.js').message;
const broadcast = require('../js/message.js').broadcast;

const functions = [
	//locale.js
	{'locale.setStatesSelectList': locale.setStatesSelectList},
	{'locale.getStateSelectList': locale.getStateSelectList},
	{'locale.getCountriesSelectList': locale.getCountriesSelectList},
	{'locale.getCountryBlob': locale.getCountryBlob}
];

export { functions };