/*
 * 默认菜单配置参数
 */
export const defaultMenus = [
  {
    isSub: false,
    name: '登录',
    icon: 'user',
    path: '/login',
  },
];

// 经销商菜单参数
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

// 集团菜单参数
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
    component: '../Dealer/Products/container',
    children: [
      {
        name: '商品详情',
        path: '/products/:id',
      },
    ],
  },
  '/products/:id': {
    name: '商品详情',
    path: '/products/:id',
  },
};
// 集团 路由-面包屑映射列表
export const companyBreadcrumbNameMap = {};
