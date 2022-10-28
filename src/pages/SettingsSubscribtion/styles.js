// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Images } from "../../theme";

export default StyleSheet.create({
  main: {
    background: Colors.lightPurple2,
    minHeight: "100%",
    padding: "2vw",
  },
  whiteBox: {
    width: "80vw",
    background: Colors.white,
    borderRadius: "1vw",
    padding: "2vw",
    boxShadow: "0 0 60px 0 rgba(0, 0, 0, 0.07)",
  },
  title: {
    fontSize: "1.3vw",
    fontWeight: 700,
    marginBottom: "0.5vw",
  },
  seprator: {
    width: "100%",
    margin: "3vw auto 2vw",
    height: "0.15vw",
    background: Colors.darkGrey,
    opacity: 0.5,
  },
  para: {
    fontSize: "1vw",
  },
  modalText: {
    fontSize: "1vw",
    lineHeight: "1.5vw",
    textAlign: "center",
  },

  notSubscribe: {
    backgroundColor: Colors.white,
    padding: 50,
  },

  notSubscribeText: {
    fontSize: "1.5vw",
    marginBottom: "0.7vw",
  },
});
