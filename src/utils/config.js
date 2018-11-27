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
  '/newOrder': {
    name: '下单页面',
    path: '/newOrder',
  },
};
// 集团 路由-面包屑映射列表
export const companyBreadcrumbNameMap = {};

// routes配置 在src/router中使用
export const routes = [
  {
    isPrivate: true, // 该页面是否需要登录访问
    pageName: 'ProductsPage',
    stateName: 'Products', // 该页面的reducer在store中的名称。
    path: '/products', // 路由匹配路径
    type: 'dealer', // 用户类型
    reducer: require('../Dealer/Products/reducer').default,
    container: import('../Dealer/Products/container'),
  },
  {
    isPrivate: true, // 该页面是否需要登录访问
    pageName: 'ProductDetailPage',
    stateName: 'ProductDetail', // 该页面的reducer在store中的名称。
    path: '/products/:id', // 路由匹配路径
    type: 'dealer', // 用户类型
    reducer: require('../Dealer/ProductDetail/reducer').default,
    container: import('../Dealer/ProductDetail/container'),
  },
  {
    isPrivate: true,
    pageName: 'NewOrderPage',
    stateName: 'NewOrder',
    path: '/newOrder',
    type: 'dealer',
    reducer: require('../Dealer/NewOrder/reducer').default,
    container: import('../Dealer/NewOrder/container'),
  },
];
