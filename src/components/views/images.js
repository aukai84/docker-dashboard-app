import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import ImagesTable from '../elements/imagesTable.js'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'

class Images extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const headers = [
			{ name: 'Repository/Tags', value: 'RepoTags[0]' },
			{ name: 'Image ID', value: 'Id' },
			{ name: 'Created', value: 'created' },
			{ name: 'Size', value: 'size' },
		]
		return (
			<div>
				<Typography variant="headline" component="h1">
					Images
				</Typography>
				<ImagesTable data={this.props.images} headers={headers} />
			</div>
		)
	}
}

export default Images
