import {
  ADD_FONTS,
  ADD_IMAGE,
  DELETE_FONTS,
  DELETE_IMAGE,
  ADD_ELEMENT,
  DELETE_ELEMENT,
  SET_CATEGORIES,
  ADD_NEW_CATEGORY,
  SET_USER_IMAGE,
  SET_USER_FONTS,
  SET_USER_ELEMENT,
  SAVE_TEMPLATE,
  SET_USER_TEMPLATES,
  ADD_TEMPLATE,
  DOWNLOAD_TEMPLATE,
  DELETE_USER_TEMPLATE,
  GET_GROUP_TEMPLATES,
  ADD_GROUP_TEMPLATES,
  DELETE_GROUP_TEMPLATES,
  ADD_DEMO_GROUP_TEMPLATES,
  ADD_TRANSACTION_GROUP_TEMPLATES,
} from "./ActionTypes";

export const addFonts = (payload) => {
  return {
    type: ADD_FONTS,
    payload,
  };
};

export const deleteFont = (payload) => ({
  type: DELETE_FONTS,
  payload,
});

export const setUserFonts = (payload) => ({
  type: SET_USER_FONTS,
  payload,
});

export const addImageBlob = (payload) => ({
  type: ADD_IMAGE,
  payload,
});

export const setUserImages = (payload) => ({
  type: SET_USER_IMAGE,
  payload,
});

export const deleteImageBlob = (payload) => ({
  type: DELETE_IMAGE,
  payload,
});

export const addElementBlob = (payload) => ({
  type: ADD_ELEMENT,
  payload,
});

export const deleteElementBlob = (payload) => ({
  type: DELETE_ELEMENT,
  payload,
});

export const setUserElements = (payload) => ({
  type: SET_USER_ELEMENT,
  payload,
});

export const setUserCategories = (payload) => ({
  type: SET_CATEGORIES,
  payload,
});

export const userNewCategory = (payload) => ({
  type: ADD_NEW_CATEGORY,
  payload,
});

export const saveTemplateAction = (payload) => ({
  type: SAVE_TEMPLATE,
  payload,
});

export const setUserTemplates = (payload) => ({
  type: SET_USER_TEMPLATES,
  payload,
});

export const addUserTemplate = (payload) => ({
  type: ADD_TEMPLATE,
  payload,
});

export const deleteUserTemplateAction = (payload) => ({
  type: DELETE_USER_TEMPLATE,
  payload,
});

export const downloadTemplateAction = (payload) => ({
  type: DOWNLOAD_TEMPLATE,
  payload,
});

export const setGroupTemplates = (payload) => ({
  type: GET_GROUP_TEMPLATES,
  payload,
});

export const addGroupTemplates = (payload) => ({
  type: ADD_GROUP_TEMPLATES,
  payload,
});

export const deleteGroup = (payload) => ({
  type: DELETE_GROUP_TEMPLATES,
  payload,
});

export const setDemoGroupTemplates = (payload) => ({
  type: ADD_DEMO_GROUP_TEMPLATES,
  payload,
});

export const setTransactionGroupTemplates = (payload) => ({
  type: ADD_TRANSACTION_GROUP_TEMPLATES,
  payload,
});
