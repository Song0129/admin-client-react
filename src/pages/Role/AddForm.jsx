import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const { Item } = Form;

export default class AddForm extends Component {
	static propTypes = {
		setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
	};

	formRef = React.createRef();

	componentDidMount() {
		this.props.setForm(this.formRef);
	}

	render() {
		// 指定Item布局的配置对象
		const formItemLayout = {
			labelCol: { span: 4 }, // 左侧label的宽度
			wrapperCol: { span: 15 }, // 右侧包裹的宽度
		};

		return (
			<Form ref={this.formRef} {...formItemLayout}>
				<Item label='角色名称' name='rolename' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '角色名称必须输入' }]}>
					<Input placeholder='请输入角色名称' />
				</Item>
			</Form>
		);
	}
}
