import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less';
import logo from './images/logo.png';

import { reqLogin } from '../../api';

import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

const { Item } = Form;

/**
 * 登录路由组件
 */

export default class Login extends Component {
	handleSubmit = async event => {
		const { username, password } = event;
		const result = await reqLogin(username, password);
		console.log(result);
		if (result.status === 0) {
			// 登陆成功
			// 提示登陆成功
			message.success('登陆成功');

			// 保存user
			const user = result.data;
			memoryUtils.user = user; // 保存在内存中
			storageUtils.saveUser(user); // 保存到local中

			// 跳转到管理界面 (不需要再回退回到登陆)
			this.props.history.replace('/');
		} else {
			// 登陆失败
			// 提示错误信息
			message.error(result.msg);
		}
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
								{ required: true, message: '请输入用户名' },
								// { min: 4, message: '用户名至少4位' },
								// { max: 12, message: '用户名最多12位' },
								// { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
							]}>
							<Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=' 用户名' />
						</Item>
						<Item
							name='password'
							validateTrigger={['onChange', 'onBlur']}
							rules={[
								({ getFieldValue }) => ({
									validator(_, value) {
										// 	console.log(getFieldValue('username'));
										if (!value) {
											return Promise.reject('请输入密码');
										} else {
											return Promise.resolve();
										}
										// else if (value.length < 4) {
										// 		return Promise.reject('密码长度不能小于4位');
										// 	} else if (value.length > 12) {
										// 		return Promise.reject('密码长度不能大于12位');
										// 	} else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
										// 		return Promise.reject('密码必须是英文、数字或下划线组成');
										// 	} else {
										// 		return Promise.resolve(); // 验证通过
										// 	}
									},
								}),
							]}>
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
