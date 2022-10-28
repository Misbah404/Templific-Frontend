// @flow
import React from 'react';
import { css } from 'aphrodite';
import styles from './NumericInputStyles';
import { Images } from '../../theme';

export default function NumericInputView(props) {
  return (
    <div>
      <label className={`${css(styles.labelStyle)}`}># of Items</label>
      <div className={`d-flex align-items-center ${css(styles.itemValueWrap)}`}>
        <button
          type="button"
          className={`${css(styles.itemValueBtn)}`}
          onClick={props.handleClickDecrement}
        >
          <img
            className={`${css(styles.itemImgIcon)}`}
            src={Images.minusIcon}
            alt="minus icon"
          />
        </button>
        <input
          type="text"
          className={`${css(styles.itemValueInput)}`}
          value={props.value}
          onChange={props.onChange}
        />

        <button
          type="button"
          className={`${css(styles.itemValueBtn)}`}
          onClick={props.handleClickIncrement}
        >
          <img
            className={`${css(styles.itemImgIcon)}`}
            src={Images.plusIcon}
            alt="plus icon"
          />
        </button>
      </div>
    </div>
  );
}
