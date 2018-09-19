import React, { Component } from 'react';
import MainNav from './navigation/mainNav.js';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			containers: []
		};
	}
	componentDidMount() {
		axios.get('http://localhost:2375/containers/json').then(res => {
			console.log(res);
			this.setState({
				containers: res.data
			});
		});
	}
	render() {
		return (
			<div>
				<MainNav />
			</div>
		);
	}
}

export default App;
