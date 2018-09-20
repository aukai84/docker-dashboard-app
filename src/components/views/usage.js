import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

class Usage extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Typography variant="headline" component="h1">
					Usage
				</Typography>
			</div>
		);
	}
}

export default Usage;
