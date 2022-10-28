// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Images } from "../../theme";

export default StyleSheet.create({
  main: {
    background: Colors.lightPurple2,
    minHeight: "100%",
  },
  // Section css
  section: {
    padding: "2vw",
  },
  // First Tab
  textSize: {
    fontSize: "1.1vw",
    lineHeight: "1.3vw",
  },
  formWrapper: {
    maxWidth: "35vw",
    borderRadius: "1.5vw",
    background: Colors.white,
    padding: "3vw",
    boxShadow: "0 0 60px 0 rgba(0, 0, 0, 0.07)",
  },
  mainHeading: {
    fontSize: "2.8vw",
    marginBottom: "1vw",
  },
  bakeryIconWrap: {
    width: "4vw",
    height: "4vw",
    background: Colors.lightbrown,
    borderRadius: "100%",
    marginBottom: "2vw",
  },
  bakeryIcon: {
    maxWidth: "2.5vw",
  },

  form: {
    marginTop: "1vw",
    padding: "0",
  },
  formInput: {
    // padding: '',
    background: Colors.lightPurple2,
    marginBottom: "1vw",
    fontSize: "1vw",
    lineHeight: "1vw",
    color: Colors.black,
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

  submitBtn: {
    marginTop: "1vw",
    width: "14vw",
  },
  anotherAccText: {
    marginTop: "1.5vw",
    color: Colors.themeColor,
  },
  // Modal css
  modalText: {
    fontSize: "1vw",
    lineHeight: "1.5vw",
    textAlign: "center",
  },

  notSubscribe: {
      backgroundColor: Colors.white,
      padding: 50
  },

  notSubscribeText:{
      fontSize: "1.5vw",
      marginBottom: "0.7vw"
  }
});
