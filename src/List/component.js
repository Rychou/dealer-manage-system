import React from 'react';
import { object, number, func } from 'prop-types';
import { hot } from 'react-hot-loader';
import { Button } from 'antd';

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
            <Button>Button</Button>
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
