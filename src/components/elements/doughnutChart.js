import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PieChart, Pie, Legend, Tooltip } from 'Recharts';
import Grid from '@material-ui/core/Grid';

const styles = {
	card: {
		width: 275,
		maxWidth: 450,
		height: 350
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		marginBottom: 16,
		marginLeft: 16,
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
};

class DoughnutChart extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { classes } = this.props;
		return (
			<Card className={classes.card}>
				<Grid container alignItems="center" justify="center">
					<CardContent>
						<Typography className={classes.title}>{this.props.name}</Typography>
						<Typography margin="auto" variant="headline" component="h1">
							0
						</Typography>
						<PieChart width={275} height={275}>
							<Pie
								data={this.props.chartData}
								dataKey="value"
								cx={'50%'}
								cy={'50%'}
								innerRadius={55}
								outerRadius={80}
								fill="#82ca9d"
							/>
							<Tooltip />
						</PieChart>
					</CardContent>
				</Grid>
			</Card>
		);
	}
}

export default withStyles(styles)(DoughnutChart);
