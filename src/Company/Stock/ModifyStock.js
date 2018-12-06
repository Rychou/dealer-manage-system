import React, { Component } from 'react';
import { Modal, InputNumber, Form } from 'antd';
import { hot } from 'react-hot-loader';

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
  };

  handleModifyStock = () => {
    const { productNo } = this.props;
    console.log('submit');
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
