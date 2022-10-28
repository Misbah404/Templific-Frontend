// @flow

import {
  LAYOUT_DISABLE,
  LAYOUT_ENABLE,
  LOGOUT_MODAL_UPDATE,
} from "./ActionTypes";

export function enableSideBar(payload) {
  return {
    payload,
    type: LAYOUT_ENABLE,
  };
}

export function disableSideBar(payload) {
  return {
    payload,
    type: LAYOUT_DISABLE,
  };
}

export function logoutModal(payload) {
  return {
    type: LOGOUT_MODAL_UPDATE,
    payload,
  };
}
