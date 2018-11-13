import { async } from './actions';

const { fetchUser } = async;
const initState = {
  isLogin: false,
  userMsg: {},
};

const User = (state = initState, action) => {
  switch (action.type) {
    case fetchUser.SUCCESS:
      return {
        ...state,
        isLogin: true,
        userMsg: action.payload.userMsg,
      };
    default:
      return state;
  }
};

export default User;
