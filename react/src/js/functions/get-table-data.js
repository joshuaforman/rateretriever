import React from 'react';
import RateLineItem from '../components/rate-line-item';
import NoDataMessage from '../components/no-data-message';


function GetTableData(exchanges, to_btc) {
	// create variable for showing exchange line items, or a message if no data is available
	let mappedExchanges;

	// if the state.exchanges is not yet defined
	if (!exchanges) {
		// this show no data message instead of table data
		mappedExchanges = <NoDataMessage />;
	} else {
		// if we have a response back from the server, but there is not yet data to show
		if(!exchanges.exchanges.length) {
			// then show no data messaeg instead of table data
			mappedExchanges = <NoDataMessage />;
		} else {
			// we have a response and there is data in it, so set the variable to a map of the items to render via the RateLineItem component
			mappedExchanges = exchanges.exchanges.map(e => <RateLineItem key={e.name + e.date} rate={e} to_btc={to_btc}/>);
		}
	}

	return mappedExchanges;
}

export { GetTableData };
