import React, { Component } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';

import { PAGE_SIZE } from '../../utils/constants';
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api';

import AddForm from './AddForm';
import AuthForm from './AuthForm';

import memoryUtils from '../../utils/memoryUtils';
import { formateDate } from '../../utils/dateUtils';
import storageUtils from '../../utils/storageUtils';

export default class Role extends Component {
	state = {
		roles: [], // 所有角色的列表
		role: {}, // 选中的role
		isShowAdd: false, // 是否显示添加界面
		isShowAuth: false, // 是否显示设置权限界面
	};

	constructor(props) {
		super(props);

		this.auth = React.createRef();
	}

	initColumn = () => {
		this.columns = [
			{
				title: '角色名称',
				dataIndex: 'name',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				render: create_time => formateDate(create_time),
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
				render: formateDate,
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
			},
		];
	};

	getRoles = async () => {
		const result = await reqRoles();
		if (result.data.status === 0) {
			const roles = result.data.data;
			this.setState({
				roles,
			});
		}
	};

	onRow = role => {
		return {
			onClick: event => {
				// 点击行
				// console.log('row onClick()', role);
				// alert('点击行')
				this.setState({
					role,
				});
			},
		};
	};

	/*
        添加角色
    */
	addRole = () => {
		const { validateFields, resetFields } = this.form.current;
		validateFields()
			.then(async values => {
				const { rolename } = values;
				// 请求添加
				const result = await reqAddRole(rolename);
				// 根据结果提示/更新列表显示
				if (result.data.status === 0) {
					message.success('添加角色成功');
					// 隐藏确认框
					this.setState({
						isShowAdd: false,
					});
					// 新产生的角色
					const role = result.data.data;
					// 更新roles状态: 基于原本状态数据更新
					this.setState(state => ({
						roles: [...state.roles, role],
					}));
					// 清空数据
					resetFields();
				} else {
					message.success('添加角色失败');
				}
			})
			.catch(error => {
				console.log('error', error);
			});
	};

	/*
        更新角色
    */
	updateRole = async () => {
		// 隐藏确认框
		this.setState({
			isShowAuth: false,
		});

		const role = this.state.role;
		// 得到最新的menus
		const menus = this.auth.current.getMenus();
		role.menus = menus;
		role.auth_time = Date.now();
		role.auth_name = memoryUtils.user.username;

		// 请求更新
		const result = await reqUpdateRole(role);
		if (result.data.status === 0) {
			// this.getRoles()
			// 如果当前更新的是自己角色的权限, 强制退出
			if (role._id === memoryUtils.user.role_id) {
				memoryUtils.user = {};
				storageUtils.removeUser();
				this.props.history.replace('/login');
				message.success('当前用户角色权限成功');
			} else {
				message.success('设置角色权限成功');
				this.setState({
					roles: [...this.state.roles],
				});
			}
		}
	};

	componentDidMount() {
		this.initColumn();
		this.getRoles();
	}

	render() {
		const { roles, role, isShowAdd, isShowAuth } = this.state;

		const title = (
			<span>
				<Button type='primary' onClick={() => this.setState({ isShowAdd: true })}>
					创建角色
				</Button>{' '}
				&nbsp;&nbsp;
				<Button type='primary' disabled={!role._id} onClick={() => this.setState({ isShowAuth: true })}>
					设置角色权限
				</Button>
			</span>
		);
		return (
			<Card title={title}>
				<Table
					bordered
					rowKey='_id'
					dataSource={roles}
					columns={this.columns}
					pagination={{ defaultPageSize: PAGE_SIZE }}
					rowSelection={{
						type: 'radio',
						selectedRowKeys: [role._id],
						onSelect: role => {
							// 选择某个radio时回调
							this.setState({
								role,
							});
						},
					}}
					onRow={this.onRow}
				/>

				<Modal
					title='添加角色'
					visible={isShowAdd}
					onOk={this.addRole}
					onCancel={() => {
						this.setState({ isShowAdd: false });
						this.form.current.resetFields();
					}}>
					<AddForm setForm={form => (this.form = form)} />
				</Modal>

				<Modal
					title='设置角色权限'
					visible={isShowAuth}
					onOk={this.updateRole}
					onCancel={() => {
						this.setState({ isShowAuth: false });
					}}>
					<AuthForm ref={this.auth} role={role} />
				</Modal>
			</Card>
		);
	}
}
