import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Charts } from 'ant-design-pro';
import { Divider } from 'antd';
import { hot } from 'react-hot-loader';

const { Pie, yuan } = Charts;

const salesPieData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

@hot(module)
class AmountCategory extends Component {
  componentDidMount() {
    this.props.fetchAmountCategory();
  }

  render() {
    const { amountCategory } = this.props;
    return (
      <div>
        <h3>年总销售额类别占比</h3>
        <Divider />
        <Pie
          hasLegend
          title="销售额"
          total={() => (
            <span
              dangerouslySetInnerHTML={{
                __html: yuan(
                  amountCategory.reduce((pre, now) => now.y + pre, 0),
                ),
              }}
            />
          )}
          data={amountCategory}
          valueFormat={val => (
            <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />
          )}
          height={230}
        />
      </div>
    );
  }
}

AmountCategory.propTypes = {
  amountCategory: PropTypes.array,
  fetchAmountCategory: PropTypes.func,
};

export default AmountCategory;
