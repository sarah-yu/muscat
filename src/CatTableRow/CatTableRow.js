import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'

const CatTableRow = props => {
	let cat = props.cat

	let catBreed = cat.breeds.breed
	let catOptions = cat.options.option
	let catContact = cat.contact

	let hasSpecialNeeds = cat => cat.$t === 'specialNeeds'
	let catPhoto = cat => cat['@size'] === 'fpm' && cat['@id'] === '1'

	return (
		<TableRow>
			<TableRowColumn>
				<img src={cat.media.photos.photo.find(catPhoto).$t} alt={cat.name.$t} />
			</TableRowColumn>
			<TableRowColumn>{cat.name.$t}</TableRowColumn>
			<TableRowColumn style={{ whiteSpace: 'normal' }}>
				{catBreed.length
					? catBreed.map(breed => breed.$t).join(' & ')
					: catBreed.$t}
			</TableRowColumn>
			<TableRowColumn>{cat.age.$t}</TableRowColumn>
			<TableRowColumn>{cat.sex.$t}</TableRowColumn>
			<TableRowColumn>
				{catOptions.find(hasSpecialNeeds) ? 'Yes' : 'No'}
			</TableRowColumn>
			<TableRowColumn>
				{catContact.city.$t}, {catContact.state.$t}
			</TableRowColumn>
			<TableRowColumn>{catContact.phone.$t}</TableRowColumn>
			<TableRowColumn>
				<a href={'mailto:' + catContact.email.$t}>{catContact.email.$t}</a>
			</TableRowColumn>
		</TableRow>
	)
}

export default CatTableRow
