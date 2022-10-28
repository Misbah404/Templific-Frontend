// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Images } from "../../../theme";

export default StyleSheet.create({
    formHeading: {
        fontSize: '2.8vw',
        marginBottom: '0.5vw'
    },
    formSubHeading: {
        fontSize: '1.2vw',
        fontWeight: 400,
        marginBottom: '3vw',
    },
    formInput: {
        minHeight: '3.5vw',
        padding: '1vw',
        fontSize: '1.2vw',
        fontWeight: 500,
        marginBottom: '1vw',
        borderRadius: '0.45vw',
    },
    submitBtn: {
        marginTop: '1.7vw'
    },
    anotherArea: {
        marginTop: '3vw'
    },
    anotherAccText: {
        fontSize: '1.2vw',
        fontWeight: 500,
        color: Colors.placeHolderColor
    },
    anotherLink: {
        fontSize: '1.2vw',
        fontWeight: 500,
        color: Colors.themeColor
    }
});
