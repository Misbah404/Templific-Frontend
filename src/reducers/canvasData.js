import {
	ADD_FONTS,
	DELETE_FONTS,
	ADD_IMAGE,
	DELETE_IMAGE,
	ADD_ELEMENT,
	DELETE_ELEMENT,
	SET_CATEGORIES,
	ADD_NEW_CATEGORY,
	SET_USER_IMAGE,
	SET_USER_FONTS,
	SET_USER_ELEMENT,
	SAVE_TEMPLATE,
	USER_LOGOUT,
	SET_USER_TEMPLATES,
	ADD_TEMPLATE,
	DOWNLOAD_TEMPLATE,
	DELETE_USER_TEMPLATE,
	GET_GROUP_TEMPLATES,
	ADD_GROUP_TEMPLATES,
	DELETE_GROUP_TEMPLATES,
	ADD_DEMO_GROUP_TEMPLATES,
	ADD_TRANSACTION_GROUP_TEMPLATES,
  TRIGGER_EDIT_CATEGORY,
} from "../actions/ActionTypes";

const initialState = {
	defaultFonts: {
		Arial: "Arial",
		AmaticSC: "AmaticSC",
		CaveatBrush: "CaveatBrush",
		FredokaOne: "FredokaOne",
		Lora: "Lora",
		Parisienne: "Parisienne",
		PetitFormalScript: "PetitFormalScript",
		Sacramento: "Sacramento",
		ShadowsIntoLightTwo: "ShadowsIntoLightTwo",
	},
	categories: {},
	fonts: {},
	images: {},
	elements: {},
	triggerSaveTemplate: false,
	triggerDownloadTemplate: false,
	triggerCategoryEditModal: false,
	templates: {},
	groupTemplates: {},
	demoGroupTemplates: {},
	transactionGroupTemplates: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_FONTS:
			return {
				...state,
				fonts: { ...state.fonts, ...action.payload.fonts },
			};

		case SET_USER_FONTS:
			return {
				...state,
				fonts: action.payload,
			};

		case DELETE_FONTS:
			const allFonts = state.fonts;
			allFonts[action.payload.fontFamily] = {
				...allFonts[action.payload.fontFamily],
				isDeleted: true,
			};
			return {
				...state,
				fonts: { ...allFonts },
			};

		case ADD_IMAGE:
			return {
				...state,
				images: { ...state.images, ...action.payload.images },
			};

		case SET_USER_IMAGE:
			return {
				...state,
				images: action.payload,
			};

		case DELETE_IMAGE:
			const allImages = { ...state.images };
			allImages[action.payload.imgKey] = {
				...allImages[action.payload.imgKey],
				isDeleted: true,
			};
			return {
				...state,
				images: { ...allImages },
			};

		case ADD_ELEMENT:
			return {
				...state,
				elements: { ...state.elements, ...action.payload.elements },
			};

		case SET_USER_ELEMENT:
			return {
				...state,
				elements: { ...action.payload },
			};

		case DELETE_ELEMENT:
			const allElements = state.elements;
			allElements[action.payload.elementKey] = {
				...allElements[action.payload.elementKey],
				isDeleted: true,
			};

			return {
				...state,
				elements: allElements,
			};

		case SET_CATEGORIES:
			return {
				...state,
				categories: {
					...action.payload,
				},
			};

		case ADD_NEW_CATEGORY:
			return {
				...state,
				categories: {
					...state.categories,
					...action.payload,
				},
			};

		case SAVE_TEMPLATE:
			return {
				...state,
				triggerSaveTemplate: action.payload,
			};

		case DELETE_USER_TEMPLATE:
			const templates = { ...state.templates };
			delete templates[action.payload.key];
			return {
				...state,
				templates: { ...templates },
			};

		case DOWNLOAD_TEMPLATE:
			return {
				...state,
				triggerDownloadTemplate: action.payload,
			};

		case USER_LOGOUT:
			return {
				...initialState,
			};

		case SET_USER_TEMPLATES:
			return {
				...state,
				templates: action.payload,
			};

		case ADD_TEMPLATE:
			const allTemplates = { ...state.templates };
			const allTemplatesKey = Object.keys(state.templates);
			const temp = allTemplatesKey.findIndex(
				(key) => allTemplates[key]?.id == action?.payload?.id
			);

			if (temp != -1) {
				delete allTemplates[allTemplatesKey[temp]];
			}

			return {
				...state,
				templates: {
					...allTemplates,
					[`${action?.payload?.name}_${action?.payload?.id}`]: {
						...action.payload,
					},
				},
			};

		case GET_GROUP_TEMPLATES:
			return {
				...state,
				groupTemplates: {
					...action.payload,
				},
			};

		case ADD_GROUP_TEMPLATES:
			return {
				...state,
				groupTemplates: {
					...state.groupTemplates,
					...action.payload,
				},
			};

		case DELETE_GROUP_TEMPLATES:
			const allGroupTemplates = { ...state.groupTemplates };
			if (allGroupTemplates[action.payload.name]) {
				delete allGroupTemplates[action.payload.name];
			}

			return {
				...state,
				groupTemplates: { ...allGroupTemplates },
			};

		case ADD_DEMO_GROUP_TEMPLATES:
			return {
				...state,
				demoGroupTemplates: {
					...action.payload,
				},
			};

		case ADD_TRANSACTION_GROUP_TEMPLATES:
			return {
				...state,
				transactionGroupTemplates: {
					...action.payload,
				},
			};

		case TRIGGER_EDIT_CATEGORY: {
			return {
				...state,
				triggerCategoryEditModal: !!!state?.triggerCategoryEditModal,
			};
		}
		default:
			return state;
	}
};
