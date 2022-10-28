import { useEffect, useState } from "react";
import { css } from "aphrodite";
import { v4 as uuid } from "uuid";
import { SketchPicker } from "react-color";
import { ColorBox, TextField } from "..";
import { Images } from "../../theme";
import styles from "./styles";
import SVG from "react-inlinesvg";
import { DEFAULT_COLORS } from "../../constants";

const ColorPicker = (props) => {
  const [showPicker, setShowPicker] = useState(() => false);
  const [bgColor, setBgColor] = useState(() => "");

  const { selectedStage } = props;

  const handleChangeColor = (color) => {
    setBgColor(color?.hex);
  };

  const handleUpdateBgColor = (dColor) => {
    setBgColor(dColor);
  };

  useEffect(() => {
    if (selectedStage?.canvas?.current?.bgColor) {
      setBgColor(selectedStage?.canvas?.current?.bgColor);
    }
  }, [selectedStage]);

  useEffect(() => {
    if (bgColor.length === 7) {
      if (selectedStage && selectedStage.canvas) {
        const test = /^#[0-9A-F]{6}$/i.test(bgColor);
        test && selectedStage?.canvas?.current?.handleUpdateBgColor(bgColor);
        !test && selectedStage?.canvas?.current?.handleUpdateBgColor("#ffffff");
      }
    }
  }, [bgColor]);

  const handleChange = (e) => {
    setBgColor(e.target.value);
  };

  return (
    <div className={`${css(styles.main)}`}>
      <div className="searchBar">
        <TextField
          placeholder="Search by #D8D8D8"
          icon={Images.searchBarIcon}
          styles={[styles.formInput]}
          iconStyles={[styles.searchIcon]}
          value={bgColor}
          onChange={handleChange}
        />
      </div>

      <div
        className={`d-flex justify-content-start align-items-center ${css(
          styles.colorPickerRow
        )}`}
      >
        <button
          className={`${css(styles.addIconWrapper)}`}
          style={{ border: `0.2vw solid ${showPicker ? "#7ee4f9" : "#fff"} ` }}
        >
          <SVG
            width="auto"
            height="auto"
            src={Images.plusIcon}
            className={`${css(styles.addIcon)}`}
            onClick={() => setShowPicker(true)}
          />
        </button>

        <div
          className={`${css([styles.colorWrapper])}`}
          style={{
            backgroundColor: bgColor,
          }}
        />
      </div>

      {showPicker && (
        <div className={`${css(styles.popover)}`}>
          <div
            onClick={() => setShowPicker(false)}
            className={`${css(styles.cover)}`}
          />
          <SketchPicker
            color={bgColor}
            disableAlpha
            onChange={handleChangeColor}
          />
        </div>
      )}

      <div className={`d-flex ${css(styles.subHeading)}`}>
        <span>Default Colors</span>
      </div>

      <div>
        {DEFAULT_COLORS &&
          DEFAULT_COLORS.map((row) => (
            <div key={uuid()} className="d-flex justify-content-between">
              {row.map((dColor) => (
                <ColorBox
                  key={dColor.id}
                  dColor={dColor}
                  bgColor={bgColor}
                  handleUpdateBgColor={handleUpdateBgColor}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ColorPicker;
