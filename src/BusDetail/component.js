import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { DescriptionList } from 'ant-design-pro';
import { Layout, Divider } from 'antd';
import PropTypes from 'prop-types';

const { Content } = Layout;
const { Description } = DescriptionList;

class BusDetail extends Component {
  componentDidMount() {
    this.scrollToAnchor();
    const { match, fetchBusDetail, isResolve } = this.props;
    if (!isResolve) {
      fetchBusDetail({ id: match.params.id });
    }
  }

  scrollToAnchor() {
    let anchorName = this.props.location.hash;
    if (anchorName) {
      anchorName = anchorName.replace('#', '');
      const anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  }

  render() {
    const { basic } = this.props;
    // const convertStatus = () => {
    //   switch (basic.status) {
    //     case -1:
    //       return '异常';
    //     case 0:
    //       return '停用';
    //     case 1:
    //       return '启用';
    //     default:
    //       return '';
    //   }
    // };
    return (
      <Layout>
        <Content style={{ background: '#fff', borderRadius: '2px', padding: '32px' }}>
          <DescriptionList size="large" title="车辆信息">
            <Description term="车辆自编号">{basic.selfNum}</Description>
            <Description term="车牌号">{basic.licenseNum}</Description>
            <Description term="VIN">{basic.vin}</Description>
            <Description term="所属公司/承修单位">
              {`${basic.useUnit}/${basic.repairUnit}`}
            </Description>
            <Description term="启用时间">{basic.startTime}</Description>
            <Description term="累计里程">{`${basic.totalMileage}km`}</Description>
            <Description term="续航里程">{`${basic.workMileage}km`}</Description>
            <Description term="电池容量">{`${basic.batteryCapacity}KWh`}</Description>
            <Description term="额定电压">{`${basic.ratedVoltage}V`}</Description>
          </DescriptionList>
          <Divider />
          <DescriptionList size="large" id="chargeRecord" title="充电记录" />
        </Content>
      </Layout>
    );
  }
}

BusDetail.propTypes = {
  basic: PropTypes.object.isRequired,
  fetchBusDetail: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isRejected: PropTypes.bool.isRequired,
  isResolve: PropTypes.bool.isRequired,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default withRouter(BusDetail);
