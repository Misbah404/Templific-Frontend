// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Images } from "../../../theme";

export default StyleSheet.create({
  topBar: {
    padding: "1.3vw 1vw",
    position: "fixed",
    height: "5vw",
    width: "94vw",
    background: "#fff",
    zIndex: 1,
    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
  },
  main: {
    background: Colors.lightPurple2,
    minHeight: "calc(100% - 4.2vw)",
    marginTop: "5vw",
    // minWidth: "100vw",
    minWidth: "100% !important",
    width: "max-content",
  },
  canvasMainTag: {
    paddingTop: "1vw",
  },
  actionIcon: {
    fontSize: "1.5vw",
    lineHeight: "1.5vw",
    color: "#b5aecf",
    marginLeft: "0.5vw",
    marginBottom: "0.5vw",
    zIndex: 0,
  },
  canvas1: {
    height: "35vw",
    width: "28vw",
  },
  canvasTitle: {
    fontSize: "1.2vw",
    marginLeft: "0.5vw",
    fontWeight: "bold",
  },
  canvas: {
    background: Colors.white,
    border: "0.2vw solid #ece9e9",
  },
  backSideBtnWrap: {
    margin: "1.5vw 0",
  },
  backSideBtn: {
    background: Colors.lightbrown,
    color: Colors.lightbrown2,
    fontSize: "1.2vw",
  },

  zoomControl: {
    position: "fixed",
    width: "7vw",
    justifyContent: "space-around",
    display: "flex",
    // flexDirection: "row-reverse",
    backgroundColor: "#ebe7e7",
    opacity: 0.94,
    borderRadius: "12px",
    left: 0,
    zIndex: 1000,
    bottom: 0,
    marginLeft: "8vw",
    marginBottom: "1vh",
    padding: ".6vw .25vw",
  },
  zoomControlItem: {
    color: "#b5aecf",
    cursor: "pointer",
    fontSize: "1.3vw",
    backgroundColor: "transparent",
    border: "none",
  },
  modalDelete: {
    fontSize: "1vw",
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
  },

  toolbarIcon: {
    // padding: "0.4vw",
    height: "1.6vw",
    width: "1.6vw",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  toolBarDelete: {
    backgroundColor: "rgba(133,74,255,.15)",
  },

  errorMessage: {
    color: "red",
  },

  canvasInput: {
    fontSize: "1vw",
    lineHeight: "1.2vw",
    minHeight: "2.5vw",
    border: "0.2vw solid #efefef",
    padding: "0 0 0 0.5vw",
    borderRadius: "0.3vw",
  },

  formInput: {
    minHeight: "2vw",
    padding: ".7vw",
    marginBottom: "1vw",
    borderRadius: "0.45vw",
    fontSize: "1.3vw",
    fontWeight: 500,
    border: ".2vw solid " + Colors.lightGray,
    textAlign: "center",
    ":focus": {
      border: ".2vw solid " + Colors.themeColor,
    },
    ":hover": {
      border: ".2vw solid " + Colors.themeColor,
    },
  },
  submitBtn: {
    marginTop: ".5vw",
  },

  unitRadio: {
    marginRight: "0.5vw",
    height: "1.5vw",
    width: "1.5vw",
    ":checked": {
      ":after": {
        backgroundColor: Colors.themeColor,
      },
    },
  },

  templateName: {
    fontSize: "1.5vw",
    fontWeight: "bold",
    marginTop: ".5vw",
  },

  spinner: {
    color: Colors.themeColor,
    fontSize: "1vw",
    height: "2.5vw",
    width: "2.5vw",
  },

  errors: {
    color: "red",
    fontWeight: "bold",
    fontSize: "1vw",
    marginTop: "0.7vw",
  },

  editIcon: {
    height: "1.2vw",
    width: "1.2vw",
    marginLeft: ".5vw",
    cursor: "pointer",
  },
});
