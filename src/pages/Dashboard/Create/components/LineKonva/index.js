import { useEffect, useImperativeHandle, useRef } from "react";
import { forwardRef } from "react";
import { Line } from "react-konva";

const LineKonva = forwardRef((props, ref) => {
	const {
		line,
		handleLineDrag,
		isSelected,
		handleSelectElement,
		zoomValue,
		trRef,
		strokeEnabled,
		strokeRef,
		setStrokeElement,
	} = props;

	const shapeRef = useRef();

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
		if (!line.isLocked) {
			const newLine = {
				...line,
				attrs: {
					...e.target.attrs,
					x: e.target.x() / (zoomValue / 100),
					y: e.target.y() / (zoomValue / 100),
					scaleX: 1,
					scaleY: 1,
					strokeWidth: line.attrs?.strokeWidth,
				},

				points: [
					line.points[0] * e?.target?.attrs?.scaleX,
					line.points[1] * e?.target?.attrs?.scaleY,
					line.points[2] * e?.target?.attrs?.scaleX,
					line.points[3] * e?.target?.attrs?.scaleY,
				],
			};

			if (newLine?.attrs?.strokeWidth >= 3) {
				handleLineDrag(newLine.id, newLine);
			}
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
			<Line
				{...line}
				{...line.attrs}
				name="line"
				ref={shapeRef}
				stroke={line.color}
				height={10}
				width={10}
				strokeWidth={line.attrs?.strokeWidth > 3 ? line.attrs?.strokeWidth : 3}
				tension={1}
				lineCap="round"
				draggable={!line.isLocked}
				points={line.points.map((point) => {
					return point * (zoomValue / 100);
				})}
				onDragEnd={(e) => {
					handleDragEnd(e);
					trRef?.current?.nodes?.([]);
				}}
				onClick={handleClick}
				onTap={handleClick}
				onTransformEnd={handleDragEnd}
				x={line.attrs?.x ? line.attrs.x * (zoomValue / 100) : 0}
				y={line.attrs?.y ? line.attrs.y * (zoomValue / 100) : 0}
				color={line.color ? line.color : "#000"}
				opacity={line.opacity}
				scaleX={1}
				scaleY={1}
				onMouseOver={() => setStrokeElement(line)}
				onMouseOut={() => setStrokeElement({})}
			/>
		</>
	);
});

export default LineKonva;
