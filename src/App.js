import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './auth/Login';
import Dashboard from './components/Dashboard';



const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/dashboard" component={Dashboard} />
			</Switch>
		</Router>

	)
}

export default App
