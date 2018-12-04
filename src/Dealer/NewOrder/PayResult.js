import React from 'react';
import { Result } from 'ant-design-pro';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

@hot(module)
class PayResult extends React.Component {
  render() {
    const { address } = this.props;
    return (
      <Result
        type="success"
        title={<h1>付款成功</h1>}
        description={
          <div>
            <div>
              <span>收货地址: </span>
              <span>
                {address.address.map((item, index) => (
                  <span key={index}>{item} </span>
                ))}
                {address.detailAddress}
              </span>
            </div>
          </div>
        }
      />
    );
  }
}
const mapStateToProps = state => state.NewOrder;

export default connect(mapStateToProps)(PayResult);
