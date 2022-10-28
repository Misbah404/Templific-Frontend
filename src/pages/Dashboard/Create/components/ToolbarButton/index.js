import { css } from "aphrodite";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import styles from "./styles";

const ToolbarButton = (props) => {
  const { image, handleClick, conditionStyle, tooltip } = props;
  return (
    <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>} placement={"bottom"}>
      {({ ref, ...triggerHandler }) => (
        <button
          onClick={handleClick}
          className={`d-flex justify-content-center align-items-center ${css([
            styles.toolbarIconBtn,
            conditionStyle && styles.toolBarDelete,
          ])}`}
          {...triggerHandler}
        >
          <SVG
            ref={ref}
            height="auto"
            width="auto"
            src={image}
            className={`${css(styles.toolbarIcon)}`}
          />
        </button>
      )}
    </OverlayTrigger>
  );
};

export default ToolbarButton;
