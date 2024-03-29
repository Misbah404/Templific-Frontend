import { StyleSheet } from "aphrodite";
import { Colors } from "../../theme";

export default StyleSheet.create({
	main: {
		padding: "2vw 1vw",
		height: "calc(100vh - 13vw)",
		overflowY: "scroll",
	},

	formInput: {
		minHeight: "1.5vw",
		padding: "0.75vw 1vw",
		marginBottom: "1vw",
		borderRadius: "0.25vw",
		fontSize: "1.2vw",
		fontWeight: 500,
		border: `0.1vw solid ${Colors.lightGray}`,
		paddingLeft: "2.5vw",
		maxWidth: "18vw",
		fontSize: "1vw !important",
		fontWeight: "400",
	},

	searchIcon: {
		height: "1.6vw",
		width: "1.6vw",
		left: ".5vw",
	},

	canvasInput: {
		fontSize: "1vw",
		lineHeight: "1.2vw",
		minHeight: "2.5vw",
		border: `0.1vw solid ${Colors.lightGray}`,
		padding: "0 0 0 0.5vw",
		borderRadius: "0.3vw",
	},

	templateWrapper: {
		width: "100%",
		border: `0.3vw solid ${'#E9E7E7'}`,
		borderRadius: "1.5vw",
		position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center",
        cursor: "pointer",
        ":hover": {
            border: `0.3vw solid ${Colors.themeColor}`
        }

	},

	image: {
		height: "8vw",
		width: "5.5vw",
	
		objectFit: "cover",
        margin: "1vw"
	},

	nameWrapper: {
		padding: "0.5vw",
		fontSize: "1vw",
	},

	iconWrapper: {
		padding: "0.5vw",
	},
	editIcon: {
		height: "1vw",
		width: "1vw",
		cursor: "pointer",
	},

	templateIcon: {
		height: "1.5vw",
		width: "1.5vw",
		cursor: "pointer",
	},

	templateIconOnRight: {
		marginLeft: "1vw",
	},

	modalDelete: {
		fontSize: "1vw",
	},

	button: {
		background: "none",
		border: "none",
	},
	checkbox: {
		height: "1.5vw",
		width: "1.5vw",
		marginRight: "1vw",
		position: "absolute",
		right: "0",
		top: ".5vw",
		border: "1px solid black",
		// borderRadius: 150
	},
	createGroupBtn: {
		marginTop: "1vw",
		width: "100%",
		borderRadius: ".5vw",
		cursor: "pointer",
	},
	heading: {
		fontSize: "1.5vw",
		fontWeight: "bold",
        marginBottom: "1vw"
	},
});
