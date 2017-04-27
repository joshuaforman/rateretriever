let axios = require('axios');

// these are the calls to the exchanges to get the latest rates. Axios is a promise, so we can return a promise, and then put all the calls into a Promise.all, which is what we do in the getRates function

getBittrexRate = (param) => {
	return axios.get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-' + param);
}

getBtceRates = (param) => {
	return axios.get('https://btc-e.com/api/3/ticker/' + param + '_btc')
}

getBterRates = (param) => {
	return axios.get('http://data.bter.com/api/1/ticker/' + param +'_btc');
}

getPoloniexRates = (param) => {
	return axios.get('https://poloniex.com/public?command=returnTicker');
}

module.exports = {getBittrexRate, getBtceRates, getBterRates, getPoloniexRates}
