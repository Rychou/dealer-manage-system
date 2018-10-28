/* eslint-disable */
import React, {Component} from 'react';
import {Layout, Table, Drawer, Form, Button, Row, Input, Popconfirm, DatePicker, Col } from 'antd';

const FormItem = Form.Item;

const {Content} = Layout;

class busInfoEditForm extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        return (
            <Form>
                <FormItem label="车辆自编号" {...formItemLayout}>
                    {getFieldDecorator('selfNum', {
                        rules: [{
                            required: true, message: '请输入车辆自编号',
                        }],
                    })(
                        <Input placeholder="请输入车辆自编号"/>
                    )}
                </FormItem>
                <FormItem label="车牌号" {...formItemLayout}>
                    {getFieldDecorator('licenseNum', {
                        rules: [{
                            required: true, message: '请输入车牌号',
                        }],
                    })(
                        <Input placeholder="请输入车牌号"/>
                    )}
                </FormItem>
                <FormItem label="车牌号" {...formItemLayout}>
                    {getFieldDecorator('licenseNum', {
                        rules: [{
                            required: true, message: '请输入车牌号',
                        }],
                    })(
                        <Input placeholder="请输入车牌号"/>
                    )}
                </FormItem>
                <FormItem label="VIN号" {...formItemLayout}>
                    {getFieldDecorator('vin', {
                        rules: [{
                            required: true, message: '请输入VIN号',
                        }],
                    })(
                        <Input placeholder="请输入VIN号"/>
                    )}
                </FormItem>
                <FormItem label="工程里程" {...formItemLayout}>
                    {getFieldDecorator('workMileage')(
                        <Input placeholder="请输入工程里程"/>
                    )}
                </FormItem>
                <FormItem label="车型" {...formItemLayout}>
                    {getFieldDecorator('vehModel', {
                        rules: [{
                            required: true, message: '请输入VIN号',
                        }],
                    })(
                        <Input placeholder="请输入车型"/>
                    )}
                </FormItem>
                <FormItem label="归属公司" {...formItemLayout}>
                    {getFieldDecorator('useUnit', {
                        rules: [{
                            required: true, message: '请输入归属公司',
                        }],
                    })(
                        <Input placeholder="请输入归属公司"/>
                    )}
                </FormItem>
                <FormItem label="承修公司" {...formItemLayout}>
                    {getFieldDecorator('repairUnit')(
                        <Input placeholder="请输入归属公司"/>
                    )}
                </FormItem>
                <FormItem label="启用时间" {...formItemLayout}>
                    {getFieldDecorator('driveLicenceRegDate', {
                        rules: [{
                            required: true,
                            type: 'object',
                            message: '请输入启用时间',
                        }],
                    })(
                        <DatePicker/>
                    )}
                </FormItem>
                <Row>
                    <Col span={6} offset={8}><Button type="primary" htmlType="submit">提交</Button></Col>
                    <Col span={5} offset={0}><Button>取消</Button></Col>
                </Row>
            </Form>
        )
    }
}

const WarppedbusInfoEditForm = Form.create()(busInfoEditForm);


class CarManage extends Component {
    componentDidMount() {
        const {isResolve, fetchBusInfo} = this.props;
        if (!isResolve) {
            fetchBusInfo({row: 10, page: 2});
        }
    }

    editBusInfo = () => {
        const {changeDrawerVisible} = this.props;
        return changeDrawerVisible(true);
    };

    closeDrawer = () => {
        const {changeDrawerVisible} = this.props;
        return changeDrawerVisible(false);
    };

    handleDelete(selfNum) {
        console.log(selfNum);
        const {changeBusInfo} = this.props;
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
                    <a onClick={this.editBusInfo}>编辑</a> |
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
                    <Table
                        rowKey="selfNum"
                        bordered
                        loading={this.props.isFetching}
                        columns={columns}
                        dataSource={this.props.cars}
                        pagination={this.props.pagination}
                        // onChange={this.handleChange}
                    />
                </Content>
                <Drawer
                    title="新建/编辑车辆"
                    width={559}
                    placement="right"
                    onClose={this.closeDrawer}
                    maskClosable={false}
                    visible={this.props.visible}
                    style={{
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: 53,
                    }}
                >
                    <WarppedbusInfoEditForm/>
                </Drawer>
            </Layout>
        );
    }
}

export default CarManage;
