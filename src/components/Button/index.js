// @flow
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Ripples from "react-ripples";
import {BeatLoader} from "react-spinners";
import {css} from "aphrodite/no-important";
import styles from "./styles";
import {Colors, AppStyles} from "../../theme";

export default class Button extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    ripple: PropTypes.bool,
    isLoading: PropTypes.bool,
    leftIcon: PropTypes.bool,
    className: PropTypes.string,
    btnWrap: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    ripple: true,
    leftIcon: true,
    onClick: () => { },
    isLoading: false,
    className: "",
    btnWrap: "",
    type: null,
  };

  render() {
    const {
      onClick,
      disabled,
      title,
      ripple,
      isLoading,
      leftIcon,
      children,
      className,
      btnWrap,
      type,
    } = this.props;
    if (ripple) {
      return (
        <Ripples className={`${css(btnWrap)} ${css(styles.ripplesArea)}`}>
          <button
            type="submit"
            type={type || "submit"}
            disabled={disabled || isLoading}
            className={`${className} ${css([
              styles.buttonStyle,
              isLoading && styles.isLoading,
              AppStyles.weight7,
            ])} `}
            onClick={onClick}
          >
            {leftIcon && children && children}

            {title && !isLoading && title}

            {!leftIcon && children && children}
          </button>
          {isLoading && (
            <div className={css([styles.loadingOverlay])}>
              <BeatLoader sizeUnit="px" size={8} color={Colors.white} />
            </div>
          )}
        </Ripples>
      );
    }

    return (
      <div className={css([styles.positionRelative, styles.lineHeight0])}>
        <button
          type={type || "submit"}
          disabled={disabled || isLoading}
          className={`${className} ${css([
            styles.buttonStyle,
            !_.isEmpty(title) && styles.title,
            isLoading && styles.isLoading,
            AppStyles.weight7,
          ])} `}
          onClick={onClick}
        >
          {title && !isLoading && title}
          {children && children}
        </button>
        {isLoading && (
          <div className={css([styles.loadingOverlayTwo])}>
            <BeatLoader sizeUnit="px" size={8} color={Colors.white} />
          </div>
        )}
      </div>
    );
  }
}
