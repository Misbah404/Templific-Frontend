import { StyleSheet } from "aphrodite";
import { Colors } from "../../../../../theme";

export default StyleSheet.create({
  main: {
    width: "65vw",
  },

  popover: {
    position: "absolute",
    zIndex: "2",
    marginTop: "3vw",
    marginLeft: "15vw !important",
    // alignSelf: "end",
  },

  shadowPopover: {
    position: "absolute",
    zIndex: "2",
    marginTop: "3vw",
    marginLeft: "62vw !important",
    // alignSelf: "end",
  },

  cover: {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  },

  rangePopOver: {
    position: "absolute",
    // zIndex: "500",
    marginTop: "3vw",
    marginLeft: "41vw",
  },

  range2PopOver: {
    position: "absolute",
    // zIndex: "500",
    marginTop: "3vw",
    marginLeft: "46vw",
  },

  glyphPopOver: {
    position: "absolute",
    marginTop: "3vw",
    marginLeft: "39vw",
  },

  glyphWrapper: {
    backgroundColor: Colors.white,
    zIndex: "20",
    padding: "1vw",
    position: "relative",
    border: `0.1vw solid ${Colors.lightGray}`,
    borderRadius: "0.5vw",
    backgroundColor: Colors.white,
    boxShadow: `0.1vw 0.5vw 0.9vw 0.1vw ${Colors.lightGray}`,
    width: "26vw",
    maxHeight: "14vw",
    overflowY: "scroll",
  },

  glyphText: {
    padding: "0.2vw 0.75vw",
    margin: "0.2vw",
    boxSizing: "border-box",
    border: "0.1vw solid #fff",
    fontSize: "1vw",
    ":hover": {
      border: `0.1vw solid ${Colors.lightGray}`,
      borderRadius: "0.5vw",
      cursor: "pointer",
    },
  },

  positionPopOver: {
    marginLeft: "58vw",
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

  strokeSliderWrapper: {
    zIndex: "20",
    padding: "1vw",
    position: "relative",
    border: "none",
    borderRadius: "0.5vw",
    backgroundColor: Colors.lightGray,
    left: "14vw",
    // ":hover": {},
  },

  rangeSlider: {
    width: "8vw",
  },

  toolbarIconBtn: {
    // padding: "0.4vw",
    height: "2.5vw",
    minWidth: "2.5vw",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "0.5vw",
    fontSize: "1.6vw !important",
    marginRight: "0.5vw",
    ":hover": {
      backgroundColor: Colors.lightGray,
    },
    ":nth-last-child(-1)": {
      marginRight: "0",
    },
    alignSelf: "center",
    outline: "none",
  },

  hideDropDownIcon: {
    "::after": {
      display: "none",
    },
  },

  dropDownText: {
    fontSize: "1.2vw",
    fontWeight: "bold",
    alignSelf: "center",
  },

  toolBarDropDown: {
    fontSize: "1vw !important",
    height: "2.5vw",
    minWidth: "2.5vw",
    padding: "0.9vw !important",
    marginRight: "0.5vw",
    ":hover": {
      backgroundColor: Colors.lightGray,
    },
  },

  toolBarMenu: {
    width: "5vw",
    maxHeight: "15vw",
    overflow: "auto",
  },

  fontFamilyDropDown: {
    maxHeight: "20vw",
    minWidth: "5vw",
    width: "auto",
    overflowY: "auto",
  },

  toolBarDelete: {
    backgroundColor: "rgba(133,74,255,.15)",
  },

  toolbarIcon: {
    height: "1.6vw",
    minWidth: "1.6vw",
    cursor: "pointer",
    boxSizing: "border-box",
    fontSize: "1.6vw  !important",
  },

  positionIcons: {
    height: "1.4vw",
    width: "1.4vw",
    marginRight: "0.4vw",
  },

  colorBtn: {
    padding: "0vw",
    borderBottom: "2px solid black",
  },

  positionWrapper: {
    zIndex: "20",
    padding: "1vw",
    position: "relative",
    border: `0.1vw solid ${Colors.lightGray}`,
    borderRadius: "0.5vw",
    backgroundColor: Colors.white,
    boxShadow: `0.1vw 0.5vw 0.9vw 0.1vw ${Colors.lightGray}`,
    width: "26vw",
  },

  positionItem: {
    width: "11vw",
    padding: ".5vw",
    borderRadius: "0.5vw",
    fontSize: "1.1vw",
    cursor: "pointer",
    textTransform: "capitalize",
    ":hover": {
      backgroundColor: Colors.lightGray,
    },
  },

  subHeading: {
    color: "#cccccc",
    padding: ".5vw",
    fontSize: "1vw",
    textTransform: "capitalize",
  },

  dropdownSearchWrapper: {
    padding: "0.1vw 0.4vw !important",
  },

  searchIcon: {
    height: "1.2vw",
    width: "1.2vw",
    left: ".5vw",
    // bottom: "0.75vw",
  },
  formInput: {
    minHeight: "1.5vw",
    padding: "0.75vw 1vw",
    // marginBottom: "1vw",
    borderRadius: "0.25vw",
    fontSize: "1.2vw",
    fontWeight: 500,
    border: `0.1vw solid ${Colors.lightGray}`,
    paddingLeft: "2.5vw",
    maxWidth: "18vw",
    fontSize: "1vw !important",
    fontWeight: "400",
  },

  glyphTitle: {
    fontSize: "1vw",
    marginBottom: "0.5vw",
    fontWeight: "bold",
  },
});
