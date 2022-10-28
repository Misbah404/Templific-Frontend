// @flow
import { StyleSheet } from 'aphrodite';
import { Colors } from '../../theme';

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    backgroundColor: Colors.white,
    bottom: '-100px',
    boxShadow: '0 2px 13px 0 rgba(0, 0, 0, 0.14)',
    right: '31px',
    padding: '10px',
    borderBottomColor: Colors.bgGreen,
    borderBottomStyle: 'solid',
    borderRadius: '7px',
    borderBottomWidth: '6px',
    zIndex: 999
    /*  ":after": {
      content: '""',
      position: "absolute",
      width: 0,
      height: 0,
      marginLeft: "-1em",
      bottom: "-1.5em",
      left: "50%",
      boxSizing: "border-box",
      border: "0.6em solid #000000",
      borderColor: "transparent transparent #66dea8 #66dea8",
      transformOrigin: "0 0",
      transform: "rotate(-45deg)"
    } */
  },
  wrapperSub: {
    position: 'absolute',
    backgroundColor: Colors.white,
    bottom: '-80px',
    boxShadow: '0 2px 13px 0 rgba(0, 0, 0, 0.14)',
    left: '31px',
    right: 'auto',
    padding: '15px',
    borderBottomColor: Colors.bgGreen,
    borderBottomStyle: 'solid',
    borderBottomWidth: '6px',
    borderRadius: '7px',
    zIndex: 999
    /* ":after": {
      content: '""',
      position: "absolute",
      width: 0,
      height: 0,
      marginLeft: "-1em",
      bottom: "-1.5em",
      left: "50%",
      boxSizing: "border-box",
      border: "0.6em solid #000000",
      borderColor: "transparent transparent #66dea8 #66dea8",
      transformOrigin: "0 0",
      transform: "rotate(-45deg)"
    } */
  },
  dateBox: {
    border: '1px solid #e7e7e7',
    padding: '8px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '3px'
  },
  calenderImage: {
    width: '35px',
    marginRight: '10px'
  },
  dateSub: {
    display: 'flex'
  },
  dateTitle: {
    opacity: 0.6,
    fontSize: '11px',
    fontWeight: '500',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#1d1d1d'
  },
  dateSubTitle: {
    fontSize: '15px',
    fontWeight: '600',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.8px',
    color: '#1d1d1d',
    alignSelf: 'flex-end',
    marginLeft: '-29px',
    minWidth: '50px'
  }
});
