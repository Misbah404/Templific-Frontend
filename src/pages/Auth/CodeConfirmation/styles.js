// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Images } from "../../../theme";

export default StyleSheet.create({
    sendMailIcon: {
        width: '5vw',
        marginBottom: '1vw'
    },
    formHeading: {
        fontSize: '2.8vw',
        lineHeight: '2.8vw',
        marginBottom: '1.5vw'
    },
    EnterCodeTagLine: {
        fontSize: '1.2vw',
        lineHeight: "1.2vw",
        marginBottom: '1.2vw'
    },
    wrongEmail: {
        background: 'transparent',
        color: Colors.themeColor,
      },
});
