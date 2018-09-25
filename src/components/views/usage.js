import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import UsageDoughnutChart from '../elements/usageDoughnutChart.js'
import * as io from 'socket.io-client'
const API_URL = 'http://localhost:8000'
let socket = io.connect(API_URL)

const styles = {
    root: {
        marginTop: 0,
    },
}
class Usage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        socket.on('container.usage', (usage) => {
            this.setState({
                [usage.id]: usage.usage,
            })
        })
    }

    componentDidMount() {
        socket.emit('container.usage')
    }

    render() {
        const { classes } = this.props
        console.log('classes', classes)
        return (
            <div>
                <Typography variant="headline" component="h1">
                    Usage
                </Typography>
                <Grid container spacing={40} className={classes.root}>
                    {this.props.containers.map((container) => {
                        return (
                            <UsageDoughnutChart
                                usage={this.state[container.Id]}
                                name="Container"
                                component="p"
                                classPick="usageChart"
                                header={container.Names[0].substr(1)}
                                Id={container.Id}
                            />
                        )
                    })}
                </Grid>
            </div>
        )
    }
}

Usage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Usage)
