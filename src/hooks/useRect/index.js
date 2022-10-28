import { createRef, useState } from "react";
import { v4 as uuid } from "uuid";

const useRect = (
  zoomValue,
  state,
  setState,
  ref,
  allElements,
  setAllElements,
  canvasData
) => {
  const [drawRectangleEnabled, setDrawRectangleEnabled] = useState(false);

  const handleSetDrawRectangleEnabled = (val) => {
    setDrawRectangleEnabled(val);
  };

  const handleRectangleOnMouseMove = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    const lastRect = allElements[allElements.length - 1];
    if (lastRect) {
      const sx = lastRect.x;
      const sy = lastRect.y;

      const updatedLastRect = {
        ...lastRect,
        x: sx,
        y: sy,
        width: point.x / (zoomValue / 100) - sx,
        height: point.y / (zoomValue / 100) - sy,
        id: lastRect.id,
      };

      const newRects = [...allElements];
      newRects.splice(allElements.length - 1, 1, updatedLastRect);

      setAllElements(newRects.concat());
    }
  };

  const handleRectangleOnMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();

    setAllElements([
      ...allElements,
      {
        x: pos.x / (zoomValue / 100),
        y: pos.y / (zoomValue / 100),
        height: 0,
        width: 0,
        id: uuid(),
        isLocked: false,
        color: "#523ce6",
        name: "rect",
        opacity: 1,
        shapeRef: createRef(),
      },
    ]);
  };

  const handleRectangleOnMouseUp = () => {
    setDrawRectangleEnabled(false);
    setState({ ...state, allElements: [...allElements] });

    try {
      ref.current.content.style.cursor = "default";
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRandomRectangle = (data) => {
    const newElement = {
      y: canvasData.canvasInPx.canvasHeight / 2,
      x: canvasData.canvasInPx.canvasWidth / 2,
      width: (canvasData.canvasInPx.canvasWidth * 30) / 100,
      height: (canvasData.canvasInPx.canvasHeight * 30) / 100,
      id: uuid(),
      isLocked: false,
      color: "red",
      name: "rect",
      opacity: 1,
      ...data,
    };

    setAllElements([...allElements, { ...newElement }]);
    setState({ ...state, allElements: [...allElements, { ...newElement }] });
  };

  const handleRectangleDrag = (id, newRect) => {
    const elements = [...allElements];
    const rectId = elements.findIndex((rect) => rect.id === id);
    if (elements[rectId]) {
      elements[rectId] = newRect;
      setState({ ...state, allElements: [...elements] });
      setAllElements(elements);
    }
  };

  const handleUpdateRect = (shape, data) => {
    const elements = [...allElements];

    const idx = elements.findIndex((l) => l.id === shape.id);
    if (idx !== -1) {
      elements[idx] = { ...elements[idx], ...data };

      setState({ ...state, allElements: [...elements] });
      setAllElements(elements);
    }
  };

  return {
    // rectangles,
    drawRectangleEnabled,
    handleSetDrawRectangleEnabled,
    handleRectangleOnMouseDown,
    handleRectangleOnMouseMove,
    handleRectangleOnMouseUp,
    handleRectangleDrag,
    // setRectangles,
    handleUpdateRect,
    handleAddRandomRectangle,
  };
};

export default useRect;
