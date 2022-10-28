// @flow
import React, { useState } from "react";
import PropTypes from "prop-types";
import { css } from "aphrodite";
import style from "./styles";
import { AppStyles, Images } from "../../theme";
import { strings } from "../../constants";

const TextField = (props) => {
  const {
    icon,
    label,
    isTextArea,
    type,
    styles,
    value,
    error,
    wrapClass,
    placeholder,
    iconStyles,
    focused,
  } = props;
  const [showPassword, setShowPassword] = useState(() => false);
  return (
    <div
      className={`position-relative line-height-0 ${
        wrapClass ? wrapClass : ""
      } ${css([icon && style.withIcon])}`}
    >
      {label && <label className={css(style.labelStyle)}>{label}:</label>}
      {icon && (
        <img
          alt="Icon"
          className={css([style.icon, iconStyles && iconStyles])}
          src={icon}
        />
      )}
      {!isTextArea && (
        <>
          <input
            {...props}
            type={showPassword ? "text" : type || "text"}
            className={css([
              style.inputStyle,
              icon && style.inputWithIcon,
              styles && styles,
            ])}
            autoComplete="off"
            value={value}
            placeholder={placeholder}
            autoFocus={focused}
          />
          {type == "password" && (
            <span
              className={`position-absolute ${css(style.eyeIconWrap)}`}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              <img
                src={showPassword ? Images.eye : Images.eyeHide}
                className={`${css(style.showPass)}`}
              />
            </span>
          )}
        </>
      )}
      {isTextArea && (
        <textarea
          {...props}
          rows="4"
          cols="30"
          className={css([
            style.textAreaStyle,
            style.inputStyle,
            styles && styles,
          ])}
          value={value}
        />
      )}
      {error && <p className={`${css(AppStyles.formError)}`}>{error}</p>}
    </div>
  );
};

TextField.propTypes = {
  isTextArea: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  wrapClass: PropTypes.string,
  focused: PropTypes.bool,
};

TextField.defaultProps = {
  isTextArea: false,
  label: "",
  value: "",
  error: "",
  wrapClass: "",
  placeholder: "",
  focused: false,
};

export default TextField;
