import React, { Component } from 'react'
import {
	Table,
	TableHeader,
	TableHeaderColumn,
	TableBody,
	TableRow
} from 'material-ui/Table'

import CatTableRow from '../CatTableRow/CatTableRow'

class CatTable extends Component {
	render() {
		let num = 25

		let cats = this.props.cats.slice(0, num).map((cat, index) => {
			return <CatTableRow cat={cat} key={index} />
		})

		return (
			<Table>
				<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
					<TableRow>
						<TableHeaderColumn>Photo</TableHeaderColumn>
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
				<TableBody showRowHover={true} stripedRows={true}>
					{cats}
				</TableBody>
			</Table>
		)
	}
}

export default CatTable
