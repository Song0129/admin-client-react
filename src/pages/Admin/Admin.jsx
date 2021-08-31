import React, { Component, Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DocumentTitle from 'react-document-title';

import { getMenuItemInMenuListByProperty } from '../../utils';
import Head from '../../components/Head';
import Left from '../../components/Left';
import Loading from '../../components/Loading';
import routeList from '../../config/routeMap';
import menuList from '../../config/menuConfig';
import './admin.less';

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

	routeIn = (nexState, replace, cb) => {
		console.log(12312, nexState, replace, cb);
		// document.title = this.getPageTitle(menuList, pathname);
	};

	render() {
		const { collapsed } = this.state;
		// const { role, location } = this.props;
		const { location } = this.props;
		const { pathname } = location;
		// console.log(this.props);
		const handleFilter = route => {
			// 过滤没有权限的页面
			// return role === 'admin' || !route.roles || route.roles.includes(role);
			return true;
		};
		return (
			<Layout style={{ height: '100%' }}>
				<Left collapsed={collapsed} toggle={this.toggle} />
				<Layout className='site-layout'>
					<Head collapsed={collapsed} toggle={this.toggle} />
					{/* <DocumentTitle title={this.getPageTitle(menuList, pathname)}> */}
					<Content
						className='site-layout-background'
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
						}}>
						<TransitionGroup>
							<CSSTransition key={location.pathname} timeout={500} classNames='fade' exit={false}>
								<Suspense location={location} fallback={<Loading />}>
									<Switch>
										{routeList.map(route => {
											return handleFilter(route) && <Route onEnter={this.routeIn} component={route.component} key={route.path} path={route.path} />;
										})}
										<Redirect exact from='/' to='/home' />
									</Switch>
								</Suspense>
							</CSSTransition>
						</TransitionGroup>
					</Content>
					{/* </DocumentTitle> */}
					<Footer style={{ textAlign: 'center', backgroundColor: '#fff', color: '#aaaaaa', padding: '13px 40px' }}>推荐使用谷歌浏览器， 可以获得更佳页面操作体验</Footer>
				</Layout>
			</Layout>
		);
	}
}
