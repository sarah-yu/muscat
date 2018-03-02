import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

import CatFilter from '../CatFilter/CatFilter'
import CatTable from '../CatTable/CatTable'
import CatShow from '../CatShow/CatShow'

import { getBreeds, getCatsFrom, getCat, getShelter } from '../services/muscat'

import './CatList.css'

class CatList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cats: [],
			breeds: [],
			location: '21224', // default location
			filter: {},
			filtering: false,
			filteredCats: [],
			// below are data needed for cat show component
			catId: '',
			catDetails: '',
			catShelter: ''
		}

		this.getBreeds = getBreeds.bind(this)
		this.getCatsFrom = getCatsFrom.bind(this)
		this.getCat = getCat.bind(this)
		this.getShelter = getShelter.bind(this)

		this.showCat = this.showCat.bind(this)
		this.changeLocation = this.changeLocation.bind(this)
		this.submitLocation = this.submitLocation.bind(this)
		this.handleFilter = this.handleFilter.bind(this)
	}

	componentDidMount() {
		this.getCatsFrom(this.state.location)
		this.getBreeds()
	}

	showCat(id) {
		this.setState({ catId: id }, () => {
			this.getCat(this.state.catId)
		})
	}

	changeLocation(e) {
		this.setState({
			location: e.target.value
		})
	}

	submitLocation(e) {
		e.preventDefault()

		this.setState({
			filtering: false,
			filter: {}
		})

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

					if (this.state.filter.specialNeeds === 'Yes') {
						if (
							eachCat['options']['option'] &&
							eachCat['options']['option'].length
						) {
							return eachCat['options']['option'].find(hasSpecialNeeds)
						} else if (eachCat['options']['option']) {
							return hasSpecialNeeds(eachCat['options']['option'])
						} else {
							return false
						}
					} else {
						// if specialNeeds filter is 'No'
						if (
							eachCat['options']['option'] &&
							eachCat['options']['option'].length
						) {
							return !eachCat['options']['option'].find(hasSpecialNeeds)
						} else if (eachCat['options']['option']) {
							return !hasSpecialNeeds(eachCat['options']['option'])
						} else {
							return true
						}
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
				<CatShow
					id={this.state.catId}
					cat={this.state.catDetails}
					shelter={this.state.catShelter}
				/>
				<div className="cat-filters">
					<form className="location-filter" onSubmit={this.submitLocation}>
						<TextField
							name="location"
							hintText="21224 or Baltimore, MD"
							floatingLabelText="Location"
							onChange={this.changeLocation}
							style={{ width: '200px' }}
						/>
					</form>
					<CatFilter
						filterName={'breed'}
						displayName={'Breeds'}
						data={this.state.breeds}
						handleFilter={this.handleFilter}
						filtering={this.state.filtering}
						selectMultiple={true}
					/>
					<CatFilter
						filterName={'age'}
						displayName={'Age'}
						data={catAges}
						handleFilter={this.handleFilter}
						filtering={this.state.filtering}
						selectMultiple={true}
					/>
					<CatFilter
						filterName={'sex'}
						displayName={'Gender'}
						data={catGenders}
						handleFilter={this.handleFilter}
						filtering={this.state.filtering}
						selectMultiple={true}
					/>
					<CatFilter
						filterName={'specialNeeds'}
						displayName={'Special Needs?'}
						data={catSpecialNeeds}
						handleFilter={this.handleFilter}
						filtering={this.state.filtering}
						selectMultiple={false}
					/>
				</div>
				<CatTable
					cats={
						this.state.filtering ? this.state.filteredCats : this.state.cats
					}
					showCat={this.showCat}
				/>
			</div>
		)
	}
}

export default CatList
