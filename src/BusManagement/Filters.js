import { Form, Row, Col, Input, Button, Icon } from 'antd';
import React, { Component } from 'react';

const FormItem = Form.Item;

class Filters extends Component {
    state = {
        expand: false,
    };

    createBusInfo = () => {
        const {
            changeDrawerVisible,
            postSpecialBusInfo,
            isNewBusInfo,
            changeIsNewBus,
            specialBusInfo,
        } = this.props;
        postSpecialBusInfo(isNewBusInfo ? specialBusInfo : {});
        changeIsNewBus(true);
        return changeDrawerVisible(true);
    };

    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { changeDrawerVisible } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                xxl: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                xxl: { span: 16 },
            },
        };
        const formItems = [
            {
                label: '车辆自编号',
                fieldDecorator: {
                    id: 'id',
                    rules: [
                        {
                            required: false,
                            message: '请输入车辆自编号',
                        },
                    ],
                },
                placeholder: '请输入车辆自编号',
                isShow: true,
            },
            {
                label: '车辆型号',
                fieldDecorator: {
                    id: 'type',
                    rules: [
                        {
                            required: false,
                            message: '请输入车辆型号',
                        },
                    ],
                },
                placeholder: '请输入车辆型号',
                isShow: this.state.expand,
            },
            {
                label: '线路',
                fieldDecorator: {
                    id: 'line',
                    rules: [
                        {
                            required: false,
                            message: '请输入线路',
                        },
                    ],
                },
                placeholder: '请输入线路',
                isShow: this.state.expand,
            },
            {
                label: '车牌号',
                fieldDecorator: {
                    id: 'plateNumber',
                    rules: [
                        {
                            required: false,
                            message: '请输入车牌号',
                        },
                    ],
                },
                placeholder: '请输入车牌号',
                isShow: this.state.expand,
            },
            {
                label: '状态',
                fieldDecorator: {
                    id: 'state',
                    rules: [
                        {
                            required: false,
                            message: '状态',
                        },
                    ],
                },
                placeholder: '请选择状态',
                isShow: this.state.expand,
            },
        ];
        const renderForm = () =>
            formItems.map(Item => {
                if (Item.isShow) {
                    return (
                        <Col span={5} key={Item.label}>
                            <FormItem
                                colon={false}
                                label={<div style={{ float: 'left' }}>{`${Item.label}:`}</div>}
                                {...formItemLayout}
                                style={{ display: 'block', height: 32 }}
                            >
                                {getFieldDecorator(Item.fieldDecorator.id, {
                                    rules: Item.fieldDecorator.rules,
                                })(<Input placeholder={Item.placeholder} />)}
                            </FormItem>
                        </Col>
                    );
                }
            });
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSearch}>
                    <Row type="flex" justify="start" align="middle" gutter={6}>
                        {renderForm()}
                        <Col span={6} style={{ height: 32 }}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                重置
                            </Button>
                            <a style={{ marginLeft: 15, fontSize: 12 }} onClick={this.toggle}>
                                展开 <Icon type={this.state.expand ? 'up' : 'down'} />
                            </a>
                        </Col>
                    </Row>
                </Form>
                <Row style={{ width: 200, marginTop: 29 }}>
                    <Col span={12}>
                        <Button
                            type="primary"
                            onClick={this.createBusInfo}>新建
                        </Button>
                    </Col>
                    <Col span={12}><Button>导入</Button></Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(Filters);