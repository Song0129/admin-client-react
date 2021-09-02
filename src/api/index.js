// import { message } from 'antd';
import axios from './axios';
import urls from '../config/urls';

export const reqLogin = (username, password) => axios.post('https://song-api.only0129.top/admin' + urls.users.login, { username, password }, 'POST');
