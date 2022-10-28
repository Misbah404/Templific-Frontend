// @flow
import {StyleSheet} from 'aphrodite';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    /* display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    margin: "auto" */
  },
  ripplesArea: {
    overflow: 'hidden',
    borderRadius: '0.45vw',
  },
  buttonStyle: {
    backgroundColor: Colors.themeColor,
    color: Colors.white,
    fontSize: '1vw',
    border: 0,
    fontWeight: 700,
    transition: '0.3s ease opacity',
    ':disabled': {
      backgroundColor: '#cccccc',
      color: '#666666',
      fontWeight: '700'
    },

    // ':active': {
    //   opacity: 0.6,
    //   transition: '0.3s ease opacity'
    // },
    // ':focus': {
    //   opacity: 0.6,
    //   transition: '0.3s ease opacity'
    // },
    // ':hover': {
    //   opacity: 0.6,
    //   transition: '0.3s ease opacity'
    // },

    position: 'relative',
    padding: '1vw 2vw',
    minHeight: '3vw'
  },
  isLoading: {
    ':disabled': {
      backgroundColor: Colors.bgGreen,
      color: Colors.white
    }
  },
  loadingOverlay: {
    backgroundColor: 'rgba(1, 1, 1, 0.5)',
    // backgroundColor: "red",
    borderRadius: '0.45vw',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderRadius: '0.23vw',
    minHeight: '100%',
    '@media (max-width: 600px)': {
      top: 14
    }
  },
  loadingOverlayTwo: {
    // backgroundColor: 'rgba(1, 1, 1, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    position: 'absolute',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 0,
    borderRadius: '0.23vw',
    minHeight: '100%',
    maxHeight: '2vw',
    width: '100%',
    // marginTop: "1.7vw",
    // marginBottom: "1vw"
  },
  positionRelative: {
    position: 'relative',
  },
  lineHeight0: {
    lineHeight: 0
  }
});
