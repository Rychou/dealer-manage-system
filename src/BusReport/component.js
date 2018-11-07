import React, { Component } from 'react';
import { Radio, Layout, Table, Divider } from 'antd';

const { Content } = Layout;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class BusReport extends Component {
  componentDidMount() {
    const { isResolved, fetchReport } = this.props;
    if (!isResolved) {
      fetchReport();
    }
  }

  render() {
    const { reports, pagination } = this.props;
    const columns = [{
      title: '报表类型',
      dataIndex: 'reportType',
      key: 'reportType',
    }, {
      title: '报表时间',
      dataIndex: 'reportTime',
      key: 'reportTime',
    }, {
      title: '下载',
      dataIndex: 'download',
      render: (text, record) => (
        <span>
        <a href="#">车辆报表</a>
        <Divider type="vertical" />
        </span>
      ),
    }];
    return (
      <Layout>
        <Content style={
          {
            background: '#fff',
            borderRadius: '2px',
            padding: '32px',
            marginTop: '24px',
          }}>
          <RadioGroup defaultValue="day" size="large">
            <RadioButton value="day">日报</RadioButton>
            <RadioButton value="month">月报</RadioButton>
            <RadioButton value="year">年报</RadioButton>
          </RadioGroup>
          <Table
            rowKey="name"
            columns={columns}
            dataSource={reports}
            pagination={pagination}
            style={{ marginTop: 30 }}
          />
        </Content>
      </Layout>
    );
  }
}

export default BusReport;
