import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import DoughnutChart from '../elements/doughnutChart.js'

const styles = (theme) => ({
    root: {
        marginTop: 32,
    },
})
class Usage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const classes = this.props
        const data = [
            { name: 'Docker Data', value: 360 - 12 },
            {
                name: 'Docker Leftover',
                value: 12,
            },
        ]
        return (
            <div>
                <Typography variant="headline" component="h1">
                    Usage
                </Typography>
                <Grid container className={classes.root} spacing={40}>
                    {this.props.containers.map((container) => (
                        <Grid item>
                            <DoughnutChart
                                chartData={data}
                                name="Container"
                                component="p"
                                classPick="usageChart"
                                header={container.Names[0].substr(1)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Usage)
