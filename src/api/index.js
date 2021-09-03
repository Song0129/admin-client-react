// import { message } from 'antd';
import axios from './axios';
import { users, category } from '../config/urls'; //引入地址
import jsonp from 'jsonp';

// 登录
export const reqLogin = (username, password) => axios.post(users.login, { username, password });

// 获取一级或某个二级分类列表
export const reqCategorys = parentId => axios.get(category.list, { parentId });
// 添加分类
export const reqAddCategory = (parentId, categoryName) => axios.post(category.add, { parentId, categoryName });
// 更新品类名称
export const reqUpdateCategory = ({ categoryId, categoryName }) => axios.post(category.update, { categoryId, categoryName });

// 获取百度天气
export const reqWeather = city => {
	return new Promise((resolve, reject) => {
		const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=f12SGQBCvI2HvaNr4np2I0zq62SVfQ0q`;
		jsonp(url, {}, (err, data) => {
			console.log(err, data);
			resolve(13123);
		});
	});
};
