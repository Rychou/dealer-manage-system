import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Row, Col } from 'antd';
import { yuan } from 'ant-design-pro/lib/Charts';
import classnames from 'classnames';

@hot(module)
class DealerRank extends Component {
  componentDidMount() {
    this.props.fetchDealerRank();
  }

  render() {
    const { dealerRank, isFetching, currentSelected } = this.props;
    return (
      <div>
        <h4 style={{ marginBottom: 24 }}>经销商购买额排名</h4>
        {dealerRank[currentSelected]
          ? dealerRank[currentSelected].map((item, index) => (
              <Row key={item.name} style={{ marginBottom: 12 }}>
                <Col span={4}>
                  <div
                    className={classnames(
                      'dealer-rank-count',
                      `dealer-rank-count-${index + 1}`,
                    )}
                  >
                    {index + 1}
                  </div>
                </Col>
                <Col span={12}>
                  <span>{item.name}</span>
                </Col>
                <Col span={8}>
                  <span>{yuan(item.amount)}</span>
                </Col>
              </Row>
            ))
          : null}
      </div>
    );
  }
}

DealerRank.propTypes = {
  currentSelected: PropTypes.string,
  dealerRank: PropTypes.object,
  fetchDealerRank: PropTypes.func,
  isFetching: PropTypes.bool,
};

export default DealerRank;
