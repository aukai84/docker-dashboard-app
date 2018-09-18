import React, { Component } from 'react';
import TopNav from '../components/navigation/topNav.js';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containers: [],
        };
    }
    componentDidMount() {
        axios.get('http://localhost:2375/containers/json').then((res) => {
            console.log(res);
            this.setState({
                containers: res.data,
            });
        });
    }
    render() {
        return (
            <div>
                <TopNav />
                <h1>Docker-Dashboard Test</h1>
                {this.state.containers.map((container) => (
                    <div>{container.Image}</div>
                ))}
            </div>
        );
    }
}

export default App;
