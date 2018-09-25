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

class DashboardLineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
        socket.on('cpu.usage', (usage) => {
            if (usage === 0 || !usage) {
                this.setState({
                    data: [{ time: 'No CPU Usage', cpu: 0 }],
                })
            } else {
                this.setState({
                    data: this.state.data.concat({ time: moment().format('mm:ss'), cpu: usage }),
                })
            }
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
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line dot={false} type="monotone" dataKey="cpu" stroke="#00caca" />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default DashboardLineChart
