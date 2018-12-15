import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Row, Col, Tabs, Radio } from 'antd';
import { Charts } from 'ant-design-pro';
import DealerRank from './DealerRank';

const { Bar } = Charts;
const TabPane = Tabs.TabPane;

@hot(module)
class Trend extends Component {
  state = {
    currentSelected: 'year',
  };

  componentDidMount() {
    this.props.fetchAmountTrend();
  }

  handleSelectorChange = e => {
    this.setState({ currentSelected: e.target.value });
  };

  render() {
    const {
      amountTrend,
      isFetching,
      dealerRankWrapper,
      fetchDealerRank,
    } = this.props;
    const { currentSelected } = this.state;
    const Selector = (
      <Radio.Group defaultValue="year" onChange={this.handleSelectorChange}>
        <Radio.Button value="year">全年</Radio.Button>
        <Radio.Button value="month">本月</Radio.Button>
      </Radio.Group>
    );
    return (
      <div>
        <Tabs defaultActiveKey="1" tabBarExtraContent={Selector}>
          <TabPane tab="销售额" key="1">
            <Row gutter={64}>
              <Col span={18}>
                <Bar
                  title="销售额趋势"
                  height={300}
                  data={amountTrend[currentSelected]}
                />
              </Col>
              <Col span={6}>
                <DealerRank
                  {...dealerRankWrapper}
                  currentSelected={currentSelected}
                  fetchDealerRank={fetchDealerRank}
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

Trend.propTypes = {
  amountTrend: PropTypes.object,
  fetchAmountTrend: PropTypes.func,
  fetchDealerRank: PropTypes.func,
  isFetching: PropTypes.bool,
};

export default Trend;
