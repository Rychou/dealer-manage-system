// 判断是否为开发环境
const isDev = process.env.NODE_ENV === 'development';

export default {
  baseURL: isDev ? 'http://mock.eolinker.com/uNrvt624c0a75c8cb56b26bfca28ef23c58432f49216be5?uri=' : '',
  timeout: 3000,
};
