// @flow
import { StyleSheet } from 'aphrodite';
import { Colors, Images } from '../../theme';

export default StyleSheet.create({
  // paymentSec: {
  //   position: ' absolute',
  //   left: ' 0',
  //   right: ' 0',
  //   bottom: ' 0',
  //   top: ' 0',
  //   width: '100%',
  //   minHeight: '100%',
  //   background: '#42424282',
  //   display: ' flex',
  //   justifyContent: ' center',
  //   alignItems: ' center'
  // },
  labelForm: {
    color: '#1c1b1b',
    fontWeight: 600
  },
  stripeTextContainer: {
    marginTop: 20,
    '@media (max-width: 600px)': {
      textAlign: 'center'
    }
  },
  paymentWrap: {
    maxWidth: '571px',
    minWidth: '571px',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    padding: '50px 50px'
  },
  heading20: {
    fontSize: '20px',
    position: 'relative',
    color: Colors.greyish,
    ':before': {
      content: "''",
      backgroundImage: `url(${Images.cardImg})`,
      width: '20px',
      height: '20px',
      display: 'block',
      backgroundSize: 'cover',
      left: '80px',
      position: 'absolute',
      bottom: '2px'
    }
  },
  para: {
    fontSize: '14px',
    color: Colors.greyish,
    opacity: 0.4
  },
  para1: {
    fontSize: '10px',
    color: Colors.greyish,
    opacity: 0.4
  },
  stripeImage: {
    width: '100%',
    maxWidth: 68,
    height: '28px'
  },
  formWrapper: {
    borderRadius: '4px',
    border: '1px solid rgb(231, 231, 231)',
    backgroundColor: ' rgb(255, 255, 255)',
    display: 'block',
    minHeight: '43px',
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    marginTop: '15px'
  },
  nextBtn: {
    color: Colors.white,
    background: Colors.kgGreen,
    width: 200,
    borderRadius: 23,
    border: 'none',
    padding: '12px 29px',
    fontWeight: 700,
    boxShadow: '0 8px 10px 0 rgba(61, 159, 117, 0.14)',
    '@media (max-width: 600px)': {
      marginTop: 15
    }
  },
  nextBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    '@media (max-width: 600px)': {}
  },
  inputControl: {
    padding: '1.3em 1em',
    borderRadius: '10px',
    border: 'solid 1px #989898',
    '::placeholder': {
      color: '#cdcdcd'
    }
  },

  paymentText: {
    fontSize: '14px',
    lineHeight: '20px'
  }
});
