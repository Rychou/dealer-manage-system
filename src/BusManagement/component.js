import React, { Component } from 'react';
import { Layout, Table, Drawer, Form, Popconfirm, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { object, func, bool, array } from 'prop-types';
import request from 'request';
import busInfoEditForm from './drawer';
import BusFilter from './Filters';

const { Content } = Layout;

const WarppedbusInfoEditForm = Form.create({
  mapPropsToFields(props) {
    const formInit = {};
    const { specialBusInfo } = props;
    const propertyName = Object.getOwnPropertyNames(specialBusInfo); // 获取每个属性的名字
    propertyName.forEach(item => {
      formInit[item] = Form.createFormField({
        value: specialBusInfo[item],
      });
    });
    return formInit;
  },
})(busInfoEditForm);

class CarManage extends Component {
  componentDidMount() {
    const { isResolved, fetchBusInfo } = this.props;
    if (!isResolved) {
      fetchBusInfo({ row: 10, page: 2 });
    }
  }

  changePage = (page, pageSize) => {
    const { updatePagination } = this.props;
    updatePagination({
      row: pageSize,
      page,
    });
  }

  changeShowSize = (current, size) => {
    const { updatePagination } = this.props;
    updatePagination({
      row: size,
      page: current,
    });
  }

  editBusInfo = (record) => {
    const {
      changeDrawerVisible,
      postSpecialBusInfo,
      changeIsNewBus,
    } = this.props;
    changeIsNewBus(false);
    postSpecialBusInfo(record);
    return changeDrawerVisible(true);
  };

  handleDelete(selfNum) {
    const { changeBusInfo, cars } = this.props;
    const carsInfo = cars;
    changeBusInfo(carsInfo.filter(carsInfoItem => carsInfoItem.selfNum !== selfNum));
  }

  render() {
    const { isFetching, cars, pagination, visible } = this.props;
    const columns = [{
      title: '使用单位',
      dataIndex: 'useUnit',
      key: 'useUnit',
    }, {
      title: '车辆自编号',
      dataIndex: 'selfNum',
      key: 'selfNum',
    }, {
      title: '车牌号',
      dataIndex: 'licenseNum',
      key: 'licenseNum',
    }, {
      title: 'VIN号',
      dataIndex: 'vin',
      key: 'vin',
    }, {
      title: '车辆型号',
      dataIndex: 'vehModel',
      key: 'vehModel',
    }, {
      title: '持续里程',
      dataIndex: 'workMileage',
      key: 'workMileage',
    }, {
      title: '修理公司',
      dataIndex: 'repairUnit',
      key: 'repairUnit',
    }, {
      title: '时间',
      dataIndex: 'driveLicenceRegDate',
      key: 'driveLicenceRegDate',
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <a onClick={(e) => this.editBusInfo(record)}>编辑</a>|
          <Popconfirm
            title="确认删除该车辆?"
            onConfirm={
              () => this.handleDelete(record.selfNum)
            }
            okText="确认"
            cancelText="取消">
          <a href="#">删除</a>
          </Popconfirm>
        </span>
      ),
    }];

    return (
      <LocaleProvider locale={zhCN}>
        <Layout>
          <Content style={
            {
              background: '#fff',
              borderRadius: '2px',
              padding: '32px',
              marginTop: '24px',
            }}>
            <BusFilter {...this.props} />
            <Table
              rowKey="vin"
              loading={isFetching}
              columns={columns}
              dataSource={cars}
              pagination={{
                ...pagination,
                defaultCurrent: pagination.page,
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: this.changePage,
                onShowSizeChange: this.changeShowSize,
              }}
              style={{ marginTop: 30 }}
            />
          </Content>
          <Drawer
            title="新建/编辑车辆"
            width={559}
            placement="right"
            maskClosable={false}
            closable={false}
            visible={visible}
            style={{ height: 'calc(100% - 55px)', overflow: 'auto', paddingBottom: 53 }}
          >
            <WarppedbusInfoEditForm {...this.props} />
          </Drawer>
        </Layout>
      </LocaleProvider>
    );
  }
}

CarManage.propTypes = {
  cars: array.isRequired,
  changeBusInfo: func,
  changeDrawerVisible: func,
  changeIsNewBus: func, // 用来判断是否是新建一个车辆信息
  fetchBusInfo: func.isRequired,
  isFetching: bool.isRequired,
  isNewBusInfo: bool,
  isRejected: bool.isRequired,
  isResolved: bool.isRequired,
  pagination: object.isRequired,
  specialBusInfo: object,
  visible: bool,
};

export default CarManage;
