// @flow

import {
  AUTH_SIGNUP,
  UPDATE_USER,
  USER_LOGOUT,
  USER_SIGN_IN,
} from "./ActionTypes";

export function userSignUpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: AUTH_SIGNUP.REQUEST,
  };
}

export function userSignIn(payload) {
  return {
    payload,
    type: USER_SIGN_IN,
  };
}

export function verifyUser(payload) {
  return {
    type: UPDATE_USER,
    payload,
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}
