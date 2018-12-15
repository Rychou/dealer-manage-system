import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { hot } from 'react-hot-loader';
import Amount from './Amount';
import { object, func } from 'prop-types';
import Quantity from './Quantity';
import AmountCategory from './AmountCategory';
import AreaQuantity from './AeraQuantity';
import Trend from './Trend';
import './index.less';

@hot(module)
class DashBoard extends Component {
  render() {
    const {
      amountWrapper,
      quantityWrapper,
      amountCategoryWrapper,
      amountTrendWrapper,
      dealerRankWrapper,
      fetchAmount,
      fetchQuantity,
      fetchAmountCategory,
      fetchAmountTrend,
      fetchDealerRank,
    } = this.props;
    return (
      <div className="dashboard-container">
        <Row gutter={36}>
          <Col span={12}>
            <Row gutter={16}>
              <Col span={12}>
                <Amount {...amountWrapper} fetchAmount={fetchAmount} />
              </Col>
              <Col span={12}>
                <Quantity {...quantityWrapper} fetchQuantity={fetchQuantity} />
              </Col>
            </Row>
            <AreaQuantity />
          </Col>
          <Col span={12}>
            <AmountCategory
              {...amountCategoryWrapper}
              fetchAmountCategory={fetchAmountCategory}
            />
          </Col>
        </Row>
        <Trend
          {...amountTrendWrapper}
          dealerRankWrapper={dealerRankWrapper}
          fetchDealerRank={fetchDealerRank}
          fetchAmountTrend={fetchAmountTrend}
        />
      </div>
    );
  }
}

DashBoard.propTypes = {
  amountCategoryWrapper: object,
  amountTrendWrapper: object,
  amountWrapper: object,
  fetchAmount: func,
  fetchAmountCategory: func,
  fetchAmountTrend: func,
  fetchDealerRank: func,
  quantityWrapper: object,
};
export default DashBoard;
