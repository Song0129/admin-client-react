/**
 * 应用的根组件
 */
import React, { Component } from 'react';
import { Button } from 'antd';

export default class App extends Component {
	render() {
		return (
			<div>
				App.. <Button type='primary'>123</Button>
			</div>
		);
	}
}
