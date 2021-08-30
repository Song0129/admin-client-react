/**
 * 应用的根组件
 */
import React, { Component } from 'react';
import { Button, message } from 'antd';

export default class App extends Component {
	handleClick = () => {
		message.success('success');
	};
	render() {
		return (
			<div>
				App..{' '}
				<Button type='primary' onClick={this.handleClick}>
					123
				</Button>
			</div>
		);
	}
}
