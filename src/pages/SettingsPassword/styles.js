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
  submitBtn: {
    marginTop: "1vw",
    padding: "0.8vw 2.5vw",
  },

  modalText: {
    fontSize: "1vw",
    lineHeight: "1.5vw",
    textAlign: "center",
  },

  errorMessage: {
    color: "red",
  },
});
