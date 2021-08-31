import React, { useEffect } from 'react';
import { Spin } from 'antd';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

const styles = {
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	// background: 'rgba(0,0,0,.5)',
};

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const Loading = () => {
	useEffect(() => {
		NProgress.start();
		return () => {
			NProgress.done();
		};
	}, []);

	return (
		<div className='app-container' style={styles}>
			<Spin size='large' />
		</div>
	);
};

export default Loading;
