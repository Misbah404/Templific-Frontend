// @flow
import React from "react";
import PropTypes from "prop-types";

import WebFooterView from "./WebFooterView";

export default class WebFooterController extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return <WebFooterView {...this.props} />;
  }
}
