import {StyleSheet} from "aphrodite";
import {Colors} from "../../../../../theme";

export default StyleSheet.create({
  mainElement: {
    height: "1.5vw",
    width: "1.5vw",
    margin: "0vw 0.5vw",
    padding: "0.1vw",
  },
  listElements: {
    height: "0.75vw",
    width: "0.75vw",
    marginRight: "0.5vw",
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
  dropDownItem: {
    outline: "none",
    ":hover": {
      opacity: 1,
    },
    border: "none",
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
    marginTop: "0vw",
    marginLeft: "0vw",
  },

  strokeSliderWrapper: {
    zIndex: "20",
    padding: "1vw",
    position: "relative",
    border: "none",
    borderRadius: "0.5vw",
    backgroundColor: Colors.lightGray,
    left: "0vw",
    // ":hover": {},
  },

  rangeSlider: {
    width: "13vw",
  },
});
