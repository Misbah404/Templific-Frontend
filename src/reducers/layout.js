import {
  LAYOUT_DISABLE,
  LAYOUT_ENABLE,
  LOGOUT_MODAL_UPDATE,
  USER_LOGOUT,
} from "../actions/ActionTypes";

const initialState = {
  sideBar: false,
  sideBarElement: "",
  showLogoutModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LAYOUT_ENABLE:
      return {
        ...state,
        sideBar: true,
        sideBarElement: action.payload.sideBarElement,
      };

    case LAYOUT_DISABLE:
      return {
        ...state,
        sideBar: false,
        sideBarElement: "",
      };

    case LOGOUT_MODAL_UPDATE:
      return {
        ...state,
        logoutModal: action.payload.data,
      };

    case USER_LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
