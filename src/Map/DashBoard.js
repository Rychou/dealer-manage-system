import React, { Component } from 'react';
import { object } from 'prop-types';
import { Divider, Row, Col } from 'antd';
import BIcon from 'Common/BIcon';

class DashBoard extends Component {
  render() {
    const { todayTotalMileage, onlineBus, lowPowerBus } = this.props.dashboard;
    return (
      <div className="map-dashboard">
        <div className="title">
          <div className="title-1">今日里程</div>
          <div className="title-2">
            {todayTotalMileage}
            <span>公里</span>
          </div>
        </div>
        <Divider style={{ marginTop: '12px' }} />
        <div className="content">
          <Row>
            <Col span="18">
              <BIcon type="anticon-bus-yellow" className="bus-icon online-bus" />
              <span>在线车辆</span>
            </Col>
            <Col span="6" className="bus-count">
              {onlineBus}辆
            </Col>
          </Row>
          <Row>
            <Col span="18">
              <BIcon type="anticon-bus-blue" className="bus-icon dashed-icon" />
              <span>电量充足</span>
              <Divider type="vertical" />
              <span className="count-percent">
                {((onlineBus - lowPowerBus) / onlineBus) * 100}%
              </span>
            </Col>
            <Col span="6" className="bus-count">
              {onlineBus - lowPowerBus}辆
            </Col>
          </Row>
          <Row>
            <Col span="18">
              <BIcon type="anticon-bue-red" className="bus-icon dashed-icon" />
              <span>电量不足</span>
              <Divider type="vertical" />
              <span className="count-percent">{(lowPowerBus / onlineBus) * 100}%</span>
            </Col>
            <Col span="6" className="bus-count">
              {lowPowerBus}辆
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

DashBoard.propTypes = {
  dashboard: object,
};

export default DashBoard;
