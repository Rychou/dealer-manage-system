import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import BIcon from '../Common/BIcon';

const LogoTitle = styled.span`
  color: #fff;
  font-size: 20px;
  margin-left: 10px;
  transition: all 0.3s;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px;
`;
const Logo = ({ collapsed }) => (
  <LogoContainer>
    <BIcon style={{ fontSize: '32px' }} type="anticon-logo-gjy" />
    {!collapsed ? <LogoTitle>电量监控</LogoTitle> : ''}
  </LogoContainer>
);

Logo.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

export default Logo;
