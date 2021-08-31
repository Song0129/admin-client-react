/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
	{
		title: '首页',
		path: '/home',
		icon: 'HomeOutlined',
		roles: ['admin', 'editor', 'guest'],
	},
	{
		title: '商品',
		icon: 'MenuUnfoldOutlined',
		path: '/products',
		children: [
			{
				title: '品类管理',
				icon: 'MenuUnfoldOutlined',
				path: '/category',
				roles: ['admin', 'editor', 'guest'],
			},
			{
				title: '商品管理',
				icon: 'MenuUnfoldOutlined',
				path: '/product',
				roles: ['admin', 'editor', 'guest'],
			},
		],
	},
	{
		title: '用户管理',
		path: '/user',
		icon: 'UserOutlined',
		roles: ['admin', 'editor', 'guest'],
	},
	{
		title: '角色管理',
		path: '/role',
		icon: 'LockOutlined',
		roles: ['admin', 'editor', 'guest'],
	},
	{
		title: '图形图表',
		path: '/charts',
		icon: 'AppstoreOutlined',
		roles: ['admin', 'editor', 'guest'],
		children: [
			{
				title: '柱形图',
				path: '/charts/bar',
				icon: 'BarChartOutlined',
				roles: ['admin', 'editor', 'guest'],
			},
			{
				title: '折线图',
				path: '/charts/line',
				icon: 'LineChartOutlined',
				roles: ['admin', 'editor', 'guest'],
			},
			{
				title: '饼图',
				path: '/charts/pie',
				icon: 'PieChartOutlined',
				roles: ['admin', 'editor', 'guest'],
			},
		],
	},
	// {
	// 	title: '组件',
	// 	path: '/components',
	// 	icon: 'appstore',
	// 	roles: ['admin', 'editor'],
	// 	children: [
	// 		{
	// 			title: '富文本',
	// 			path: '/components/richTextEditor',
	// 			roles: ['admin', 'editor'],
	// 		},
	// 		{
	// 			title: 'Markdown',
	// 			path: '/components/Markdown',
	// 			roles: ['admin', 'editor'],
	// 		},
	// 		{
	// 			title: '拖拽列表',
	// 			path: '/components/draggable',
	// 			roles: ['admin', 'editor'],
	// 		},
	// 	],
	// },

	// {
	// 	title: '路由嵌套',
	// 	path: '/nested',
	// 	icon: 'cluster',
	// 	roles: ['admin', 'editor'],
	// 	children: [
	// 		{
	// 			title: '菜单1',
	// 			path: '/nested/menu1',
	// 			children: [
	// 				{
	// 					title: '菜单1-1',
	// 					path: '/nested/menu1/menu1-1',
	// 					roles: ['admin', 'editor'],
	// 				},
	// 				{
	// 					title: '菜单1-2',
	// 					path: '/nested/menu1/menu1-2',
	// 					children: [
	// 						{
	// 							title: '菜单1-2-1',
	// 							path: '/nested/menu1/menu1-2/menu1-2-1',
	// 							roles: ['admin', 'editor'],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 	],
	// },
	// {
	// 	title: '表格',
	// 	path: '/table',
	// 	icon: 'table',
	// 	roles: ['admin', 'editor'],
	// },
	// {
	// 	title: 'Excel',
	// 	path: '/excel',
	// 	icon: 'file-excel',
	// 	roles: ['admin', 'editor'],
	// 	children: [
	// 		{
	// 			title: '导出Excel',
	// 			path: '/excel/export',
	// 			roles: ['admin', 'editor'],
	// 		},
	// 		{
	// 			title: '上传Excel',
	// 			path: '/excel/upload',
	// 			roles: ['admin', 'editor'],
	// 		},
	// 	],
	// },
	// {
	// 	title: 'Zip',
	// 	path: '/zip',
	// 	icon: 'file-zip',
	// 	roles: ['admin', 'editor'],
	// },
	// {
	// 	title: '剪贴板',
	// 	path: '/clipboard',
	// 	icon: 'copy',
	// 	roles: ['admin', 'editor'],
	// },
	// {
	// 	title: '用户管理',
	// 	path: '/user',
	// 	icon: 'usergroup-add',
	// 	roles: ['admin'],
	// },
	// {
	// 	title: '关于作者',
	// 	path: '/about',
	// 	icon: 'user',
	// 	roles: ['admin', 'editor', 'guest'],
	// },
	// {
	// 	title: 'Bug收集',
	// 	path: '/bug',
	// 	icon: 'bug',
	// 	roles: ['admin'],
	// },
];
export default menuList;
