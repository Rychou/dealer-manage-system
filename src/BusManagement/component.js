/* eslint-disable */
import React, { Component } from 'react';
import {Layout, Table, Drawer, Form, Popconfirm} from 'antd';
import busInfoEditForm from './drawer';
import BusFilter from './Filters';
const { Content } = Layout;

const WarppedbusInfoEditForm = Form.create({
    mapPropsToFields(props) {
        let formInit = {};
        for(let item in props.specialBusInfo) {
            formInit[item] = Form.createFormField({
                value: props.specialBusInfo[item]
            })
        }
        return formInit;
    }
})(busInfoEditForm);

class CarManage extends Component {
    componentDidMount() {
        const { isResolve, fetchBusInfo } = this.props;
        if (!isResolve) {
            fetchBusInfo({row: 10, page: 2});
        }
    }
    editBusInfo = (record) => {
        const { changeDrawerVisible, postSpecialBusInfo, changeIsNewBus } = this.props;
        changeIsNewBus(false);
        postSpecialBusInfo(record);
        return changeDrawerVisible(true);
    };


    handleDelete(selfNum) {
        const { changeBusInfo } = this.props;
        let carsInfo = this.props.cars;
        changeBusInfo(carsInfo.filter(carsInfoItem => carsInfoItem.selfNum !== selfNum))
    }

    render() {
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
                    <a onClick={(e) => this.editBusInfo(record)}>编辑</a> |
                    <Popconfirm title="确认删除该车辆?" onConfirm={() => this.handleDelete(record.selfNum)} okText="确认"
                                cancelText="取消">
                        <a href="#">删除</a>
                    </Popconfirm>
                </span>
            ),
        }];

        return (
            <Layout>
                <Content style={
                    {
                        background: '#fff',
                        borderRadius: '2px',
                        padding: '32px',
                        marginTop: '24px',
                    }}>
                    <BusFilter { ...this.props }/>
                    <Table
                        rowKey="selfNum"
                        bordered
                        loading={this.props.isFetching}
                        columns={columns}
                        dataSource={this.props.cars}
                        pagination={this.props.pagination}
                        style={{marginTop: 30}}
                    />
                </Content>
                <Drawer
                    title="新建/编辑车辆"
                    width={559}
                    placement="right"
                    maskClosable={false}
                    closable={false}
                    visible={this.props.visible}
                    style={{height: 'calc(100% - 55px)', overflow: 'auto', paddingBottom: 53,}}
                >
                    <WarppedbusInfoEditForm {...this.props }/>
                </Drawer>
            </Layout>
        );
    }
}

export default CarManage;
