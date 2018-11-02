import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

class ChargeRecord extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { chargeRecord } = this.props;
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
        render: ({
          year,
          monthValue: month,
          dayOfMonth: day,
          hour,
          minute,
          second,
        }) => <span>{`${year}-${month}-${day} ${hour}:${minute}:${second}`}</span>,
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
        render: ({
          year,
          monthValue: month,
          dayOfMonth: day,
          hour,
          minute,
          second,
        }) => <span>{`${year}-${month}-${day} ${hour}:${minute}:${second}`}</span>,
      },
      {
        title: '充电结束时剩余电量',
        dataIndex: 'endSoc',
        key: 'endSoc',
        render: endSoc => <span>{endSoc}%</span>,
      },
    ];
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={chargeRecord.data}
      />
    );
  }
}

ChargeRecord.propTypes = {
  chargeRecord: PropTypes.object.isRequired,
};

export default ChargeRecord;
