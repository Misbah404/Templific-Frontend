import { createRef, useState } from "react";
import { v4 as uuid } from "uuid";

const useArrow = (
  zoomValue,
  state,
  setState,
  ref,
  allElements,
  setAllElements
) => {
  const [drawArrowEnabled, setDrawArrowEnabled] = useState(false);

  const handleSetDrawArrowEnabled = (val) => {
    setDrawArrowEnabled(val);
  };

  const handleArrowOnMouseMove = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    let lastArrow = allElements[allElements.length - 1];

    if (lastArrow) {
      lastArrow.points = [
        lastArrow.points[0],
        lastArrow.points[1],
        point.x / (zoomValue / 100),
        point.y / (zoomValue / 100),
      ];

      const newElements = [...allElements];
      newElements.splice(newElements.length - 1, 1, lastArrow);
      setAllElements(newElements.concat());
    }
  };

  const handleArrowOnMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();

    setAllElements([
      ...allElements,
      {
        points: [pos.x / (zoomValue / 100), pos.y / (zoomValue / 100)],
        id: uuid(),
        isLocked: false,
        color: "#523ce6",
        name: "arrow",
        opacity: 1,
        height: 20,
        shapeRef: createRef(),
        x: 0,
        y: 0,
      },
    ]);
  };

  const handleArrowOnMouseUp = (e) => {
    const filteredElements = allElements?.filter((element) => {
      if (element.name === "arrow") {
        return element.points.length > 2;
      } else {
        return element;
      }
    });
    if (filteredElements) {
      setAllElements(filteredElements);
      // setState({ ...state, arrows: filteredElements });
      setState({ ...state, allElements: [...filteredElements] });
    }
    setDrawArrowEnabled(false);
    try {
      ref.current.content.style.cursor = "default";
    } catch (error) {
      console.error(error);
    }
  };

  const handleArrowDrag = (id, newArrow) => {
    const elements = [...allElements];

    const arrowIdx = elements.findIndex((element) => element.id === id);

    if (elements[arrowIdx]) {
      elements[arrowIdx] = newArrow;

      setAllElements([...elements]);
      setState({ ...state, allElements: [...elements] });
    }
  };

  const handleUpdateArrow = (shape, data) => {
    const elements = [...allElements];

    const idx = elements.findIndex((l) => l.id === shape.id);
    if (idx !== -1) {
      elements[idx] = { ...elements[idx], ...data };

      setAllElements(elements);

      setState({ ...state, allElements: [...elements] });
    }
  };

  return {
    drawArrowEnabled,
    handleSetDrawArrowEnabled,
    handleArrowOnMouseDown,
    handleArrowOnMouseMove,
    handleArrowOnMouseUp,
    handleArrowDrag,
    handleUpdateArrow,
  };
};

export default useArrow;
