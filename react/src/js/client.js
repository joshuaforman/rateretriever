import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import GetRatesParent from './components/get-rates-parent';
import GetRatesHistory from './components/get-rates-history';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path='/' component={GetRatesParent} />
		<Route path='/history' component={GetRatesHistory} />
	</Router>, document.getElementById('app')
);
