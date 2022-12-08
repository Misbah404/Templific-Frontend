// @flow
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const CANCEL = "CANCEL";
const FAILURE = "FAILURE";

function createRequestTypes(base) {
	const res = {};
	[REQUEST, SUCCESS, FAILURE, CANCEL].forEach((type) => {
		res[type] = `${base}_${type}`;
	});
	return res;
}

export const NETWORK_INFO = "NETWORK_INFO";
export const USER_UPLOAD_LOGO = createRequestTypes("GET_VEHICLES");
export const SELECT_BOOKING_VEHICLE = "SELECT_BOOKING_VEHICLE";
export const CHANGE_BOOKING_TAB = "CHANGE_BOOKING_TAB";
export const GET_VEHICLES = createRequestTypes("GET_VEHICLES");
export const AUTH_SIGNUP = createRequestTypes("AUTH_SIGNUP");

export const LAYOUT_ENABLE = "LAYOUT_ENABLE";
export const LAYOUT_DISABLE = "LAYOUT_DISABLE";

export const ADD_FONTS = "ADD_FONTS";
export const SET_USER_FONTS = "SET_USER_FONTS";
export const DELETE_FONTS = "DELETE_FONTS";

export const ADD_IMAGE = "ADD_IMAGE";
export const SET_USER_IMAGE = "SET_USER_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";

export const ADD_ELEMENT = "ADD_ELEMENT";
export const DELETE_ELEMENT = "DELETE_ELEMENT";
export const SET_USER_ELEMENT = "SET_USER_ELEMENT";

export const USER_SIGN_IN = "USER_SIGN_IN";
export const UPDATE_USER = "UPDATE_USER";
export const USER_LOGOUT = "USER_LOGOUT";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const ADD_NEW_CATEGORY = "ADD_NEW_CATEGORY";

export const SET_USER_TEMPLATES = "SET_USER_TEMPLATES";
export const ADD_TEMPLATE = "ADD_TEMPLATE";

export const SAVE_TEMPLATE = "SAVE_TEMPLATE";
export const LOGOUT_MODAL_UPDATE = "LOGOUT_MODAL_UPDATE";
export const DOWNLOAD_TEMPLATE = "DOWNLOAD_TEMPLATE";

export const DELETE_USER_TEMPLATE = "DELETE_USER_TEMPLATE";
export const GET_GROUP_TEMPLATES = "GET_GROUP_TEMPLATES";
export const ADD_GROUP_TEMPLATES = "ADD_GROUP_TEMPLATES";
export const DELETE_GROUP_TEMPLATES = "DELETE_GROUP_TEMPLATES";

export const ADD_DEMO_GROUP_TEMPLATES = "ADD_DEMO_GROUP_TEMPLATES";
export const ADD_TRANSACTION_GROUP_TEMPLATES =
	"ADD_TRANSACTION_GROUP_TEMPLATES";

export const GET_MAIN_CATEGORIES = "GET_MAIN_CATEGORIES";
export const SET_SUB_CATEGORIES = "SET_SUB_CATEGORIES";
