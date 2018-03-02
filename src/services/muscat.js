import axios from 'axios'

let servicePath
if (document.location.hostname === 'localhost') {
	servicePath = 'http://localhost:3001/api'
} else {
	servicePath = 'https://muscat-service.herokuapp.com/api'
}

export function getCatsFrom(location) {
	axios
		.post(`${servicePath}/cats/${location}`)
		.then(res => {
			this.setState({
				cats: res.data
			})
		})
		.catch(err => console.log(err))
}

export function getBreeds() {
	axios
		.get(`${servicePath}/breeds`)
		.then(res => {
			let breeds = res.data.map(breed => breed.$t)

			this.setState({
				breeds: breeds
			})
		})
		.catch(err => console.log(err))
}

export function getCat(id) {
	let that = this

	axios
		.get(`${servicePath}/cats/${id}`)
		.then(res => {
			this.setState(
				{
					catDetails: res.data
				},
				() => {
					let shelterId = this.state.catDetails.shelterId.$t
					getShelter(shelterId, that)
				}
			)
		})
		.catch(err => console.log(err))
}

export function getShelter(id, context) {
	console.log(id)

	axios
		.get(`${servicePath}/shelters/${id}`)
		.then(res => {
			context.setState(
				{
					catShelter: res.data
				},
				() => {
					console.log(context.state.catShelter)
				}
			)
		})
		.catch(err => console.log(err))
}
