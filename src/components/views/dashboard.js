import React, { Component } from 'react'
import DoughnutChart from '../doughnutChart.js'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let data = {}
        return (
            <div>
                Dashboard
                <DoughnutChart />
            </div>
        )
    }
}

export default Dashboard
