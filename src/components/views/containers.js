import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import DashboardTable from '../elements/dashboardTable.js'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'

class Containers extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const headers = [
            { name: 'Name', value: 'Name' },
            { name: 'Status', value: 'Status' },
            { name: 'Image', value: 'Image' },
            { name: 'IP/PORT', value: 'IP/PORT' },
        ]
        return (
            <div>
                <Typography variant="headline" component="h1">
                    Containers
                </Typography>
                <DashboardTable headers={headers} />
            </div>
        )
    }
}

export default Containers
