// @flow
import { StyleSheet } from 'aphrodite';
import { Colors } from '../../theme';

export default StyleSheet.create({
    switchContainer: {
        position: 'relative',
        display: 'inline-block',
        width: 60,
        height: 34,
    },
    switchInput: {
        opacity: 0,
        width: 0,
        height: 0,
    },
    SliderBtn: {
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.bgGreen,
        transition: '.4s',
        ":before": {
            position: 'absolute',
            content: "''",
            height: 26,
            width: 26,
            left: 4,
            bottom: 4,
            backgroundColor: Colors.white,
            transition: '.4s',
        },
    },
    roundBtn: {
        borderRadius: 34,
        ":before": {
            borderRadius: '50%',
        }
    },
    //     input[type = "checkbox"] {
    //     backgroundColor: Colors.bgGreen,
    // }

});