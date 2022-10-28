import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  colorWrapper: {
    // border: "0.2vw solid #7ee4f9",
    padding: ".1vw",
    height: "3.5vw",
    width: "3.5vw",
    borderRadius: "0.5vw",
    // marginRight: "0.9vw",
    marginTop: "1vw",
    ":hover": {
      cursor: "pointer"
    }
    // backgroundColor: "transparent",
  },

  colorWrapperShadow: {
    boxShadow: "inset 0px 0px 0px .2vw #7ee4f9, inset 0px 0px 0px .4vw white",
  },
});
