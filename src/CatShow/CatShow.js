import React from 'react'
import './CatShow.css'

const CatShow = props => {
	let cat
	let shelter

	if (props.cat && props.shelter) {
		cat = props.cat
		shelter = props.shelter
	}

	let hasSpecialNeeds = cat => cat.$t === 'specialNeeds'
	let catPhoto = cat => cat['@size'] === 'x' && cat['@id'] === '1'

	if (cat) {
		return (
			<div className="cat-show">
				<div className="cat-show-photo">
					{cat.media ? (
						cat.media.photos ? (
							<img
								src={cat.media.photos.photo.find(catPhoto).$t}
								alt={cat.name.$t}
							/>
						) : (
							'no photo available :('
						)
					) : (
						''
					)}
				</div>
				<div className="cat-show-details">
					<h2 className="cat-show-name">{cat.name ? cat.name.$t : ''}</h2>
					<p className="cat-show-basics small">
						{cat.sex
							? cat.sex.$t === 'F' ? 'Female' : cat.sex.$t === 'M' ? 'Male' : ''
							: ''}{' '}
						· {cat.age ? cat.age.$t : ''} ·{' '}
						{cat.breeds
							? cat.breeds.breed.length
								? cat.breeds.breed.map(breed => breed.$t).join(' & ')
								: cat.breeds.breed.$t
							: ''}{' '}
						{cat.mix ? (cat.mix.$t === 'yes' ? 'Mix' : '') : ''}
					</p>
					<p className="cat-show-specialNeeds bold">
						{cat.options
							? cat.options.option
								? cat.options.option.length
									? cat.options.option.find(hasSpecialNeeds)
										? 'This cat has special needs.'
										: ''
									: cat.options.option.$t === 'hasSpecialNeeds'
										? 'This cat has special needs.'
										: ''
								: ''
							: ''}
					</p>
					<hr />
					<p className="cat-show-description">
						{cat.description ? cat.description.$t : ''}
					</p>
					<div className="cat-show-contact">
						<h3 className="cat-show-contact-heading small bold">
							{cat.contact ? 'Interested? Contact us!' : ''}
						</h3>
						<p className="cat-show-contact-shelter">
							<i className="fas fa-home fa-fw" />
							{shelter.name.$t}
						</p>
						<p className="cat-show-contact-location">
							<i className="fas fa-map-marker fa-fw" />
							{shelter.city.$t}, {shelter.state.$t}
						</p>
						<p className="cat-show-contact-email">
							<i className="fas fa-envelope fa-fw" />
							<a href={'mailto:' + shelter.email.$t}>{shelter.email.$t}</a>
						</p>
						<p className="cat-show-contact-phone">
							<i className="fas fa-phone fa-fw" />
							{shelter.phone.$t}
						</p>
					</div>
				</div>
			</div>
		)
	} else {
		return <div />
	}
}

export default CatShow
