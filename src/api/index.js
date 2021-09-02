// import { message } from 'antd';
import axios from './axios';
import urls from '../config/urls';
import jsonp from 'jsonp';

// 登录
export const reqLogin = (username, password) => axios.post(urls.users.login, { username, password });

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
