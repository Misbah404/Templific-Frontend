import { createRef, forwardRef, useEffect, useImperativeHandle } from "react";
import { Line, Rect, Transformer } from "react-konva";

const PolygonKonva = forwardRef((props, ref) => {
  const {
    poly,
    points,
    curMousePos,
    handleMouseOverStartPoint,
    handleMouseOutStartPoint,
    handlePolygonDrag,
    zoomValue,
    isSelected,
    handleSelectElement,
    trRef,
  } = props;

  const shapeRef = createRef();
  // const trRef = createRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e) => {
    if (!poly.isLocked) {
      const newPoly = {
        ...poly,
        ...e.target.attrs,
        points: poly.points,
        x: e.target.x() / (zoomValue / 100),
        y: e.target.y() / (zoomValue / 100),
      };

      handlePolygonDrag(poly.id, newPoly);
    }
  };

  const handleTransformEnd = (e) => {
    if (!poly.isLocked) {
      const newPoly = {
        ...poly,
        ...e.target.attrs,
        points: poly.points,
        x: e.target.x() / (zoomValue / 100),
        y: e.target.y() / (zoomValue / 100),
      };

      handlePolygonDrag(poly.id, newPoly);
    }
  };

  const handleClick = () => {
    handleSelectElement(shapeRef);
  };

  const handlePositions = (type) => {
    if (type === "send to front") shapeRef?.current?.moveToTop();
    if (type === "send forward") shapeRef?.current?.moveUp();
    if (type === "send back") shapeRef?.current?.moveToBottom();
    if (type === "send backward") shapeRef?.current?.moveDown();
  };

  useImperativeHandle(ref, () => {
    return {
      handlePositions,
      ...ref.current,
    };
  });

  const flattenedPoints = points
    .concat(poly.isFinished ? [] : curMousePos)
    .reduce((a, b) => a.concat(b), []);

  return (
    <>
      <Line
        {...poly}
        points={flattenedPoints.map((p) => parseInt(p * (zoomValue / 100)))}
        stroke={poly.color}
        strokeWidth={3}
        closed={poly.isFinished}
        draggable={poly.isFinished && !poly.isLocked}
        onDragEnd={handleDragEnd}
        ref={shapeRef}
        onClick={handleClick}
        onTap={handleClick}
        onTransformEnd={handleTransformEnd}
        fill={poly.color}
        x={poly?.x ? poly.x * (zoomValue / 100) : 0}
        y={poly?.y ? poly.y * (zoomValue / 100) : 0}
        name="polygon"
        realPoints={points}
        opacity={poly.opacity}
      />

      {/* {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (poly.isLocked) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )} */}

      {!poly.isFinished &&
        points.map((point, index) => {
          const width = 6;

          let x = point[0] - width / 2;
          x = poly.x ? x + poly.x : x;

          let y = point[1] - width / 2;
          y = poly.y ? y + poly.y : y;

          const startPointAttr =
            index === 0
              ? {
                  hitStrokeWidth: 12,
                  onMouseOver: handleMouseOverStartPoint,
                  onMouseOut: handleMouseOutStartPoint,
                }
              : null;
          return (
            <Rect
              key={index}
              x={x * (zoomValue / 100)}
              y={y * (zoomValue / 100)}
              width={width}
              height={width}
              fill="white"
              stroke={poly.color}
              strokeWidth={3}
              {...startPointAttr}
            />
          );
        })}
    </>
  );
});

export default PolygonKonva;
