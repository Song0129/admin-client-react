import React, { Component } from 'react';
import { Card, Form, Input, Cascader, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { reqCategorys, reqAddOrUpdateProduct } from '../../api';

import PicturesWall from './PictureWall';
import RichTextEditor from './RichText';

const { Item } = Form;
const { TextArea } = Input;

export default class Add extends Component {
	state = {
		options: [],
	};

	constructor(props) {
		super(props);
		// 取出携带的state
		const product = this.props.location.state; // 如果是添加没值, 否则有值
		// 保存是否是更新的标识
		this.isUpdate = !!product;
		// 保存商品(如果没有, 保存是{})
		this.product = product || {};

		// 创建用来保存ref标识的标签对象的容器
		this.pw = React.createRef();
		this.editor = React.createRef();
		this.formRef = React.createRef();
	}

	initOptions = async categorys => {
		// 根据categorys生成options数组
		const options = categorys.map(c => ({
			value: c._id,
			label: c.name,
			isLeaf: false, // 不是叶子
		}));

		// 如果是一个二级分类商品的更新
		const { isUpdate, product } = this;
		const { pCategoryId } = product;
		if (isUpdate && pCategoryId !== '0') {
			// 获取对应的二级分类列表
			const subCategorys = await this.getCategorys(pCategoryId);
			// 生成二级下拉列表的options
			const childOptions = subCategorys.map(c => ({
				value: c._id,
				label: c.name,
				isLeaf: true,
			}));

			// 找到当前商品对应的一级option对象
			const targetOption = options.find(option => option.value === pCategoryId);

			// 关联对应的一级option上
			targetOption.children = childOptions;
		}

		// 更新options状态
		this.setState({
			options,
		});
	};

	getCategorys = async parentId => {
		const result = await reqCategorys(parentId); // {status: 0, data: categorys}
		if (result.data.status === 0) {
			const categorys = result.data.data;
			// 如果是一级分类列表
			if (parentId === '0') {
				this.initOptions(categorys);
			} else {
				// 二级列表
				return categorys; // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
			}
		}
	};

	loadData = async selectedOptions => {
		// 得到选择的option对象
		const targetOption = selectedOptions[0];
		// 显示loading
		targetOption.loading = true;

		// 根据选中的分类, 请求获取二级分类列表
		const subCategorys = await this.getCategorys(targetOption.value);
		// 隐藏loading
		targetOption.loading = false;
		// 二级分类数组有数据
		if (subCategorys && subCategorys.length > 0) {
			// 生成一个二级列表的options
			const childOptions = subCategorys.map(c => ({
				value: c._id,
				label: c.name,
				isLeaf: true,
			}));
			// 关联到当前option上
			targetOption.children = childOptions;
		} else {
			// 当前选中的分类没有二级分类
			targetOption.isLeaf = true;
		}

		// 更新options状态
		this.setState({
			options: [...this.state.options],
		});
	};

	submit = () => {
		const { validateFields, resetFields } = this.formRef.current;
		validateFields()
			.then(async values => {
				// 1. 收集数据, 并封装成product对象
				const { name, desc, price, categoryIds } = values;
				let pCategoryId, categoryId;
				if (categoryIds.length === 1) {
					pCategoryId = '0';
					categoryId = categoryIds[0];
				} else {
					pCategoryId = categoryIds[0];
					categoryId = categoryIds[1];
				}
				const imgs = this.pw.current.getImgs();
				const detail = this.editor.current.getDetail();

				const product = { name, desc, price, imgs, detail, pCategoryId, categoryId };

				// 如果是修改, 需要添加_id
				if (this.isUpdate) {
					product._id = this.product._id;
				}

				// 2. 调用接口请求函数去添加/修改
				const result = await reqAddOrUpdateProduct(product);

				// 3. 根据结果提示
				if (result.data.status === 0) {
					message.success(`${this.isUpdate ? '修改' : '添加'}商品成功!`);
					// 清除输入数据
					resetFields();
					this.props.history.goBack();
				} else {
					message.error(`${this.isUpdate ? '修改' : '添加'}商品失败!`);
				}
			})
			.catch(err => {
				console.log(`err`, err);
			});
	};

	componentDidMount() {
		this.getCategorys('0');
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
		};
	}

	render() {
		const { isUpdate, product } = this;
		const { pCategoryId, categoryId, imgs, detail } = product;
		// 用来接收级联分类ID的数组
		const categoryIds = [];
		if (isUpdate) {
			// 商品是一个一级分类的商品
			if (pCategoryId === '0') {
				categoryIds.push(categoryId);
			} else {
				// 商品是一个二级分类的商品
				categoryIds.push(pCategoryId);
				categoryIds.push(categoryId);
			}
		}

		// 指定Item布局的配置对象
		const formItemLayout = {
			labelCol: { span: 2 }, // 左侧label的宽度
			wrapperCol: { span: 8 }, // 右侧包裹的宽度
		};

		// 头部左侧标题
		const title = (
			<div style={{ display: 'flex' }}>
				<Button type='link' onClick={() => this.props.history.goBack()}>
					<ArrowLeftOutlined style={{ marginRight: 10, fontSize: 20 }} />
				</Button>
				<span>{isUpdate ? '修改商品' : '添加商品'}</span>
			</div>
		);

		return (
			<Card title={title}>
				<Form ref={this.formRef} {...formItemLayout} initialValues={{ ...product, categoryIds: categoryIds }}>
					<Item label='商品名称' name='name' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请输入商品名称' }]}>
						<Input placeholder='请输入商品名称' />
					</Item>
					<Item label='商品描述' name='desc' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请输入商品描述' }]}>
						<TextArea placeholder='请输入商品描述' autosize={{ minRows: 2, maxRows: 6 }} />
					</Item>
					<Item
						label='商品价格'
						name='price'
						validateTrigger={['onChange', 'onBlur']}
						rules={[
							{ required: true, message: '' },
							() => ({
								validator(_, value) {
									if (value && value * 1 > 0) {
										return Promise.resolve();
									} else if (!value) {
										return Promise.reject(new Error('请输入商品价格'));
									} else {
										return Promise.reject(new Error('请输入正确的商品价格'));
									}
								},
							}),
						]}>
						<Input type='number' placeholder='请输入商品价格' />
					</Item>
					<Item label='商品分类' name='categoryIds' validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: '请指定商品分类' }]}>
						<Cascader placeholder='请指定商品分类' options={this.state.options} loadData={this.loadData} />
					</Item>
					<Item label='商品图片'>
						<PicturesWall ref={this.pw} imgs={imgs} />
					</Item>
					<Item label='商品详情' labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
						<RichTextEditor ref={this.editor} detail={detail} />
					</Item>
					<Item label=''>
						<Button type='primary' onClick={this.submit}>
							提交
						</Button>
					</Item>
				</Form>
			</Card>
		);
	}
}
