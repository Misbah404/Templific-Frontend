import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { createRef } from "react";
import { Rect, Star, Transformer } from "react-konva";

const StarKonva = forwardRef((props, ref) => {
  const {
    star,
    zoomValue,
    isSelected,
    handleStarDrag,
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
    if (!star.isLocked) {
      const newElement = {
        ...star,
        x: e.target.x() / (zoomValue / 100),
        y: e.target.y() / (zoomValue / 100),
      };

      handleStarDrag(newElement.id, newElement);
    }
  };

  // const handleTransformEnd = (e) => {
  //   if (!star.isLocked) {
  //     const newElement = {
  //       ...star,
  //       x: node.x() / (zoomValue / 100),
  //       y: node.y() / (zoomValue / 100),
  //     };

  //     handleStarDrag(newElement.id, newElement);
  //   }
  // };

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

  return (
    <>
      {/* {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (star.isLocked) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )} */}

      <Star
        {...star}
        ref={shapeRef}
        draggable={!star.isLocked}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        onTap={handleClick}
        onTransformEnd={handleDragEnd}
        x={star.x * (zoomValue / 100)}
        y={star.y * (zoomValue / 100)}
        innerRadius={star.innerRadius * (zoomValue / 100)}
        outerRadius={star.outerRadius * (zoomValue / 100)}
        fill={star.color}
        stroke={star.color}
        name="star"
        strokeWidth={3}
        opacity={star.opacity}
        numPoints={star.numPoints}
      />
    </>
  );
});

export default StarKonva;
