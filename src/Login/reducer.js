import { async } from './actions';

const { fetchUser } = async;
const initState = {
  isLogin: false,
  type: null,
  userMsg: {},
};

const User = (state = initState, action) => {
  switch (action.type) {
    case fetchUser.SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLogin: true,
      };
    default:
      return state;
  }
};

export default User;
