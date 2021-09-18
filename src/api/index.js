// import { message } from 'antd';
import axios from './axios';
import { userUrls, categoryUrls, productUrls } from '../config/urls'; //引入地址
import jsonp from 'jsonp';

// 登录
export const reqLogin = (username, password) => axios.post(userUrls.login, { username, password });

// 获取一级或某个二级分类列表
export const reqCategorys = parentId => axios.get(categoryUrls.list, { parentId });
// 添加分类
export const reqAddCategory = (parentId, categoryName) => axios.post(categoryUrls.add, { parentId, categoryName });
// 更新品类名称
export const reqUpdateCategory = (categoryId, categoryName) => axios.post(categoryUrls.update, { categoryId, categoryName });

// 获取一个分类
export const reqCategory = categoryId => axios.get(categoryUrls.info, { categoryId });

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => axios.get(productUrls.list, { pageNum, pageSize });

// 更新商品状态(上架/下架)
export const reqUpdateStatus = (productId, status) => axios.post(productUrls.updateStatus, { productId, status });

/*
    搜索商品分页列表(根据商品名称和商品描述)
    searchType:搜索的类型, productName/productDesc
*/
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) =>
	axios.get(productUrls.search, {
		pageNum,
		pageSize,
		[searchType]: searchName,
	});

// 删除指定名称的图片
export const reqDeleteImg = name => axios.post(productUrls.deleteImg, { name });

// 添加/修改商品
export const reqAddOrUpdateProduct = product => axios.post(product._id ? productUrls.update : productUrls.add, product);

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
