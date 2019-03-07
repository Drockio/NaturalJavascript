const time = {
	getListOfMonths: function(language){
		let accumulator = '';
		let currentMonth = new Date().getMonth() + 1;
		this.months.map(item => {
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

export { time };