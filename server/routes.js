let getRates = require('./getRates');

module.exports = function(app) {

	// to get the latest rates, call the getLatestRates method on the exchanges object
	app.get('/api/v1/getlatestrates', function(req, res) {
		res.status(200).send(JSON.stringify(exchanges.getLatestRates()));
	})

	// to get history, send back the full object
	// TODO: make a method that returns a set amount of records, because this could get big if the server stays up and running for a long time
	app.get('/api/v1/getratehistory', function(req, res) {
		res.status(200).send(JSON.stringify(exchanges));
	})
}
