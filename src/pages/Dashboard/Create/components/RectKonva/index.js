import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { createRef } from "react";
import { Rect, Transformer } from "react-konva";

const RectKonva = forwardRef((props, ref) => {
	const {
		rect,
		zoomValue,
		isSelected,
		handleRectangleDrag,
		handleSelectElement,
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
		if (!rect.isLocked) {
			const newRect = {
				...rect,
				x: e.target.x() / (zoomValue / 100),
				y: e.target.y() / (zoomValue / 100),
			};

			handleRectangleDrag(newRect.id, newRect);
		}
	};

	const handleTransformEnd = (e) => {
		if (!rect.isLocked) {
			const node = shapeRef.current;
			const scaleX = node.scaleX();
			const scaleY = node.scaleY();

			node.scaleX(1);
			node.scaleY(1);

			const newRect = {
				...rect,
				x: node.x() / (zoomValue / 100),
				y: node.y() / (zoomValue / 100),

				width: Math.max(5, node.width() * scaleX) / (zoomValue / 100),
				height: Math.max(node.height() * scaleY) / (zoomValue / 100),
			};

			handleRectangleDrag(newRect.id, newRect);
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
			{/* {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (rect.isLocked) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )} */}

			<Rect
				{...rect}
				ref={shapeRef}
				draggable={!rect.isLocked}
				onDragEnd={handleDragEnd}
				onClick={handleClick}
				onTap={handleClick}
				onTransformEnd={handleTransformEnd}
				x={rect.x * (zoomValue / 100)}
				y={rect.y * (zoomValue / 100)}
				width={rect.width * (zoomValue / 100)}
				height={rect.height * (zoomValue / 100)}
				fill={rect.color}
				stroke={rect.color}
				name="rect"
				strokeWidth={3}
				opacity={rect.opacity}
				onMouseOver={() => setStrokeElement(rect)}
				onMouseOut={() => setStrokeElement({})}
			/>
		</>
	);
});

export default RectKonva;
