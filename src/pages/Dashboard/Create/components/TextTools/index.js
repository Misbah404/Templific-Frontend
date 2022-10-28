import { css } from "aphrodite";
import { useEffect } from "react";
import { useState } from "react";
import SVG from "react-inlinesvg";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { SketchPicker } from "react-color";
import styles from "./styles";
import { Images, glyphs, Colors } from "../../../../../theme";
import { connect } from "react-redux";
import { TextField } from "../../../../../components";
import {
  alignMent,
  positionData,
  textTransform,
} from "../../../../../constants";
import { ToolbarButton } from "..";

import { v4 as uuid } from "uuid";
import _ from "lodash";
import { text } from "@fortawesome/fontawesome-svg-core";

const TextTools = ({ selectElement, selectedStage, zoomValue, fonts }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [textState, setTextState] = useState(selectElement);
  const [rangeSlider, setRangeSlider] = useState(selectElement.letterSpacing);
  const [lineHeight, setLineHeight] = useState(selectElement.lineHeight);
  const [showLineHeightRangeSlider, setShowLineHeightRangeSlider] =
    useState(false);
  const [strokeSlider, setStrokeSlider] = useState(selectElement.strokeWidth);
  const [showRangeSlider, setShowRangeSlider] = useState(false);
  const [shadowSlider, setShadowSlider] = useState(false);
  const [shadowOffset, setShadowOffset] = useState(selectElement.shadowOffset);
  const [showShadowPicker, setShowShadowPicker] = useState(false);
  const [showStrokeSize, setShowStrokeSize] = useState(false);
  const [showPositions, setShowPositions] = useState(false);
  const [showGlyphs, setShowGlyphs] = useState(false);
  const [search, setSearch] = useState("");

  const [textColor, setTextColor] = useState("#000");
  const [shadowColor, setShadowColor] = useState(selectElement.shadowColor);
  console.log({selectElement})

  useEffect(() => {
    setTextState({
      ...selectElement,
    });

    setTextColor(selectElement.color);

    setRangeSlider(selectElement.letterSpacing);
    setLineHeight(selectElement.lineHeight || 1);
  }, [selectElement]);

  const handleChangeColor = (e) => {
    setTextColor(e.hex);

    selectedStage?.canvas?.current?.handleUpdateText(
      { color: e.hex },
      selectElement.id
    );
  };

  const handleChangeShadowColor = (e) => {
    setShadowColor(e.hex);

    selectedStage?.canvas?.current?.handleUpdateText(
      { shadowColor: e.hex },
      selectElement.id
    );
  };

  const handleTextBold = () => {
    selectedStage?.canvas?.current?.handleUpdateText(
      { bold: !textState?.bold },
      selectElement.id
    );

    setTextState({
      ...textState,
      bold: !textState.bold,
    });
  };

  const handleTextItalic = () => {
    selectedStage?.canvas?.current?.handleUpdateText(
      { italic: !textState?.italic },
      selectElement.id
    );

    setTextState({
      ...textState,
      italic: !textState.italic,
    });
  };

  const handleAddGlyph = (glyph) => {
    // const newText = {...textState}
    selectedStage?.canvas?.current?.handleAddGlyph(glyph, selectElement.id);

    setTextState((state) => ({
      ...state,
      text: state.text + glyph,
    }));
  };

  const handleUnderLine = () => {
    selectedStage?.canvas?.current?.handleUpdateText(
      { underLine: !textState?.underLine },
      selectElement.id
    );

    setTextState({
      ...textState,
      underLine: !textState.underLine,
    });
  };

  const handleUpdateFont = (val) => {
    selectedStage?.canvas?.current?.handleUpdateText(
      { fontSize: val },
      selectElement.id,
      selectElement
    );

    setTextState({
      ...textState,
      fontSize: val,
    });
  };

  const handleTextAlignment = (item) => {
    selectedStage?.canvas?.current?.handleUpdateText(
      { align: item.align },
      selectElement.id
    );

    setTextState({
      ...textState,
      align: item.align,
    });
  };

  const handleTextTransform = (item) => {
    let textData = { ...textState };
    if (item.val === "lowerCase")
      textData = {
        ...textData,
        text: textData.text.toLowerCase(),
        transformedText: "aa",
      };
    if (item.val === "upperCase")
      textData = {
        ...textData,
        text: textData.text.toUpperCase(),
        transformedText: "AA",
      };

    if (item.val === "capitalize")
      textData = {
        ...textData,
        text: textData.text
          .split(" ")
          .map((word) => {
            return (
              word[0].toUpperCase() + word.slice(1, word.length).toLowerCase()
            );
          })
          .join(" "),
        transformedText: "Aa",
      };

    selectedStage?.canvas?.current?.handleTransformText(item, selectElement.id);

    setTextState({ ...textData });
  };

  const handleRangeChange = (e) => {
    setRangeSlider(e.target.value);

    selectedStage?.canvas?.current?.handleUpdateText(
      { letterSpacing: e.target.value },
      selectElement.id
    );

    setTextState({ ...textState, letterSpacing: e.target.value });
  };

  const handleLineHeightChange = (e) => {
    setLineHeight(e.target.value);

    selectedStage?.canvas?.current?.handleUpdateText(
      { lineHeight: e.target.value },
      selectElement.id
    );

    setTextState({ ...textState, lineHeight: e.target.value });
  };

  const handleStrokeChange = (e) => {
    setStrokeSlider(e.target.value);

    selectedStage?.canvas?.current?.handleUpdateText(
      { strokeWidth: parseInt(e.target.value) },
      selectElement.id
    );

    setTextState({ ...textState, strokeWidth: e.target.value });
  };
  const handleShadowChange = (e) => {
    setShadowOffset(e.target.value);

    selectedStage?.canvas?.current?.handleUpdateText(
      { shadowOffset: parseInt(e.target.value) },
      selectElement.id
    );

    setTextState({ ...textState, shadowOffset: e.target.value });
  };

  const handleDuplicateElement = () => {
    selectedStage?.canvas?.current?.handleDuplicateText(textState.id);
  };

  const handleUpdateFontFamily = (fontFamily) => {
    selectedStage?.canvas?.current?.handleUpdateText(
      { fontFamily: fonts[fontFamily].fontClass || fontFamily },
      selectElement.id
    );

    selectedStage?.canvas?.current?.handleAddFontFamily(fontFamily);
    setTextState({
      ...textState,
      fontFamily: fonts?.[fontFamily]?.fontClass || fontFamily,
    });
  };

  const handleChangeTextOutlined = () => {
    selectedStage?.canvas?.current?.handleUpdateText(
      { outlined: !textState.outlined },
      selectElement.id
    );

    setTextState({ ...textState, outlined: !textState.outlined });
  };

  const handlePositions = (position) => {
    selectedStage.canvas?.current?.handleTextAlignment(
      position?.action,
      selectElement.id,
      selectElement
    );
  };

  const filteredFonts = Object.keys(fonts).filter(
    (font) =>
      font.toLowerCase().match(search.toLocaleLowerCase()) &&
      !fonts[font].isDeleted
  );

  let allGlyphs = fonts?.[textState.fontFamily]?.fontGlyphs;

  allGlyphs = _.flattenDeep(allGlyphs);

  allGlyphs = [...new Set([...allGlyphs])];

  allGlyphs =
    allGlyphs?.length <= textState?.fontFamily?.length ? [] : allGlyphs;

  return (
    <div className={`d-flex justify-content-between ${css(styles.main)}`}>
      <Dropdown
        className={`d-flex align-self-center ${css(styles.hideDropDownIcon)}`}
      >
        <OverlayTrigger
          overlay={<Tooltip>Font Family</Tooltip>}
          placement={"bottom"}
        >
          {({ ref, ...triggerHandler }) => (
            <Dropdown.Toggle
              id="dropdown-autoclose-true"
              variant="transparent"
              className={`d-flex p-0 align-items-center justify-content-between ${css(
                styles.toolBarDropDown
              )}`}
              style={{
                width: "14vw",
                border: `.2vw solid ${Colors.lightGray}`,
              }}
              {...triggerHandler}
            >
              <span className={`${css(styles.dropDownText)}`} ref={ref}>
                {
                  // Object.keys(fonts).includes(textState.fontFamily)
                  //   ?
                  textState.fontFamily.length > 17
                    ? textState.fontFamily.substring(0, 17) + "..."
                    : textState.fontFamily
                  // : "Arial"
                }
              </span>
            </Dropdown.Toggle>
          )}
        </OverlayTrigger>

        <Dropdown.Menu className={`${css(styles.fontFamilyDropDown)}`}>
          <div
            className={`d-flex align-items-center ${css(
              styles.dropdownSearchWrapper
            )}`}
          >
            <TextField
              placeholder="Search Fonts"
              icon={Images.searchBarIcon}
              styles={[styles.formInput]}
              iconStyles={[styles.searchIcon]}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {filteredFonts &&
            filteredFonts.map((font) => (
              <Dropdown.Item
                className={`d-flex align-items-center`}
                onClick={() => handleUpdateFontFamily(font)}
                style={{ outline: "none" }}
              >
                {font?.length > 24 ? font.substring(0, 21) + "..." : font}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>

      <ToolbarButton
        image={Images.textColorSelectorIcon}
        conditionStyle={null}
        tooltip="Text Color"
        color={textState.color}
        handleClick={() => setShowPicker(true)}
      />

      {showPicker && (
        <div className={`${css(styles.popover)}`}>
          <div
            onClick={() => setShowPicker(false)}
            className={`${css(styles.cover)}`}
          />
          <SketchPicker
            color={textColor}
            disableAlpha
            onChange={handleChangeColor}
            // onChangeComplete={handleChangeComplete}
          />
        </div>
      )}

      <ToolbarButton
        image={Images.boldIcon}
        conditionStyle={textState.bold}
        tooltip="Bold"
        handleClick={handleTextBold}
      />

      <ToolbarButton
        image={Images.textOutlineIcon}
        conditionStyle={textState.outlined}
        tooltip="Text Outline"
        handleClick={handleChangeTextOutlined}
      />

      <ToolbarButton
        image={Images.underlineIcon}
        conditionStyle={textState.underLine}
        tooltip="Underline"
        handleClick={handleUnderLine}
      />

      <Dropdown
        className={`d-flex align-self-center align-items-center ${css(
          styles.hideDropDownIcon
        )}`}
      >
        <OverlayTrigger
          overlay={<Tooltip>{"Font size"}</Tooltip>}
          placement={"bottom"}
        >
          {({ ref, ...triggerHandler }) => (
            <Dropdown.Toggle
              id="dropdown-autoclose-true"
              variant="transparent"
              className={`d-flex p-0 align-items-center ${css(
                styles.toolBarDropDown
              )}`}
              {...triggerHandler}
            >
              <span className={`${css(styles.dropDownText)}`} ref={ref}>
                {parseInt(textState.fontSize)}
              </span>
            </Dropdown.Toggle>
          )}
        </OverlayTrigger>

        <Dropdown.Menu className={`${css(styles.toolBarMenu)}`}>
          {[...Array(501).keys()].map((i) => (
            <Dropdown.Item
              className={`d-flex align-items-center`}
              onClick={() => handleUpdateFont(i)}
              style={{ outline: "none" }}
            >
              {i}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className={`d-flex align-self-center`}>
        <OverlayTrigger
          overlay={<Tooltip>{"Text Align"}</Tooltip>}
          placement={"bottom"}
        >
          {({ ref, ...triggerHandler }) => (
            <Dropdown.Toggle
              id="dropdown-autoclose-true"
              variant="transparent"
              className={`d-flex p-0 align-items-center ${css(
                styles.toolBarDropDown
              )} ${css(styles.hideDropDownIcon)}`}
              {...triggerHandler}
            >
              <SVG
                ref={ref}
                height="auto"
                width="auto"
                src={
                  alignMent.filter((d) => d.align === textState.align)[0].icon
                }
                className={`${css(styles.toolbarIcon)}`}
              />
            </Dropdown.Toggle>
          )}
        </OverlayTrigger>

        <Dropdown.Menu className={`${css(styles.toolBarMenu)}`}>
          {alignMent.map((item) => (
            <Dropdown.Item
              className={`d-flex align-items-center`}
              onClick={() => handleTextAlignment(item)}
              style={{ outline: "none" }}
              key={item.align}
            >
              <SVG
                height="auto"
                width="auto"
                src={item.icon}
                className={`${css(styles.toolbarIcon)}`}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className={`d-flex align-self-center`}>
        <OverlayTrigger
          overlay={<Tooltip>{"Text transform"}</Tooltip>}
          placement={"bottom"}
        >
          {({ ref, ...triggerHandler }) => (
            <Dropdown.Toggle
              id="dropdown-autoclose-true"
              variant="transparent"
              className={`d-flex p-0 align-items-center ${css(
                styles.toolBarDropDown
              )} ${css(styles.hideDropDownIcon)}`}
              {...triggerHandler}
            >
              <SVG
                ref={ref}
                height="auto"
                width="auto"
                src={
                  textTransform.filter(
                    (t) => t.name === textState.transformedText
                  )[0].icon
                }
                className={`${css(styles.toolbarIcon)}`}
              />
            </Dropdown.Toggle>
          )}
        </OverlayTrigger>

        <Dropdown.Menu className={`${css(styles.toolBarMenu)}`}>
          {textTransform.map((item) => (
            <Dropdown.Item
              className={`d-flex align-items-center`}
              onClick={() => handleTextTransform(item)}
              style={{ outline: "none" }}
              key={item.align}
            >
              <SVG
                height="auto"
                width="auto"
                src={item.icon}
                className={`${css(styles.toolbarIcon)}`}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <ToolbarButton
        image={Images.glyphIcon}
        conditionStyle={null}
        tooltip="Glyphs"
        handleClick={() => setShowGlyphs(true)}
      />

      {showGlyphs && (
        <div className={`${css(styles.glyphPopOver)}`}>
          <div
            onClick={() => setShowGlyphs(false)}
            className={`${css(styles.cover)}`}
          />
          <div
            className={`d-flex justify-content-around align-items-center flex-wrap ${css(
              styles.glyphWrapper
            )}`}
          >
            {allGlyphs?.length > 0 ? (
              <>
                <div
                  className={`${css(styles.glyphTitle)} w-100`}
                  style={{ fontFamily: textState.fontFamily }}
                >
                  {textState?.fontFamily}
                </div>
                {allGlyphs.map((glyph) => (
                  <>
                    {glyph && glyph !== "" && glyph?.length > 0 && (
                      <span
                        className={`${css(styles.glyphText)}`}
                        key={uuid()}
                        onClick={() => handleAddGlyph(glyph)}
                        style={{ fontFamily: textState?.fontFamily }}
                      >
                        {glyph}
                      </span>
                    )}
                  </>
                ))}
              </>
            ) : (
              glyphs.map((glyph) => (
                <span
                  className={`${css(styles.glyphText)}`}
                  key={uuid()}
                  style={{ fontFamily: textState.fontFamily }}
                  onClick={() => handleAddGlyph(glyph)}
                >
                  {glyph}
                </span>
              ))
            )}
          </div>
        </div>
      )}

      <ToolbarButton
        image={Images.textSpacingIcon}
        conditionStyle={null}
        tooltip="Letter spacing"
        handleClick={() => setShowRangeSlider(true)}
      />

      {showRangeSlider && (
        <div className={`${css(styles.rangePopOver)}`}>
          <div
            onClick={() => setShowRangeSlider(false)}
            className={`${css(styles.cover)}`}
          />
          <div
            className={`d-flex justify-content-center align-items-center ${css(
              styles.rangeSliderWrapper
            )}`}
          >
            <input
              type="range"
              max="20"
              min="0"
              step="1"
              value={rangeSlider}
              onChange={handleRangeChange}
              className={`${css(styles.rangeSlider)}`}
            />
          </div>
        </div>
      )}
      {/* 
      <ToolbarButton
        image={Images.lineHeight}
        conditionStyle={null}
        tooltip="Line Height"
        handleClick={() => setShowLineHeightRangeSlider(true)}
      /> */}

      <OverlayTrigger
        overlay={<Tooltip>{"Line Height"}</Tooltip>}
        placement={"bottom"}
      >
        {({ ref, ...triggerHandler }) => (
          <button
            onClick={() => setShowLineHeightRangeSlider(true)}
            className={`d-flex justify-content-center align-items-center ${css([
              styles.toolbarIconBtn,
            ])}`}
            {...triggerHandler}
          >
            <img
              ref={ref}
              height="auto"
              width="auto"
              src={Images.lineHeight}
              className={`${css(styles.toolbarIcon)}`}
            />
          </button>
        )}
      </OverlayTrigger>
      {showLineHeightRangeSlider && (
        <div className={`${css(styles.rangePopOver)}`}>
          <div
            onClick={() => setShowLineHeightRangeSlider(false)}
            className={`${css(styles.cover)}`}
          />
          <div
            className={`d-flex justify-content-center align-items-center ${css(
              styles.rangeSliderWrapper
            )}`}
          >
            <input
              type="range"
              max="2.5"
              min="1"
              step=".05"
              value={lineHeight}
              onChange={handleLineHeightChange}
              className={`${css(styles.rangeSlider)}`}
            />
          </div>
        </div>
      )}

      <ToolbarButton
        image={Images.duplicateIcon}
        conditionStyle={null}
        tooltip="Text duplicate"
        handleClick={handleDuplicateElement}
      />

      <ToolbarButton
        image={Images.positionIcon}
        conditionStyle={null}
        tooltip="Text position"
        handleClick={() => setShowPositions(true)}
      />

      {showPositions && (
        <div
          className={`${css(styles.rangePopOver)} ${css(
            styles.positionPopOver
          )}`}
        >
          <div
            onClick={() => setShowPositions(false)}
            className={`${css(styles.cover)}`}
          />
          <div
            className={`d-flex justify-content-start align-items-center ${css(
              styles.positionWrapper
            )}`}
          >
            <div
              className={`d-flex justify-content-between align-items-center flex-wrap`}
            >
              {positionData.alignment.map((pos) => (
                <div
                  className={`${css(styles.positionItem)}`}
                  key={pos.name}
                  onClick={() => handlePositions(pos)}
                >
                  <div
                    className={`d-flex justify-content-start align-items-center`}
                  >
                    <SVG
                      height="auto"
                      width="auto"
                      src={pos.icon}
                      className={`${css(styles.positionIcons)}`}
                    />

                    {pos.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ToolbarButton
        image={Images.strokeWidthIcon}
        conditionStyle={null}
        tooltip="Stroke Width"
        handleClick={() => setShowStrokeSize(true)}
      />

      {showStrokeSize && (
        <div className={`${css(styles.rangePopOver)}`}>
          <div
            onClick={() => setShowStrokeSize(false)}
            className={`${css(styles.cover)}`}
          />
          <div
            className={`d-flex justify-content-center align-items-center ${css(
              styles.strokeSliderWrapper
            )}`}
          >
            <input
              type="range"
              max="20"
              min="1"
              step="1"
              value={strokeSlider}
              onChange={handleStrokeChange}
              className={`${css(styles.rangeSlider)}`}
            />
          </div>
        </div>
      )}

      <ToolbarButton
        image={Images.textShadowIcon}
        conditionStyle={null}
        tooltip="Shadow Offset"
        handleClick={() => setShadowSlider(true)}
      />

      {shadowSlider && (
        <div className={`${css(styles.range2PopOver)}`}>
          <div
            onClick={() => setShadowSlider(false)}
            className={`${css(styles.cover)}`}
          />
          <div
            className={`d-flex justify-content-center align-items-center ${css(
              styles.strokeSliderWrapper
            )}`}
          >
            <input
              type="range"
              max="20"
              min="0"
              step="1"
              value={shadowOffset}
              onChange={handleShadowChange}
              className={`${css(styles.rangeSlider)}`}
            />
          </div>
        </div>
      )}

      <ToolbarButton
        image={Images.textColorSelectorIcon}
        conditionStyle={null}
        tooltip="Shadow Color"
        handleClick={() => setShowShadowPicker(true)}
      />

      {showShadowPicker && (
        <div className={`${css(styles.shadowPopover)}`}>
          <div
            onClick={() => setShowShadowPicker(false)}
            className={`${css(styles.cover)}`}
          />
          <SketchPicker
            color={shadowColor}
            disableAlpha
            onChange={handleChangeShadowColor}
            // onChangeComplete={handleChangeComplete}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  fonts: { ...state.canvasData.defaultFonts, ...state.canvasData.fonts },
});

export default connect(mapStateToProps)(TextTools);
