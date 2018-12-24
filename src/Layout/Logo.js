import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import BIcon from '../Common/BIcon';

const LogoTitle = styled.span`
  color: #fff;
  font-size: 18px;
  margin-left: 5px;
  transition: all 0.3s;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 12px;
`;
const Logo = ({ collapsed }) => (
  <LogoContainer>
    <BIcon style={{ fontSize: '32px' }} type="icon-weibiaoti-" />
    {!collapsed ? <LogoTitle>经销商管理平台</LogoTitle> : ''}
  </LogoContainer>
);

Logo.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

export default Logo;
