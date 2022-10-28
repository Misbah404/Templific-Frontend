// @flow
import React from "react";

import PrivacyPolicyView from "./PrivacyPolicyView";

export default class PrivacyPolicyController extends React.Component {
  static propTypes = {};

  static defaultProps = {};
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return <PrivacyPolicyView {...this.props} />;
  }
}
