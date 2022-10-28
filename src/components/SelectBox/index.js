// @flow
import React from "react";
import PropTypes from "prop-types";
import { css } from "aphrodite";
import style from "./styles";
import { AppStyles } from "../../theme";
import { Form } from "react-bootstrap";

const SelectBox = (props) => {
  const { icon, label, styles, value, error, children, iconStyles } = props;

  return (
    <div
      className={`position-relative line-height-0 ${css([
        icon && style.withIcon,
      ])}`}
    >
      {label && <label className={css(style.labelStyle)}>{label}:</label>}
      <div className={`position-relative ${css(style.selectWrapper)}`}>
        {icon && <img alt="Icon" src={icon} />}

        <Form.Control
          as="select"
          className={css([style.inputStyle, styles && styles])}
          value={value}
          {...props}
          id="selectBox_unique"
          placeholder="hello"
        >
          {children}
        </Form.Control>
      </div>
      {error && <p className={`${css(AppStyles.formError)}`}>{error}</p>}
    </div>
  );
};

SelectBox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

SelectBox.defaultProps = {
  label: "",
  value: "",
  error: "",
};

export default SelectBox;
