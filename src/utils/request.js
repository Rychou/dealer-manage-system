import axios from 'axios';
import { message } from 'antd';
import { store } from '../store';

const { BASE_URL } = process.env;

const instance = axios.create({
  baseURL: BASE_URL,
});

// 请求拦截器
instance.interceptors.request.use(config => {
  console.group('请求体');
  console.log(config);
  console.groupEnd();
  const accessToken = store.getState().user.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  response => {
    console.group('响应体');
    console.log(response);
    console.groupEnd();
    return response;
  },
  error => {
    console.group('错误');
    console.error(error);
    console.groupEnd();
    message.error('请求错误，请刷新页面重试！', 5);
    // 默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      switch (error.response.status) {
        // case 403:
        //   window.location.pathname = '/login';
        //   break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
