import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { DescriptionList } from 'ant-design-pro';
import { Layout, Divider, Col } from 'antd';
import PropTypes from 'prop-types';
import ChargeRecord from './ChargeRecord';
import { transformStatus, scrollToAnchor } from 'utils';
import RangeDatePicker from './RangeDatePicker';

const { Content } = Layout;
const { Description } = DescriptionList;

class BusDetail extends Component {
  componentDidMount() {
    const { match, location, fetchBusInfo, fetchChargeRecord, busInfo, chargeRecord } = this.props;
    if (!busInfo.isResolved) {
      fetchBusInfo({ vin: match.params.vin });
    }
    if (!chargeRecord.isResolved) {
      fetchChargeRecord({
        vin: match.params.vin,
      });
    }
    scrollToAnchor(location);
  }

  searchByRangeDate = (startTime, endTime) => {
    const {
      fetchChargeRecord,
      match: {
        params: { vin },
      },
    } = this.props;
    fetchChargeRecord({ vin, startTime, endTime });
  };

  render() {
    const {
      busInfo,
      busInfo: { staticInfo },
      chargeRecord,
    } = this.props;
    return (
      <Layout>
        <Content style={{ background: '#fff', borderRadius: '2px', padding: '32px' }}>
          <DescriptionList size="large" title="车辆信息">
            <Description term="车辆自编号">{staticInfo.selfNum}</Description>
            <Description term="车牌号">{staticInfo.licenseNum}</Description>
            <Description term="VIN">{staticInfo.vin}</Description>
            <Description term="所属公司/承修单位">
              {`${staticInfo.useUnit}/${staticInfo.repairUnit}`}
            </Description>
            <Description term="启用时间">{staticInfo.driveLicenceRegDate}</Description>
            <Description term="车辆状态">{transformStatus(busInfo.status)}</Description>
            <Description term="续驶里程">{`${busInfo.theoryContinuousMileage}km`}</Description>
            <Description term="电池容量">{`${busInfo.batteryCapacity}KWh`}</Description>
            <Description term="额定电压">{`${busInfo.ratedVoltage}V`}</Description>
          </DescriptionList>
          <Divider />
          <DescriptionList size="large" id="chargeRecord" title="充电记录" style={{ margin: 0 }}>
            <Col span="24">
              <RangeDatePicker searchByRangeDate={this.searchByRangeDate} />
              <ChargeRecord chargeRecord={chargeRecord} />
            </Col>
          </DescriptionList>
        </Content>
      </Layout>
    );
  }
}

BusDetail.propTypes = {
  busInfo: PropTypes.object.isRequired,
  chargeRecord: PropTypes.object.isRequired,
  fetchBusInfo: PropTypes.func.isRequired,
  fetchChargeRecord: PropTypes.func.isRequired,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default withRouter(BusDetail);
