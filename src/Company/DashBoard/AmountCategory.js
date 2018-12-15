import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Charts } from 'ant-design-pro';
import { Divider, Skeleton } from 'antd';
import { hot } from 'react-hot-loader';

const { Pie, yuan } = Charts;

@hot(module)
class AmountCategory extends Component {
  componentDidMount() {
    this.props.fetchAmountCategory();
  }

  render() {
    const { amountCategory, isFetching } = this.props;
    return (
      <div style={{ backgroundColor: '#fff', padding: 12 }}>
        <h3>年总销售额类别占比</h3>
        <Divider />
        <Skeleton active loading={isFetching}>
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
            height={250}
          />
        </Skeleton>
      </div>
    );
  }
}

AmountCategory.propTypes = {
  amountCategory: PropTypes.array,
  fetchAmountCategory: PropTypes.func,
  isFetching: PropTypes.bool,
};

export default AmountCategory;
