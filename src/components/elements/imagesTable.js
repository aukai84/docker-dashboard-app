import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import classnames from 'classnames'
import moment from 'moment'

const styles = (theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        marginTop: 16,
    },
    table: {
        minWidth: 700,
    },
    icon: {
        bottom: 0,
        height: 20,
        width: 20,
        marginBottom: -5,
        marginRight: 5,
        color: 'rgba(0, 0, 0, 0.87)',
    },
})

class ImagesTable extends Component {
    constructor(props) {
        super(props)
        this.bytesToSize = this.bytesToSize.bind(this)
    }

    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes == 0) return '0 Byte'
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
    }

    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {this.props.headers.map((header) => (
                                <TableCell>{header.name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data.map((row) => (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {row.RepoTags[0]}
                                </TableCell>
                                <TableCell>{row.Id.substr(7, 18)}</TableCell>
                                <TableCell>{moment.duration(row.Created, 'milliseconds').days()}</TableCell>
                                <TableCell>{this.bytesToSize(row.Size)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

ImagesTable.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ImagesTable)
