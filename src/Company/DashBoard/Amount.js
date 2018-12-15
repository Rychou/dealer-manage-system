import React, { Component } from 'react';
import { Trend, Charts } from 'ant-design-pro';
import numeral from 'numeral';
import { Icon, Tooltip } from 'antd';
import { hot } from 'react-hot-loader';
import { object, func, bool } from 'prop-types';

const { ChartCard, yuan, Field } = Charts;

@hot(module)
class Amount extends Component {
  componentDidMount() {
    const { fetchAmount } = this.props;

    fetchAmount();
  }

  render() {
    const {
      isFetching,
      amount: { totalYear, perDay, compareWeek, compareDay },
    } = this.props;
    return (
      <ChartCard
        title="年总销售额"
        loading={isFetching}
        action={
          <Tooltip title="指标说明">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={() => (
          <span dangerouslySetInnerHTML={{ __html: yuan(totalYear) }} />
        )}
        footer={
          <Field label="日销售额" value={numeral(perDay).format('0,0')} />
        }
        contentHeight={46}
      >
        <span>
          周环比
          <Trend
            flag={compareWeek >= 0 ? 'up' : 'down'}
            style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}
          >
            {Math.abs(compareWeek)}%
          </Trend>
        </span>
        <span style={{ marginLeft: 16 }}>
          日环比
          <Trend
            flag={compareDay >= 0 ? 'up' : 'down'}
            style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}
          >
            {Math.abs(compareDay)}%
          </Trend>
        </span>
      </ChartCard>
    );
  }
}

Amount.propTypes = {
  amount: object,
  fetchAmount: func,
  isFetching: bool,
};

export default Amount;
