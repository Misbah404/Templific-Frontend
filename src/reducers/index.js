import { combineReducers } from "redux";

import general from "./general";
import user from "./user";
import layout from "./layout";
import canvasData from "./canvasData";
import category from "./category";

export default combineReducers({
	general,
	user,
	layout,
	canvasData,
	category,
});
