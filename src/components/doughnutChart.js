import React, { Component } from 'react'
import Proptypes from 'prop-types'
import { PieChart, Pie, Legend, Tooltip } from 'Recharts'

class DoughnutChart extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        /*const data02 = [
			{ name: 'Group A', value: 2400 },
			{ name: 'Group B', value: 4567 },
			{ name: 'Group C', value: 1398 },
			{ name: 'Group D', value: 9800 },
			{ name: 'Group E', value: 3908 },
			{ name: 'Group F', value: 4800 }
		];*/
        return (
            <PieChart width={800} height={400}>
                <Pie
                    data={this.props.chartData}
                    dataKey="value"
                    cx={500}
                    cy={200}
                    innerRadius={40}
                    outerRadius={80}
                    fill="#82ca9d"
                />
                <Tooltip />
            </PieChart>
        )
    }
}

export default DoughnutChart
