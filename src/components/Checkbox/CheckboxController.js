// @flow
import React from 'react';
import PropTypes from 'prop-types';
import CheckboxView from './CheckboxView';
import { CHECKBOX_THEME } from '../../constants';

export default class CheckboxController extends React.Component {
  static propTypes = {
    isChecked: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onClick: PropTypes.func,
    theme: PropTypes.string,
    name: PropTypes.string
  };

  static defaultProps = {
    title: '',
    theme: CHECKBOX_THEME.THEME1,
    name: '',
    onClick: () => {}
  };

  render() {
    return <CheckboxView {...this.props} />;
  }
}
