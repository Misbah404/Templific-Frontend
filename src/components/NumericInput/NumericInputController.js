// @flow
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import NumericInputView from './NumericInputView';

export default class NumericInputController extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {};

  handleClickIncrement = () => {
    const { value } = this.props;
    const parsedValue = _.parseInt(value);

    this.props.onChange({ target: { value: parsedValue + 1 } });
  };

  handleClickDecrement = () => {
    const { value } = this.props;
    const parsedValue = _.parseInt(value);
    if (parsedValue > 0)
      this.props.onChange({ target: { value: parsedValue - 1 } });
  };

  _itOwnOnChange = e => {
    const parsedValue = _.parseInt(e.target.value);

    if (!_.isNaN(parsedValue) && !_.isEmpty(e.target.value)) {
      this.props.onChange({ target: { value: parsedValue } });
    }

    if (_.isEmpty(e.target.value)) {
      this.props.onChange({ target: { value: 0 } });
    }
  };

  render() {
    return (
      <NumericInputView
        {...this.props}
        onChange={this._itOwnOnChange}
        handleClickDecrement={this.handleClickDecrement}
        handleClickIncrement={this.handleClickIncrement}
      />
    );
  }
}
