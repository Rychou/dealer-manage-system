import React from 'react';
import { Layout, Icon } from 'antd';
import styled from 'styled-components';
import User from './User';

const { Header } = Layout;

const StyleIcon = styled(Icon)`
  font-size: 20px;
  cursor: pointer;
  margin-left: 20px;
`;

const AppHeader = ({ collapsed, onCollapse }) => (
  <Header
    style={{
      background: '#fff',
      padding: 0,
      boxShadow: '0 2px 4px 0 rgba(50,64,77,0.2)',
      zIndex: 9,
    }}
  >
    <StyleIcon
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={() => onCollapse(!collapsed)}
    />
    <User />
  </Header>
);

export default AppHeader;
