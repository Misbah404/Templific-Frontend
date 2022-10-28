// @flow
import React from 'react';
import { css } from 'aphrodite';
import { BeatLoader } from 'react-spinners';
import styles from './LoaderStyles';
import { Colors } from '../../theme';

export default function LoaderView(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className={`${css(styles.loaderWrap)} ${props.className}`}>
      <BeatLoader
        sizeUnit="px"
        size={8}
        color={props.color || Colors.kgDarkGreen}
      />
    </div>
  );
}
