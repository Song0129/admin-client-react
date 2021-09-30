import React, { Component } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';
import { formateDate } from '../../utils/dateUtils';
import { reqDeleteUser, reqUsers, reqAddOrUpdateUser } from '../../api/index';
import UserForm from './UserForm';

export default class User extends Component {
	state = {
		users: [], // 所有用户列表
		roles: [], // 所有角色列表
		isShow: false, // 是否显示确认框
	};

	initColumns = () => {
		this.columns = [
			{
				title: '用户名',
				dataIndex: 'username',
			},
			{
				title: '邮箱',
				dataIndex: 'email',
			},

			{
				title: '电话',
				dataIndex: 'phone',
			},
			{
				title: '注册时间',
				dataIndex: 'create_time',
				render: formateDate,
			},
			{
				title: '所属角色',
				dataIndex: 'role_id',
				render: role_id => this.roleNames[role_id],
			},
			{
				title: '操作',
				render: user => (
					<span>
						<Button type='link' onClick={() => this.showUpdate(user)}>
							修改
						</Button>
						<Button type='link' onClick={() => this.deleteUser(user)}>
							删除
						</Button>
					</span>
				),
			},
		];
	};

	/*
        根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
    */
	initRoleNames = roles => {
		const roleNames = roles.reduce((pre, role) => {
			pre[role._id] = role.name;
			return pre;
		}, {});
		// 保存
		this.roleNames = roleNames;
	};

	/*
        显示添加界面
    */
	showAdd = () => {
		this.user = null; // 去除前面保存的user
		this.setState({ isShow: true });
	};

	/*
        显示修改界面
    */
	showUpdate = user => {
		this.user = user; // 保存user
		this.setState({
			isShow: true,
		});
	};

	/*
        删除指定用户
    */
	deleteUser = user => {
		Modal.confirm({
			title: `确认删除${user.username}吗?`,
			onOk: async () => {
				const result = await reqDeleteUser(user._id);
				if (result.data.status === 0) {
					message.success('删除用户成功!');
					this.getUsers();
				}
			},
		});
	};

	/*
        添加/更新用户
    */
	addOrUpdateUser = async () => {
		const { validateFields, resetFields } = this.form.current;
		validateFields()
			.then(async user => {
				// 如果是更新, 需要给user指定_id属性
				if (this.user) {
					user._id = this.user._id;
				}
				// 提交添加的请求
				const result = await reqAddOrUpdateUser(user);
				this.setState({ isShow: false });
				if (result.data.status === 0) {
					message.success(`${this.user ? '修改' : '添加'}用户成功!`);
					// 清除输入数据
					resetFields();
					this.getUsers();
				} else {
					message.error(`${this.user ? '修改' : '添加'}用户失败!`);
				}
			})
			.catch(err => {
				console.log(`err`, err);
			});
	};

	getUsers = async () => {
		const result = await reqUsers();
		if (result.data.status === 0) {
			const { users, roles } = result.data.data;
			this.initRoleNames(roles);
			this.setState({
				users,
				roles,
			});
		}
	};

	componentDidMount() {
		this.initColumns();
		this.getUsers();
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
		};
	}

	render() {
		const { users, roles, isShow } = this.state;
		const user = this.user || {};

		const title = (
			<Button type='primary' onClick={this.showAdd}>
				创建用户
			</Button>
		);

		return (
			<Card title={title}>
				<Table bordered rowKey='_id' dataSource={users} columns={this.columns} pagination={{ defaultPageSize: 2 }} />

				<Modal
					title={user._id ? '修改用户' : '添加用户'}
					visible={isShow}
					onOk={this.addOrUpdateUser}
					onCancel={() => {
						this.form.current.resetFields();
						this.setState({ isShow: false });
					}}>
					<UserForm setForm={form => (this.form = form)} roles={roles} user={user} />
				</Modal>
			</Card>
		);
	}
}
