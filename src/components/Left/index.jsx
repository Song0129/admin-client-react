import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import * as Icon from '@ant-design/icons';

import './index.less';
// 引入所有的menu
import menuList from '../../config/menuConfig';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

class Left extends Component {
	state = {
		collapsed: false,
		openKeys: [],
		selectedKeys: [],
	};

	componentDidMount() {
		// 防止页面刷新侧边栏又初始化了
		const pathname = this.props.location.pathname;
		//获取当前所在的目录层级
		const rank = pathname.split('/');
		switch (rank.length) {
			case 2: //一级目录
				this.setState({
					selectedKeys: [pathname],
				});
				break;
			case 5: //三级目录，要展开两个subMenu
				this.setState({
					selectedKeys: [pathname],
					openKeys: [rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')],
				});
				break;
			default:
				this.setState({
					selectedKeys: [pathname],
					openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))],
				});
		}
	}

	onOpenChange = openKeys => {
		//此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
		if (openKeys.length === 0 || openKeys.length === 1) {
			this.setState({
				openKeys,
			});
			return;
		}

		//最新展开的菜单
		const latestOpenKey = openKeys[openKeys.length - 1];
		//判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
		//因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
		//只适用于3级菜单
		if (latestOpenKey.includes(openKeys[0])) {
			this.setState({
				openKeys,
			});
		} else {
			this.setState({
				openKeys: [latestOpenKey],
			});
		}
	};

	// menu中收起左侧栏
	onCollapse = () => {
		this.props.toggle();
	};

	// 创建Menu的icon
	geticon = iconname => {
		return React.createElement(Icon[iconname]);
	};

	renderMenuItem = ({ path, icon, title }) => {
		return (
			<Item key={path} icon={this.geticon(icon)}>
				<Link to={path}>
					<span>{title}</span>
				</Link>
			</Item>
		);
	};

	renderSubMenu = ({ path, icon, title, children }) => {
		return (
			<SubMenu key={path} icon={this.geticon(icon)} title={<span>{title}</span>}>
				{children &&
					children.map(item => {
						return item.children && item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item);
					})}
			</SubMenu>
		);
	};

	handleClick = menuItem => {
		const { key, keyPath } = menuItem;
		this.setState({ selectedKeys: [key] });
		if (keyPath.length === 1) {
			this.setState({ openKeys: [] });
		}
	};

	render() {
		const { collapsed } = this.props;
		const { openKeys, selectedKeys } = this.state;
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
				{/* <Menu theme='dark' onOpenChange={this.onOpenChange} onClick={({ key }) => this.setState({ selectedKeys: [key] })} openKeys={openKeys} selectedKeys={selectedKeys} mode='inline'> */}
				<Menu theme='dark' onOpenChange={this.onOpenChange} onClick={this.handleClick} openKeys={openKeys} selectedKeys={selectedKeys} mode='inline'>
					{menuList &&
						menuList.map(item => {
							return item.children && item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item);
						})}
				</Menu>
			</Sider>
		);
	}
}

export default withRouter(Left);
