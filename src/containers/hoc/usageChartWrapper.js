import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import * as io from 'socket.io-client'
const API_URL = 'http://localhost:8000'
let socket = io.connect(API_URL)

export default function usageChartWrapper(UsageComponent) {
    return class UsageChart extends Component {
        constructor(props) {
            super(props)
            this.state = {
                usage: 0,
            }
        }

        render() {
            return <UsageComponent {...this.props} chartData={this.state.usage} />
        }
    }
}
