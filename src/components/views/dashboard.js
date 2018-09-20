import React, { Component } from 'react';
import DoughnutChart from '../elements/doughnutChart.js';
import DashboardLineChart from '../elements/lineChart.js';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: 32
	},
	usage: {
		margin: 16
	},
	paper: {
		height: 140,
		width: 100
	},
	control: {
		padding: theme.spacing.unit * 2
	}
});

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			direction: 'row',
			justify: 'center',
			alignItems: 'center'
		};
	}
	render() {
		let data = [
			{ name: 'Group A', value: 2400 },
			{ name: 'Group B', value: 4567 },
			{ name: 'Group C', value: 1398 },
			{ name: 'Group D', value: 9800 },
			{ name: 'Group E', value: 3908 },
			{ name: 'Group F', value: 4800 }
		];
		const { classes } = this.props;
		const { justify, direction, alignItems } = this.state;
		console.log('dashboard props', this.props);
		return (
			<div>
				<Typography variant="headline" component="h1">
					Dashboard
				</Typography>
				<Grid
					container
					className={classes.root}
					direction={direction}
					alignItems={alignItems}
					justify={justify}
					spacing={40}
				>
					<Grid item>
						<DoughnutChart chartData={data} length={this.props.containers.length} name="Containers" />
					</Grid>
					<Grid item>
						<DoughnutChart chartData={data} length={this.props.images.length} name="Images" />
					</Grid>
					<Grid item>
						<DoughnutChart chartData={data} length={this.props.networks.length} name="Networks" />
					</Grid>
					<Grid container direction={direction}>
						<Typography variant="headline" className={classes.usage} component="h1">
							Usage
						</Typography>
						<DashboardLineChart chartDat={this.props} />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Dashboard);
