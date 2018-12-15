import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { hot } from 'react-hot-loader';
import Amount from './Amount';
import { object, func } from 'prop-types';
import Quantity from './Quantity';
import AmountCategory from './AmountCategory';
import Trend from './Trend';
import QuantityCategory from './QuantityCategory';
import './index.less';

@hot(module)
class DashBoard extends Component {
  render() {
    const {
      amountWrapper,
      quantityWrapper,
      amountCategoryWrapper,
      quantityCategoryWrapper,
      amountTrendWrapper,
      dealerRankWrapper,
      fetchAmount,
      fetchQuantity,
      fetchAmountCategory,
      fetchAmountTrend,
      fetchDealerRank,
      fetchQuantityCategory,
    } = this.props;
    return (
      <div className="dashboard-container">
        <Row gutter={36}>
          <Col span={6}>
            <Amount {...amountWrapper} fetchAmount={fetchAmount} />
          </Col>
          <Col span={6}>
            <Quantity {...quantityWrapper} fetchQuantity={fetchQuantity} />
          </Col>
        </Row>
        <Trend
          {...amountTrendWrapper}
          dealerRankWrapper={dealerRankWrapper}
          fetchDealerRank={fetchDealerRank}
          fetchAmountTrend={fetchAmountTrend}
        />
        <Row gutter={36}>
          <Col span={12}>
            <AmountCategory
              {...amountCategoryWrapper}
              fetchAmountCategory={fetchAmountCategory}
            />
          </Col>
          <Col span={12}>
            <QuantityCategory
              {...quantityCategoryWrapper}
              fetchQuantityCategory={fetchQuantityCategory}
            />
          </Col>
        </Row>
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
  fetchQuantityCategory: func,
  quantityCategoryWrapper: object,
  quantityWrapper: object,
};
export default DashBoard;
