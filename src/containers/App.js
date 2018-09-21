import React, { Component } from 'react'
import MainNav from './navigation/mainNav.js'
import axios from 'axios'
import * as io from 'socket.io-client'
import MainView from './mainView.js'
const API_URL = 'http://localhost:8000'
let socket = io.connect(API_URL)

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            containers: [],
            images: [],
            networks: [],
            dockerContainers: [],
        }
        socket.on('containers.list', (containers) => {
            this.setState({
                containers,
            })
        })
        socket.on('images.list', (images) => {
            this.setState({
                images,
            })
        })
        socket.on('networks.list', (networks) => {
            this.setState({
                networks,
            })
        })
    }

    componentDidMount() {
        socket.emit('containers.list')
        socket.emit('images.list')
        socket.emit('networks.list')
        axios.get('http://localhost:8000/images/json').then((res) => {
            this.setState({
                images: res.data,
            })
        })
        axios.get('http://localhost:8000/containers/').then((res) => {
            this.setState({
                containers: res.data,
            })
        })
        axios.get('http://localhost:8000/networks').then((res) => {
            this.setState({
                networks: res.data,
            })
        })
    }
    render() {
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
