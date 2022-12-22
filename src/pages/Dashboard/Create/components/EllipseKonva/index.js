import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { createRef } from "react";
import { Ellipse, Transformer } from "react-konva";
import { Colors } from "../../../../../theme";

const EllipseKonva = forwardRef((props, ref) => {
	const {
		ellipse,
		zoomValue,
		isSelected,
		handleEllipseDrag,
		handleSelectElement,
		trRef,
		strokeEnabled,
		strokeRef,
		setStrokeElement,
	} = props;

	const shapeRef = createRef();

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
		if (!ellipse.isLocked) {
			const newEllipse = {
				...ellipse,
				x: e.target.x() / (zoomValue / 100),
				y: e.target.y() / (zoomValue / 100),
			};

			handleEllipseDrag(newEllipse.id, newEllipse);

			trRef?.current?.nodes?.([]);
		}
	};

	const handleTransformEnd = (e) => {
		if (!ellipse.isLocked) {
			const node = shapeRef.current;
			const scaleX = node.scaleX();
			const scaleY = node.scaleY();

			node.scaleX(1);
			node.scaleY(1);

			const newEllipse = {
				...ellipse,
				x: node.x() / (zoomValue / 100),
				y: node.y() / (zoomValue / 100),
				// set minimal value
				// radiusX: Math.abs(node.x() - width) / 2,
				// radiusY: Math.abs(node.y() - height) / 2,
				radiusX: Math.max(5, node.radiusX() * scaleX) / (zoomValue / 100),
				radiusY: Math.max(node.radiusY() * scaleY) / (zoomValue / 100),
				width: Math.max(5, node.width() * scaleX) / (zoomValue / 100),
				height: Math.max(node.height() * scaleY) / (zoomValue / 100),
			};

			handleEllipseDrag(newEllipse.id, newEllipse);
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
			<Ellipse
				{...ellipse}
				ref={shapeRef}
				draggable={!ellipse.isLocked}
				onDragEnd={handleDragEnd}
				onClick={handleClick}
				onTap={handleClick}
				onTransformEnd={handleTransformEnd}
				x={ellipse.x * (zoomValue / 100)}
				y={ellipse.y * (zoomValue / 100)}
				radiusX={ellipse.radiusX * (zoomValue / 100)}
				radiusY={ellipse.radiusY * (zoomValue / 100)}
				height={ellipse.height ? ellipse.height * (zoomValue / 100) : 0}
				width={ellipse.width ? ellipse.width * (zoomValue / 100) : 0}
				fill={ellipse.color}
				// stroke={ellipse.color}
				name="ellipse"
				// strokeWidth={3}
				opacity={ellipse.opacity}
				stroke={Colors.themeColor}
				// strokeEnabled={strokeEnabled}
				strokeWidth={5}
				onMouseOver={() => setStrokeElement(ellipse)}
				onMouseOut={() => setStrokeElement({})}
			/>
		</>
	);
});

export default EllipseKonva;
