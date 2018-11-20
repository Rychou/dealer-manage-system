import { async, LOGOUT } from './actions';

const { fetchUser } = async;
const localUserMsg = JSON.parse(localStorage.getItem('user'));
const initState = {
  isLogin: !!localUserMsg,
  type: localUserMsg ? localUserMsg.type : null,
  userMsg: localUserMsg ? localUserMsg.userMsg : {},
};

const User = (state = initState, action) => {
  switch (action.type) {
    case fetchUser.SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        type: null,
        userMsg: {},
      };
    default:
      return state;
  }
};

export default User;
