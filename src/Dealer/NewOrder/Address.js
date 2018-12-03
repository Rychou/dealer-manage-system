import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import NewArress from './NewAddress';
import { Row, Col, Card } from 'antd';
import classnames from 'classnames';

@hot(module)
class Address extends Component {
  state = {
    addressList: [],
    selected: -1,
  };

  componentDidMount() {
    this.updateLocalAddressList();
  }

  /**
   * 根据本地存储的地址进行初始化
   *
   * @memberof Address
   */
  updateLocalAddressList = () => {
    this.setState(
      {
        addressList: JSON.parse(localStorage.getItem('addressList')) || [],
      },
      this.initSelected,
    );
  };

  initSelected = () => {
    let selected = null;
    this.state.addressList.forEach((address, index) => {
      if (address.isDefault) {
        selected = index;
      }
    });
    this.setState({ selected }, () => {
      this.props.updateAddress(this.state.addressList[selected]);
    });
  };

  handleAddressSelect = selected => {
    this.setState({ selected }, () => {
      const { addressList } = this.state;
      this.props.updateAddress(addressList[selected]);
    });
  };

  render() {
    const { addressList, selected } = this.state;
    return (
      <div className="address">
        <h2>选择收货地址</h2>

        <Row gutter={24} className="address-list">
          {addressList.map((address, index) => (
            <Col
              onClick={this.handleAddressSelect.bind(this, index)}
              span={6}
              key={index}
              className="address-item"
            >
              <Card
                className={classnames('address-item-card', {
                  'address-item-seleted': selected === index,
                })}
                title={
                  <div className="address-item-title">
                    {address.address[0]}
                    {address.address[1]} ({address.name}收)
                  </div>
                }
              >
                <div className="address-item-content">
                  <span className="address-item-content-detail">
                    {address.address[2]} {address.address[3]} {address.detailAddress}
                  </span>
                  <span className="address-item-content-phone">{address.phone}</span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <NewArress updateLocalAddressList={this.updateLocalAddressList} />
      </div>
    );
  }
}

export default Address;
