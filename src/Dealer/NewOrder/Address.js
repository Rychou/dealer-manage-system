import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import NewArress from './NewAddress';
import { Row, Col, Card, Popconfirm, message, Button } from 'antd';
import classnames from 'classnames';

@hot(module)
class Address extends Component {
  state = {
    addressList: [],
    selected: -1,
    visible: false,
    editAddress: {},
    isEdit: false,
    editIndex: null,
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

  handleDeleteAddress = selected => {
    const arr = this.state.addressList;
    arr.splice(selected, 1);
    this.setState({
      addressList: arr,
    });
    localStorage.setItem('addressList', JSON.stringify(arr));
    message.success('删除成功!');
  }

  handleEditAddress = selected => {
    this.setState({
      editAddress: this.state.addressList[selected],
      isEdit: true,
      visible: true,
      editIndex: selected,
    });
  }

  handleShowModal = () => {
    this.setState({ visible: true });
  };

  handleUnShowModal = () => {
    this.setState({ visible: false, isEdit: false, editAddress: {} });
  };

  render() {
    const { addressList, selected, editAddress, visible, isEdit, editIndex } = this.state;
    return (
      <div className="address">
        <h2>选择收货地址</h2>

        <Row gutter={24} className="address-list">
          {addressList.map((address, index) => (
            <Col
              span={6}
              key={index}
              className="address-item"
            >
              <div className="address-item-actions">
                <a onClick={this.handleEditAddress.bind(this, index)}>
                  编辑
                </a>
                <Popconfirm title="你确定要删除吗？" onConfirm={this.handleDeleteAddress.bind(this, index)}>
                  <a>
                    删除
                  </a>
                </Popconfirm>
              </div>
              <Card
              onClick={this.handleAddressSelect.bind(this, index)}
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
        <Button type="primary" onClick={this.handleShowModal} style={{ marginTop: 12 }}>
          新增地址
        </Button>
        <NewArress
          handleUnShowModal={this.handleUnShowModal}
          visible={visible}
          editAddress={editAddress}
          isEdit={isEdit}
          editIndex={editIndex}
          updateLocalAddressList={this.updateLocalAddressList} />
      </div>
    );
  }
}

export default Address;
