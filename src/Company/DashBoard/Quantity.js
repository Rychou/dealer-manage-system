import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Charts } from 'ant-design-pro';
import { hot } from 'react-hot-loader';
import { Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import moment from 'moment';

const { ChartCard, Field, MiniBar } = Charts;

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 10; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
      'YYYY-MM-DD',
    ),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

@hot(module)
class Quantity extends Component {
  componentDidMount() {
    this.props.fetchQuantity();
  }

  render() {
    const {
      quantity: { totalYear, averagePerDay, recent },
      isFetching,
    } = this.props;

    return (
      <ChartCard
        loading={isFetching}
        title="年总销售量"
        action={
          <Tooltip title="指标说明">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(totalYear).format('0,0')}
        footer={
          <Field
            label="日销售量"
            value={numeral(averagePerDay).format('0,0')}
          />
        }
        contentHeight={46}
      >
        <MiniBar height={46} data={recent} />
      </ChartCard>
    );
  }
}

Quantity.propTypes = {
  fetchQuantity: PropTypes.func,
  isFetching: PropTypes.bool,
  quantity: PropTypes.object,
};

export default Quantity;
