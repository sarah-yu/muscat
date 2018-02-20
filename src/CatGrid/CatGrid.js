import React, { Component } from 'react'
import axios from 'axios'

import CatTable from '../CatTable/CatTable'

class CatGrid extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cats: []
		}
	}

	componentDidMount() {
		axios
			.get(`http://localhost:3001/api/cats`)
			.then(res => {
				this.setState(
					{
						cats: res.data
					},
					() => {
						console.log(this.state)
					}
				)
			})
			.catch(err => console.log(err))
	}

	render() {
		let catPhoto = cat => cat['@size'] === 'x' && cat['@id'] === '1'
		let isAltered = cat => cat.$t === 'altered'
		let hasSpecialNeeds = cat => cat.$t === 'specialNeeds'
		let isHouseTrained = cat => cat.$t === 'houseTrained'
		let hasShots = cat => cat.$t === 'hasShots'
		let badWithKids = cat => cat.$t === 'noKids'
		let badWithCats = cat => cat.$t === 'noCats'
		let badWithDogs = cat => cat.$t === 'noDogs'

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
				<CatTable cats={this.state.cats} />
				{cats}
			</div>
		)
	}
}

export default CatGrid
