import React, { Component } from 'react';
import './Login.less';

import logo from './images/logo.png';

/**
 * 登录路由组件
 */

export default class Login extends Component {
	render() {
		return (
			<div className='login'>
				<header className='login-header'>
					<img src={logo} alt='' />
					<h1>React项目: 后台管理系统</h1>
				</header>
				<section className='login-content'></section>
			</div>
		);
	}
}
