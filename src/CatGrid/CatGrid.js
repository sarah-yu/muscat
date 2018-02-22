import React, { Component } from 'react'
import axios from 'axios'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import CatFilter from '../CatFilter/CatFilter'
import CatTable from '../CatTable/CatTable'

import { getCats, getBreeds } from '../services/muscat'

class CatGrid extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cats: [],
			breeds: [],
			location: ''
		}

		this.getCats = getCats.bind(this)
		this.getBreeds = getBreeds.bind(this)

		this.handleChange = this.handleChange.bind(this)
		this.handleLocation = this.handleLocation.bind(this)
	}

	componentDidMount() {
		this.getCats()
		this.getBreeds()
	}

	setFilter() {
		this.setState({})
	}

	handleChange(e) {
		console.log(e.target.value)

		this.setState({
			location: e.target.value
		})
	}

	handleLocation() {
		console.log('submit location')
		console.log(this.state.location)
	}

	render() {
		let catPhoto = cat => cat['@size'] === 'x' && cat['@id'] === '1'
		// let catPhoto = cat => cat['@size'] === 'fpm' && cat['@id'] === '1'

		let isAltered = cat => cat.$t === 'altered'
		let hasSpecialNeeds = cat => cat.$t === 'specialNeeds'
		let isHouseTrained = cat => cat.$t === 'houseTrained'
		let hasShots = cat => cat.$t === 'hasShots'
		let badWithKids = cat => cat.$t === 'noKids'
		let badWithCats = cat => cat.$t === 'noCats'
		let badWithDogs = cat => cat.$t === 'noDogs'

		let catAges = ['Kitten', 'Young', 'Adult', 'Senior']
		let catGenders = ['Male', 'Female']
		let catSpecialNeeds = ['Yes', 'No']

		// TEST AGES
		let ages = this.state.cats
			.map(cat => cat.age.$t)
			.filter((age, index, ages) => ages.indexOf(age) === index)
		console.log(ages)

		let genders = this.state.cats
			.map(cat => cat.sex.$t)
			.filter((gender, index, genders) => genders.indexOf(gender) === index)
			.map(
				gender =>
					gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Unknown'
			)
		console.log(genders)

		let cats = this.state.cats.map((cat, index) => {
			let catBreed = cat.breeds.breed
			let catOptions = cat.options.option
			let catContact = cat.contact

			return (
				<div key={index}>
					<img
						src={cat.media.photos.photo.find(catPhoto).$t}
						alt={cat.name.$t}
					/>
					<h3>Name: {cat.name.$t}</h3>
					<h4>
						Breed:{' '}
						{catBreed.length
							? catBreed.map(breed => breed.$t).join(' & ')
							: catBreed.$t}{' '}
						{cat.mix.$t === 'yes' ? 'Mix' : ''}
					</h4>
					<h4>Age: {cat.age.$t}</h4>
					<h4>Sex: {cat.sex.$t === 'M' ? 'Male' : 'Female'}</h4>
					<h4>Size: {cat.size.$t}</h4>
					<h4>
						Spayed / Neutered: {catOptions.find(isAltered) ? 'Yes' : 'No'}
					</h4>
					<h4>
						Special Needs: {catOptions.find(hasSpecialNeeds) ? 'Yes' : 'No'}
					</h4>
					<h4>
						House-trained: {catOptions.find(isHouseTrained) ? 'Yes' : 'No'}
					</h4>
					<h4>Vaccinations: {catOptions.find(hasShots) ? 'Yes' : 'No'}</h4>
					<h4>
						Good with kids: {!catOptions.find(badWithKids) ? 'Yes' : 'No'}
					</h4>
					<h4>
						Good with other cats: {!catOptions.find(badWithCats) ? 'Yes' : 'No'}
					</h4>
					<h4>
						Good with other dogs: {!catOptions.find(badWithDogs) ? 'Yes' : 'No'}
					</h4>
					<h4>Description:</h4>
					<p>{cat.description.$t}</p>
					<h4>
						Location: {catContact.city.$t}, {catContact.state.$t}
					</h4>
					<h4>Phone: {catContact.phone.$t}</h4>
					<h4>Email: {catContact.email.$t}</h4>
					<hr />
				</div>
			)
		})

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
				<CatFilter filterName={'Breeds'} data={this.state.breeds} />
				<CatFilter filterName={'Age'} data={catAges} />
				<CatFilter filterName={'Gender'} data={catGenders} />
				<CatFilter filterName={'Special Needs?'} data={catSpecialNeeds} />
				<CatTable cats={this.state.cats} />
			</div>
		)
	}
}

export default CatGrid
