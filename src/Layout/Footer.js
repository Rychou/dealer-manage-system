import React from 'react';
import { GlobalFooter } from 'ant-design-pro';
import { Icon } from 'antd';

const links = [
  {
    key: '帮助',
    title: '帮助',
    href: '',
  },
  {
    key: '隐私',
    title: '隐私',
    href: '',
  },
  {
    key: '条款',
    title: '条款',
    href: '',
  },
];
const CopyRight = (
  <div>
    Copyright <Icon type="copyright" /> 2018 公交云体验技术部出品
  </div>
);

const Footer = () => <GlobalFooter links={links} copyright={CopyRight} />;

export default Footer;
