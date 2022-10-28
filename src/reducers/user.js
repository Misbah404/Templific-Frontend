import { UPDATE_USER, USER_LOGOUT, USER_SIGN_IN } from "../actions/ActionTypes";

const initialState = {
  userAuthenticated: false,
  email: "",
  username: "",
  accessToken: "",
  verified: false,
  confirmed: false,
  id: null,
  etsyConnected: false,
  etsy_refreshToken: "",
  customerId: "",
  subscribed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN:
      return {
        ...state,
        ...action.payload.user,
        accessToken: action.payload.jwt,
      };

    case UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };

    case USER_LOGOUT:
      return {
        userAuthenticated: false,
        email: "",
        username: "",
        accessToken: "",
        verified: false,
        confirmed: false,
        id: null,
      };

    default:
      return state;
  }
};
