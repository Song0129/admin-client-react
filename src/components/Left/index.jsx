import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import * as Icon from '@ant-design/icons';

import './index.less';
// 引入所有的menu
import menuList from '../../config/menuConfig';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Left extends Component {
	state = {
		collapsed: false,
	};

	// menu中收起左侧栏
	onCollapse = () => {
		this.props.toggle();
	};

	// 创建Menu的icon
	geticon = iconname => {
		return React.createElement(Icon[iconname]);
	};

	// 遍历渲染menu
	getMenuNodes = menuList => {
		// 得到当前请求的路由路径
		const path = this.props.location.pathname;

		return menuList.reduce((pre, item) => {
			// 如果当前用户有item对应的权限, 才需要显示对应的菜单项
			// if (this.hasAuth(item)) {
			// 向pre添加<Menu.Item>
			if (!item.children) {
				pre.push(
					<Menu.Item key={item.path} icon={this.geticon(item.icon)}>
						<Link to={item.path}>
							{/* <Icon type={item.icon} /> */}
							<span>{item.title}</span>
						</Link>
					</Menu.Item>
				);
			} else {
				// 查找一个与当前请求路径匹配的子Item
				const cItem = item.children.find(cItem => path.indexOf(cItem.path) === 0);
				// 如果存在, 说明当前item的子列表需要打开
				if (cItem) {
					this.openKey = item.path;
				}

				// 向pre添加<SubMenu>
				pre.push(
					<SubMenu
						key={item.path}
						icon={this.geticon(item.icon)}
						title={
							<span>
								{/* <Icon type={item.icon} /> */}
								<span>{item.title}</span>
							</span>
						}>
						{this.getMenuNodes(item.children)}
					</SubMenu>
				);
			}
			// }

			return pre;
		}, []);
	};

	onOpenChange = keys => {
		console.log(keys);
		// const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
		// if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
		// 	setOpenKeys(keys);
		// } else {
		// 	setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		// }
	};

	render() {
		// 渲染路由
		this.menuNodes = this.getMenuNodes(menuList);

		const { collapsed } = this.props;
		const openKey = this.openKey;
		// 获取当前路由
		let path = this.props.location.pathname;
		if (path.indexOf('/product') === 0) {
			// 当前请求的是商品或其子路由界面
			path = '/product';
		}
		return (
			<Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
				<div className='logo'>
					<a href='/' className='router-link-active'>
						{collapsed ? (
							<h1 className='small'>
								<svg t='1597989581210' className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4448' width='30' height='30'>
									<path d='M218.112 64h583.296L1024 384.768 509.76 960 0 384.768 218.112 64z m286.08 504.192l-252.48-287.36-86.72 91.968 339.2 366.464 329.28-366.464-77.184-91.968-252.096 287.36z' fill='#fff' p-id='4449'></path>
								</svg>
							</h1>
						) : (
							<h1>
								<svg t='1597989581210' className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4448' width='30' height='30'>
									<path d='M218.112 64h583.296L1024 384.768 509.76 960 0 384.768 218.112 64z m286.08 504.192l-252.48-287.36-86.72 91.968 339.2 366.464 329.28-366.464-77.184-91.968-252.096 287.36z' fill='#fff' p-id='4449'></path>
								</svg>
								Admin
							</h1>
						)}
					</a>
				</div>
				<Menu mode='inline' theme='dark' onOpenChange={this.onOpenChange} selectedKeys={[path]} defaultOpenKeys={[openKey]}>
					{this.menuNodes}
				</Menu>
			</Sider>
		);
	}
}

export default withRouter(Left);
