// @flow
import { StyleSheet } from 'aphrodite';
import { Colors } from '../../theme';

export default StyleSheet.create({
// Modal css
main: {
    // zIndex: 0,
    minWidth: "20vw"
},
modalTitle: {
    textAlign: 'center',
    fontSize: '1.5vw'
},
modalText: {
    fontSize: '1vw',
    lineHeight: '1.5vw',
    textAlign: 'center'
},
noThanks: {
    fontSize: '1vw',
    marginRight: '1vw'
},
cancelBtn: {
    background: Colors.lightPurple,
    color: Colors.black,
    padding: '0.75vw 2.5vw'
},
modalHeder: {
    padding: '2vw 2vw 1vw',
    position: 'relative',
    ':after':{
        content: '""',
        position: 'absolute',bottom: 0,
        width: '80%', height: '0.12vw',
        opacity: 0.2,
        background: Colors.darkGrey,
        borderRadius: '100%'
    }
},
modalBody: {
    padding: '1.5vw 2vw'
},
modalFooter: {
    padding: '0 2vw 2vw 2vw'
},

});