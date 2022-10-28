// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ToggleSwitchView from './ToggleSwitchView';

export default class ToggleSwitchController extends React.Component {
  static propTypes = {
    onChangValue: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired
  };

  static defaultProps = {};

  render() {
    return <ToggleSwitchView {...this.props} />;
  }
}
