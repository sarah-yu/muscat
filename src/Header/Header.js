import React from 'react'
import './Header.css'

let home
if (document.location.hostname === 'localhost') {
	home = '/'
} else {
	home = '/muscat'
}

const Header = () => (
	<header>
		<div className="header-wrapper">
			<h1 className="header-title">
				<a href={home}>muscat</a>
			</h1>
			<p className="header-description">Find your purrfect friend</p>
		</div>
	</header>
)

export default Header
