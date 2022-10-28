import { createRef, useState } from "react";
import { v4 as uuid } from "uuid";

const useLine = (
  zoomValue,
  state,
  setState,
  ref,
  allElements,
  setAllElements
) => {
  const [drawLineEnabled, setDrawLineEnabled] = useState(false);

  const handleSetDrawLineEnabled = (val) => {
    setDrawLineEnabled(val);
  };

  const handleLineOnMouseMove = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    let lastLine = allElements[allElements.length - 1];

    if (lastLine) {
      lastLine.points = [
        lastLine.points[0],
        lastLine.points[1],
        point.x / (zoomValue / 100),
        point.y / (zoomValue / 100),
      ];

      const newLines = [...allElements];
      newLines.splice(allElements.length - 1, 1, lastLine);
      setAllElements(newLines.concat());
    }
  };

  const handleLineOnMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();

    setAllElements([
      ...allElements,
      {
        points: [pos.x / (zoomValue / 100), pos.y / (zoomValue / 100)],
        id: uuid(),
        isLocked: false,
        color: "#523ce6",
        name: "line",
        attrs: {
          strokeWidth: 3,
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        },
        opacity: 1,
        shapeRef: createRef(),
      },
    ]);
  };

  const handleLineOnMouseUp = () => {
    const filteredElements = allElements?.filter((element) => {
      if (element.name === "line") {
        return element.points.length > 2;
      } else {
        return element;
      }
    });
    if (filteredElements) {
      setAllElements(filteredElements);
      setState({ ...state, allElements: [...filteredElements] });
    }
    setDrawLineEnabled(false);

    try {
      ref.current.content.style.cursor = "default";
    } catch (error) {
      console.error(error);
    }
  };

  const handleLineDrag = (id, newLine) => {
    const elements = [...allElements];

    const line = elements.findIndex((element) => element.id === id);

    if (elements[line]) {
      elements[line] = newLine;
      // setState({ ...state, lines: elements });
      setAllElements(elements);
      setState({ ...state, allElements: [...elements] });
    }
  };

  const handleUpdateLine = (shape, data) => {
    const elements = [...allElements];

    const idx = elements.findIndex((l) => l.id === shape.id);
    if (idx !== -1) {
      elements[idx] = { ...elements[idx], ...data };

      setAllElements(elements);

      setState({ ...state, allElements: [...elements] });
    }
  };

  const handleUpdateStrokeWidth = (shape, strokeWidth) => {
    const elements = [...allElements];

    const idx = elements.findIndex((l) => l.id === shape.id);

    if (idx !== -1) {
      elements[idx] = {
        ...elements[idx],
        attrs: { ...elements[idx].attrs, strokeWidth },
      };

      setAllElements(elements);

      setState({ ...state, allElements: [...elements] });
    }
  };

  return {
    drawLineEnabled,
    handleSetDrawLineEnabled,
    handleLineOnMouseDown,
    handleLineOnMouseMove,
    handleLineOnMouseUp,
    handleLineDrag,
    handleUpdateLine,
    handleUpdateStrokeWidth,
  };
};

export default useLine;
