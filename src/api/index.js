// import { message } from 'antd';
import axios from './axios';
import urls from '../config/urls';

export const reqLogin = (username, password) => axios.post(urls.users.login, { username, password }, 'POST');
