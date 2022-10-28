// @flow
import { StyleSheet } from 'aphrodite';
import { Colors } from '../../theme';

export default StyleSheet.create({
  uncheckedBox: {
    width: '1.6vw',
    height: '1.6vw',
    border: `0.16vw solid ${Colors.black}`,
    borderRadius: '0.3vw',
    display: 'block',
    marginRight: '0.8vw',
  },

  checkedBox: {
    backgroundColor: Colors.black,
    position: 'relative',

    ':after': {
      content: '""',
      border: '0.1vw solid white',
      width: '1.3vw',
      height: '1.3vw',
      borderRadius: '0.1vw',
      background: Colors.black,
      position: 'absolute',
      top:0,
      left:0,
    }
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
    color: Colors.black,
    fontSize: '1vw',
    lineHeight: '1vw',
    alignItems: 'center',
    userSelect: 'none',
    justifyContent: 'center',
    margin: 0
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start'
  },

  theme2TitleStyles: {
    color: Colors.white
  },

  theme2UnchecboxStyles: {
    width: 12,
    height: 12,
    fontSize: '13px'
  },
  theme2ChecboxStyles: {
    backgroundColor: Colors.black,
    position: 'relative',
    ':after': {
      content: '""',
      border: '1px solid white',
      width: 11,
      height: 11,
      position: 'absolute',
      borderRadius: '2px'
    }
  },
  theme3ChecboxStyles: {
    backgroundColor: Colors.black,
    position: 'relative',
    border: 'none',
    ':after': {
      content: '""',
      border: '1px solid white',
      width: 14,
      height: 14,
      position: 'absolute',
      borderRadius: '7px'
    }
  },
  theme3UnchecboxStyles: {
    width: 14,
    height: 14,
    fontSize: '13px',
    borderRadius: '7px'
  },
  theme3TitleStyles: {
    color: Colors.white
  },
  theme4TitleStyles: {
    color: Colors.black
  },
  disabled: {
    cursor: 'not-allowed'
  }
});
