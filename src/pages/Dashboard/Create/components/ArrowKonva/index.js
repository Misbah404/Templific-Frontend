import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { createRef } from "react";
import { Arrow, Transformer } from "react-konva";

const ArrowKonva = forwardRef((props, ref) => {
  const {
    arrow,
    handleArrowDrag,
    isSelected,
    handleSelectElement,
    zoomValue,
    trRef,
    strokeEnabled,
		strokeRef,
		setStrokeElement,
  } = props;

  const shapeRef = createRef();
  // const trRef = createRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
		if (strokeEnabled) {
			strokeRef.current.nodes([shapeRef.current]);
			strokeRef.current.getLayer().batchDraw();
		}
	}, [strokeEnabled]);

  const handleDragEnd = (e) => {
    if (!arrow.isLocked) {
      const newArrow = {
        ...arrow,
        attrs: {
          ...e.target.attrs,
          x: e.target.x() / (zoomValue / 100),
          y: e.target.y() / (zoomValue / 100),
        },
      };
      handleArrowDrag(newArrow.id, newArrow);
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

  return (
    <>
      <Arrow
        {...arrow}
        {...arrow.attrs}
        name="arrow"
        ref={shapeRef}
        stroke={arrow.color}
        strokeWidth={3}
        tension={1}
        lineCap="round"
        draggable={!arrow.isLocked}
        points={arrow.points.map((point) => {
          return point * (zoomValue / 100);
        })}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        onTap={handleClick}
        onTransformEnd={handleDragEnd}
        x={arrow.attrs?.x ? arrow.attrs.x * (zoomValue / 100) : 0}
        y={arrow.attrs?.y ? arrow.attrs.y * (zoomValue / 100) : 0}
        color={arrow.color ? arrow.color : "#000"}
        opacity={arrow.opacity}
        height={arrow.height}
        width={50}
        onMouseOver={() => setStrokeElement(arrow)}
				onMouseOut={() => setStrokeElement({})}
      />

      {/* {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (arrow.isLocked) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )} */}
    </>
  );
});

export default ArrowKonva;
