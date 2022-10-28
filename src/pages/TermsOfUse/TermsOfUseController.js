// @flow
import React from "react";

import TermsOfUseView from "./TermsOfUseView";

export default class TermsOfUseController extends React.Component {
  static propTypes = {};

  static defaultProps = {};
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return <TermsOfUseView {...this.props} />;
  }
}
