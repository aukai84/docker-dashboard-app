import React, { Component } from 'react'
import DoughnutChart from '../elements/doughnutChart.js'
import DashboardLineChart from '../elements/lineChart.js'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'

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
            containers: [],
        }
    }
    componentDidMount() {
        this.setState({
            containers: this.props.containers.map((container) => {
                return {
                    name: container.Names[0].substr(1),
                    value: 1,
                }
            }),
        })
    }
    render() {
        let data = [{ name: 'Docker Data', value: 100 }]
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
                            chartData={data}
                            header={this.props.containers.length}
                            name="Containers"
                            component="h1"
                            classPick="count"
                        />
                    </Grid>
                    <Grid item>
                        <DoughnutChart
                            chartData={data}
                            header={this.props.images.length}
                            name="Images"
                            component="h1"
                            classPick="count"
                        />
                    </Grid>
                    <Grid item>
                        <DoughnutChart
                            chartData={data}
                            header={this.props.networks.length}
                            component="h1"
                            name="Networks"
                            classPick="count"
                        />
                    </Grid>
                    <Grid container direction={direction}>
                        <Typography variant="headline" className={classes.usage} component="h1">
                            CPU Usage
                        </Typography>
                        <DashboardLineChart chartData={this.props} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)
