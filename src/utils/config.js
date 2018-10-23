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
    isSub: true,
    subName: '车辆监控',
    icon: 'anticon-alert',
    subs: [
      {
        name: '列车列表',
        path: '/monitoring/carList',
      },
      {
        name: '低电量车辆列表',
        path: '/monitoring/lowPowerList',
      },
      {
        name: '车辆详情/充电记录',
        path: '/monitoring/detail',
      },
    ],
  },
  {
    isSub: false,
    name: '车辆管理',
    path: '/carManage',
    icon: 'anticon-deploymentunit',
  },
];

export const breadcrumbNameMap = {
  '/': { name: '首页', isLink: true },
  '/map': { name: '地图分布', isLink: true },
  '/monitoring': { name: '车辆监控', isLink: false },
  '/monitoring/carList': { name: '车辆列表', isLink: true },
  '/monitoring/lowPowerList': { name: '低电量车辆列表', isLink: true },
  '/monitoring/detail': { name: '车辆详情', isLink: true },
  '/carManage': { name: '车辆管理', isLink: true },
};
