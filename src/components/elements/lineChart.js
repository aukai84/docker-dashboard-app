import React, { Component } from 'react'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import LineChart from 'recharts/lib/chart/LineChart'
import Line from 'recharts/lib/cartesian/Line'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'

class DashboardLineChart extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const COLORS = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4']
        return (
            <ResponsiveContainer width="99%" height={320}>
                <LineChart data={this.props.data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    {this.props.containers.map((container, i) => {
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
