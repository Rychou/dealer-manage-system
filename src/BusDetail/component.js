import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { DescriptionList } from 'ant-design-pro';
import { Layout, Divider } from 'antd';
import PropTypes from 'prop-types';
import ChargeRecord from './ChargeRecord';
import { transformStatus, scrollToAnchor } from 'utils';

const { Content } = Layout;
const { Description } = DescriptionList;

class BusDetail extends Component {
  componentDidMount() {
    const { match, location, fetchBusDetail, isResolve } = this.props;
    if (!isResolve) {
      fetchBusDetail({ vin: match.params.vin });
    }
    scrollToAnchor(location);
  }

  render() {
    const { basic, chargeRecord, isFetching } = this.props;
    const { staticObject } = basic;
    return (
      <Layout>
        <Content style={{ background: '#fff', borderRadius: '2px', padding: '32px' }}>
          <DescriptionList size="large" title="车辆信息">
            <Description term="车辆自编号">{staticObject.selfNum}</Description>
            <Description term="车牌号">{staticObject.licenseNum}</Description>
            <Description term="VIN">{staticObject.vin}</Description>
            <Description term="所属公司/承修单位">
              {`${staticObject.useUnit}/${staticObject.repairUnit}`}
            </Description>
            <Description term="启用时间">{staticObject.driveLicenceRegDate}</Description>
            <Description term="车辆状态">{transformStatus(basic.status)}</Description>
            <Description term="续驶里程">{`${basic.theoryContinuousMileage}km`}</Description>
            <Description term="电池容量">{`${basic.batteryCapacity}KWh`}</Description>
            <Description term="额定电压">{`${basic.ratedVoltage}V`}</Description>
          </DescriptionList>
          <Divider />
          <DescriptionList size="large" id="chargeRecord" title="充电记录">
            <ChargeRecord isFetching={isFetching} chargeRecord={chargeRecord} />
          </DescriptionList>
        </Content>
      </Layout>
    );
  }
}

BusDetail.propTypes = {
  basic: PropTypes.object.isRequired,
  chargeRecord: PropTypes.object.isRequired,
  fetchBusDetail: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isRejected: PropTypes.bool.isRequired,
  isResolve: PropTypes.bool.isRequired,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default withRouter(BusDetail);
