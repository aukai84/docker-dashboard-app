import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classnames from 'classnames';

const styles = theme => ({
	root: {
		width: '100%',
		overflowX: 'auto'
	},
	table: {
		minWidth: 700
	}
});

class ContainersTable extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Image</TableCell>
							<TableCell>IP/PORT</TableCell>
						</TableRow>
					</TableHead>
					<TableBody />
				</Table>
			</Paper>
		);
	}
}

ContainersTable.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainersTable);
