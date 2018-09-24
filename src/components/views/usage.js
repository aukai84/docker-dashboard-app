import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import UsageDoughnutChart from '../elements/usageDoughnutChart.js'
import * as io from 'socket.io-client'
const API_URL = 'http://localhost:8000'
let socket = io.connect(API_URL)

const styles = (theme) => ({
    root: {
        marginTop: 32,
    },
})
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
        const classes = this.props
        return (
            <div>
                <Typography variant="headline" component="h1">
                    Usage
                </Typography>
                <Grid container className={classes.root} spacing={40}>
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

export default Usage
