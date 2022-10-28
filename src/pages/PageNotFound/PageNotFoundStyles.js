// @flow
import { StyleSheet } from "aphrodite";
import { Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    maxWidth: 1360,
    margin: '0 auto'
  },
  headerGraphics: {
    width: '60%',
    // zIndex: '-999',
    position: 'absolute',
    bottom: 0,
    right: 0,
    '@media (max-width: 1280px)': {
      width: '57%'
    },
    '@media (max-width: 1024px)': {
      width: '55%'
    },
    '@media (max-width: 980px)': {
      position: 'static',
      width: '100%',
      top: 70
    }
  },
  heroSection: {
    position: 'relative',
    height: 'calc(100vh - 160px)',

    paddingBottom: 0,

    '@media (max-width: 992px)': {
      height: 'auto',
      // paddingBottom: 850,
      paddingTop: '60px'
    },

    '@media (max-width: 767px)': {
      // paddingBottom: 400,
      paddingTop: '0'
    }
  },
  HeightVhs: {
    '@media (max-width: 992px)': {
      height: 'auto !important'
    }
    /* height: '85vh' */
  },
  lineHeight12: {
    lineHeight: '1.1 !important',
    width: '100%',
    // maxWidth: '390px'
  },
});
