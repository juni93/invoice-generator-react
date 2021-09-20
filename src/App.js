import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Invoice from './components/Invoice'


const App = () => {
	return (
		<div className="container">
			<h1 className="mt-3">Invoice Generator</h1>
			<div className="row mt-3">
				<div className="col-sm">
					<Invoice />
				</div>
			</div>
		</div>
	)
}

export default App
