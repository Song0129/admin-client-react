import React, { Component } from 'react';
import { Card, Table, Button, message, Modal } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';

import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api';

import AddForm from './AddForm';
import UpdateForm from './UpdateForm';

export default class Category extends Component {
	state = {
		loading: false, // 是否正在获取数据中
		categorys: [], // 一级分类列表
		subCategorys: [], // 二级分类列表
		parentId: '0', // 当前需要显示的分类列表的父分类ID
		parentName: '', // 当前需要显示的分类列表的父分类名称
		showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
	};

	/*
        初始化Table所有列的数组
    */
	initColumns = () => {
		this.columns = [
			{
				title: '分类的名称',
				dataIndex: 'name', // 显示数据对应的属性名
			},
			{
				title: '操作',
				width: 300,
				render: (
					category // 返回需要显示的界面标签
				) => (
					<span>
						<Button onClick={() => this.showUpdate(category)}>修改分类</Button>
						{/*如何向事件回调函数传递参数: 先定义一个匿名函数, 在函数调用处理的函数并传入数据*/}
						{this.state.parentId === '0' ? <Button onClick={() => this.showSubCategorys(category)}>查看子分类</Button> : null}
					</span>
				),
			},
		];
	};

	// 获取分类数据
	getCategorys = async parentId => {
		this.setState({ loading: true });
		parentId = parentId || this.state.parentId;
		const result = await reqCategorys(parentId);
		this.setState({ loading: false });
		console.log(result.data);
		if (result.data.status === 0) {
			const categorys = result.data.data;
			if (parentId === '0') {
				this.setState({ categorys });
			} else {
				this.setState({ subCategorys: categorys });
			}
		} else {
			message.error('获取分类列表失败');
		}
	};

	// 显示一级分类
	showCategorys = () => {
		// 更新为显示一列表的状态
		this.setState({
			parentId: '0',
			parentName: '',
			subCategorys: [],
		});
	};

	// 显示修改分类的确认框
	showUpdate = category => {
		this.category = category;
		this.setState({ showStatus: 2 });
	};

	// 更新分类
	updateCategory = value => {
		console.log(this.form);
	};

	// 显示查看子分类
	showSubCategorys = category => {
		// 更新状态
		this.setState(
			{
				parentId: category._id,
				parentName: category.name,
			},
			() => {
				// 在状态更新且重新render()后执行
				console.log('parentId', this.state.parentId); // '0'
				// 获取二级分类列表显示
				this.getCategorys();
			}
		);
	};

	// 取消
	handleCancel = () => {
		this.setState({ showStatus: 0 });
	};

	componentDidMount() {
		this.initColumns();
		this.getCategorys();
	}

	componentWillUnmount() {
		this.setState = () => false;
	}

	render() {
		// 读取状态数据
		const { categorys, subCategorys, parentId, parentName, loading, showStatus } = this.state;
		// 读取指定的分类
		const category = this.category || {}; // 如果还没有指定一个空对象
		// card的左侧
		const title =
			parentId === '0' ? (
				'一级分类列表'
			) : (
				<span>
					<Button type='link' onClick={this.showCategorys}>
						一级分类列表
					</Button>
					<RightOutlined style={{ marginRight: 5 }} />
					<span>{parentName}</span>
				</span>
			);
		// Card的右侧
		const extra = (
			<Button type='primary' onClick={this.showAdd}>
				<PlusOutlined />
				添加
			</Button>
		);
		return (
			<Card title={title} extra={extra}>
				<Table bordered rowKey='_id' loading={loading} dataSource={parentId === '0' ? categorys : subCategorys} columns={this.columns} pagination={{ defaultPageSize: 5, showQuickJumper: true }} />

				<Modal title='添加分类' visible={showStatus === 1} onOk={this.addCategory} onCancel={this.handleCancel}>
					<AddForm
						categorys={categorys}
						parentId={parentId}
						setForm={form => {
							this.form = form;
						}}
					/>
				</Modal>

				<Modal title='更新分类' visible={showStatus === 2} onOk={this.updateCategory} onCancel={this.handleCancel}>
					<UpdateForm
						categoryName={category.name ? category.name : ''}
						setForm={form => {
							this.form = form;
						}}
					/>
				</Modal>
			</Card>
		);
	}
}
