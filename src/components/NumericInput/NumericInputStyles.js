// @flow
import { StyleSheet } from 'aphrodite';
import { Colors } from '../../theme';

export default StyleSheet.create({
  labelStyle: {
    fontSize: '14px',
    color: Colors.blackish,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: '600'
  },
  itemValueInput: {
    width: 'calc(80% - 50px)',
    border: `solid 1px ${Colors.grey2}`,
    padding: '10px',
    height: '43px',
    textAlign: 'center',
    ':focus': {
      outline: 'none'
    },
    '@media (max-width:1300px)': {
      width: 'calc(90% - 50px)'
    },
    '@media (max-width:1100px)': {
      width: 'calc(100% - 50px)'
    }
  },
  itemValueBtn: {
    fontWeight: 800,
    fontSize: '18px',
    height: '43px',
    padding: '0 3px',
    width: '30px',
    backgroundColor: Colors.bgGreen,
    border: 'none',
    color: Colors.white,
    borderRadius: '0 5px 5px 0 ',
    ':first-child': {
      borderRadius: '5px 0 0 5px '
    },
    '@media (max-width:1100px)': {
      width: '22px'
    }
  },
  itemImgIcon: {
    width: '12px'
  }
});
