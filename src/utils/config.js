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
export const companyMenus = [
  {
    isSub: false,
    name: '销售数据',
    path: '/',
    icon: 'bar-chart',
  },
  {
    isSub: false,
    name: '订单管理',
    path: '/orders',
    icon: 'reconciliation',
  },
  {
    isSub: false,
    name: '库存管理',
    path: '/stocks',
    icon: 'cluster',
  },
];

// 经销商 路由-面包屑映射列表
export const dealerBreadcrumbNameMap = {
  // '/': { path: '/', exact: true, name: '首页' },
  '/': {
    exact: true,
    path: '/',
    name: '首页',
    component: '../Dealer/Index/container',
    children: [
      {
        name: '订单详情',
        path: '/orders/:id',
      },
    ],
  },
  '/products': {
    path: '/products',
    name: '商品列表',
    component: '../Dealer/Products/container',
    children: [
      {
        name: '商品详情',
        path: '/products/:no',
      },
    ],
  },
  '/orders/:id': {
    name: '订单详情',
    path: '/orders/:id',
  },
  '/products/:no': {
    name: '商品详情',
    path: '/products/:no',
  },
  '/newOrder': {
    name: '下单页面',
    path: '/newOrder',
  },
  '/newOrder/confirm': {
    name: '确认订单',
    path: '/newOrder/confirm',
  },
  '/newOrder/pay': {
    name: '支付',
    path: '/newOrder/pay',
  },
  '/newOrder/result': {
    name: '确认收货',
    path: '/newOrder/result',
  },
};
// 集团 路由-面包屑映射列表
export const companyBreadcrumbNameMap = {
  '/': {
    name: '销售数据',
    path: '/',
  },
  '/orders': {
    name: '订单管理',
    path: '/orders',
    children: [
      {
        name: '订单详情',
        path: '/orders/:id',
      },
    ],
  },
  '/orders/:id': {
    name: '订单详情',
    path: '/orders/:id',
  },
  '/stocks': {
    name: '库存管理',
    path: '/stocks',
  },
};

// routes配置 在src/router中使用
export const routes = [
  {
    isPrivate: true, // 该页面是否需要登录访问
    pageName: 'IndexPage',
    stateName: 'Orders', // 该页面的reducer在store中的名称。
    path: '/', // 路由匹配路径
    isExact: true,
    type: 'dealer', // 用户类型
    reducer: require('../Dealer/Index/reducer').default,
    container: import('../Dealer/Index/container'),
  },
  {
    isPrivate: true, // 该页面是否需要登录访问
    pageName: 'ProductsPage',
    stateName: 'Products', // 该页面的reducer在store中的名称。
    path: '/products', // 路由匹配路径
    isExact: true,
    type: 'dealer', // 用户类型
    reducer: require('../Dealer/Products/reducer').default,
    container: import('../Dealer/Products/container'),
  },
  {
    isPrivate: true, // 该页面是否需要登录访问
    pageName: 'ProductDetailPage',
    stateName: 'ProductDetail', // 该页面的reducer在store中的名称。
    path: '/products/:no', // 路由匹配路径
    type: 'dealer', // 用户类型
    isExact: true,
    reducer: require('../Dealer/ProductDetail/reducer').default,
    container: import('../Dealer/ProductDetail/container'),
  },
  {
    isPrivate: true,
    pageName: 'NewOrderPage',
    stateName: 'NewOrder',
    path: '/newOrder',
    type: 'dealer',
    isExact: false,
    reducer: require('../Dealer/NewOrder/reducer').default,
    container: import('../Dealer/NewOrder/container'),
  },
  {
    isPrivate: true, // 该页面是否需要登录访问
    pageName: 'OrderDetailPage',
    stateName: 'OrderDetail', // 该页面的reducer在store中的名称。
    path: '/orders/:id', // 路由匹配路径
    type: 'dealer', // 用户类型
    isExact: true,
    reducer: require('../Dealer/OrderDetail/reducer').default,
    container: import('../Dealer/OrderDetail/container'),
  },
  {
    pageName: 'DashBoardPage',
    stateName: 'DashBoard', // 该页面的reducer在store中的名称。
    path: '/', // 路由匹配路径
    isExact: true,
    type: 'company', // 用户类型
    reducer: require('../Company/DashBoard/reducer').default,
    container: import('../Company/DashBoard/container'),
  },
  {
    isPrivate: true, // 该页面是否需要登录访问
    pageName: 'StockPage',
    stateName: 'Stock', // 该页面的reducer在store中的名称。
    path: '/stocks', // 路由匹配路径
    isExact: true,
    type: 'company', // 用户类型
    reducer: require('../Company/Stock/reducer').default,
    container: import('../Company/Stock/container'),
  },
  {
    isPrivate: true, // 该页面是否需要登录访问
    pageName: 'OrdersPage',
    stateName: 'Orders', // 该页面的reducer在store中的名称。
    path: '/orders', // 路由匹配路径
    isExact: true,
    type: 'company', // 用户类型
    reducer: require('../Company/Orders/reducer').default,
    container: import('../Company/Orders/container'),
  },
  {
    isPrivate: true, // 该页面是否需要登录访问
    pageName: 'OrderDetailPage',
    stateName: 'OrderDetail', // 该页面的reducer在store中的名称。
    path: '/orders/:id', // 路由匹配路径
    type: 'company', // 用户类型
    isExact: true,
    reducer: require('../Company/OrderDetail/reducer').default,
    container: import('../Company/OrderDetail/container'),
  },
];
