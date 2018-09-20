import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import DashboardTable from '../elements/dashboardTable.js';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

class Images extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const headers = [
			{ name: 'Repository', value: 'repository' },
			{ name: 'Tag', value: 'tag' },
			{ name: 'Image ID', value: 'imageId' },
			{ name: 'Created', value: 'created' },
			{ name: 'Size', value: 'size' }
		];
		return (
			<div>
				<Typography variant="headline" component="h1">
					Images
				</Typography>
				<DashboardTable headers={headers} />
			</div>
		);
	}
}

export default Images;
