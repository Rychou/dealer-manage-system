import React, { Component } from 'react';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';

const FormItem = Form.Item;

class BusInfoEditForm extends Component {
    closeDrawer = () => {
        const { changeDrawerVisible, isNewBusInfo, postSpecialBusInfo } = this.props;
        const { getFieldsValue } = this.props.form;
        let newBusInfo = {};
        if (isNewBusInfo) newBusInfo = getFieldsValue();
        postSpecialBusInfo(newBusInfo);
        return changeDrawerVisible(false);
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div style={{ marginTop: 50 }}>
                <Form>
                    <FormItem label="车辆自编号" {...formItemLayout}>
                        {getFieldDecorator('selfNum', {
                            rules: [{
                                required: true, message: '请输入车辆自编号',
                            }],
                        })(
                            <Input placeholder="请输入车辆自编号" />,
                        )}
                    </FormItem>
                    <FormItem label="车牌号" {...formItemLayout}>
                        {getFieldDecorator('licenseNum', {
                            rules: [{
                                required: true, message: '请输入车牌号',
                            }],
                        })(
                            <Input placeholder="请输入车牌号" />,
                        )}
                    </FormItem>
                    <FormItem label="VIN号" {...formItemLayout}>
                        {getFieldDecorator('vin', {
                            rules: [{
                                required: true, message: '请输入VIN号',
                            }],
                        })(
                            <Input placeholder="请输入VIN号" />,
                        )}
                    </FormItem>
                    <FormItem label="工程里程" {...formItemLayout}>
                        {getFieldDecorator('workMileage', {
                        })(
                            <Input placeholder="请输入工程里程" />,
                        )}
                    </FormItem>
                    <FormItem label="车型" {...formItemLayout}>
                        {getFieldDecorator('vehModel', {
                            rules: [{
                                required: true, message: '请输入VIN号',
                            }],
                        })(
                            <Input placeholder="请输入车型" />,
                        )}
                    </FormItem>
                    <FormItem label="归属公司" {...formItemLayout}>
                        {getFieldDecorator('useUnit', {
                            rules: [{
                                required: true, message: '请输入归属公司',
                            }],
                        })(
                            <Input placeholder="请输入归属公司" />,
                        )}
                    </FormItem>
                    <FormItem label="承修公司" {...formItemLayout}>
                        {getFieldDecorator('repairUnit', {
                        })(
                            <Input placeholder="请输入归属公司" />,
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
                            <DatePicker />,
                        )}
                    </FormItem>
                    <Row>
                        <Col span={6} offset={8}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Col>
                        <Col span={5} offset={0}>
                            <Button onClick={this.closeDrawer}>取消</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default BusInfoEditForm;
