// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Images } from "../../theme";

export default StyleSheet.create({
	main: {
		background: Colors.lightPurple2,
		minHeight: "100%",
	},
	templateBox: {
		background: Colors.white,
		borderRadius: "1.5vw",
		width: "68vw",
		margin: "3vw auto",
	},
	buttonWrapper: {
		position: "absolute",
		top: "1vw",
		right: "1vw",
	},
	addCategory: {
		padding: "0vw .9vw",
		width: "12vw",
		background: Colors.shadedPurple,
		color: Colors.themeColor,
	},
	addTemplate: {
		padding: "0vw .7vw",
		width: "10vw",
		background: Colors.white,
		color: Colors.themeColor,
	},
	addTemplateWrap: {
		border: `.1vw solid ${Colors.shadedPurple}`,
		marginRight: ".5vw",
	},
	addIcon: {
		marginRight: ".4vw",
		height: "1vw",
		width: "1vw",
	},
	closePopup: {
		position: "absolute",
		top: "0.5vw",
		right: "0.5vw",
		width: "3vw",
		height: "3vw",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "2vw",
	},
	mainHeading: {
		fontSize: "1.5vw",
		margin: "2vw 0 2vw",
	},
	tempRow: {
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		columnGap: "3vw",
		rowGap: "2vw",
		width: "50vw",
		marginBottom: "3vw",
	},
	tempCol: {
		border: "0.3vw solid #E7DDFC",
		borderRadius: "1.5vw",
		padding: "1.5vw 0",
		cursor: "pointer",
		position: "relative",
		":hover": {
			borderColor: Colors.themeColor,
		},
	},
	templateImg: {
		width: "5.5vw",
		height: "8vw",
		marginBottom: "0.8vw",
		objectFit: "cover",
	},
	templateName: {
		fontSize: "1vw",
		lineHeight: "1vw",
	},

	// Form css
	formRow: {
		paddingTop: "0.5vw",
		paddingBottom: "1.5vw",
		lineHeight: 0,
		":last-child": {
			paddingBottom: "0.5vw",
		},
	},
	formlabel: {
		fontSize: "1vw",
		lineHeight: "1vw",
		// marginRight: "1vw",
		marginBottom: "1vw",
		color: Colors.black,
		fontWeight: 500,
	},
	canvasInput: {
		fontSize: "1vw",
		lineHeight: "1.2vw",
		minHeight: "2.5vw",
		border: "0.2vw solid #efefef",
		padding: "0 0 0 0.5vw",
		borderRadius: "0.3vw",
		width: "100%",
	},
	categoryInput: {
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		borderRight: 0,
	},
	canvasFieldSufix: {
		right: "0.8vw",
		top: 0,
		bottom: 0,
		fontSize: "1vw",
		color: "#dce1e6",
		fontWeight: 500,
	},
	unitLabel: {
		marginLeft: "2vw",
		fontSize: "1vw",
		lineHeight: "1vw",
		":first-child": {
			marginLeft: 0,
		},
	},
	unitRadio: {
		marginRight: "0.5vw",
		height: "1.5vw",
		width: "1.5vw",
	},
	templateField: {
		border: "0.2vw solid #efefef",
	},
	addNewText: {
		fontSize: "1vw",
		lineHeight: "1vw",
		marginTop: "0.8vw",
		alignSelf: "flex-end",
	},
	btnWrap: {
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
	},
	groupfieldBtn: {
		minHeight: 0,
		padding: "0.5vw 1.5vw",
	},
	addNewClose: {
		position: "absolute",
		top: "0.8vw",
		right: "0.4vw",
		fontSize: "1.2vw",
	},
	modalDelete: {
		fontSize: "1vw",
	},

	errors: {
		color: "red",
		fontWeight: "bold",
		fontSize: "1vw",
	},
	cardAction: {
		position: "absolute",
		right: "0.5vw",
		top: "0vw",
		zIndex: 100,
		padding: ".2vw",
	},
	cardActionImage: {
		height: "1.2vw",
		width: "0.8vw",
	},
	uploadImage: {
		border: `.2vw dashed ${Colors.dashedBorder}`,
		borderRadius: "0.3vw",
		padding: "0.3vw",
		marginBottom: "1vw",
		cursor: "pointer",
		fontSize: "1vw",
	},
});
