import axios from 'axios'

let servicePath
if (document.location.hostname === 'localhost') {
	servicePath = 'http://localhost:3001/api'
} else {
	servicePath = 'https://muscat-service.herokuapp.com/api'
}

export function getCatsFrom(location) {
	console.log(location)

	axios
		.post(`${servicePath}/cats/${location}`)
		.then(res => {
			this.setState(
				{
					cats: res.data
				},
				() => console.log(this.state.cats)
			)
		})
		.catch(err => console.log(err))
}

export function getBreeds() {
	axios
		.get(`${servicePath}/cats/breeds`)
		.then(res => {
			let breeds = res.data.map(breed => breed.$t)

			this.setState({
				breeds: breeds
			})
		})
		.catch(err => console.log(err))
}

export function getCat(id) {
	axios
		.get(`${servicePath}/cats/${id}`)
		.then(res => {
			this.setState(
				{
					catDetails: res.data
				},
				() => console.log(this.state.catDetails)
			)
		})
		.catch(err => console.log(err))
}
