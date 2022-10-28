// @flow
import {StyleSheet} from "aphrodite";
import {Colors, Images} from "../../theme";

const tableValues = {
  fontWeight: '600',
  fontSize: '1.25vw',
  color: '#271E3B'
};

export default StyleSheet.create({
  main: {
    background: Colors.lightPurple2,
    minHeight: "100%",
    padding: '4vw'
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2vw",
    marginBottom: "2vw"
  },
  cardWrapper: {
    borderRadius: "1.5vw",
    background: Colors.white,
    padding: "1vw",
    flex: 1,
    display: 'flex',
    gap: "1vw",
    justifyContent: "center",
    alignItems: "center"
  },
  topCardIconWrapper: {
    height: "5vw",
    width: "5vw",
    background: 'rgba(89, 63, 233, 0.09)',
    borderRadius: '0.6vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topCardIcon: {
    maxWidth: "2.5vw",
  },
  topCardDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  topCardTitle: {
    fontWeight: '500',
    fontSize: '1.1vw',
    color: Colors.themeLightColor,
  },
  topCardNumbers: {
    fontWeight: '600',
    fontSize: '2vw'
  },
  calenderSelectorWrapper: {
    display: "flex",
    alignItems: 'center',
    gap: '1.2vw',
  },
  calenderSelectedValue: {
    fontWeight: '600',
    fontSize: '1.2vw',
    color: '#828282',
    // width: '8.4vw',
    // width: '6.1vw !important'
    width: '2.1vw'
  },
  downArrowWrapper: {
    width: '3vw',
    height: '3vw',
    background: '#DAD3FF',
    borderRadius: '1vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: "pointer"
  },
  downArrow: {
    width: '1vw'
  },
  toggleWrapper: {position: 'relative'},
  toggleMenu: {
    position: 'absolute',
    left: '-5vw',
    top: '3.5vw',
    background: 'rgb(255, 255, 255)',
    width: '8vw',
    borderRadius: '1vw',
    boxShadow: '-4px 7px 10px rgb(0 0 0 / 25%)'
  },
  toggleItem: {
    fontWeight: '600',
    fontSize: '1vw',
    color: '#828282',
    margin: '1vw 0',
    padding: '0 .5vw',
    cursor: "pointer"
  },
  middleSection: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '2vw'
  },
  middleSectionChart: {
    borderRadius: "1.5vw",
    background: Colors.white,
    padding: "1vw 0",
    height: '25vw',
    // width: '50vw',
  },
  chartWrapper: {
    width: '49vw',
    padding: '0 3vw 0 5vw',
  },
  chartHading: {
    fontWeight: '700',
    fontSize: '1.1vw',
    color: '#333333',
    marginLeft: '-2vw',
    padding: '.6vw 0'
  },
  middleSectionInvoice: {
    borderRadius: "1.5vw",
    background: Colors.white,
    padding: "2vw",
    gridArea: '1/2/3/-1'
  },
  invoiceItemsWrapper: {
    overflow: 'hidden',
    height: '42vw',
    overflowY: 'scroll',
    padding: '0 2vw',
  },
  invoiceItem: {
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center',
    borderTop: '0.2vw dashed #E0E0E0',
    padding: '.8vw 0'
  },
  invoiceHeading: {
    fontWeight: '700',
    color: '#333333',
    marginBottom: '1.5vw',
    fontSize: '1.1vw',
    paddingLeft: '2vw',
  },
  invoiceItemRight: {
    display: 'flex',
    gap: '1vw',
    alignItems: 'center',
  },
  invoiceIcon: {
    maxWidth: "2.5vw",
  },
  invoiceDate: {
    fontWeight: '600',
    fontSize: '1vw',
    color: '#593FE9'
  },
  invoiceDatePaid: {
    color: "#271E3B"
  },
  invoiceNoPaid: {
    fontWeight: '600',
    fontSize: '1.3vw',
    color: '#271E3B'
  },
  invoicePaid: {
    color: '#593FE9'
  },
  invoiceBtnWrapper: {
    background: 'rgba(89, 63, 233, 0.09)',
    borderRadius: '.5vw',
    padding: '.3vw 1vw'
  },
  invoicePayBtn: {
    fontWeight: '600',
    fontSize: '1vw',
    color: '#593FE9',
    border: 'none',
    background: 'transparent',
    cursor: "pointer",
    minHeight: 'auto',
    padding: '1vw .5vw',
    width: '8.6vw',
  },
  invoicePaidBtn: {
    color: '#000',
    cursor: 'default',
    ':active': {
      opacity: 1,
    },
  },
  bottomSection: {
    borderRadius: "1.5vw",
    background: Colors.white,
    // padding: "2vw 0",
    paddingTop: '.5vw',
  },
  bottomSectionHeadingWrapper: {
    padding: "1vw 3vw",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomSectionHeading: {
    fontSize: '1.6vw',
    letterSpacing: '0.3px',
    color: '#271E3B'
  },
  tableHeadingsWrapper: {
    padding: "1vw 3vw",
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#D7D0FF',
    marginBottom: '.2vw',
  },
  tableHeadings: {
    fontWeight: '700',
    fontSize: '1.1vw',
    color: '#333333'
  },
  tableWrapper: {
    height: '11vw',
    overflow: 'hidden scroll'
  },
  tableValuesWrapper: {
    padding: "1vw 3vw",
    paddingRight: '2vw',
    display: 'flex',
    justifyContent: 'space-between',
  },
  tableValues,
  tableValues2: {
    ...tableValues,
    marginLeft: '2.4vw',
  },
  tableValues3: {
    ...tableValues,
    marginLeft: '10vw',
  },
  tableValues4: {
    ...tableValues,
    justifySelf: 'end',
  },
  tableValues4Paid: {
    marginRight: '1vw'
  },
  modalMessage: {
    fontSize: '1.2vw'
  }
});
