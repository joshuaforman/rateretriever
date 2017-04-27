// let Model = require('./models/Model');
let Exchanges = require('./models/exchanges');
let Altcoins = require('./models/altcoins');
let getRates = require('./getRates');

module.exports = function() {
	// create altcoins with the coins we want to process
	altcoins = new Altcoins(['eth', 'ltc', 'dash']);

	// create exchanges as an array of both the bittrex and btce
	exchanges = new Exchanges();

	// run code to get rates every 5 seconds
	setInterval(() => {
		getRates();
	}, 10000)
}
