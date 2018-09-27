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
        socket.on('container.usage', (container) => {
            if (container) {
                container.time = moment().format('mm:ss')
                let arrayCopy = Array.from(this.state.data)
                arrayCopy.push(container)
                this.setState({
                    data: arrayCopy,
                })
            }
        })
    }

    componentDidMount() {
        socket.emit('container.usage')
    }

    render() {
        const COLORS = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4']
        return (
            <ResponsiveContainer width="99%" height={320}>
                <LineChart data={this.state.data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    {this.props.chartData.map((container, i) => {
                        console.log('container name', container.Names[0].substr(1))
                        return (
                            <Line
                                dot={false}
                                type="monotone"
                                dataKey={container.Names[0].substr(1)}
                                stroke={COLORS[i]}
                            />
                        )
                    })}
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default DashboardLineChart
