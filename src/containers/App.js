import React, { Component } from 'react';
import MainNav from './navigation/mainNav.js';
import axios from 'axios';
import MainView from './mainView.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			containers: [],
			images: []
		};
	}
	componentDidMount() {
		axios.get('http://localhost:2375/images/json').then(res => {
			this.setState({
				images: res.data
			});
		});
		axios.get('http://localhost:2375/containers/json').then(res => {
			this.setState({
				containers: res.data
			});
		});
	}
	render() {
		return (
			<MainNav>
				<MainView containers={this.state.containers} images={this.state.images} />
			</MainNav>
		);
	}
}

export default App;
