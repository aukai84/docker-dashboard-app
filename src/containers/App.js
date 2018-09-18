import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            containers: []
        }
    }
    componentDidMount() {
        axios.get('unix:///var/run/docker.sock/containers/json').then(res => {
            console.log(res)
            this.setState({
                containers: res.data
            })
        })
    }
    render() {
        return (
            <div>
                <h1>Docker-Dashboard Test</h1>
                {this.state.containers.map(container => (
                    <div>{container.Image}</div>
                ))}
            </div>
        )
    }
}

export default App
