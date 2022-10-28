import { StyleSheet } from "aphrodite";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  inputWrap: {
    marginBottom: "1vw",
  },
  inputStyles: {
    border: 0,
    margin: "0.7vw",
    width: "3.5vw",
    background: "transparent",
    borderBottom: "0.15vw solid " + Colors.themeColor,
    fontSize: "2.5vw",
    lineHeight: "1.5vw",
    marginBottom: "1.5vw",
    fontWeight: 700,
    ":focus, :active": {
      outline: "none",
    },
  },
  resendBtn: {
    fontSize: "1.2vw",
    lineHeight: "1.2vw",
    marginBottom: "0",
    background: "transparent",
    padding: 0,
    marginLeft: "0.2vw",
    color: Colors.themeColor,
    ":disabled": {
      color: Colors.placeHolderColor,
    },
  },
  normalTextSize: {
    fontSize: "1.2vw",
    lineHeight: "1.2vw",
    marginBottom: "1.2vw",
  },
  emailAddress: {
    marginBottom: "2.2vw",
  },

  error: {
    fontWeight: "bold",
    color: "red",
  },
});
