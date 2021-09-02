import React, { Component } from 'react';
import { Layout, Button, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import menuList from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { formateDate } from '../../utils/dateUtils';
import './index.less';

const { Header } = Layout;

class Head extends Component {
	state = {
		collapsed: false,
		currentTime: formateDate(Date.now()), // 当前时间字符串
	};

	componentDidMount() {
		this.getTime();
	}

	getTime = () => {
		// 每隔1s获取当前时间, 并更新状态数据currentTime
		this.intervalId = setInterval(() => {
			const currentTime = formateDate(Date.now());
			this.setState({ currentTime });
		}, 1000);
	};

	// 隐藏/显示侧边栏
	toggle = () => {
		this.props.toggle();
	};

	// 获取当前页面标题
	getTitle = () => {
		// 得到当前请求路径
		const path = this.props.location.pathname;
		let title;
		menuList.forEach(item => {
			if (item.path === path) {
				// 如果当前item对象的key与path一样,item的title就是需要显示的title
				title = item.title;
			} else if (item.children) {
				// 在所有子item中查找匹配的
				const cItem = item.children.find(cItem => path.indexOf(cItem.path) === 0);
				// 如果有值才说明有匹配的
				if (cItem) {
					// 取出它的title
					title = cItem.title;
				}
			}
		});
		return title;
	};

	// 登出
	logout = () => {
		// 显示确认框
		Modal.confirm({
			content: '确定退出吗?',
			onOk: () => {
				console.log('OK', this);
				// 删除保存的user数据
				storageUtils.removeUser();
				memoryUtils.user = {};

				// 跳转到login
				this.props.history.replace('/login');
			},
		});
	};

	render() {
		const { collapsed } = this.props;
		const { currentTime } = this.state;
		const title = this.getTitle();
		const username = memoryUtils.user.username;
		return (
			<Header className='site-layout-background header' style={{ padding: 0 }}>
				<div className='header-left'>
					<Button className='collapsed-btn' type='primary' onClick={this.toggle}>
						{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
							className: 'trigger',
						})}
					</Button>
					<div className='title'>{title}</div>
				</div>

				<div className='header-right'>
					<div className='header-right-top'>
						<span style={{ marginRight: '16px' }}>欢迎，{username}</span>
						<Button size='small' onClick={this.logout}>
							退出
						</Button>
					</div>
					<div className='header-right-bottom'>
						<span>{currentTime}</span>
					</div>
				</div>
			</Header>
		);
	}
}

export default withRouter(Head);
