import { StyleSheet } from "aphrodite";
import { Colors } from "../../../../../theme";

export default StyleSheet.create({
	topBar: {
		padding: "1.3vw 1vw",
		position: "fixed",
		height: "5vw",
		width: "94vw",
		background: "#fff",
		zIndex: 12,
		borderBottom: "0.1vw solid rgba(0, 0, 0, 0.2)",
	},
	elementIcon: {
		height: "1.5vw",
		width: "1.5vw",
		margin: "0vw 0.5vw",
	},

	toolbarIconBtn: {
		// padding: "0.4vw",
		height: "2.5vw",
		width: "2.5vw",
		backgroundColor: "transparent",
		border: "none",
		borderRadius: "0.5vw",
		":hover": {
			backgroundColor: Colors.lightGray,
		},
		marginRight: "0.5vw",
		":nth-last-child(-1)": {
			marginRight: "0",
		},
		fontSize: "1.6vw !important",
	},

	toolbarIcon: {
		// padding: "0.4vw",
		height: "1.6vw",
		width: "1.6vw",
		cursor: "pointer",
		boxSizing: "border-box",
		fontSize: "1.6vw  !important",
	},

	toolBarDelete: {
		backgroundColor: "rgba(133,74,255,.15)",
	},

	popover: {
		position: "absolute",
		zIndex: "2",
		marginTop: "3vw",
		marginLeft: "-2vw !important",
		// alignSelf: "end",
	},

	cover: {
		position: "fixed",
		top: "0px",
		right: "0px",
		bottom: "0px",
		left: "0px",
	},

	rangeSlider: {
		width: "8vw",
		cursor: "pointer",
	},

	rangePopOver: {
		position: "absolute",
		// zIndex: "500",
		marginTop: "3vw",
		marginLeft: "5vw",
	},

	rangeSliderWrapper: {
		zIndex: "20",
		padding: "1vw",
		position: "relative",
		border: "none",
		borderRadius: "0.5vw",
		backgroundColor: Colors.lightGray,
		// ":hover": {},
	},
});
