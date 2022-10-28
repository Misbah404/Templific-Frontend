// @flow
import React from "react";
import DateTimePickerView from "./DateTimePickerView";

export default class DateTimePickerController extends React.Component {
  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }
  handleClick = e => {
    if (this.dateNode.contains(e.target)) {
      return;
    }

    this.handleOutside();
  };

  handleOutside = () => {
    this.props.hideDateTimePicker();
  };

  render() {
    return (
      <DateTimePickerView
        {...this.props}
        dateRef={node => (this.dateNode = node)}
      />
    );
  }
}
