import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Head from '../../components/Head';
import Left from '../../components/Left';
// import Login from '../Login';
// import Users from '../Users';
import './admin.less';

const { Content, Footer } = Layout;

export default class Admin extends Component {
	state = { collapsed: false };

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		const { collapsed } = this.state;
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
						}}>
						<Switch>
							{/* <Redirect from="/" exact to="/home" />
							<Route path="/home" component={Home} /> */}
							{/* <Route path='/admin' component={Admin} />
							<Route path='/login' component={Login} />
							<Route path='/users' component={Users} /> */}
						</Switch>
					</Content>
					<Footer style={{ textAlign: 'center', backgroundColor: '#fff', color: '#aaaaaa', padding: '13px 40px' }}>推荐使用谷歌浏览器， 可以获得更佳页面操作体验</Footer>
				</Layout>
			</Layout>
		);
	}
}
