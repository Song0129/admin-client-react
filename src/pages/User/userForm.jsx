import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input } from 'antd';

const { Item } = Form;
const { Option } = Select;

export default class UserForm extends Component {
	static propTypes = {
		setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
		roles: PropTypes.array.isRequired,
		user: PropTypes.object,
	};

	formRef = React.createRef();

	initData = () => {
		const { user } = this.props;
		this.formRef.current.setFieldsValue({ ...user });
	};

	componentDidMount() {
		// 将form对象通过setForm()传递父组件
		this.props.setForm(this.formRef);
		this.initData();
	}

	componentDidUpdate() {
		this.initData();
	}

	render() {
		const { roles, user } = this.props;
		// 指定Item布局的配置对象
		const formItemLayout = {
			labelCol: { span: 4 }, // 左侧label的宽度
			wrapperCol: { span: 15 }, // 右侧包裹的宽度
		};
		return (
			<Form {...formItemLayout} ref={this.formRef}>
				<Item label='用户名' name='username' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请输入用户名' }]}>
					<Input placeholder='请输入用户名' />
				</Item>

				{user._id ? null : (
					<Item label='密码' name='password' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请输入密码' }]}>
						<Input placeholder='请输入密码' />
					</Item>
				)}

				<Item label='手机号' name='phone' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请输入手机号' }]}>
					<Input placeholder='请输入手机号' />
				</Item>

				<Item label='邮箱' name='email' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请输入邮箱' }]}>
					<Input placeholder='请输入邮箱' />
				</Item>

				<Item label='角色' name='role_id' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请输入分类名称' }]}>
					<Select placeholder='请选择角色'>
						{roles.map(role => (
							<Option key={role._id} value={role._id}>
								{role.name}
							</Option>
						))}
					</Select>
				</Item>
			</Form>
		);
	}
}
