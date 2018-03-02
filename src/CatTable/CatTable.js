import React, { Component } from 'react'
import {
	Table,
	TableHeader,
	TableHeaderColumn,
	TableBody,
	TableRow,
	TableRowColumn,
	TableFooter
} from 'material-ui/Table'

import CatTableRow from '../CatTableRow/CatTableRow'

class CatTable extends Component {
	constructor(props) {
		super(props)

		this.handleCatClick = this.handleCatClick.bind(this)
	}

	handleCatClick(e) {
		let catId = e.target.dataset.id
		this.props.showCat(catId)
	}

	render() {
		let num = 100

		let cats = this.props.cats.slice(0, num).map((cat, index) => {
			return (
				<CatTableRow
					cat={cat}
					key={index}
					handleCatClick={this.handleCatClick}
				/>
			)
		})

		return (
			<Table height={'400px'} fixedHeader={true} fixedFooter={true}>
				<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
					<TableRow>
						<TableHeaderColumn>Photo</TableHeaderColumn>
						<TableHeaderColumn>Name</TableHeaderColumn>
						<TableHeaderColumn>Breed</TableHeaderColumn>
						<TableHeaderColumn>Age</TableHeaderColumn>
						<TableHeaderColumn>Sex</TableHeaderColumn>
						<TableHeaderColumn>Special Needs</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody showRowHover={true}>{cats}</TableBody>
				<TableFooter>
					<TableRow>
						<TableRowColumn
							className="bold"
							style={{
								color: '#00abc7',
								paddingBottom: '20px',
								textAlign: 'center'
							}}
						>
							{this.props.cats.length} cats found
						</TableRowColumn>
					</TableRow>
				</TableFooter>
			</Table>
		)
	}
}

export default CatTable
