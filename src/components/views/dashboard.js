import React, { Component } from 'react'
import DoughnutChart from '../elements/doughnutChart.js'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
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
        }
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
                    spacing={32}
                >
                    <Grid item>
                        <DoughnutChart chartData={data} name="Containers" />
                    </Grid>
                    <Grid item>
                        <DoughnutChart chartData={data} name="Images" />
                    </Grid>
                    <Grid item>
                        <DoughnutChart chartData={data} name="Networks" />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)
