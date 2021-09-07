import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input } from 'antd';

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

	componentDidUpdate(prevProps, prevState) {
		// TODO 暂时解决选中态更新不及时的问题
		const { parentId } = this.props;
		this.formRef.current.setFieldsValue({ parentId });
	}

	render() {
		const { categorys, parentId } = this.props;
		console.log(`parentId`, parentId);
		return (
			<Form initialValues={{ parentId }} ref={this.formRef} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
				<Item label='分类' name='parentId' validateTrigger={['onChange', 'onBlur']} required rules={[{ required: true, message: '请输入分类名称' }]}>
					<Select style={{ width: '200px' }}>
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
			</Form>
		);
	}
}
