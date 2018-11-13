import { connect } from 'react-redux';
import { async } from './actions';
import Login from './component';

const { fetchUser } = async;

const mapStateToProps = state => state.user;

const mapDispatchToProps = dispatch => ({
  fetchUser: payload => dispatch(fetchUser(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
