// @flow
import { StyleSheet } from "aphrodite";
import { Colors } from "../../theme";

export default StyleSheet.create({
  main: {
    padding: "2vw 1vw",
    // overflow: "scroll",
    // maxHeight: "50vh"
    maxHeight: "calc(100vh - 13vw)",
  },

  popover: {
    position: "absolute",
    zIndex: "2",
  },

  cover: {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
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

  colorPickerRow: {
    marginTop: "1.2vw",
  },

  subHeading: {
    fontSize: "1.2vw",
    fontWeight: "600",
    marginTop: "2vw",
    marginBottom: "1vw",
    color: Colors.placeHolderColor,
  },

  searchIcon: {
    height: "1.6vw",
    width: "1.6vw",
    left: ".5vw",
  },

  addIcon: {
    height: "3.5vw",
    width: "3.5vw",
    margin: 0,
    // align: "center",
  },

  addIconWrapper: {
    padding: ".15vw",
    borderRadius: "0.5vw",
    backgroundColor: "transparent",
    margin: 0,
  },
});
