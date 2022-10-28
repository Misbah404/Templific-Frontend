// @flow
import { StyleSheet } from "aphrodite";
import { Colors } from "../../theme";

export default StyleSheet.create({
  container: {},
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
    border: "solid 0.2vw transparent",
    backgroundColor: "#ffffff",
    display: "block",
    minHeight: "3.8vw",
    // marginTop: 6,
    width: "100%",
    outline: "none",
    padding: "1vw",
    fontSize: "14px",
    ":active": {
      borderColor: "rgb(82 60 230 / 70%)",
    },
    ":focus": {
      borderColor: "rgb(82 60 230 / 70%)",
    },
    ":focus-within": {
      borderColor: "rgb(82 60 230 / 70%)",
    },
    "::-webkit-input-placeholder": {
      /* Edge */ color: Colors.placeHolderColor,
    },
    ":-ms-input-placeholder": {
      /* Internet Explorer 10-11 */ color: Colors.placeHolderColor,
    },
    "::placeholder": {
      color: Colors.placeHolderColor,
    },
  },
  textAreaStyle: {
    minHeight: 83,
  },
  withIcon: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    // left: '10px',
    maxWidth: "1.5vw",
    maxHeight: "1.5vw",
    top: 0,
    bottom: 0,
    margin: "auto",
  },
  inputWithIcon: {
    paddingLeft: "35px",
  },
  eyeIconWrap: {
    width: "2.5vw",
    height: "100%",
    top: 0,
    right: 0,
    display: "flex",
    userSelect: "none",
  },
  showPass: {
    width: "1.4vw",
  },
});
