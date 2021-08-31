import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import './index.less';

const { Header } = Layout;

export default class Head extends Component {
	state = {
		collapsed: false,
	};

	toggle = () => {
		this.props.toggle();
	};
	render() {
		const { collapsed } = this.props;
		return (
			<Header className='site-layout-background' style={{ padding: 0 }}>
				<Button className='collapsed-btn' type='primary' onClick={this.toggle}>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
					})}
				</Button>
			</Header>
		);
	}
}
