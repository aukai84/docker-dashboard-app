import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from '../components/views/dashboard.js'
import Containers from '../components/views/containers.js'
import Images from '../components/views/images.js'
import Usage from '../components/views/usage.js'
import Networks from '../components/views/networks.js'

class MainView extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Switch>
                <Route path="/" exact render={() => <Dashboard {...this.props} />} />
                <Route path="/containers" render={() => <Containers containers={this.props.containers} />} />
                <Route path="/images" render={() => <Images images={this.props.images} />} />
                <Route path="/usage" component={Usage} />
                <Route path="/networks" component={Networks} />
            </Switch>
        )
    }
}

export default MainView
