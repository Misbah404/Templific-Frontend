// @flow
import React from "react";
import PropTypes from "prop-types";

import EmptyView from "./EmptyView";

export default class EmptyController extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return <EmptyView {...this.props} />;
  }
}
