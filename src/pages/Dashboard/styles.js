// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Images } from "../../theme";

export default StyleSheet.create({
    main: {
        background: Colors.lightPurple2,
        minHeight: '100%'
    },
    mainHeading: {
        fontSize: '1.9vw',
        margin: '2vw 0 2.5vw'
    },
    connectBtn: {
        fontSize: '1vw',
        lineHeight: '1vw',
        padding: '1.2vw 3.5vw'
    },
    plusBtn: {
        marginRight: '1vw'
    },
    emptyImage: {
        width: '26vw'
    }
});
