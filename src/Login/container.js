import { connect } from 'react-redux';
import { async, TOGGLE_SHOW_SIGNUP } from './actions';
import Login from './component';

const { fetchUser, login } = async;

const mapStateToProps = state => state.user;

const mapDispatchToProps = dispatch => ({
  fetchUser: payload => dispatch(fetchUser(payload)),
  login: payload => dispatch(login(payload)),
  toggleShowSignUp: payload => dispatch({ type: TOGGLE_SHOW_SIGNUP, payload }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
