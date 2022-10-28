import React from 'react';
import { css } from 'aphrodite';
import styles from './ToggleSwitchStyles';
import { AppStyles } from '../../theme';

export default function ToggleSwitchView(props) {
  return (
    <div>
      <label className={`switch`}>
        <input
          type="checkbox"
          checked={props.value}
          onChange={value => props.onChangValue(value)}
        />
        <span className={`slider round`}></span>
      </label>
      {/* <label className={css(styles.switchContainer)}>
                <input className={css(styles.switchInput)} type="checkbox" checked />
                <span className={css(styles.sliderBtn, styles.roundBtn)}></span>
            </label> */}
    </div>
  );
}
