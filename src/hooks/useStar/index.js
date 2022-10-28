import { createRef } from "react";
import { v4 as uuid } from "uuid";

const useStar = (
  zoomValue,
  state,
  setState,
  ref,
  allElements,
  setAllElements,
  canvasData
) => {
  const handleAddRandomStar = (data) => {
    const newElement = {
      y: canvasData.canvasInPx.canvasHeight / 2,
      x: canvasData.canvasInPx.canvasWidth / 2,
      innerRadius: (canvasData.canvasInPx.canvasWidth * 13) / 100,
      outerRadius: (canvasData.canvasInPx.canvasHeight * 30) / 100,
      numPoints: 5,
      id: uuid(),
      color: "#00A1FF",
      name: "star",
      isLocked: false,
      opacity: 1,
      shapeRef: createRef(),
      ...data,
    };

    setAllElements([...allElements, { ...newElement }]);
    setState({ ...state, allElements: [...allElements, { ...newElement }] });
  };

  const handleStarDrag = (id, newRect) => {
    const elements = [...allElements];
    const rectId = elements.findIndex((rect) => rect.id === id);
    if (elements[rectId]) {
      elements[rectId] = newRect;
      setState({ ...state, allElements: [...elements] });
      setAllElements(elements);
    }
  };

  const handleUpdateStar = (shape, data) => {
    const elements = [...allElements];

    const idx = elements.findIndex((l) => l.id === shape.id);
    if (idx !== -1) {
      elements[idx] = { ...elements[idx], ...data };

      setState({ ...state, allElements: [...elements] });
      setAllElements(elements);
    }
  };

  return {
    handleStarDrag,
    handleUpdateStar,
    handleAddRandomStar,
  };
};

export default useStar;
