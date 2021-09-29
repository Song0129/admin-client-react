import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tree } from 'antd';
import menuList from '../../config/menuConfig';

const { Item } = Form;
const { TreeNode } = Tree;

export default class AuthForm extends Component {
	static propTypes = {
		role: PropTypes.object,
	};

	constructor(props) {
		super(props);

		// 根据传入角色的menus生成初始状态
		const { menus } = this.props.role;
		this.state = {
			checkedKeys: menus,
		};
		this.treeNodes = this.getTreeNodes(menuList);
	}

	/*
        父组件提交获取最新menus数据的方法
    */
	getMenus = () => this.state.checkedKeys;

	getTreeNodes = menuList => {
		return menuList.reduce((pre, item) => {
			pre.push(
				<TreeNode title={item.title} key={item.path}>
					{item.children ? this.getTreeNodes(item.children) : null}
				</TreeNode>
			);
			return pre;
		}, []);
	};

	// 选中某个node时的回调
	onCheck = checkedKeys => {
		console.log('onCheck', checkedKeys);
		this.setState({ checkedKeys });
	};

	componentDidMount() {}

	// 根据新传入的role来更新checkedKeys状态
	/*
        当组件接收到新的属性时自动调用
    */
	// componentWillReceiveProps(nextProps) {
	// 	console.log('componentWillReceiveProps()', nextProps);
	// 	const menus = nextProps.role.menus;
	// 	this.setState({
	// 		checkedKeys: menus,
	// 	});
	// }

	componentDidUpdate() {
		if (this.props.role.menus !== this.state.checkedKeys) {
			this.setState({
				checkedKeys: this.props.role.menus,
			});
		}
	}

	render() {
		const { role } = this.props;
		const { checkedKeys } = this.state;
		// 指定Item布局的配置对象
		const formItemLayout = {
			labelCol: { span: 4 }, // 左侧label的宽度
			wrapperCol: { span: 15 }, // 右侧包裹的宽度
		};

		return (
			<Form {...formItemLayout}>
				<Item label='角色名称'>
					<Input value={role.name} />
				</Item>

				<Tree checkable defaultExpandAll={true} treeData={menuList} checkedKeys={checkedKeys} onCheck={this.onCheck}>
					{/* <TreeNode title='平台权限' key='all'>
						{this.treeNodes}
					</TreeNode> */}
				</Tree>
			</Form>
		);
	}
}
