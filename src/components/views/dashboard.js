import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import DoughnutChart from '../elements/doughnutChart.js'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let data = [
            { name: 'Group A', value: 2400 },
            { name: 'Group B', value: 4567 },
            { name: 'Group C', value: 1398 },
            { name: 'Group D', value: 9800 },
            { name: 'Group E', value: 3908 },
            { name: 'Group F', value: 4800 },
        ]
        return (
            <div>
                Dashboard
                <Card>
                    <DoughnutChart chartData={data} />
                </Card>
                <DoughnutChart chartData={data} />
                <DoughnutChart chartData={data} />
            </div>
        )
    }
}

export default Dashboard
