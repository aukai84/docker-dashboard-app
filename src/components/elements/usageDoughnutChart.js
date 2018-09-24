import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import usageChartWrapper from '../../containers/hoc/usageChartWrapper.js'
import DoughnutChart from './doughnutChart.js'
import * as io from 'socket.io-client'
const API_URL = 'http://localhost:8000'
let socket = io.connect(API_URL)

const styles = (theme) => ({
    root: {
        marginTop: 32,
    },
})

class UsageDoughnutChart extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Grid item>
                <DoughnutChart
                    name={this.props.name}
                    component={this.props.component}
                    classPick={this.props.classPick}
                    header={this.props.header}
                    Id={this.props.Id}
                    chartData={[
                        {
                            name: 'Remaining Usage',
                            value: 100 - this.props.usage,
                        },
                        { name: 'Docker Data', value: this.props.usage },
                    ]}
                />
            </Grid>
        )
    }
}

export default UsageDoughnutChart
