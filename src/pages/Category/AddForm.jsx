import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input, Button } from 'antd';

const { Item } = Form;
const { Option } = Select;

export default class AddForm extends Component {
	static propTypes = {
		setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
		categorys: PropTypes.array.isRequired, // 一级分类的数组
		parentId: PropTypes.string.isRequired, // 父分类的ID
	};

	formRef = React.createRef();

	componentDidMount() {
		// 将form对象通过setForm()传递父组件
		this.props.setForm(this.formRef);
	}

	finish = () => {
		const { getFieldsValue, validateFields } = this.formRef.current;
		const formData = getFieldsValue(true);
		console.log(formData);

		validateFields(['appp', 'categoryName', 'aba'], (err, values) => {
			console.log(`err values`, err, values);
		});
	};

	render() {
		const { categorys, parentId } = this.props;
		return (
			<Form onFinish={this.finish} ref={this.formRef} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
				<Item label='分类' validateTrigger={['onChange', 'onBlur']} required rules={[{ required: true, message: '请输入分类名称' }]}>
					<Select defaultValue={parentId} style={{ width: '200px' }}>
						<Option value='0'>一级分类</Option>
						{categorys.map(c => (
							<Option key={c._id} value={c._id}>
								{c.name}
							</Option>
						))}
					</Select>
				</Item>
				<Item label='名称' name='categoryName' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请输入分类名称' }]}>
					<Input placeholder='请输入分类名称' style={{ width: '200px' }} />
				</Item>
				<Item label='名称' name='aba' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请输入分类名称' }]}>
					<Input placeholder='请输入分类名称' style={{ width: '200px' }} />
				</Item>
				<Item wrapperCol={{ span: 12, offset: 6 }}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Item>
			</Form>
		);
	}
}
