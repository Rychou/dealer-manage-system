import React, { Component } from 'react';
import { Layout, Table, Badge, Button } from 'antd';
import { Link } from 'react-router-dom';
import Filters from './Filters';
import request from 'request';
import PropTypes from 'prop-types';
import { transformStatus } from 'utils';

const { Content } = Layout;

class BusMonitor extends Component {
  componentDidMount() {
    const { isResolved, fetchMonitors } = this.props;
    if (!isResolved) {
      fetchMonitors({ row: 10, page: 1 });
    }
  }

  handleChange = (_pagination, filters, sorter) => {
    const { pagination, fetchMonitors, updatePagination } = this.props;
    const pager = { ...pagination, page: _pagination.current, row: _pagination.pageSize };
    updatePagination(pager);
    fetchMonitors({
      row: 10,
      page: _pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      filters: JSON.stringify(filters) !== '{}' ? JSON.stringify(filters) : null,
    });
  };

  handleExportExcel = () => {
    request({
      url: '/monitors/export',
      method: 'GET',
      responseType: 'arraybuffer',
    }).then(res => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
        }),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.xls'); // or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  render() {
    const columns = [
      {
        title: '车辆自编号',
        dataIndex: 'vin',
        key: 'vin',
        render: vin => <Link to={`/buses/monitor/${vin}`}>{vin}</Link>,
      },
      {
        title: '车辆型号',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '线路',
        dataIndex: 'line',
        key: 'line',
      },
      {
        title: '车牌号',
        dataIndex: 'plateNumber',
        key: 'plateNumber',
      },
      {
        title: '车辆启用时间',
        dataIndex: 'startTime',
        key: 'startTime',
        sorter: true,
      },
      {
        title: '剩余电量',
        dataIndex: 'soc',
        key: 'soc',
        render: soc => {
          const style = {
            color: soc <= this.props.lowBatteryLimit ? 'red' : '',
          };
          return <span style={style}>{`${soc}%`}</span>;
        },
        sorter: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: status => {
          switch (status) {
            case 1:
              return <Badge status="processing" text={transformStatus(status)} />;
            case 2:
              return <Badge status="warning" text={transformStatus(status)} />;
            case 3:
              return <Badge status="default" text={transformStatus(status)} />;
            case 254:
              return <Badge status="error" text={transformStatus(status)} />;
            case 255:
              return <Badge status="waring" text={transformStatus(status)} />;
            default:
              return '';
          }
        },
        filters: [
          {
            text: '启动',
            value: 1,
          },
          {
            text: '熄火',
            value: 0,
          },
          {
            text: '异常',
            value: -1,
          },
        ],
      },
      {
        title: '理论续航里程',
        dataIndex: 'theoryMileage',
        key: 'theoryMileage',
        render: theoryMileage => theoryMileage ? <span>{`${theoryMileage}公里`}</span> : null,
      },
      {
        title: '当日行驶里程',
        dataIndex: 'todayMileage',
        key: 'todayMileage',
        render: todayMileage => todayMileage ? <span>{`${todayMileage}公里`}</span> : null,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Link to={`/buses/monitor/${record.vin}#chargeRecord`}>充电记录</Link>
        ),
      },
    ];
    return (
      <Layout>
        <Content
          style={{ background: '#fff', borderRadius: '2px', padding: '32px', marginTop: '24px' }}
        >
          <Filters {...this.props} />
          <Button onClick={this.handleExportExcel}>导出</Button>
          <Table
            rowKey="id"
            bordered
            loading={this.props.isFetching}
            columns={columns}
            dataSource={this.props.monitors}
            pagination={this.props.pagination}
            onChange={this.handleChange}
          />
        </Content>
      </Layout>
    );
  }
}

BusMonitor.propTypes = {
  fetchMonitors: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isRejected: PropTypes.bool.isRequired,
  isResolved: PropTypes.bool.isRequired,
  monitors: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  updatePagination: PropTypes.func.isRequired,
};

export default BusMonitor;
