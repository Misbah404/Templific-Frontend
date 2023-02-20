// @flow
import { StyleSheet } from "aphrodite";
import { Colors } from "../../theme";

export default StyleSheet.create({
	backBtn: {
		background: Colors.lightPurple2,
		color: Colors.themeColor,
	},
	menuLi: {
		minHeight: "100%",
		width: "6vw",
		marginRight: "1vw",
		fontSize: "1vw",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	backIcon: {
		fontSize: "0.8vw",
		marginRight: "0.3vw",
	},
	header: {
		display: "grid",
		gridTemplateColumns: "15vw auto 24vw",
		boxShadow: "0 0 0.2vw 0 rgba(0, 0, 0, 0.5)",
		position: "relative",
		zIndex: 13,
	},
	menuItem: {
		fontSize: "1vw",
		color: Colors.darkGrey,
	},
	AuthTitle: {
		fontSize: "2.5vw",
		textTransform: "capitalize",
		color: Colors.themeColor,
		margin: "1vw",
	},
	logoLink: {
		color: Colors.themeColor,
	},
	rightArea: {
		// paddingRight: "1.5vw",
		// paddingLeft: "4vw",
		minWidth: "20vw",
	},
	templateBtn: {
		background: Colors.lightPurple,
		color: Colors.themeColor,
		padding: "0.8vw 1.2vw",
		fontSize: "1vw",
		// marginRight: ".75vw"
	},
	plusBtn: {
		color: Colors.themeColor,
		marginRight: "0.5vw",
	},
	profileActions: {
		color: Colors.black,
	},
	profileNick: {
		background: "#febd06",
		fontSize: "1.5vw",
		lineHeight: "1.6vw",
		color: Colors.white,
		height: "2.5vw",
		width: "2.5vw",
		borderRadius: "100%",
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
		fontWeight: 700,
		marginRight: "0.5vw",
		textTransform: "uppercase",
	},
	dropDown: {
		fontSize: "1vw",
		fontWeight: 400,
	},
	shareBtn: {
		padding: "0.7vw 0.9vw",
		lineHeight: 0,
		background: Colors.lightPurple,
		color: Colors.themeColor,
	},
	shareIcon: {
		fontSize: "1.8vw",
	},
	// Section css
	section: {
		display: "grid",
		// gridTemplateRows: 'calc(100vh - 5.6vw)',
		gridTemplateRows: "auto",
		height: "calc(100vh - 5vw)",
		overflow: "hidden",
	},
	innerMain: {
		// minHeight: 'calc(100vh - 5vw)',
		minWidth: "94vw",
	},
	// SidePanel
	sidePanel: {
		background: Colors.lightPurple2,
		boxShadow: "0 0.1vw 0.18vw 0 rgba(0, 0, 0, 0.5)",
		zIndex: 13,
		marginTop: "0.1vw",
		width: "6vw",
		position: "relative",
		// height: 'calc(100vh - 5vw)'
	},
	darkSidePanel: {
		backgroundImage: "linear-gradient(to bottom, #854aff -40%, #523de6 107%)",
	},
	sideMenuItem: {
		marginBottom: "0.2vw",
	},
	lastItem: {
		marginBottom: "0",
	},
	menuImage: {
		maxWidth: "2vw",
		marginBottom: "0.2vw",
	},
	activeMenuImage: {
		fill: Colors.white,
		" path": {
			fill: Colors.white,
		},
	},
	menuName: {
		fontSize: "0.8vw",
		textTransform: "capitalize",

		fontWeight: 500,
	},
	menuLink: {
		textAlign: "center",
		padding: "0.8vw",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		":hover": {
			background: Colors.themeColor,
		},
	},
	activelink: {
		background: Colors.themeColor,
	},

	modalText: {
		fontSize: "1vw",
	},

	editCategoryButton: {
		border: "0.1vw solid #F0EDFF",
		color: "#593FE9",
		background: "transparent",
		marginRight: ".2vw",
		padding: "0.8vw 1.2vw",
		fontSize: "1vw",
	},
});
