// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Images } from "../../theme";

export default StyleSheet.create({
  labelStyle: {
    fontSize: "1vw",
    lineHeight: "1vw",
    color: Colors.blackish,
    marginTop: "1vw",
    marginBottom: "0.4vw",
    fontWeight: "500",
  },
  inputStyle: {
    borderRadius: "0.45vw",
    border: "solid 0.2vw #efefef",
    backgroundColor: "#ffffff",
    display: "block",
    minHeight: "3.8vw",
    height: "auto",
    outline: "none",
    boxShadow: "none",
    width: "100%",
    outline: "none",
    padding: "1vw",
    fontSize: "0.5vw",
    background: "transparent !important",
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    appearance: "none",
    ":active": {
      borderColor: "rgb(82 60 230 / 70%)",
    },
    ":focus": {
      borderColor: "rgb(82 60 230 / 70%)",
    },
  },
  selectWrapper: {
    position: "relative",

    ":after": {
      position: "absolute",
      fontFamily: '"Font Awesome 5 Pro"',
      border: 0,
      fontWeight: 600,
      verticalAlign: "initial",
      content: '"\\f078"',
      fontSize: "1vw",
      right: "0.8vw",
      top: "1.3vw",
      margin: "auto",
      zIndex: -1,
    },
  },
  selectArrow: {
    position: "absolute",
    top: "30%",
    right: "4%",
    fontSize: "1vw",
  },
});
