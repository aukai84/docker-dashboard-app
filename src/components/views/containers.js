import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

class Containers extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Typography variant="headline" component="h1">
					Containers
				</Typography>
			</div>
		);
	}
}

export default Containers;
