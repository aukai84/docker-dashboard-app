import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import LineChart from 'recharts/lib/chart/LineChart'
import Line from 'recharts/lib/cartesian/Line'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'
import Typography from '@material-ui/core/Typography'
import * as io from 'socket.io-client'
import moment from 'moment'
import { isMoment } from 'moment'
const API_URL = 'http://localhost:8000'
const socket = io.connect(API_URL)

const data = [
    { name: 'Mon', cpu: 2200, memory: 3400 },
    { name: 'Tue', cpu: 1280, memory: 2398 },
    { name: 'Wed', cpu: 5000, memory: 4300 },
    { name: 'Thu', cpu: 4780, memory: 2908 },
    { name: 'Fri', cpu: 5890, memory: 4800 },
    { name: 'Sat', cpu: 4390, memory: 3800 },
    { name: 'Sun', cpu: 4490, memory: 4300 },
]

class DashboardLineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
        socket.on('cpu.usage', (usage) => {
            console.log('moment', moment().format('mm:ss'))
            this.setState({
                data: this.state.data.concat({ time: moment().format('mm:ss'), cpu: usage }),
            })
        })
    }

    componentDidMount() {
        socket.emit('cpu.usage')
    }

    render() {
        return (
            <ResponsiveContainer width="99%" height={320}>
                <LineChart data={this.state.data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <CartesianGrid vertical={false} strokeDasharray=" 3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default DashboardLineChart
