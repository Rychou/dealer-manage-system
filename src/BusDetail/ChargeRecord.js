import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

class ChargeRecord extends Component {
  render() {
    const {
      chargeRecord,
      chargeRecord: { isFetching },
    } = this.props;
    const columns = [
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        render: date => {
          const columnDate = new Date(date);
          return (
            <span>
              {`${columnDate.getFullYear()}-${columnDate.getMonth() + 1}-${columnDate.getDate()}`}
            </span>
          );
        },
      },
      {
        title: '充电开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        render: ({ year, monthValue: month, dayOfMonth: day, hour, minute, second }) => (
          <span>{`${year}-${month}-${day} ${hour}:${minute}:${second}`}</span>
        ),
      },
      {
        title: '充电开始时剩余电量',
        dataIndex: 'startSoc',
        key: 'startSoc',
        render: startSoc => <span>{startSoc}%</span>,
      },
      {
        title: '充电结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        render: ({ year, monthValue: month, dayOfMonth: day, hour, minute, second }) => (
          <span>{`${year}-${month}-${day} ${hour}:${minute}:${second}`}</span>
        ),
      },
      {
        title: '充电结束时剩余电量',
        dataIndex: 'endSoc',
        key: 'endSoc',
        render: endSoc => <span>{endSoc}%</span>,
      },
      {
        title: '充电时长',
        dataIndex: 'chargingTime',
        key: 'chargingTime',
        render: chargingTime => {
          chargingTime = chargingTime.split(':');
          const formatedTime = `${chargingTime[0]}小时${chargingTime[1]}分${chargingTime[2]}秒`;
          return <span>{formatedTime}</span>;
        },
      },
    ];
    return (
      <Table rowKey="id" columns={columns} dataSource={chargeRecord.data} loading={isFetching} />
    );
  }
}

ChargeRecord.propTypes = {
  chargeRecord: PropTypes.object.isRequired,
};

export default ChargeRecord;
