import React, { Component } from 'react';
import { Layout, Table, Badge } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

class CarList extends Component {
  componentDidMount() {
    const { isResolve, fetchCars } = this.props;
    if (!isResolve) {
      fetchCars({ results: 10, page: 1 });
    }
  }

  handleChange = (_pagination, filters, sorter) => {
    const { pagination, fetchCars, updatePagination } = this.props;
    const pager = { ...pagination };
    pager.current = _pagination.current;
    updatePagination(pager);
    fetchCars({
      results: 10,
      page: _pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      filters: JSON.stringify(filters),
    });
  };

  render() {
    const columns = [
      {
        title: '车辆自编号',
        dataIndex: 'id',
        key: 'id',
        render: id => <Link to={`/monitoring/detail?id=${id}`}>{id}</Link>,
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
        dataIndex: 'state',
        key: 'state',
        render: state => {
          switch (state) {
            case -1:
              return <Badge status="error" text="异常" />;
            case 0:
              return <Badge status="warning" text="熄火" />;
            default:
              return <Badge status="processing" text="启动" />;
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
        render: theoryMileage => <span>{`${theoryMileage}公里`}</span>,
      },
      {
        title: '当日行驶里程',
        dataIndex: 'todayMileage',
        key: 'todayMileage',
        render: todayMileage => <span>{`${todayMileage}公里`}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Link to={`/monitoring/detail?id=${record.id}#chargeRecord`}>充电记录</Link>
        ),
      },
    ];
    return (
      <Layout>
        <Content
          style={{ background: '#fff', borderRadius: '2px', padding: '32px', marginTop: '24px' }}
        >
          <Table
            rowKey="id"
            bordered
            loading={this.props.isFetching}
            columns={columns}
            dataSource={this.props.cars}
            pagination={this.props.pagination}
            onChange={this.handleChange}
          />
        </Content>
      </Layout>
    );
  }
}

export default CarList;
