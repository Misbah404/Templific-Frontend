import { GET_MAIN_CATEGORIES, SET_SUB_CATEGORIES } from "../actions/ActionTypes";

const initialState = {
	mainCategory: [],
	subCategory: [],
	preDefineTemplates: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_MAIN_CATEGORIES:
			return {
				...state,
				mainCategory: [...action.payload],
			};

		case SET_SUB_CATEGORIES:
			return {
				...state,
				subCategory: [...action?.payload],
			};

		default:
			return state;
	}
};
