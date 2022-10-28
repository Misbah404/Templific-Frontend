// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Images } from "../../../theme";

export default StyleSheet.create({
  formHeading: {
    fontSize: "2.8vw",
    marginBottom: "0.2vw",
  },
  paymentTagLine: {
    fontSize: "1.2vw",
    lineHeight: "1.2vw",
    marginBottom: "1.5vw",
    color: Colors.themeColor,
  },
  formInput: {
    minHeight: "3.5vw",
    padding: "1vw",
    marginBottom: "1vw",
    borderRadius: "0.45vw",
    fontSize: "1.2vw",
    fontWeight: 500,
    backgroundColor: "#fff",
  },
  submitBtn: {
    marginTop: "1vw",
    background: Colors.themeColor,
  },
  paypalBtn: {
    marginTop: "1.7vw",
    background: "#009cdf",
    fontSize: "2vw",
    fontStyle: "italic",
    padding: "0.5vw 1vw",
    marginBottom: "2.5vw",
  },
  anotherArea: {
    marginTop: "3vw",
  },
  anotherAccText: {
    fontSize: "1.2vw",
    fontWeight: 500,
    color: Colors.placeHolderColor,
  },
  anotherLink: {
    fontSize: "1.2vw",
    fontWeight: 500,
    color: Colors.themeColor,
  },
  subscribField: {
    background: Colors.white,
    padding: "1.55vw 1.3vw",
    borderRadius: "0.45vw",
  },
  subscribeText: {
    fontSize: "1vw",
    lineHeight: "1vw",
  },
  checkboxFont: {
    fontSize: "1vw",
    lineHeight: "1vw",
    display: "flex",
    alignItems: "center",
  },
  themeColor: {
    color: Colors.themeColor,
  },

  or: {
    fontSize: "1.5vw",
    margin: "0 1vw",
    color: Colors.darkGrey
  },

  error: {
    fontSize: "1vw",
    marginTop: "1vw",
    color: "red"
  }
});
