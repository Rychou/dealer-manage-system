import React, { Component } from 'react';
import { object } from 'prop-types';
import { Form, Button, InputNumber, Radio } from 'antd';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { addProduct } from '../ShoppingCart/actions';
import { connect } from 'react-redux';

const FormItem = Form.Item;
@hot(module)
class BuyForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      history: { push },
      product,
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        push('/newOrder/confirm', { products: [{ ...values, ...product }] });
      }
    });
  };

  handleAddToShoppingCart = () => {
    const {
      form: { validateFields },
      addProduct,
      product,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        addProduct({ ...product, ...values });
      }
    });
  };

  render() {
    const {
      product,
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 16 },
    };
    return (
      <Form className="buy-form-container" onSubmit={this.handleSubmit}>
        <h2>{product.name}</h2>
        <h3 style={{ color: 'red' }}>{product.description}</h3>
        <div className="price-container">
          <span className="price-label">价格：</span>
          <span className="price-value-container">
            <span className="price-symbol">￥</span>
            <span className="price-value">{product.price}</span>
          </span>
        </div>
        <FormItem {...formItemLayout} label="适用人数">
          <Radio.Group defaultValue="其他" size="small">
            <Radio.Button value="其他">其他</Radio.Button>
          </Radio.Group>
        </FormItem>
        <FormItem {...formItemLayout} label="颜色分类">
          {getFieldDecorator('category', {
            initialValue: 0,
          })(
            <Radio.Group size="small">
              {product.categories
                ? product.categories.map((category, index) => (
                    <Radio.Button key={index} value={index}>
                      {category}
                    </Radio.Button>
                  ))
                : null}
            </Radio.Group>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="数量">
          {getFieldDecorator('amount', {
            initialValue: 1,
            rules: [
              {
                type: 'number',
              },
            ],
          })(<InputNumber formatter={value => `${value} 件`} min={1} max={product.stocks} />)}
          <span className="stocks">库存：{product.stocks} 件</span>
        </FormItem>
        <FormItem>
          <Button htmlType="submit" style={{ marginRight: 24 }}>
            立即购买
          </Button>
          <Button type="primary" onClick={this.handleAddToShoppingCart}>
            加入购物车
          </Button>
        </FormItem>
      </Form>
    );
  }
}

BuyForm.propTypes = {
  product: object,
};

const mapDispatchToProps = dispatch => ({
  addProduct: payload => dispatch(addProduct(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Form.create()(BuyForm)));
