import React, { Component } from 'react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import CatFilter from '../CatFilter/CatFilter'
import CatTable from '../CatTable/CatTable'

import { getCats, getBreeds, getCatsFrom } from '../services/muscat'

class CatList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cats: [],
			breeds: [],
			location: '',
			filter: {},
			filtering: false,
			filteredCats: []
		}

		this.getCats = getCats.bind(this)
		this.getBreeds = getBreeds.bind(this)
		this.getCatsFrom = getCatsFrom.bind(this)

		this.handleChange = this.handleChange.bind(this)
		this.handleLocation = this.handleLocation.bind(this)

		this.handleFilter = this.handleFilter.bind(this)
	}

	componentDidMount() {
		this.getCats()
		this.getBreeds()
	}

	setFilter() {
		this.setState({})
	}

	handleChange(e) {
		this.setState({
			location: e.target.value
		})
	}

	handleLocation(e) {
		e.preventDefault()

		console.log('submit location')
		console.log(this.state.location)

		this.getCatsFrom(this.state.location)
	}

	handleFilter(filterName, values) {
		let filter = this.state.filter
		filter[filterName] = values

		this.setState(
			{
				filter,
				filtering: true
			},
			() => {
				let filteredCats = this.filterCats(this.state.cats, this.state.filter)

				// no cats found
				if (filteredCats.length === 0) {
					console.log('no cats matching your criteria')
				}

				this.setState({
					filteredCats: filteredCats
				})
			}
		)
	}

	filterCats = (catsArr, filter) => {
		const filterKeys = Object.keys(filter)

		console.log(filter)

		return catsArr.filter(eachCat => {
			return filterKeys.every(eachKey => {
				// ignore empty filters
				if (!filter[eachKey].length) {
					return true
				}

				// handle breeds filter
				if (eachKey === 'breed') {
					if (eachCat.breeds.breed.length) {
						return (
							eachCat.breeds.breed
								.map(breed => breed.$t)
								.indexOf(filter[eachKey][0]) !== -1
						)
					} else {
						return filter[eachKey].includes(eachCat['breeds']['breed']['$t'])
					}
				}

				// handle specialNeeds filter
				if (eachKey === 'specialNeeds') {
					let hasSpecialNeeds = cat => cat.$t === 'specialNeeds'

					if (this.state.filter.specialNeeds[0] === 'Yes') {
						return eachCat['options']['option'].find(hasSpecialNeeds)
					} else {
						return !eachCat['options']['option'].find(hasSpecialNeeds)
					}
				}

				// handle other filters
				return filter[eachKey].includes(eachCat[eachKey]['$t'])
			})
		})
	}

	render() {
		let catSpecialNeeds = ['Yes', 'No']

		let catAges = this.state.cats
			.map(cat => cat.age.$t)
			.filter((age, index, ages) => ages.indexOf(age) === index)

		let catGenders = this.state.cats
			.map(cat => cat.sex.$t)
			.filter((gender, index, genders) => genders.indexOf(gender) === index)

		return (
			<div className="cats">
				<form>
					<TextField
						name="location"
						hintText="Location"
						floatingLabelText="Location"
						onChange={this.handleChange}
					/>
					<RaisedButton
						label="Search"
						style={{ margin: '12px' }}
						onClick={this.handleLocation}
					/>
				</form>
				<CatFilter
					filterName={'breed'}
					displayName={'Breeds'}
					data={this.state.breeds}
					handleFilter={this.handleFilter}
				/>
				<CatFilter
					filterName={'age'}
					displayName={'Age'}
					data={catAges}
					handleFilter={this.handleFilter}
				/>
				<CatFilter
					filterName={'sex'}
					displayName={'Gender'}
					data={catGenders}
					handleFilter={this.handleFilter}
				/>
				<CatFilter
					filterName={'specialNeeds'}
					displayName={'Special Needs?'}
					data={catSpecialNeeds}
					handleFilter={this.handleFilter}
				/>
				<CatTable
					cats={
						this.state.filtering ? this.state.filteredCats : this.state.cats
					}
				/>
			</div>
		)
	}
}

export default CatList
