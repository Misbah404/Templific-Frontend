// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Images } from "../../theme";

export default StyleSheet.create({
    mainHeading: {
        fontSize: '2.8vw',
        marginBottom: '1vw'
    },
    main: {
        background: Colors.lightbrown,
        minHeight: '100%'
    },
    connectContent: {
        maxWidth: '20vw'
    },
    textSize: {
        fontSize: '1vw',
        lineHeight: '1vw'
    },
    para: {
        marginBottom: '1vw',
        fontWeight: 600
    },
    bakeryIconWrap: {
        width: '4vw',
        height: '4vw',
        background: Colors.white,
        borderRadius: '100%',
        marginBottom: '2vw'
    },
    bakeryIcon: {
        width: '3.5vw'
    },
    connectBtn: {
        margin: '2vw 0 1.5vw',
        background: Colors.lightbrown2,
        padding: '1.2vw 3.5vw'
    },
    noThanks: {
        color: Colors.lightbrown2,
        fontWeight: 500
    },
});
