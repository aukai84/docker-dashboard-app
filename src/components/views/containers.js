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
        const headers = [
            { name: 'Name', value: 'Names[0]' },
            { name: 'State', value: 'State' },
            { name: 'Status', value: 'Status' },
            { name: 'Image', value: 'Image' },
            { name: 'IP/PORT', value: 'Ports[0]' },
            { name: '', value: 'actions' },
        ]
        return (
            <div>
                <Typography variant="headline" component="h1">
                    Containers
                </Typography>
                <ContainersTable data={this.props.containers} headers={headers} />
            </div>
        )
    }
}

export default Containers
