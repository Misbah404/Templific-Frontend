// @flow
import React from 'react';
import { css } from 'aphrodite';
import { Checkbox } from '@material-ui/core';
import styles from './CheckboxStyles';
import { AppStyles, Colors } from '../../theme';
import { CHECKBOX_THEME } from '../../constants';

export default function CheckboxView(props) {
  return (
    <div
      className={css([styles.container, props.isDisabled && styles.disabled])}
    >
      <label
        onClick={() => {
          if (!props.isDisabled) props.onClick();
        }}
        className={css([
          styles.wrapper,
          props.theme === CHECKBOX_THEME.THEME2 && styles.theme2TitleStyles,
          props.theme === CHECKBOX_THEME.THEME3 && styles.theme3TitleStyles,
          props.theme === CHECKBOX_THEME.THEME4 && styles.theme4TitleStyles,
          props.isDisabled && styles.disabled
        ])}
      >
        <span
          className={css([
            styles.uncheckedBox,
            props.isChecked && styles.checkedBox,
            props.theme === CHECKBOX_THEME.THEME2 &&
              styles.theme2UnchecboxStyles,
            props.theme === CHECKBOX_THEME.THEME4 &&
              styles.theme2UnchecboxStyles,
            props.theme === CHECKBOX_THEME.THEME3 &&
              styles.theme3UnchecboxStyles,
            props.isChecked &&
              props.theme === CHECKBOX_THEME.THEME2 &&
              styles.theme2ChecboxStyles,
            props.isChecked &&
              props.theme === CHECKBOX_THEME.THEME4 &&
              styles.theme2ChecboxStyles,
            props.isChecked &&
              props.theme === CHECKBOX_THEME.THEME3 &&
              styles.theme3ChecboxStyles,
            props.isDisabled && styles.disabled
          ])}
          name={props.name}
        />
        {props.title}
      </label>
    </div>
  );
}
