import React, { Component } from 'react'
import axios from 'axios'

import './App.css'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cats: []
		}
	}

	componentWillMount() {
		axios
			.get(`http://localhost:3001/api/pets`)
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
		let isAltered = cat => cat.$t === 'altered'
		let hasSpecialNeeds = cat => cat.$t === 'specialNeeds'
		let isHouseTrained = cat => cat.$t === 'houseTrained'
		let hasShots = cat => cat.$t === 'hasShots'
		let badWithKids = cat => cat.$t === 'noKids'
		let badWithCats = cat => cat.$t === 'noCats'
		let badWithDogs = cat => cat.$t === 'noDogs'
		let catPhoto = cat => cat['@size'] === 'x' && cat['@id'] === '1'

		let cats = this.state.cats.map((cat, index) => {
			return (
				<div key={index}>
					<img
						src={cat.media.photos.photo.find(catPhoto).$t}
						alt={cat.name.$t}
					/>
					<h3>Name: {cat.name.$t}</h3>
					<h4>
						Breed:{' '}
						{cat.breeds.breed.length
							? cat.breeds.breed.map(breed => breed.$t).join(' & ')
							: cat.breeds.breed.$t}{' '}
						{cat.mix.$t === 'yes' ? 'Mix' : ''}
					</h4>
					<h4>Age: {cat.age.$t}</h4>
					<h4>Sex: {cat.sex.$t === 'M' ? 'Male' : 'Female'}</h4>
					<h4>Size: {cat.size.$t}</h4>
					<h4>
						Spayed / Neutered:{' '}
						{cat.options.option.find(isAltered) ? 'Yes' : 'No'}
					</h4>
					<h4>
						Special Needs:{' '}
						{cat.options.option.find(hasSpecialNeeds) ? 'Yes' : 'No'}
					</h4>
					<h4>
						House-trained:{' '}
						{cat.options.option.find(isHouseTrained) ? 'Yes' : 'No'}
					</h4>
					<h4>
						Vaccinations: {cat.options.option.find(hasShots) ? 'Yes' : 'No'}
					</h4>
					<h4>
						Good with kids:{' '}
						{!cat.options.option.find(badWithKids) ? 'Yes' : 'No'}
					</h4>
					<h4>
						Good with other cats:{' '}
						{!cat.options.option.find(badWithCats) ? 'Yes' : 'No'}
					</h4>
					<h4>
						Good with other dogs:{' '}
						{!cat.options.option.find(badWithDogs) ? 'Yes' : 'No'}
					</h4>
					<h4>Description:</h4>
					<p>{cat.description.$t}</p>
					<h4>
						Location: {cat.contact.city.$t}, {cat.contact.state.$t}
					</h4>
					<h4>Phone: {cat.contact.phone.$t}</h4>
					<h4>Email: {cat.contact.email.$t}</h4>
					<hr />
				</div>
			)
		})

		return <div>{cats}</div>
	}
}

export default App
