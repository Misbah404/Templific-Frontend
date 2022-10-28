import { StyleSheet } from "aphrodite";
import { Colors } from "../../theme";

export default StyleSheet.create({
  main: {
    padding: "2vw 1vw",
    height: "calc(100vh - 13vw)",
    overflowY: "scroll",
  },
  accordionHeader: {
    background: "transparent",
    border:"none"
  },

  formInput: {
    minHeight: "1.5vw",
    padding: "0.75vw 1vw",
    marginBottom: "1vw",
    borderRadius: "0.25vw",
    fontSize: "1.2vw",
    fontWeight: 500,
    border: `0.1vw solid ${Colors.lightGray}`,
    fontSize: "1vw !important",
    fontWeight: "400",
    width: "100%",
    paddingLeft: "2.5vw",
  },

  searchIcon: {
    height: "1.6vw",
    width: "1.6vw",
    left: ".5vw",
  },

  canvasInput: {
    fontSize: "1vw",
    lineHeight: "1.2vw",
    minHeight: "2.5vw",
    border: `0.1vw solid ${Colors.lightGray}`,
    padding: "0 0 0 0.5vw",
    borderRadius: "0.3vw",
  },

  templateWrapper: {
    width: "100%",
    border: `1px solid ${Colors.themeColor}`,
    borderRadius: "0.75vw",
    position: "relative",
  },

  templateModalWrapper: {
    width: "10vw !important",
  },

  image: {
    height: "13vw",
    width: "100%",
    borderTopLeftRadius: "0.6vw",
    borderTopRightRadius: "0.6vw",
    objectFit: "cover",
  },
  modalImage: {
    height: "8vw",
    width: "100%",
    borderTopLeftRadius: "0.6vw",
    borderTopRightRadius: "0.6vw",
  },
  row: {
    maxHeight: "25vw",
    overflowY: "auto",
  },

  nameWrapper: {
    padding: "0.5vw",
    fontSize: "1vw",
  },

  iconWrapper: {
    padding: "0.5vw",
  },
  editIcon: {
    height: "1vw",
    width: "1vw",
    cursor: "pointer",
  },

  templateIcon: {
    height: "1.1vw",
    width: "1.1vw",
    cursor: "pointer",
  },

  templateIconOnRight: {
    marginLeft: "1vw",
  },

  modalDelete: {
    fontSize: "1vw",
  },

  button: {
    background: "none",
    border: "none",
  },
  checkbox: {
    height: "1.5vw",
    width: "1.5vw",
    marginRight: "1vw",
    position: "absolute",
    right: "0",
    top: ".5vw",
    border: "1px solid black",
    // borderRadius: 150
  },

  title: {
    fontSize: "1.1vw",
    fontWeight: 600,
    marginBottom: ".25vw",
  },

  hr: {
    height: "0.1vw",
    width: "100%",
    backgroundColor: "rgba(183, 177, 207, 0.29)",
    marginTop: "0.5vw",
    marginBottom: "0.5vw",
  },
  createGroupBtn: {
    marginTop: ".25vw",
    marginBottom: "1vw",
    width: "100%",
    borderRadius: ".5vw",
    cursor: "pointer",
  },
});
