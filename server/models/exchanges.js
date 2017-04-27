
// Exchanges is an array of objects, one for each Exchange
let Exchanges = function() {
	this.exchanges = [];
}

// this method creates a new object in the array
Exchanges.prototype.addExchange = function(obj) {
	this.exchanges.push(obj);
}

// create a new key/value pair for the object with the given name. key is the name of the altcoin, rate is the exchange rate
Exchanges.prototype.setLastRate = function(name, altcoin, rate) {

	// find the records with the exchange name that is passed in
	let exchange = this.exchanges.filter((e) => {
		return e.name == name;
	});

	// find the last record of the resulting array, because this will be the one just created, and update the rate of this record.
	exchange[exchange.length-1][altcoin] = rate;
}

//
Exchanges.prototype.getLength = function() {
	return this.exchanges.length;
}

// gets the most recent set of latest rates for the given exchange, given altcoin
Exchanges.prototype.getLatestRates = function() {

	// if there is no data to return, then return an empty array. Else, return the last three exchange objects
	if (exchanges.exchanges.length) {
		return {exchanges: [
					this.exchanges[this.exchanges.length-4],
					this.exchanges[this.exchanges.length-3],
					this.exchanges[this.exchanges.length-2],
					this.exchanges[this.exchanges.length-1]
				]};
	} else {
		return {exchanges: []};
	}
}

// this method will take an altcoin in as an argument, then retreive the latest three exchanges objects (which will mean it will have the latest pull for bittrex, btce, and bter). It will then set a flag on the exchange that has the best rate for the given altcoin. The flag will have the key `[altcoin + 'Best']`
Exchanges.prototype.setLatestBest = function(altcoin) {

	// get the last three exchange objects
	let exs = this.getLatestRates();

	// set bestIndex  to store the index of the highest value. Start with it as null. If it gets through the for loop and is still null, then all values are equal
	let bestIndex;
	// cycle through the list, starting at second in the list
	for (let i = 1; i < exs.exchanges.length; i++) {
		// if there is a current bestIndex, then compare the current item in the list to bestIndex. If this value is higher, then set it as the bestIndex
		if (typeof bestIndex != 'undefined') {
			if (exs.exchanges[i]['btc_' + altcoin] > exs.exchanges[bestIndex]['btc_' + altcoin]) {
				bestIndex = i;
			}
		} else {
			// if there is not currently a best index set, then compare this value to the previous value in the list. If one of the two is higher than the other, then set that value as the bestIndex
			if (exs.exchanges[i]['btc_' + altcoin] > exs.exchanges[i-1]['btc_' + altcoin]) {
				bestIndex = i;
			} else if (exs.exchanges[i-1]['btc_' + altcoin] > exs.exchanges[i]['btc_' + altcoin]) {
				bestIndex = i-1;
			} // if they are equal do nothing
		}
	}

	// now that we are through all values in the list, if there is bestIndex set, then set the flag that this exchange has the best rate
	if (typeof bestIndex != 'undefined') {
		exs.exchanges[bestIndex][altcoin + 'Best'] = true;
	}
}

module.exports = Exchanges;
