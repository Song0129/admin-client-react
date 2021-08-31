import Loadable from 'react-loadable';
import Loading from '../components/Loading';
const Home = Loadable({ loader: () => import(/*webpackChunkName:'Home'*/ '../pages/Home/Home.jsx'), loading: Loading });
const Category = Loadable({ loader: () => import(/*webpackChunkName:'Category'*/ '../pages/Category/Category.jsx'), loading: Loading });
const Product = Loadable({ loader: () => import(/*webpackChunkName:'Product'*/ '../pages/Product/Product.jsx'), loading: Loading });
const Role = Loadable({ loader: () => import(/*webpackChunkName:'Role'*/ '../pages/Role/Role.jsx'), loading: Loading });
const User = Loadable({ loader: () => import(/*webpackChunkName:'User'*/ '../pages/User/User.jsx'), loading: Loading });
const Bar = Loadable({ loader: () => import(/*webpackChunkName:'Bar'*/ '../pages/Charts/Bar.jsx'), loading: Loading });
const Line = Loadable({ loader: () => import(/*webpackChunkName:'Line'*/ '../pages/Charts/Line.jsx'), loading: Loading });
const Pie = Loadable({ loader: () => import(/*webpackChunkName:'Pie'*/ '../pages/Charts/Pie.jsx'), loading: Loading });

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
