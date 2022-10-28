// @flow
import { StyleSheet } from "aphrodite";
import { Colors } from "../../theme";

export default StyleSheet.create({
  addIcon: {
    height: "3.5vw",
    width: "3.5vw",
    margin: 0,
  },

  modalMain: {
    padding: "1vw",
    border: `0.2vw dashed ${Colors.lightGray}`,
    borderRadius: "0.5vw",
  },

  modalText: {
    fontSize: "1vw",
    fontWeight: "bold",
  },

  filePicker: {
    color: Colors.themeColor,
    cursor: "pointer",
  },

  fontWrapper: {
    marginBottom: "0.5vw",
  },

  fontText: {
    fontSize: "1vw",
    fontWeight: "500",
  },

  subHeading: {
    fontSize: "1.2vw",
    fontWeight: "600",
    marginTop: "2vw",
    marginBottom: "1vw",
    color: Colors.placeHolderColor,
  },

  errors: {
    color: "red",
    fontWeight: "bold",
    fontSize: "1vw",
  },
});
