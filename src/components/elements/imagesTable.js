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

const styles = (theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        marginTop: 16,
    },
    table: {
        minWidth: 700,
    },
})

class ImagesTable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props
        console.log(this.props)
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
                                {this.props.headers.map((header) => (
                                    <TableCell>{row[header.value]}</TableCell>
                                ))}
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
