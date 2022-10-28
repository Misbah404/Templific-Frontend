import { css } from "aphrodite";
import styles from "./styles";

const ColorBox = ({ dColor, bgColor, handleUpdateBgColor }) => {
  return (
    <div
      key={dColor.id}
      className={`${css([
        styles.colorWrapper,
        dColor.color === bgColor && styles.colorWrapperShadow,
      ])}`}
      style={{
        backgroundColor: dColor.color,
      }}
      onClick={() => handleUpdateBgColor(dColor.color)}
    />
  );
};

export default ColorBox;
