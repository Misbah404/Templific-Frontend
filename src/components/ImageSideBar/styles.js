// @flow
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

  colorPickerRow: {
    marginTop: "1.2vw",
  },

  uploadText: {
    fontSize: "1.2vw",
    fontWeight: "bold",
    marginLeft: ".5vw",
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

  colorWrapper: {
    padding: ".15vw",
    height: "3.5vw",
    width: "3.5vw",
    borderRadius: "0.5vw",
    marginLeft: "0.9vw",
  },

  colorWrapperShadow: {
    boxShadow: `inset 0px 0px 0px .2vw ${Colors.greenishBlue}, inset 0px 0px 0px .5vw white`,
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

  listItemWrapper: {
    padding: "0.5vw 0vw",
    borderBottom: `0.1vw solid ${Colors.lightGray}`,
    "last-child": {
      borderBottom: "0",
    },
  },

  listIcon: {
    height: "1.2vw",
    width: "1.2vw",
    cursor: "pointer",
  },

  imageBox: {
    width: "7.5vw",
    margin: "0.25vw",
    marginTop: "0.5vw",
    position: "relative",
    // border: `0.2vw solid ${Colors.lightGray}`,
    padding: 0,
  },

  imageBoxImage: {
    width: "7.3vw",
    height: "8vw",
    cursor: "pointer",
    border: `0.1vw solid ${Colors.lightGray}`,
  },

  imageDeleteWrapper: {
    width: "100%",
    padding: "0.2vw",
  },

  imageDeleteIcon: {
    height: "1.2vw",
    width: "1.2vw",
    cursor: "pointer",
  },

  imageName: {
    fontSize: "0.8vw",
    marginTop: ".5vw",
    // alignSelf: "start",
  },

  errors: {
    color: "red",
    fontWeight: "bold",
    fontSize: "1vw",
  },
});
