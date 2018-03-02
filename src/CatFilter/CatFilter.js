import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class CatFilter extends Component {
	constructor(props) {
		super(props)

		this.state = {
			values: []
		}
	}

	componentWillReceiveProps() {
		this.clearFilter()
	}

	clearFilter() {
		// console.log('clearing the filter!')
		// console.log('status of this.props.clearFilter')
		// console.log(this.props.clearFilter)

		if (this.props.clearFilter) {
			this.setState(
				{
					values: []
				}
				// () => {
				// 	console.log('cleared all filter values')
				// 	console.log(this.state.values)
				// }
			)

			this.props.turnOffClearFilter()
		}
	}

	handleChange = (e, index, values) => {
		this.setState(
			{
				values
			},
			() => {
				let filterName = this.props.filterName
				let values = this.state.values

				this.props.handleFilter(filterName, values)
			}
		)
	}

	menuItems(values) {
		if (this.props.data) {
			return this.props.data.map(name => (
				<MenuItem
					key={name}
					insetChildren={true}
					checked={values && values.indexOf(name) > -1}
					value={name}
					primaryText={name}
				/>
			))
		}
	}

	render() {
		const { values } = this.state

		const styles = {
			// 	backgroundColor: '#00b4ce',
			// 	border: '1px solid #00b4ce',
			// 	borderRadius: '8px',
			margin: '10px 20px',
			width: '200px'
		}

		return (
			<SelectField
				multiple={this.props.selectMultiple}
				hintText={this.props.displayName}
				floatingLabelText={this.props.displayName}
				value={values}
				maxHeight={200}
				onChange={this.handleChange}
				name={this.props.filterName}
				style={styles}
			>
				{this.menuItems(values)}
			</SelectField>
		)
	}
}

export default CatFilter
