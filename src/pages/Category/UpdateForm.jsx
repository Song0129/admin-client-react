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

	componentDidUpdate(prevProps, prevState) {
		// TODO 暂时解决选中态更新不及时的问题
		const { categoryName } = this.props;
		this.formRef.current.setFieldsValue({ categoryName });
	}

	render() {
		const { categoryName } = this.props;
		return (
			<Form initialValues={{ categoryName }} ref={this.formRef} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
				<Item label='名称' name='categoryName' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请输入分类名称' }]}>
					<Input placeholder='请输入分类名称' />
				</Item>
			</Form>
		);
	}
}
