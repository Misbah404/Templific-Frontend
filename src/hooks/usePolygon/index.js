import { createRef, useState } from "react";
import { v4 as uuid } from "uuid";

const usePolygon = (
  zoomValue,
  state,
  setState,
  ref,
  allElements,
  setAllElements,
  canvasData
) => {
  const [newPolygon, setNewPolygon] = useState({});
  const [curMousePos, setCurMousePos] = useState(null);
  const [isMouseOverStartPoint, setIsMouseOverStartPoint] = useState(false);
  const [drawPolygonEnabled, setDrawPolygonEnabled] = useState(false);

  const handleSetDrawPolygonEnabled = (val) => {
    setDrawPolygonEnabled(val);
  };

  const getMousePos = (stage) => {
    return [
      stage?.getPointerPosition()?.x / (zoomValue / 100),
      stage?.getPointerPosition()?.y / (zoomValue / 100),
    ];
  };

  const handlePolygonOnMouseMove = (e) => {
    const stage = e.target.getStage();
    const mousePos = getMousePos(stage);
    if (drawPolygonEnabled) setCurMousePos(mousePos);
  };

  const handlePolygonOnMouseDown = (e) => {
    const stage = e?.target?.getStage();
    const mousePos = getMousePos(stage);

    if (!drawPolygonEnabled) {
      return;
    }

    if (isMouseOverStartPoint && newPolygon?.points?.length >= 3) {
      setDrawPolygonEnabled(false);
      const newPoly = { ...newPolygon, isFinished: true };
      setNewPolygon({});
      setAllElements([...allElements, { ...newPoly }]);
      setState({
        ...state,
        allElements: [...state.allElements, { ...newPoly }],
      });
      setIsMouseOverStartPoint(false);

      try {
        ref.current.content.style.cursor = "default";
      } catch (error) {
        console.error(error);
      }
    } else {
      if (Object.keys(newPolygon).length === 0) {
        setNewPolygon({
          id: uuid(),
          points: [mousePos],
          isFinished: false,
          isLocked: false,
          color: "#523ce6",
          name: "polygon",
          opacity: 1,
          shapeRef: createRef(),
        });
      } else {
        setNewPolygon({
          ...newPolygon,
          points: [...newPolygon.points, mousePos],
        });
      }
    }
  };

  const handleAddRandomPolygon = (data) => {
    const pointValue =
      (Math.min(
        canvasData.canvasInPx.canvasHeight,
        canvasData.canvasInPx.canvasWidth
      ) *
        50) /
      100;

    let points = [];

    // clockwise
    points = data.getPoints(pointValue);

    const newElement = {
      id: uuid(),
      isFinished: false,
      isLocked: false,
      name: "polygon",
      opacity: 1,
      ...data,
      points,
      x: -pointValue,
      y: -pointValue,
    };

    setAllElements([...allElements, { ...newElement }]);
    setState({ ...state, allElements: [...allElements, { ...newElement }] });
  };

  const handleMouseOverStartPoint = (e) => {
    if (!drawPolygonEnabled || newPolygon.length < 3) return;
    e.target.scale({ x: 2, y: 2 });

    setIsMouseOverStartPoint(true);
  };

  const handleMouseOutStartPoint = (e) => {
    e.target.scale({ x: 1, y: 1 });

    setIsMouseOverStartPoint(false);
  };

  const handlePolygonDrag = (id, newShape) => {
    const elements = [...allElements];
    const shapeId = elements.findIndex((shape) => shape.id === id);
    if (elements[shapeId]) {
      elements[shapeId] = newShape;
      setState({ ...state, allElements: elements });
      setAllElements(elements);
    }
  };

  const handleUpdatePolygon = (shape, data) => {
    const elements = [...allElements];

    const idx = elements.findIndex((l) => l.id === shape.id);
    if (idx !== -1) {
      elements[idx] = { ...elements[idx], ...data };

      setAllElements(elements);

      setState({ ...state, allElements: [...allElements] });
    }
  };

  return {
    newPolygon,
    curMousePos,
    drawPolygonEnabled,
    handleSetDrawPolygonEnabled,
    handlePolygonOnMouseDown,
    handlePolygonOnMouseMove,
    handlePolygonDrag,
    handleMouseOutStartPoint,
    handleMouseOverStartPoint,
    handleUpdatePolygon,
    handleAddRandomPolygon,
  };
};

export default usePolygon;
