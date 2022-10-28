import { createRef, useState } from "react";
import { v4 as uuid } from "uuid";
import * as gifler from "gifler";

const useImage = (
  zoomValue,
  state,
  setState,
  ref,
  canvasData,
  allElements,
  setAllElements
) => {
  const handleAddImage = (key, image) => {
    const height = canvasData.canvasInPx.canvasHeight / 2;
    const width = canvasData.canvasInPx.canvasWidth / 2;
    let newImage = {
      id: uuid(),
      y: (canvasData.canvasInPx.canvasHeight - height) / 2,
      x: (canvasData.canvasInPx.canvasWidth - width) / 2,
      fontSize: 20 / (zoomValue / 100),
      width,
      height,
      isLocked: false,
      src: image,
      imageKey: key,
      name: "image",
      opacity: 1,
      shapeRef: createRef(),
    };

    setAllElements([...allElements, newImage]);
    setState({ ...state, allElements: [...state.allElements, newImage] });
  };

  const handleImageDrag = (id, newImage) => {
    const allShapes = [...allElements];
    const shapeId = allShapes.findIndex((shape) => shape.id === id);
    if (allShapes[shapeId]) {
      allShapes[shapeId] = newImage;
      setState({ ...state, allElements: allShapes });
      setAllElements(allShapes);
    }
  };

  const handleDeleteImage = (selectedElement) => {
    let allShapes = [...allElements];
    allShapes = allShapes.filter((shape) => shape.id !== selectedElement.id);

    setAllElements(allShapes);
    setState({ ...state, allElements: [...allShapes] });
  };

  const handleUpdateImage = (shape, data) => {
    const elements = [...allElements];

    const idx = elements.findIndex((l) => l.id === shape.id);
    if (idx !== -1) {
      elements[idx] = { ...elements[idx], ...data };

      setAllElements(elements);

      setState({ ...state, allElements: [...elements] });
    }
  };

  return {
    handleAddImage,
    handleImageDrag,
    handleDeleteImage,
    handleUpdateImage,
  };
};

export default useImage;
