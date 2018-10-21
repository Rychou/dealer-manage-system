import React, { Component } from 'react';
import { ChartCard } from 'ant-design-pro/lib/Charts';
import { Row, Col, Icon, Tooltip, Table, Layout } from 'antd';
import numeral from 'numeral';
import network from 'network';
import styled from 'styled-components';

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
class Index extends Component {
  state = {
    companys: [],
    carCount: 0,
    outCount: 0,
    monitoringCount: 0,
    isLoading: true,
  };

  componentDidMount() {
    network.get('/companys').then(res => {
      this.computeData(res.data.companys);
    });
  }

  /**
   *
   * 计算company数据，包括车辆总数，出车占比等
   * @param {*} companys
   * @memberof Index
   */
  computeData(companys) {
    const temArr = [];
    let carCount = 0; // 车辆总数
    let outCount = 0; // 出车总数
    let monitoringCount = 0; // 监控总数
    companys.forEach(company => {
      carCount += company.carCount;
      outCount += company.outCount;
      monitoringCount += company.monitoringCount;
      temArr.push({
        ...company,
        outPercent: Math.floor((company.outCount / company.carCount) * 100), // 出车占比
        monitoringPercent: Math.floor((company.monitoringCount / company.carCount) * 100), // 监控占比
      });
    });
    this.setState({ carCount, outCount, monitoringCount, companys: temArr, isLoading: false });
  }

  render() {
    return (
      <Layout>
        <Row gutter={24}>
          <StyledCol span={6}>
            <ChartCard
              title="电动车数量"
              loading={this.state.isLoading}
              total={`${numeral(this.state.carCount).format('0,0')}`}
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
              total={`${numeral(this.state.outCount).format('0,0')}`}
              loading={this.state.isLoading}
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
              total={`${numeral(this.state.monitoringCount).format('0,0')}`}
              loading={this.state.isLoading}
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
            loading={this.state.isLoading}
            columns={columns}
            dataSource={this.state.companys}
          />
        </Content>
      </Layout>
    );
  }
}

export default Index;
