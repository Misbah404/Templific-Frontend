// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Images } from "../../theme";

export default StyleSheet.create({
    authPage: {
        minHeight: '100vh',
        backgroundColor: Colors.authBG
    },
    leftBackground: {
        backgroundColor: Colors.themeColor,
    },
    joinSec: {
        width: '30vw',
        margin: '0 auto',
    },
    AuthTitle: {
        fontSize: '3.5vw',
        textTransform: 'capitalize',
        color: Colors.white,
        margin: '3vw 0 5vw',
    },
    AuthTagLine: {
        fontSize: '1.8vw',
        maxWidth: '15vw',
        color: Colors.white,
        fontWeight: 700,
        lineHeight: '2vw',
        marginBottom: '1vw'
    },
    AuthLeftImage: {
        width: '12vw'
    },
    contentArea: {
        width: '70vw',
    },
    innerBox: {
        width: '40vw'
    },
    joinArea: {
        padding: '0.5vw',
        borderTopLeftRadius: '1vw',
        borderTopRightRadius: '1vw',
        backgroundColor: Colors.pink,
        fontSize: '2.3vw',
        color: Colors.white,
        fontWeight: 700,
        margin: 0
    },
    joinBox: {
        lineHeight: 0,
        backgroundColor: Colors.white,
        borderBottomLeftRadius: '1vw',
        borderBottomRightRadius: '1vw',
        padding: '2vw 0',
        marginBottom: '2vw'
    },
    handWave: {
        width: '5vw',
        marginBottom: '2vw'
    },
    joinHeading: {
        fontSize: '2vw',
        color: Colors.black,
        fontWeight: 700,
        lineHeight: '2vw',
        width: '22vw',
        margin: '0 auto 1.3vw'
    },
    joinPrice: {
        fontSize: '2vw',
        lineHeight: '2vw',
        marginBottom: '0.5vw',
        fontWeight: 500
    },
    price: {
        color: Colors.pink,
        fontWeight: 700
    },
    joinPriceRate: {
        fontSize: '1.4vw',
        lineHeight: '1.4vw',
        lineHeight: '2vw',
        margin: 0
    },
    joinUl: {
        padding: 0,
        maxWidth: "23vw",
        margin: '2vw auto 0',
    },
    joinLi: {
        fontSize: '1.1vw',
        lineHeight: '1.5vw',
        marginBottom: '0.8vw',
    }
});
