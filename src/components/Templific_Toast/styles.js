// @flow
import { StyleSheet } from 'aphrodite';
import { Colors, Fonts } from '../../theme';

export default StyleSheet.create({
  toastWrapper: {
    top: '4vw', right: '2vw'
  },
  bg: {
    minWidth: '25vw',
    backgroundColor: Colors.lightbrown,
    borderRadius: '0.45vw'
  },
  text: {
    color: Colors.lightbrown2,
    fontSize: '1.1vw',
    lineHeight: '1.1vw'
    
  },
  contentWrap: {
    padding: '2vw',
    lineHeight: '1vw'
  }
});
