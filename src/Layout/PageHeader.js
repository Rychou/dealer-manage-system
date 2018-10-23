import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { breadcrumbNameMap } from '@/utils/config';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #fff;
  padding: 16px 32px;
`;

const Title = withRouter(({ location }) => (
  <div style={{ marginTop: '24px', fontSize: '20px', color: '#000' }}>
    {breadcrumbNameMap[location.pathname].name}
  </div>
));

const Breadcrumbs = withRouter(({ location }) => {
  const pathSnippets = location.pathname.split('/').filter(i => i); // 拆分pathname成数组
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSnippets.length - 1;
    return (
      <Breadcrumb.Item key={url}>
        {breadcrumbNameMap[url].isLink && !isLast ? (
          <Link to={url} style={{ color: isLast ? 'rgba(0,0,0,0.65)' : '' }}>
            {breadcrumbNameMap[url].name}
          </Link>
        ) : (
          <span>{breadcrumbNameMap[url].name}</span>
        )}
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="/">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb separator=">">{breadcrumbItems}</Breadcrumb>;
});

class PageHeader extends Component {
  render() {
    return (
      <Wrapper>
        <Breadcrumbs />
        <Title />
      </Wrapper>
    );
  }
}

export default withRouter(PageHeader);
