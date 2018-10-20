import React from 'react';
import { object, number, func } from 'prop-types';
import { hot } from 'react-hot-loader';
import { Button } from 'antd';
import network from 'network';

/* List Page. */
@hot(module)
class List extends React.Component {
  static propTypes = {
    classes: object,
    count: number,
    fetchSomeAsyncRequest: func,
  };

  /* Call saga function to increment count by 1. */
  handleClick = () => {
    this.props.fetchSomeAsyncRequest();
  };

  /* Render List Page. */
  render() {
    const { count } = this.props;

    return (
      <div>
        <div>JSS demo</div>
        <ul>
          <li>
            <Button onClick={() => network.get('/example/1539929210949')}>测试网络请求(F12)</Button>
          </li>
        </ul>
        <button onClick={this.handleClick} type="button">
          Click me, to mock async callback:
          {count}
        </button>
      </div>
    );
  }
}

export default List;
