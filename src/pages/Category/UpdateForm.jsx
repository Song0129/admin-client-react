import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const Item = Form.Item;

export default class UpdateForm extends Component {
	static propTypes = {
		categoryName: PropTypes.string.isRequired,
	};

	formRef = React.createRef();

	componentDidMount() {
		// 将form对象通过setForm()传递父组件
		this.props.setForm(this.formRef);
	}

	render() {
		const { categoryName } = this.props;
		return (
			<Form ref={this.formRef}>
				<Item name='categoryName' initialValue={categoryName} validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请输入用户名' }]}>
					<Input placeholder='请输入分类名称' />
				</Item>
			</Form>
		);
	}
}
