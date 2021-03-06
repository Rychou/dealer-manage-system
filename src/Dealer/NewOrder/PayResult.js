import React from 'react';
import { Result } from 'ant-design-pro';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Button } from 'antd';
import { formatDate } from 'utils';

@hot(module)
class PayResult extends React.Component {
  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    const {
      address,
      newOrder: { id, orderedAt, orderTotalPrice },
      location: {
        state: { payDate },
      },
    } = this.props;
    return (
      <Result
        type="success"
        title={<h1>付款成功</h1>}
        description={
          <div>
            <div className="description">
              <span>订单编号：</span>
              <span>{id}</span>
            </div>
            <div className="description">
              <span>创建时间：</span>
              <span>{formatDate(new Date(orderedAt))}</span>
            </div>
            <div className="description">
              <span>付款时间：</span>
              <span>{formatDate(payDate)}</span>
            </div>
            <div className="description">
              <span>收货地址: </span>
              <span>
                {address.address.map((item, index) => (
                  <span key={index}>{item} </span>
                ))}
                {address.detailAddress}
              </span>
            </div>
            <div className="description">
              <span>实付总额：</span>
              <span style={{ fontSize: '2em' }}>￥{orderTotalPrice}</span>
            </div>
            <Button type="primary" onClick={this.handleClick}>
              确定
            </Button>
          </div>
        }
      />
    );
  }
}
const mapStateToProps = state => state.NewOrder;

export default connect(mapStateToProps)(PayResult);
