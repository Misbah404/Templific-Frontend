import { StyleSheet } from "aphrodite";
import { Colors } from "../../../../../theme";

export default StyleSheet.create({
  toolBarDelete: {
    backgroundColor: "rgba(133,74,255,.15)",
  },

  toolbarIcon: {
    height: "1.6vw",
    minWidth: "1.5vw",
    cursor: "pointer",
    boxSizing: "border-box",
    fontSize: "1.6vw  !important",
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
});
