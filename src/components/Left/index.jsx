import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

import './index.less';
// import menuList from '../../config/menuConfig';

const { Sider } = Layout;

export default class Left extends Component {
	state = {
		collapsed: false,
	};

	onCollapse = () => {
		this.props.toggle();
	};

	render() {
		const { collapsed } = this.props;
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
				<Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
					<Menu.Item key='1' icon={<UserOutlined />}>
						<Link to='/login'>
							<span>登录</span>
						</Link>
					</Menu.Item>
					<Menu.Item key='2' icon={<VideoCameraOutlined />}>
						<Link to='/admin'>
							<span>admin页面</span>
						</Link>
					</Menu.Item>
					<Menu.Item key='3' icon={<UploadOutlined />}>
						<Link to='/users'>
							<span>users页面</span>
						</Link>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
}
