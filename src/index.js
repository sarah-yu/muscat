import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
	<Router>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</Router>,
	document.getElementById('root')
)
registerServiceWorker()
