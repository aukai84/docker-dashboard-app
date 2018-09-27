import React, { Component } from 'react'
import DoughnutChart from '../elements/doughnutChart.js'
import DashboardLineChart from '../elements/lineChart.js'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'
import * as io from 'socket.io-client'
import moment from 'moment'
import { isMoment } from 'moment'
const API_URL = 'http://localhost:8000'
const socket = io.connect(API_URL)

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        padding: 32,
    },
    usage: {
        margin: 16,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
})

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            direction: 'row',
            justify: 'center',
            alignItems: 'center',
            data: [],
            totalUsage: 0,
        }
        socket.on('container.usage', (container) => {
            if (container) {
                container.time = moment().format('mm:ss')
                let arrayCopy = Array.from(this.state.data)
                arrayCopy.push(container)
                this.setState({
                    totalUsage: container.totalUsage,
                    data: arrayCopy,
                })
            }
        })
    }
    componentDidMount() {
        socket.emit('container.usage')
    }
    render() {
        let data = [
            {
                name: 'Docker Remaining Data',
                value: 0,
            },
            { name: 'Docker Data', value: 100 },
        ]
        const { classes } = this.props
        const { justify, direction, alignItems } = this.state
        return (
            <div>
                <Typography variant="headline" component="h1">
                    Dashboard
                </Typography>
                <Grid
                    container
                    className={classes.root}
                    direction={direction}
                    alignItems={alignItems}
                    justify={justify}
                    spacing={40}
                >
                    <Grid item>
                        <DoughnutChart
                            displayLabel
                            chartData={[
                                {
                                    name: 'Remaining Usage',
                                    value: 100 - this.state.totalUsage,
                                },
                                { name: 'Docker Data', value: this.state.totalUsage },
                            ]}
                            label="%"
                            header={this.props.containers.length || 0}
                            name="Containers"
                            component="h1"
                            classPick="count"
                        />
                    </Grid>
                    <Grid item>
                        <DoughnutChart
                            displayLabel={false}
                            chartData={data}
                            header={this.props.images.length || 0}
                            name="Images"
                            component="h1"
                            classPick="count"
                            label=""
                        />
                    </Grid>
                    <Grid item>
                        <DoughnutChart
                            displayLabel={false}
                            chartData={data}
                            header={this.props.networks.length || 0}
                            component="h1"
                            name="Networks"
                            classPick="count"
                            label=""
                        />
                    </Grid>
                    <Grid container direction={direction}>
                        <Typography variant="headline" className={classes.usage} component="h1">
                            CPU Usage
                        </Typography>
                        <DashboardLineChart containers={this.props.containers} data={this.state.data} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)
