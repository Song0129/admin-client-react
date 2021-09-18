import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProductHome from './Home';
import RroductAdd from './Add';
import ProductDetail from './Detail';

import './product.less';

export default class Product extends Component {
	render() {
		return (
			<Switch>
				<Route path='/products/product' component={ProductHome} exact />
				<Route path='/products/product/add' component={RroductAdd} />
				<Route path='/products/product/detail' component={ProductDetail} />
				<Redirect to='/products/product' />
			</Switch>
		);
	}
}
