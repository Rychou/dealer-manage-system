import { Form, Row, Col, Input, Button, Icon } from 'antd';
import React, { Component } from 'react';

const FormItem = Form.Item;

class Filters extends Component {
  state = {
    expand: false,
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { pagination, fetchMonitors } = this.props;
      const filters = {};
      Object.keys(values).forEach(key => {
        filters[key] = values[key];
      });
      fetchMonitors({
        row: pagination.row,
        page: pagination.page,
        ...filters,
      });
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
    const formItems = [
      {
        label: '车辆自编号',
        fieldDecorator: {
          id: 'selfNum',
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
            <Col span={8} key={Item.label}>
              <FormItem label={Item.label} style={{ float: 'right' }}>
                {getFieldDecorator(Item.fieldDecorator.id, {
                  rules: Item.fieldDecorator.rules,
                })(<Input placeholder={Item.placeholder} />)}
              </FormItem>
            </Col>
          );
        }
      });
    return (
      <Form layout="inline" onSubmit={this.handleSearch}>
        <Row type="flex" justify="start" align="middle" gutter={6}>
          {renderForm()}
          <Col span={8}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              展开 <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(Filters);
