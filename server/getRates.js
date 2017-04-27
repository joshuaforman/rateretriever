let apiCalls = require('./outboundApi');
let moment = require('moment');

module.exports = function() {

	// create objects which will be pushed onto the Exchanges model when data is added to them.
	let bittrex = {name: 'bittrex', date: moment()};
	let btce = {name: 'btce', date: moment()};
	let bter = {name: 'bter', date: moment()};
	let poloniex = {name: 'poloniex', date: moment()}

	// make the call to get the rates for the three altcoins from the three providers
	return Promise.all([
			getBittrexRate('eth'),
			getBittrexRate('ltc'),
			getBittrexRate('dash'),
			getBtceRates('eth'),
			getBtceRates('ltc'),
			getBtceRates('dsh'),
			getBterRates('eth'),
			getBterRates('ltc'),
			getBterRates('dash'),
			getPoloniexRates()
	]).then(values => {
		// once we have all the exchange rates in the values object, we want to store them in the appropriate exchange object. Then we will run through an algorithm to determine which is the best rate and flag it.

		// function to round a number to 5 decimal placese. That is how BTCE returns its exchange rate, and Bittrex returns 8 decimal places. So, normalizing on 5
		round = (val) => {
			return Math.round(val * 100000) / 100000;
		}

		reciprocalAndRound = (val) => {
			return round(1 / round(val));
		}

		// for each value, first check for status 200, signifying that the rate was properly returned. For each value, return the value which shows how many bitcoin is needed for one altcoin. Also return the reciprocal so we can show how many of the altcoin can be exchanged for each bitcoin.
		if (values[0].status == 200) {
			bittrex.eth_btc = round(values[0].data.result[0].Ask);
			bittrex.btc_eth = reciprocalAndRound(values[0].data.result[0].Ask);
		}
		if (values[1].status == 200) {
			bittrex.ltc_btc = round(values[1].data.result[0].Ask);
			bittrex.btc_ltc = reciprocalAndRound(values[1].data.result[0].Ask);
		}
		if (values[2].status == 200) {
			bittrex.dash_btc = round(values[2].data.result[0].Ask);
			bittrex.btc_dash = reciprocalAndRound(values[2].data.result[0].Ask);
		}
		if (values[3].status == 200) {
			btce.eth_btc = round(values[3].data.eth_btc.buy);
			btce.btc_eth = reciprocalAndRound(values[3].data.eth_btc.buy);
		}
		if (values[4].status == 200) {
			btce.ltc_btc = round(values[4].data.ltc_btc.buy);
			btce.btc_ltc = reciprocalAndRound(values[4].data.ltc_btc.buy);
		}
		if (values[5].status == 200) {
			btce.dash_btc = round(values[5].data.dsh_btc.buy);
			btce.btc_dash = reciprocalAndRound(values[5].data.dsh_btc.buy);
		}
		if (values[6].status == 200) {
			bter.eth_btc = round(values[6].data.buy);
			bter.btc_eth = reciprocalAndRound(values[6].data.buy);
		}
		if (values[7].status == 200) {
			bter.ltc_btc = round(values[7].data.buy);
			bter.btc_ltc = reciprocalAndRound(values[7].data.buy);
		}
		if (values[8].status == 200) {
			bter.dash_btc = round(values[8].data.buy);
			bter.btc_dash = reciprocalAndRound(values[8].data.buy);
		}
		if (values[9].status = 200) {
			poloniex.eth_btc = round(values[9].data.BTC_ETH.lowestAsk);
			poloniex.btc_eth = reciprocalAndRound(values[9].data.BTC_ETH.lowestAsk);
			poloniex.ltc_btc = round(values[9].data.BTC_LTC.lowestAsk);
			poloniex.btc_ltc = reciprocalAndRound(values[9].data.BTC_LTC.lowestAsk);
			poloniex.dash_btc = round(values[9].data.BTC_DASH.lowestAsk);
			poloniex.btc_dash = reciprocalAndRound(values[9].data.BTC_DASH.lowestAsk);
		}

		// add objects to the Exchanges model
		exchanges.addExchange(bittrex);
		exchanges.addExchange(btce);
		exchanges.addExchange(bter);
		exchanges.addExchange(poloniex);


		// cycle through each altcoin and call method that sets a keyValue pair in the correct exchange object marking which one has the best rate for that altcoin. The key [altcoin + 'Best'] is set to true for the exchange that has the best rate for that altcoin
		// TODO: This could now be done by using the objects above, before they are pushed into the Exchanges model. I made a change to the way the above code works to fix a bug. And this way still works, so leaving as is for now.
		for (let altcoin of altcoins.altcoins) {
			exchanges.setLatestBest(altcoin);
		}

	})
	.catch((err) => {
		return err;
	});
}
