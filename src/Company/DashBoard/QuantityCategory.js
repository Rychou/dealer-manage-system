import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Charts } from 'ant-design-pro';
import { Divider, Skeleton } from 'antd';
import { hot } from 'react-hot-loader';
import numeral from 'numeral';

const { Pie } = Charts;

@hot(module)
class QuantityCategory extends Component {
  componentDidMount() {
    this.props.fetchQuantityCategory();
  }

  render() {
    const { isFetching, quantityCategory } = this.props;
    return (
      <div style={{ backgroundColor: '#fff', padding: 12 }}>
        <h3>年总销售量类别占比</h3>
        <Divider />
        <Skeleton active loading={isFetching}>
          <Pie
            hasLegend
            title="销售量"
            total={() => (
              <span
                dangerouslySetInnerHTML={{
                  __html: numeral(
                    quantityCategory.reduce((pre, now) => now.y + pre, 0),
                  ).format('0,0'),
                }}
              />
            )}
            data={quantityCategory}
            valueFormat={val => (
              <span
                dangerouslySetInnerHTML={{
                  __html: `${numeral(val).format('0,0')}件`,
                }}
              />
            )}
            height={250}
          />
        </Skeleton>
      </div>
    );
  }
}

QuantityCategory.propTypes = {
  fetchQuantityCategory: PropTypes.func,
  isFetching: PropTypes.bool,
  quantityCategory: PropTypes.array,
};

export default QuantityCategory;
