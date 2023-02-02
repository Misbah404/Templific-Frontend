import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
	main: {
		position: "fixed",
		minHeight: "calc(100vh - 13vw)",
		maxHeight: "calc(100vh - 13vw)",
		width: "20vw",
		top: "9.2vw",
		overflow: "hidden",
		boxShadow: "1.2vw -.5vw 1.2vw -1.52vw rgb(0 0 0 / 14%)",
		border: " 0.1vw solid #e2e8f0",
		borderRadius: "0 1.2vw 1.2vw 0",
		background: "#fff",
		zIndex: 11,
	},
});
