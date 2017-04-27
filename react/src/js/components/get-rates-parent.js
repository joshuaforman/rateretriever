import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { hashHistory } from 'react-router';

import { GetTableData } from '../functions/get-table-data';


export default class GetRatesParent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// this will store the response from the API get call
			exchanges: null,
			// amount that the user wants to calculate the amount gained for
			amount: 20,
			// local array storing the gains for each altcoin based on the this.state.amount
			gains: {
				btc_eth: null,
				btc_ltc: null,
				btc_dash: null,
			},
			// flag to show if the conversion should be shown in btc to altcoin or altcoin to btc
			to_btc: true
		}

		// callGetRates as soon as the page is opened
		this.callGetRates();
	}

	// Function to call the API to get latest rates from the server
	callGetRates = () => {
		axios.get('http://localhost:8090/api/v1/getlatestrates')
		.then((res) => {
			// reverse the order of the response so that it matches the order that items will be shown on the rate history page
			res.data.exchanges.reverse();
			this.setState({exchanges:res.data});
			// then call calculateGains to update state so the gains are rendered
			// this.calculateGains(this.state.amount);
		}).catch((err) => {
			alert('There was an error pulling back the data: ', err);
			console.log(err);
		});
	}

	// used to round the amount gained to the ten-thousanths place (4 digits)
	round = (val) => {
		return Math.round(val * 100000) / 100000;
	}

	// function to find min and max of each altcoin, then calculate the difference between them and multiply by the amount. Then set the gains object in state to render on screen.
	calculateGains = (amt) => {

		// set this variable to make the rest of this function more readable
		let exchanges = this.state.exchanges.exchanges;

		// set empty object to store values and use to set state at the end of this function
		let gains = {};

		// loop through all altcoins in model
		for (let altcoin of ['btc_eth', 'btc_ltc', 'btc_dash']) {
			let min = exchanges[0][altcoin];
			let max = exchanges[0][altcoin];
			for (let i=0; i<exchanges.length; i++) {
				if (exchanges[i][altcoin] > max) {
					max = exchanges[i][altcoin];
				}
				if (exchanges[i][altcoin] < min) {
					min = exchanges[i][altcoin];
				}
			}
			// calculate the gain for that altcoin and set a new key/value pair with info onto gains object
			gains[altcoin] = this.round((max-min) * amt);
		}

		// set states with the gains object
		this.setState ({ gains });
	}

	// triggered whenever there is a change to the Amount
	updateAmount = (evt) => {
		this.setState({ amount: evt.target.value });
		this.calculateGains(evt.target.value);
	}

	// if the reciprocate button is pressed, then reverse the value in state, which triggers a re-render. The child component rate-line-item takes this variable in props and uses it to decide which rate conversion to render
	reciprocate = () => {
		this.setState({ to_btc: !this.state.to_btc });
	}

	// show text in a table header that is relevant to the information in the table
	showText = () => {
		if (this.state.to_btc) {
			return ('Showing conversion of 1 BTC to Altcoin');
		} else {
			return ('Showing conversion of 1 Altcoin to BTC');
		}
	}

	// if user selects the link to the history page, take them there
	goToHistory = () => {
		hashHistory.push('/history');
	}

	componentDidUpdate = (prevProps, prevState) => {
		// if state.exchanges changed in the most recent update
		if (prevState.exchanges != this.state.exchanges) {
			// and there is an exchanges.exchanges value and an amount
			if (this.state.exchanges.exchanges && this.state.amount) {
				// and exchanges.exchanges has lenght (meaning there is data back from the api call)
				if (this.state.exchanges.exchanges.length) {
					// then calculateGains, because all the information needed is to calculate gains is here
					this.calculateGains(this.state.amount);
				}
			}
		}
	}


	// TODO: the top of this that repeats on the get-rates-history page can be turned into a component and then inserted as a component on both this page and the get-rates-history page
	render = () => {

		// create variable for showing exchange line items, or a message if no data is available
		let mappedExchanges;
		// call function to get the table data or get component that shows a no data message
		mappedExchanges = GetTableData(this.state.exchanges, this.state.to_btc);

		return (
			<div>
				<div className='parent'>
					<img className='row' src='./dog.svg' alt='Lab' height='60px'></img>
					<h3 className='row2'>Rate Retriever</h3>
					<div className='row3'>
						<div className='colButtons'>
							<button id='refresh' className='button' onClick={this.callGetRates}>Refresh Rates</button>
							<button className='button' onClick={this.reciprocate}>Switch Conversion</button>
							<p className='blue' onClick={this.goToHistory}>Rate History</p>
						</div>
					</div>
				</div>
				<div className='parent'>
					<div className='colTableTitle'>
						<h3>{this.showText()}</h3>
					</div>
				</div>
				<div className='parent'>
					<div className='col'>
					</div>
					<div className='col'>
							ETH
					</div>
					<div className='col'>
							LTC
					</div>
					<div className='col'>
							DASH
					</div>
				</div>
				{mappedExchanges}
				<div className='text'>
					<p>Please enter amount of Bitcoin you will exchange, and below will show how much more of the altcoin will be received by using the highlighted exchange (with the better rate).</p>
					<div className='padding' />
						Input amount of Bitcoin:
					<input id='amount' onChange={this.updateAmount} value={this.state.amount}></input>
				</div>
				<div className='padding' />
				<div className='parent'>
					<div className='col'>
					</div>
					<div className='col'>
							ETH
					</div>
					<div className='col'>
							LTC
					</div>
					<div className='col'>
							DASH
					</div>
				</div>
				<div className='parent'>
					<div className='col heading'>
						Amount Gained
					</div>
					<div className='col'>
						{this.state.gains.btc_eth}
					</div>
					<div className='col'>
						{this.state.gains.btc_ltc}
					</div>
					<div className='col'>
						{this.state.gains.btc_dash}
					</div>
				</div>
			</div>
		);
	}
}
// royalty free image from: https://pixabay.com/en/dog-vector-head-white-background-1710298/
