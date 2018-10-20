// 判断是否为开发环境
const isDev = process.env.NODE_ENV === 'development';

export default {
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/104497' : '',
  timeout: 3000,
};
