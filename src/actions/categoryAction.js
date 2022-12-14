import {
	GET_MAIN_CATEGORIES,
	SET_PREDEFINE_TEMPLATES,
	SET_SUB_CATEGORIES,
} from "./ActionTypes";

export const getMainCategories = (payload) => ({
	type: GET_MAIN_CATEGORIES,
	payload,
});

export const setSubCategory = (payload) => ({
	type: SET_SUB_CATEGORIES,
	payload,
});

export const setPredefineTemplates = (payload) => ({
	type: SET_PREDEFINE_TEMPLATES,
	payload,
});
