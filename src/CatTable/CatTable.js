import React, { Component } from 'react'
import {
	Table,
	TableHeader,
	TableHeaderColumn,
	TableBody,
	TableRow,
	TableRowColumn
} from 'material-ui/Table'

class CatTable extends Component {
	componentDidUpdate() {
		console.log('***** CAT TABLE *****')
		console.log(this.props)
		console.log('***** CAT TABLE *****')
	}

	render() {
		let hasSpecialNeeds = cat => cat.$t === 'specialNeeds'

		let cats = this.props.cats.map((cat, index) => {
			let catBreed = cat.breeds.breed
			let catOptions = cat.options.option
			let catContact = cat.contact

			return (
				<TableRow key={index}>
					<TableRowColumn>{cat.name.$t}</TableRowColumn>
					<TableRowColumn>
						{catBreed.length ? catBreed[0].$t : catBreed.$t}
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
					<TableRowColumn>{catContact.email.$t}</TableRowColumn>
				</TableRow>
			)
		})

		return (
			<Table>
				<TableHeader>
					<TableRow>
						<TableHeaderColumn>Name</TableHeaderColumn>
						<TableHeaderColumn>Breed</TableHeaderColumn>
						<TableHeaderColumn>Age</TableHeaderColumn>
						<TableHeaderColumn>Sex</TableHeaderColumn>
						<TableHeaderColumn>Special Needs</TableHeaderColumn>
						<TableHeaderColumn>Location</TableHeaderColumn>
						<TableHeaderColumn>Phone</TableHeaderColumn>
						<TableHeaderColumn>Email</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody>{cats}</TableBody>
			</Table>
		)
	}
}

export default CatTable
