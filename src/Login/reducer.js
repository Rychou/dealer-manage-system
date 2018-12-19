import { async, LOGOUT, TOGGLE_SHOW_SIGNUP } from './actions';
import { fetchState } from 'utils';

const { login } = async;
const localUserMsg = JSON.parse(localStorage.getItem('userMsg'));
const role = localUserMsg ? localUserMsg.roles[0] : null;
const initState = {
  isLogin: !!localUserMsg,
  userMsg: localUserMsg || {},
  accessToken: JSON.parse(localStorage.getItem('accessToken')),
  type: (() => {
    if (!role) {
      return null;
    }
    return role === 'ROLE_CLIENT' ? 'dealer' : 'company';
  })(),
  loginFetchState: fetchState,
  signUpFetchState: fetchState,
  showSignUp: false,
};

const User = (state = initState, action) => {
  switch (action.type) {
    case login.TYPE:
      return {
        ...state,
        loginFetchState: {
          isFetching: true,
          isResolved: false,
          isRejected: false,
        },
      };
    case login.SUCCESS:
      return {
        ...state,
        ...action.payload,
        type: action.payload.userMsg.roles[0] === 'ROLE_CLIENT' ? 'dealer' : 'company',
        isLogin: true,
        loginFetchState: {
          isFetching: false,
          isResolved: true,
        },
      };
    case login.FAILURE:
      return {
        ...state,
        loginFetchState: {
          isFetching: false,
          isRejected: true,
        },
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        userMsg: {},
      };
    case TOGGLE_SHOW_SIGNUP:
      return {
        ...state,
        showSignUp: !state.showSignUp,
      };
    default:
      return state;
  }
};

export default User;
