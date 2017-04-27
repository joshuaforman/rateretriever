import React from 'react';

export default class NoDataMessage extends React.Component {

	render = () => {

		return (
			<div>
				<div className='parent'>
					<div className='colTableMessage'>
						No data to show. Please refresh this page in 10 seconds.
					</div>
				</div>
			</div>
		);
	}

}
