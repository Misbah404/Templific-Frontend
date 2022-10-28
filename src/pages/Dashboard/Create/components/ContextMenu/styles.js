import { StyleSheet } from "aphrodite";
import { Colors } from "../../../../../theme";

export default StyleSheet.create({
  main: {
    border: "1px solid " + Colors.lightGray,
    display: "inline-block",
    margin: "5px",
    background: "#fff",
    borderRadius: "0.5vw",
    color: "#222",
    overflow: "hidden",
    minWidth: "12vw",
    position:"absolute",
    zIndex: 9999999999
  },

  menuItem: {
    cursor: "pointer",
    padding: "0.5vw",
    fontSize: "1vw",
    height: "2vw",
  },

  showHover: {
    ":hover": {
      backgroundColor: "#854aff26",
    },
  },

  menuIcon: {
    height: "1.2vw",
    width: "1.2vw",
    marginRight: ".8vw",
  },

  disabled: {
    color: Colors.lightGray,
  },
});
