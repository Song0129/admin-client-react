/**
 * 应用的根组件
 */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					{/*只匹配一个 */}
					<Route path='/login' component={Login}></Route>
					<Route path='/' component={Admin}></Route>
				</Switch>
			</BrowserRouter>
		);
	}
}
