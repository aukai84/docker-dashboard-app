import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import ContainersTable from '../elements/containersTable.js'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'

class Containers extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Typography variant="headline" component="h1">
                    Containers
                </Typography>
                <ContainersTable />
            </div>
        )
    }
}

export default Containers
