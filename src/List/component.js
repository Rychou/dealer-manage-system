import React from 'react';
import {
  object,
  number,
  func,
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

const styles = (theme) => ({
  root: {
    color: 'orange',
  },
});

/**
 * List Page
 */
@hot(module)
@withStyles(styles)
class List extends React.Component {
  static propTypes = {
    classes: object,
    count: number,
    fetchSomeAsyncRequest: func,
  };

  /**
   * Call saga function to increment count by 1
   */
  onClick() {
    this.props.fetchSomeAsyncRequest();
  }

  /**
   * Render List Page
   * @return {Node}
   */
  render() {
    const {
      classes,
      count,
    } = this.props;

    return (
      <div>
        <div className={classes.root}>JSS demo</div>
        <ul>
          <li><Link to="/detail">Redirect and lazy load detail page</Link></li>
        </ul>
        <div onClick={this.onClick.bind(this)}>
          Click me, to mock async callback:
          {count}
        </div>
      </div>
    );
  }
}

export default List;
