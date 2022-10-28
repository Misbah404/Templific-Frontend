import { createRef } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const useEllipse = (
  zoomValue,
  state,
  setState,
  ref,
  allElements,
  setAllElements,
  canvasData
) => {
  const [drawEllipseEnabled, setDrawEllipseEnabled] = useState(false);

  const handleSetDrawEllipseEnabled = (val) => {
    setDrawEllipseEnabled(val);
  };

  const handleEllipseOnMouseMove = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    const lastElement = allElements[allElements.length - 1];
    if (lastElement) {
      const sx = lastElement.x;
      const sy = lastElement.y;

      const updatedLastRect = {
        ...lastElement,
        x: sx,
        y: sy,
        width: Math.abs(point.x / (zoomValue / 100) - sx),
        height: Math.abs(point.y / (zoomValue / 100) - sy),
        radiusX: Math.abs(sx - point.x / (zoomValue / 100)) / 2,
        radiusY: Math.abs(sy - point.y / (zoomValue / 100)) / 2,
        id: lastElement.id,
      };

      const newElements = [...allElements];
      newElements.splice(allElements.length - 1, 1, updatedLastRect);

      setAllElements(newElements.concat());
    }
  };

  const handleEllipseOnMouseDown = (e) => {
    const pos = e?.target?.getStage()?.getPointerPosition();

    setAllElements([
      ...allElements,
      {
        x: pos.x / (zoomValue / 100),
        y: pos.y / (zoomValue / 100),
        radiusX: 0,
        radiusY: 0,
        height: 0,
        width: 0,
        id: uuid(),
        isLocked: false,
        color: "#523ce6",
        name: "ellipse",
        opacity: 1,
        shapeRef: createRef(),
      },
    ]);
  };

  const handleEllipseOnMouseUp = (e) => {
    if (allElements && allElements.length > 0) {
      const filteredElements = allElements.filter((el) => {
        if (el.name === "ellipse") {
          return el.radiusX > 0 && el.radiusY > 0;
        } else {
          return el;
        }
      });

      setAllElements(filteredElements);
      setState({ ...state, allElements: [...filteredElements] });
    }
    setDrawEllipseEnabled(false);

    try {
      ref.current.content.style.cursor = "default";
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRandomEllipse = (data) => {
    const newElement = {
      y: canvasData.canvasInPx.canvasHeight / 2,
      x: canvasData.canvasInPx.canvasWidth / 2,
      width: (canvasData.canvasInPx.canvasWidth * 30) / 100,
      height: (canvasData.canvasInPx.canvasHeight * 30) / 100,
      radiusX: (canvasData.canvasInPx.canvasWidth * 30) / 100,
      radiusY: (canvasData.canvasInPx.canvasWidth * 30) / 100,
      id: uuid(),
      isLocked: false,
      color: "red",
      name: "ellipse",
      opacity: 1,
      ...data,
    };

    setAllElements([...allElements, { ...newElement }]);
    setState({ ...state, allElements: [...allElements, { ...newElement }] });
  };

  const handleEllipseDrag = (id, newShape) => {
    const elements = [...allElements];
    const shapeId = elements.findIndex((shape) => shape.id === id);
    if (elements[shapeId]) {
      elements[shapeId] = newShape;
      setState({ ...state, allElements: elements });
      setAllElements(elements);
    }
  };

  const handleEllipseUpdateLockState = (id) => {
    const allShapes = [...allElements];
    const idx = allShapes.findIndex((shape) => shape.id === id);
    if (allShapes[idx]) {
      allShapes[idx] = {
        ...allShapes[idx],
        isLocked: !allShapes[idx].isLocked,
      };
      setState({ ...state, allElements: allShapes });
      setAllElements(allShapes);
    }
  };

  const handleUpdateEllipse = (shape, data) => {
    const elements = [...allElements];

    const idx = elements.findIndex((l) => l.id === shape.id);
    if (idx !== -1) {
      elements[idx] = { ...elements[idx], ...data };

      setAllElements(elements);

      setState({ ...state, allElements: [...allElements] });
    }
  };

  return {
    drawEllipseEnabled,
    handleSetDrawEllipseEnabled,
    handleEllipseOnMouseDown,
    handleEllipseOnMouseMove,
    handleEllipseOnMouseUp,
    handleEllipseDrag,
    handleEllipseUpdateLockState,
    handleUpdateEllipse,
    handleAddRandomEllipse,
  };
};

export default useEllipse;
