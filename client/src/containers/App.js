import React, { Component } from 'react'
import MainNav from './navigation/mainNav.js'
import axios from 'axios'
import io from 'socket.io-client'
import MainView from './mainView.js'
const Docker = require('dockerode')
const docker = new Docker({
    socketPath: '/var/run/docker.sock',
    host: 'http://unix:/var/run/docker.sock',
    port: 2375,
})

console.log('process', process.env)
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            containers: [],
            images: [],
            networks: [],
            dockerContainers: [],
        }
    }
    componentDidMount() {
        docker.listContainers((err, containers) => {
            console.log(containers)
        })
        axios.get('http://localhost:2375/images/json').then((res) => {
            this.setState({
                images: res.data,
            })
        })
        axios.get('http://localhost:2375/containers/json').then((res) => {
            this.setState({
                containers: res.data,
            })
        })
        axios.get('http://localhost:2375/networks').then((res) => {
            this.setState({
                networks: res.data,
            })
        })
    }
    render() {
        console.log('docker', this.state)
        return (
            <MainNav>
                <MainView
                    containers={this.state.containers}
                    images={this.state.images}
                    networks={this.state.networks}
                />
            </MainNav>
        )
    }
}

export default App
