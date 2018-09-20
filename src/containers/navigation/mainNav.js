import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	appFrame: {
		height: '100%',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%'
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		backgroundColor: '#2196f3'
	},
	'appBar-left': {
		marginLeft: drawerWidth
	},
	'appBar-right': {
		marginRight: drawerWidth
	},
	drawerPaper: {
		position: 'relative',
		width: drawerWidth
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3
	}
});

class MainNav extends Component {
	state = {
		anchor: 'left'
	};

	handleChange = event => {
		this.setState({
			anchor: event.target.value
		});
	};

	render() {
		const { classes } = this.props;
		const { anchor } = this.state;

		const drawer = (
			<Drawer
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}
				anchor={anchor}
			>
				<div className={classes.toolbar} />
				<Divider />
				<List>{mailFolderListItems}</List>
			</Drawer>
		);

		let before = null;
		let after = null;

		if (anchor === 'left') {
			before = drawer;
		} else {
			after = drawer;
		}

		return (
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppBar position="absolute" className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
						<Toolbar>
							<Typography variant="title" color="inherit" noWrap>
								Docker Dashboard
							</Typography>
						</Toolbar>
					</AppBar>
					{before}
					<main className={classes.content}>
						<div className={classes.toolbar} />
						{this.props.children}
					</main>
					{after}
				</div>
			</div>
		);
	}
}

MainNav.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainNav);
