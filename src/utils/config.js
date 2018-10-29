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
    path: '/buses/monitor',
  },
  {
    isSub: false,
    name: '车辆管理',
    path: '/buses',
    icon: 'anticon-deploymentunit',
  },
];

// 路由-面包屑映射列表
export const breadcrumbNameMap = {
  '/': { path: '/', exact: true, name: '首页' },
  '/map': {
    name: '地图分布',
    path: '/map',
  },
  '/buses/monitor': {
    name: '车辆监控',
    path: '/buses/monitor',
    component: '@/BusMonitor/container',
    children: [
      {
        name: '车辆详情',
        path: '/buses/monitor/:id',
      },
    ],
  },
  '/buses/monitor/:id': {
    name: '车辆详情',
    path: '/buses/monitor/:id',
  },
  '/buses': {
    name: '车辆管理',
    path: '/buses',
  },
};
