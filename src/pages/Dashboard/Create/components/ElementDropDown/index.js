import {css} from "aphrodite";
import {useState} from "react";
import {Dropdown} from "react-bootstrap";
import SVG from "react-inlinesvg";
import {ToolbarButton} from "..";
import {Images} from "../../../../../theme";
import styles from "./styles";

const allElements = [
  {
    icon: Images.rectangleIcon,
    title: "Rectangle",
  },
  {
    icon: Images.lineIcon,
    title: "Line",
  },
  {
    icon: Images.ellipseIcon,
    title: "Ellipse",
  },
  {
    icon: Images.polygonIcon,
    title: "Polygon",
  },
  {
    icon: Images.arrowIcon,
    title: "Arrow Line",
  },
];

const ElementDropDown = (props) => {
  const [activeElement, setActiveElement] = useState(Images.rectangleIcon);
  const [showStrokeSize, setShowStrokeSize] = useState(() => false);
  const {selectedStage, selectElement} = props;
  const [strokeSlider, setStrokeSlider] = useState(
    selectElement?.attrs?.strokeWidth || 3
  );

  const handleElementClick = (element) => {
    setActiveElement(element.icon);

    if (element.title === "Line") {
      selectedStage?.canvas?.current?.enableDrawLine();
    }
    element.title === "Rectangle" &&
      selectedStage?.canvas?.current?.enableDrawRectangle();

    element.title === "Ellipse" &&
      selectedStage?.canvas?.current?.enableDrawEllipse();

    element.title === "Polygon" &&
      selectedStage?.canvas?.current?.enableDrawPolygon();

    element.title === "Arrow Line" &&
      selectedStage?.canvas?.current?.enableDrawArrow();

    try {
      selectedStage.canvas.current.content.style.cursor = "crosshair";
    } catch (error) {
      console.error(error);
    }
  };

  const handleStrokeChange = (e) => {
    setStrokeSlider(e.target.value);
    selectedStage?.canvas?.current.handleUpdateStrokeWidth(
      selectElement,
      parseInt(e.target.value)
    );
  };

  return (
    <div className='d-flex align-items-center'>
      {props.layout.sideBar && props.layout.sideBarElement === "elements" && (
        <Dropdown
          className={`d-inline align-self-center ${css(styles.menuLi)}`}>
          <Dropdown.Toggle
            id='dropdown-autoclose-true'
            variant='transparent'
            className={`d-flex p-0 align-items-center`}>
            <span>Shapes</span>

            <SVG
              width='auto'
              height='auto'
              src={activeElement}
              className={`${css(styles.mainElement)}`}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {allElements &&
              allElements.map((element) => (
                <Dropdown.Item
                  className={`d-flex align-items-center ${css(
                    styles.dropDownItem
                  )}`}
                  onClick={() => handleElementClick(element)}
                  style={{outline: "none"}}
                  key={element.title}>
                  <SVG
                    width='auto'
                    height='auto'
                    src={element.icon}
                    className={`${css(styles.listElements)}`}
                  />
                  {element.title}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      )}

      {selectElement?.name === "line" && (
        <div style={{position: "relative"}}>
          <ToolbarButton
            image={Images.strokeWidthIcon}
            conditionStyle={null}
            tooltip='Stroke Width'
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
                )}`}>
                <input
                  type='range'
                  max='150'
                  min='3'
                  step='.5'
                  value={strokeSlider}
                  onChange={handleStrokeChange}
                  className={`${css(styles.rangeSlider)}`}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ElementDropDown;
