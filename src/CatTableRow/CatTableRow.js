// import React from 'react'
import React, { Component } from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'

class CatTableRow extends Component {
	render() {
		let cat = this.props.cat
		let id = this.props.cat.id.$t
		let catBreed = cat.breeds.breed

		let catOptions
		if (cat.options.option) {
			catOptions = cat.options.option
		}

		let hasSpecialNeeds = cat => cat.$t === 'specialNeeds'
		let catPhoto = cat => cat['@size'] === 'fpm' && cat['@id'] === '1'

		return (
			<TableRow onRowClick={this.props.handleCatClick} hoverable={true}>
				<TableRowColumn data-id={id}>
					{cat.media.photos ? (
						<img
							src={cat.media.photos.photo.find(catPhoto).$t}
							alt={cat.name.$t}
						/>
					) : (
						''
					)}
				</TableRowColumn>
				<TableRowColumn data-id={id}>{cat.name.$t}</TableRowColumn>
				<TableRowColumn data-id={id} style={{ whiteSpace: 'normal' }}>
					{catBreed.length
						? catBreed.map(breed => breed.$t).join(' & ')
						: catBreed.$t}
				</TableRowColumn>
				<TableRowColumn data-id={id}>{cat.age.$t}</TableRowColumn>
				<TableRowColumn data-id={id}>{cat.sex.$t}</TableRowColumn>
				<TableRowColumn data-id={id}>
					{catOptions
						? catOptions.length
							? catOptions.find(hasSpecialNeeds) ? 'Yes' : 'No'
							: catOptions.$t === 'hasSpecialNeeds' ? 'Yes' : 'No'
						: 'No'}
				</TableRowColumn>
			</TableRow>
		)
	}
}

export default CatTableRow
