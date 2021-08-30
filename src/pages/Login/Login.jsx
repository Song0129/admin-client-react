import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less';
import logo from './images/logo.png';

const { Item } = Form;

/**
 * 登录路由组件
 */

export default class Login extends Component {
	handleSubmit = event => {
		console.log(event, 1231312);
	};
	render() {
		return (
			<div className='login'>
				<header className='login-header'>
					<img src={logo} alt='' />
					<h1>React项目: 后台管理系统</h1>
				</header>
				<section className='login-content'>
					<h3>用户登录</h3>
					<Form onFinish={this.handleSubmit} className='login-form'>
						<Item
							name='username'
							validateTrigger={['onChange', 'onBlur']}
							rules={[
								{ required: true, message: 'Please input your username!' },
								{ min: 4, message: '用户名至少4位' },
								{ max: 12, message: '用户名最多12位' },
								{ pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
							]}>
							<Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=' 用户名' />
						</Item>
						<Item name='password' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: 'Please input your password!' }]}>
							<Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder=' 密码' />
						</Item>
						<Item>
							<Button type='primary' htmlType='submit' className='login-form-button'>
								登录
							</Button>
						</Item>
					</Form>
				</section>
			</div>
		);
	}
}
