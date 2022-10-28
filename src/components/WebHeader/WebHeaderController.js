// @flow
import React from "react";
import PropTypes from "prop-types";

import WebHeaderView from "./WebHeaderView";

export default class WebHeaderController extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return <WebHeaderView {...this.props} />;
  }
}
