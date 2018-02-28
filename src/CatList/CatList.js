import React, { Component } from 'react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import CatFilter from '../CatFilter/CatFilter'
import CatTable from '../CatTable/CatTable'

import { getCats, getBreeds } from '../services/muscat'

class CatList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cats: [],
			breeds: [],
			location: '',
			filter: {}
		}

		this.getCats = getCats.bind(this)
		this.getBreeds = getBreeds.bind(this)

		this.handleChange = this.handleChange.bind(this)
		this.handleLocation = this.handleLocation.bind(this)

		this.handleFilter = this.handleFilter.bind(this)
	}

	componentDidMount() {
		this.getCats()
		this.getBreeds()

		console.log(this.state.filteredCats)
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
	}

	handleImageNewInput(e) {
		e.preventDefault()

		let newImage = this.state.newImage
		newImage[e.target.name] = e.target.value
		this.setState({ newImage })
	}

	handleFilter(filterName, values) {
		let filter = this.state.filter
		filter[filterName] = values

		console.log(filter)

		this.setState({ filter }, () => {
			let filteredCats = this.filterCats(this.state.cats, this.state.filter)

			console.log(':::::THE FILTERED CATS:::::')
			console.log(filteredCats)
			console.log(':::::::::::::::::::::::::::')

			// no cats found
			if (filteredCats.length === 0) {
				console.log('no cats matching your criteria')
			}
		})
	}

	filterCats = (catsArr, filters) => {
		const filterKeys = Object.keys(filters)

		return catsArr.filter(eachCat => {
			return filterKeys.every(eachKey => {
				// ignore empty filters
				if (!filters[eachKey].length) {
					return true
				}

				// handle breeds filter
				if (eachKey === 'breed') {
					if (eachCat.breeds.breed.length) {
						return false
					} else {
						return filters[eachKey].includes(eachCat['breeds']['breed']['$t'])
					}
				}

				// handle specialNeeds filter
				if (eachKey === 'specialNeeds') {
					let hasSpecialNeeds = cat => cat.$t === 'specialNeeds'

					if (this.state.filter.specialNeeds === 'Yes') {
						return eachCat['options']['option'].find(hasSpecialNeeds)
					} else {
						return !eachCat['options']['option'].find(hasSpecialNeeds)
					}
				}

				// handle other filters
				return filters[eachKey].includes(eachCat[eachKey]['$t'])
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
		// .map(
		// 	gender =>
		// 		gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Unknown'
		// )

		return (
			<div className="cats">
				<form>
					<TextField
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
					selectMultiple={true}
				/>
				<CatFilter
					filterName={'age'}
					displayName={'Age'}
					data={catAges}
					handleFilter={this.handleFilter}
					selectMultiple={true}
				/>
				<CatFilter
					filterName={'sex'}
					displayName={'Gender'}
					data={catGenders}
					handleFilter={this.handleFilter}
					selectMultiple={true}
				/>
				<CatFilter
					filterName={'specialNeeds'}
					displayName={'Special Needs?'}
					data={catSpecialNeeds}
					handleFilter={this.handleFilter}
					selectMultiple={false}
				/>
				<CatTable cats={this.state.cats} />
			</div>
		)
	}
}

export default CatList
