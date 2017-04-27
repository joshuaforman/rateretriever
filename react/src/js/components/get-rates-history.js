import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import axios from 'axios';

import { GetTableData } from '../functions/get-table-data';

export default class GetRatesHistory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			exchanges: null,
			to_btc: true
		}

		// callGetRates as soon as the page is opened
		this.callGetRates();
	}

	// call the API to get the full history of rates
	callGetRates = () => {
		axios.get('http://localhost:8090/api/v1/getratehistory')
		.then((res) => {
			// reverse the array, so the most recent records show at the top of the page.
			res.data.exchanges.reverse();
			// set the state in order to render the data on the page
			this.setState({exchanges:res.data});
		}).catch((err) => {
			alert('Error retrieving data');
		});
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

	// if user selects the link to go back to the main page, take them there
	goToHistory = () => {
		hashHistory.push('/');
	}


	render = () => {

		// // create variable for showing exchange line items, or a message if no data is available
		let mappedExchanges;
		// call function to get the table data or get component that shows a no data message
		mappedExchanges = GetTableData(this.state.exchanges, this.state.to_btc);


		// TODO: the top of this that repeats on the get-rates-history page can be turned into a component and then inserted as a component on both this page and the get-rates-history page
		return (
			<div>
				<div className='parent'>
					<img className='row' src='./dog.svg' alt='Lab' height='60px'></img>
					<h3 className='row2'>Rate Retriever</h3>
					<div className='row3'>
						<div className='colButtons'>
							<button id='refresh' className='button' onClick={this.callGetRates}>Refresh Rates</button>
							<button className='button' onClick={this.reciprocate}>Switch Conversion</button>
							<p className='blue' onClick={this.goToHistory}>Current Rate</p>
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
				<div className='padding' />
				{mappedExchanges}
			</div>
		);
	} // end render
}
