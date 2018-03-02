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
		if (!this.props.filtering) {
			this.clearFilter()
		}
	}

	clearFilter() {
		this.setState({
			values: []
		})
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
