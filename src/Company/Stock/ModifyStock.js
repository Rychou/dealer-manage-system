import React, { Component } from 'react';
import { Modal, InputNumber, Form, message } from 'antd';
import { hot } from 'react-hot-loader';
import request from 'request';

const FormItem = Form.Item;
@hot(module)
class ModifyStock extends Component {
  state = {
    stock: {},
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      stock: this.getStock(nextProps.productNo, this.props.stocks) || {},
    });
  }

  handleCancel = () => {
    this.props.hideModal();
    this.props.form.resetFields();
  };

  handleModifyStock = e => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;
    const {
      stock: { productNo, stock: currentStock, warehouseNo },
    } = this.state;

    validateFields((err, values) => {
      if (!err) {
        if (values.stock === currentStock) {
          message.info('您要修改的库存量和原来的是一样的噢！');
        } else {
          this.setStock(productNo, values.stock, warehouseNo);
        }
      }
    });
  };

  setStock = (productNo, stock, warehouseNo) => {
    request('/groupInventory', {
      method: 'post',
      data: {
        productNo,
        stock,
        warehouseNo,
      },
    })
      .then(res => {
        message.success('修改成功！');
        this.props.hideModal();
        this.props.fetchStocks();
      })
      .catch(err => {
        message.failure('修改失败！');
        this.props.hideModal();
      });
  };

  getStock = (productNo, stocks) => {
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].productNo === productNo) {
        return stocks[i];
      }
    }
  };

  render() {
    const {
      visible,
      form: { getFieldDecorator },
    } = this.props;
    const { stock } = this.state;
    return (
      <Modal
        title="修改库存"
        visible={visible}
        onOk={this.handleModifyStock}
        onCancel={this.handleCancel}
        okButtonProps={{ htmlType: 'submit', onClick: this.handleModifyStock }}
      >
        <Form layout="inline" onSubmit={this.handleModifyStock}>
          <FormItem label="库存量">
            {getFieldDecorator('stock', {
              initialValue: stock.stock,
              rules: [
                {
                  required: true,
                  message: '请输入库存量！',
                },
                {
                  type: 'number',
                  message: '数据格式不正确，请输入数字！',
                },
              ],
            })(<InputNumber mix={0} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(ModifyStock);