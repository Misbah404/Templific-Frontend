// @flow
import React from 'react';
import { BigInputMoment } from 'react-input-moment';
import { css } from 'aphrodite';
import styles from './DateTimePickerStyles';
import { Images } from '../../theme';
import Util from '../../services/Util';

import { DATE_FORMAT2, TIME_FORMAT1 } from '../../constants';

export default function DateTimePickerView(props) {
  const { isLeft } = props;
  return (
    <div ref={props.dateRef}>
      <div className={css([styles.wrapper, isLeft && styles.wrapperSub])}>
        <div className={css(styles.dateBox)}>
          <div className={css(styles.dateSub)}>
            <img
              src={Images.calender}
              className={css(styles.calenderImage)}
              alt="calendar"
            />
            <p className={css(styles.dateTitle)}>Date:</p>
            <p className={css(styles.dateSubTitle)}>
              {Util.dateParser(props.moment, DATE_FORMAT2)}
            </p>
          </div>

          <div className={css(styles.dateSub)}>
            <img
              src={Images.time}
              className={css(styles.calenderImage)}
              alt="time"
            />
            <p className={css(styles.dateTitle)}>Time:</p>
            <p className={css(styles.dateSubTitle)}>
              {Util.getFormattedDateTime(props.moment, TIME_FORMAT1)}
            </p>
          </div>
        </div>
        <div className="wrapper">
          <BigInputMoment
            moment={props.moment}
            onChange={props.onChange}
            locale="en"
          />
        </div>
      </div>
    </div>
  );
}
