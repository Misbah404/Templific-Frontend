import React from "react";
import { css } from "aphrodite";
import SVG from "react-inlinesvg";
import styles from "./styles";
import { contextMenuData } from "../../../../../constants";

const ContextMenu = ({
  handleCopyNode,
  handlePasteNode,
  setContextMenu,
  handleChangePositions,
  handleDeleteElementContextMenu,
  handleCloneNode,
  copyNodeAttrs,
}) => {
  const handleClick = (item) => {
    if (item.name.toLowerCase() === "copy") {
      handleCopyNode();
    }

    if (item.name.toLowerCase() === "paste") {
      handlePasteNode();
    }

    if (item.name.toLowerCase() === "delete") {
      handleDeleteElementContextMenu();
    }

    if (item.name.toLowerCase() === "clone") {
      handleCloneNode();
    }

    if (
      item.name.toLowerCase() === "send to front" ||
      item.name.toLowerCase() === "send back" ||
      item.name.toLowerCase() === "send backward" ||
      item.name.toLowerCase() === "send forward"
    ) {
      handleChangePositions(item.name.toLowerCase());
    }

    setContextMenu(false);
  };

  const elementIsNotCopied = !(Object.keys(copyNodeAttrs)?.length > 0);

  return (
    <div className={`${css(styles.main)}`}>
      {contextMenuData &&
        contextMenuData.map((item) => (
          <div
            className={`d-flex justify-content-start align-items-center ${css([
              styles.menuItem,
              elementIsNotCopied && styles.disabled,
              !elementIsNotCopied && styles.showHover,
            ])}`}
            onClick={() => !elementIsNotCopied && handleClick(item)}
            key={item.name}
          >
            <SVG
              height={"auto"}
              width={"auto"}
              className={`${css(styles.menuIcon)}`}
              src={item.icon}
            />
            {item.name}
          </div>
        ))}
    </div>
  );
};

export default ContextMenu;
