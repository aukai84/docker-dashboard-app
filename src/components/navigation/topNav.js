import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

class TopNav extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<AppBar position="static">
					<Toolbar>
						<IconButton color="inherit" aria-label="Open drawer">
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" noWrap>
							Docker-Dashboard
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default TopNav;
