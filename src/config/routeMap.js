/**
 * 懒加载引入路由
 */
import { lazy } from 'react';

const Home = lazy(() => import(/*webpackChunkName:'Home'*/ '../pages/Home/Home.jsx'));
const Category = lazy(() => import(/*webpackChunkName:'Category'*/ '../pages/Category/Category.jsx'));
const Product = lazy(() => import(/*webpackChunkName:'Product'*/ '../pages/Product/Product.jsx'));
const Role = lazy(() => import(/*webpackChunkName:'Role'*/ '../pages/Role/Role.jsx'));
const User = lazy(() => import(/*webpackChunkName:'User'*/ '../pages/User/User.jsx'));
const Bar = lazy(() => import(/*webpackChunkName:'Bar'*/ '../pages/Charts/Bar.jsx'));
const Line = lazy(() => import(/*webpackChunkName:'Line'*/ '../pages/Charts/Line.jsx'));
const Pie = lazy(() => import(/*webpackChunkName:'Pie'*/ '../pages/Charts/Pie.jsx'));

const routes = [
	{ path: '/home', component: Home, roles: ['admin', 'editor', 'guest'] },
	{ path: '/category', component: Category, roles: ['admin', 'editor', 'guest'] },
	{ path: '/product', component: Product, roles: ['admin', 'editor', 'guest'] },
	{ path: '/role', component: Role, roles: ['admin', 'editor', 'guest'] },
	{ path: '/user', component: User, roles: ['admin', 'editor', 'guest'] },
	{ path: '/charts/bar', component: Bar, roles: ['admin', 'editor', 'guest'] },
	{ path: '/charts/line', component: Line, roles: ['admin', 'editor', 'guest'] },
	{ path: '/charts/pie', component: Pie, roles: ['admin', 'editor', 'guest'] },
];

export default routes;
