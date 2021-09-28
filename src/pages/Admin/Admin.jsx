import React, { Component, Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // 引入动画效果

import { getMenuItemInMenuListByProperty } from '../../utils';
import memoryUtils from '../../utils/memoryUtils';
import Head from '../../components/Head';
import Left from '../../components/Left';
import Loading from '../../components/Loading';
import routeList from '../../config/routeMap';
import menuList from '../../config/menuConfig';
import './Admin.less';

const { Content, Footer } = Layout;

export default class Admin extends Component {
	state = { collapsed: false };

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	getPageTitle = (menuList, pathname) => {
		let title = 'Ant Design Pro';
		let item = getMenuItemInMenuListByProperty(menuList, 'path', pathname);
		if (item) {
			title = `${item.title} - Ant Design Pro`;
		}
		return title;
	};

	componentDidMount() {
		const {
			location: { pathname },
		} = this.props;
		const title = this.getPageTitle(menuList, pathname);
		document.title = title;
	}

	render() {
		const { collapsed } = this.state;
		// const { role, location } = this.props;
		const { location } = this.props;
		const { pathname } = location;

		const title = this.getPageTitle(menuList, pathname);
		document.title = title;

		// console.log(this.props);
		const handleFilter = route => {
			// 过滤没有权限的页面
			// return role === 'admin' || !route.roles || route.roles.includes(role);
			return true;
		};

		const user = memoryUtils.user;
		// 如果内存没有存储user ==> 当前没有登陆
		if (!user || !user._id) {
			// 自动跳转到登陆(在render()中)
			return <Redirect to='/login' />;
		}
		return (
			<Layout style={{ height: '100%' }}>
				<Left collapsed={collapsed} toggle={this.toggle} />
				<Layout className='site-layout'>
					<Head collapsed={collapsed} toggle={this.toggle} />
					<Content
						className='site-layout-background'
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
							overflowY: 'scroll',
						}}>
						{/* <TransitionGroup>
							<CSSTransition key={location.pathname} timeout={5000} classNames='fade' exit={false}> */}
						<Suspense location={location} fallback={<Loading />}>
							<Switch>
								{routeList.map(route => {
									return handleFilter(route) && <Route component={route.component} key={route.path} path={route.path} />;
								})}
								<Redirect exact from='/' to='/home' />
							</Switch>
						</Suspense>
						{/* </CSSTransition>
						</TransitionGroup> */}
					</Content>
					<Footer style={{ textAlign: 'center', backgroundColor: '#fff', color: '#aaaaaa', padding: '13px 40px' }}>推荐使用谷歌浏览器， 可以获得更佳页面操作体验</Footer>
				</Layout>
			</Layout>
		);
	}
}
