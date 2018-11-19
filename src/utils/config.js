/*
 * 菜单配置参数
 */
export const defaultMenus = [
  {
    isSub: false,
    name: '首页',
    icon: 'anticon-bulb',
    path: '/',
  },
];

// 经销商菜单
export const dealerMenus = [
  {
    isSub: false,
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    isSub: false,
    name: '商品列表',
    path: '/products',
    icon: 'shopping',
  },
];

// 集团菜单
export const companyMenus = [];

// 经销商 路由-面包屑映射列表
export const dealerBreadcrumbNameMap = {
  // '/': { path: '/', exact: true, name: '首页' },
  '/': {
    exact: true,
    path: '/',
    name: '首页',
  },
  '/products': {
    path: '/products',
    name: '商品列表',
  },
};
// 集团
export const companyBreadcrumbNameMap = {};
