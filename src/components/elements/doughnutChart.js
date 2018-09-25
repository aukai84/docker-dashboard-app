import React, { Component } from 'react'
import Proptypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { PieChart, Pie, Label, Tooltip, Cell } from 'Recharts'
import Grid from '@material-ui/core/Grid'

const styles = (theme) => ({
    card: {
        width: 275,
        maxWidth: 450,
        height: 350,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        marginLeft: 16,
        fontSize: 14,
    },
    count: {
        alignItems: 'center',
        fontSize: 48,
        marginTop: 16,
        justify: 'center',
    },
    usageChart: {
        textTransform: 'capitalize',
    },
    pos: {
        marginBottom: 12,
    },
})

class DoughnutChart extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props
        const COLORS = ['#e5e5e5', '#00caca']
        return (
            <Card className={classes.card}>
                <Grid container alignItems="center" justify="center">
                    <CardContent>
                        <Typography className={classes.title}>{this.props.name}</Typography>
                        <Grid container alignItems="center" justify="center">
                            <Typography
                                className={classes[this.props.classPick]}
                                variant="headline"
                                component={this.props.component}
                            >
                                {this.props.header}
                            </Typography>
                        </Grid>
                        <PieChart width={275} height={200}>
                            <Pie
                                data={this.props.chartData}
                                dataKey="value"
                                startAngle={-270}
                                cx={'50%'}
                                cy={'50%'}
                                innerRadius={55}
                                outerRadius={80}
                                fill="#00caca"
                            >
                                {this.props.chartData.map((entry, index) => (
                                    <Cell fill={COLORS[index]} />
                                ))}
                                {this.props.displayLabel ? (
                                    <Label
                                        value={Math.round(this.props.chartData[1].value).toString() + this.props.label}
                                        position="center"
                                    />
                                ) : (
                                    false
                                )}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </CardContent>
                </Grid>
            </Card>
        )
    }
}

export default withStyles(styles)(DoughnutChart)
