// @flow
import React from "react";
import PageNotFoundView from "./PageNotFoundView";

class PageNotFoundController extends React.Component {
  static propTypes = {};

  render() {
    return <PageNotFoundView {...this.props} />;
  }
}

export default PageNotFoundController;
