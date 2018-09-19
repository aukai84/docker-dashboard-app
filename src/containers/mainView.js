import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../components/views/dashboard.js';
import Containers from '../components/views/containers.js';
import Images from '../components/views/images.js';
import Usage from '../components/views/usage.js';
import Networks from '../components/views/networks.js';

class MainView extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Switch>
				<Route path="/" exact component={Dashboard} />
				<Route path="/containers" component={Containers} />
				<Route path="/images" exact component={Images} />
				<Route path="/usage" exact component={Usage} />
				<Route path="/networks" exact component={Networks} />
			</Switch>
		);
	}
}

export default MainView;
