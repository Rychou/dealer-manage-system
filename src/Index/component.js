import React, { Component } from 'react';
import { Charts } from 'ant-design-pro';
import { Row, Col, Icon, Tooltip, Table, Layout } from 'antd';
import numeral from 'numeral';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';

const { ChartCard } = Charts;
const { Content } = Layout;
const StyledCol = styled(Col)`
  border-radius: 2px;
`;

const columns = [
  {
    title: '公司',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '车辆总数',
    dataIndex: 'carCount',
    key: 'carCount',
  },
  {
    title: '监控车辆',
    dataIndex: 'monitoringCount',
    key: 'monitoringCount',
  },
  {
    title: '监控车辆占比',
    dataIndex: 'monitoringPercent',
    key: 'monitoringPercent',
    render: monitoringPercent => `${monitoringPercent}%`,
  },
  {
    title: '出车总数',
    dataIndex: 'outCount',
    key: 'outCount',
  },
  {
    title: '出车总数占比',
    dataIndex: 'outPercent',
    key: 'outPercent',
    render: outPercent => `${outPercent}%`,
  },
];
/**
 * 首页
 *
 * @class Index
 * @extends {Component}
 */
@hot(module)
class Index extends Component {
  componentDidMount() {
    const { isResolve, fetchCompanies } = this.props;
    if (!isResolve) {
      fetchCompanies();
    }
  }

  render() {
    console.log(this.props);
    const { carCount, outCount, monitoringCount, companies } = this.props.companies;
    return (
      <Layout>
        <Row gutter={24}>
          <StyledCol span={6}>
            <ChartCard
              title="电动车数量"
              loading={this.props.isFetching}
              total={`${numeral(carCount).format('0,0')}`}
              action={
                <Tooltip title="电动车说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
            />
          </StyledCol>
          <StyledCol span={6}>
            <ChartCard
              title="出车总数"
              total={`${numeral(outCount).format('0,0')}`}
              loading={this.props.isFetching}
              action={
                <Tooltip title="出车说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
            />
          </StyledCol>
          <StyledCol span={6}>
            <ChartCard
              title="监控总数"
              total={`${numeral(monitoringCount).format('0,0')}`}
              loading={this.props.isFetching}
              action={
                <Tooltip title="监控说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
            />
          </StyledCol>
        </Row>
        <Content
          style={{ background: '#fff', borderRadius: '2px', padding: '32px', marginTop: '24px' }}
        >
          <Table
            rowKey="name"
            loading={this.props.isFetching}
            columns={columns}
            dataSource={companies}
          />
        </Content>
      </Layout>
    );
  }
}

export default Index;