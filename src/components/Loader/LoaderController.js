// @flow
import React from 'react';
import PropTypes from 'prop-types';

import LoaderView from './LoaderView';

export default class LoaderController extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired
  };

  static defaultProps = {};

  render() {
    return <LoaderView {...this.props} />;
  }
}
