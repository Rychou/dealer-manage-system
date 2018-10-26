/*
* 菜单配置参数
*/
export const menus = [
  {
    isSub: false,
    name: '首页',
    icon: 'anticon-bulb',
    path: '/',
  },
  {
    isSub: false,
    name: '地图分布',
    icon: 'anticon-location',
    path: '/map',
  },
  {
    isSub: false,
    name: '车辆监控',
    icon: 'anticon-alert',
    path: '/busMonitor',
  },
  {
    isSub: false,
    name: '车辆管理',
    path: '/carManage',
    icon: 'anticon-deploymentunit',
  },
];

// 路由-面包屑映射列表
export const breadcrumbNameMap = {
  '/': { path: '/', exact: true, locale: 'menu', redirect: '/list', name: '首页' },
  '/map': {
    name: '地图分布',
    path: '/map',
    children: {},
  },
  '/busMonitor': {
    name: '车辆监控',
    path: '/busMonitor',
  },
  '/carManage': {
    name: '车辆管理',
    path: '/carManage',
  },
};
