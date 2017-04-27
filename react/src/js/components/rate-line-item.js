import React from 'react';
import moment from 'moment';

export default class RateLineItem extends React.Component {

	// to be called from within render to check if the item being displayed has the flag for best rate (as returned from the server). If so, return an inline styling tag to display it in orange
	checkHighlight = (flag) => {
			if (flag) {
				return {
					color: 'orange'
				};
			}
		}

	// the data comes back from the server in the order bter, btce, bittrex. After each bittrex object, display a separator so the data is readable. This is particularly needed for the get-rates-history parent.
	getSeperator = (name) => {
		if (name == 'bittrex') {
			return 	<div className='parent'><div className='padding'></div></div>;
		}
	}

	// depending on what user has selected (which is passed down into this component from props, show either the btc to altcoin rate or the altcoin to btc rate.
	getRate = (altcoin) => {
		if (this.props.to_btc) {
			return this.props.rate['btc_' + altcoin];
		} else {
			return this.props.rate[altcoin + '_btc'];
		}
	}

	render = () => {

		return (
			<div>
				<div className='parent'>
					<div className='col heading'>
						{this.props.rate.name.toUpperCase()}
					</div>
					<div className='col' style={this.checkHighlight(this.props.rate.ethBest)}>
						{this.getRate('eth')}
					</div>
					<div className='col' style={this.checkHighlight(this.props.rate.ltcBest)}>
						{this.getRate('ltc')}
					</div>
					<div className='col' style={this.checkHighlight(this.props.rate.dashBest)}>
						{this.getRate('dash')}
					</div>
					<div className='coltime'>
						{moment(this.props.rate.date).format('MM/DD/YYYY h:mm:ss')}
					</div>
				</div>
				{this.getSeperator(this.props.rate.name)}
			</div>
		);
	}

}
