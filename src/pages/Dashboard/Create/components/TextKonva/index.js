import _ from "lodash";
import {
	forwardRef,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
} from "react";
import { useEffect, useState } from "react";
import { Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
import { connect } from "react-redux";
import { TEXT_MIN_HEIGHT, TEXT_MIN_WIDTH } from "../../../../../constants";

const TextKonva = forwardRef((props, ref) => {
	const {
		text,
		isSelected,
		handleSelectElement,
		zoomValue,
		handleTextDrag,
		stageRef,
		setSelectedElement,
		canvasData,
		bgColor,
		trRef,
		calculateTextSize,
		strokeEnabled,
		strokeRef,
		setStrokeElement,
	} = props;

	const [isEditing, setIsEditing] = useState(false);
	const [style, setStyle] = useState(() => {});
	const [currentStateText, setCurrentStateText] = useState(text);

	const shapeRef = useRef();

	useLayoutEffect(() => {
		const textNode = shapeRef.current;
		// apply many styles to match text on canvas as close as possible
		// remember that text rendering on canvas and on the textarea can be different
		// and sometimes it is hard to make it 100% the same. But we will try...
		const newStyle = {};
		newStyle.width = textNode.width() - textNode.padding() * 2 + 10 + "px";
		newStyle.height = textNode.height() - textNode.padding() * 2 + 10 + "px";
		newStyle.fontSize = textNode.fontSize() + "px";
		newStyle.border = "none";
		newStyle.overflow = "hidden";
		newStyle.background = "none";
		newStyle.outline = "none";
		newStyle.resize = "none";
		newStyle.lineHeight = textNode.lineHeight() + 0.01;
		newStyle.fontFamily = '"' + textNode.fontFamily() + '"';
		newStyle.transformOrigin = "left top";
		newStyle.textAlign = textNode.align();
		newStyle.color = text.outlined ? bgColor : textNode.fill();
		newStyle.overflowWrap = "break-word";
		newStyle.whiteSpace = "normal";
		newStyle.userSelect = "text";
		newStyle.wordBreak = "normal";
		newStyle.lineHeight = text.lineHeight;
		newStyle.textDecoration = text.underLine ? "underline" : "none";
		newStyle.fontWeight = text.bold ? 600 : "normal";
		newStyle.letterSpacing = text.letterSpacing + "px";
		newStyle["-webkit-text-stroke-color"] = text.color;
		newStyle["-webkit-text-stroke-width"] = text.strokeWidth + "px";
		newStyle.textShadow = `${text.shadowColor} ${text.shadowOffset}px ${text.shadowOffset}px`;

		if (JSON.stringify(newStyle) !== JSON.stringify(style)) {
			setStyle({ ...newStyle });
		}
	});

	useEffect(() => {
		if (isSelected) {
			trRef.current.nodes([shapeRef.current]);
			trRef.current.getLayer().batchDraw();
		}
		setCurrentStateText(text);
	}, [isSelected, text]);

	useEffect(() => {
		if (strokeEnabled) {
			strokeRef.current.nodes([shapeRef.current]);
			strokeRef.current.getLayer().batchDraw();
		}
	}, [strokeEnabled]);

	const handleTransform = (e) => {
		const widthUp = (e.target.width() / (zoomValue / 100)) * e.target.scaleX();
		const heightUp =
			(e.target.height() / (zoomValue / 100)) * e.target.scaleY();

		const newText = {
			...currentStateText,
			height: heightUp,
			width: widthUp,
			scaleY: 1,
			scaleX: 1,
			x: e.target.x() / (zoomValue / 100),
			y: e.target.y() / (zoomValue / 100),
			fontSize: currentStateText.fontSize * e.target.scaleY(),
			testScaleX: e.target.scaleX(),
			testScaleY: e.target.scaleY(),
		};

		e.target.scaleX(1);
		e.target.scaleY(1);

		setCurrentStateText(newText);
	};

	const handleTransformEnd = () => {
		handleTextDrag(text.id, currentStateText);
	};

	const handleRemoveTextArea = (e = {}) => {
		const textarea = document.getElementById(`textarea_${text.id}`);
		if (e.target !== textarea) {
			if (isEditing) {
				setSelectedElement(null);

				handleTextDrag(text.id, {
					...text,
					text: currentStateText.text,
					height: currentStateText.height,
					width: currentStateText.width,
				});
				setIsEditing(false);
			}
		}
	};

	const handleChangeText = (e) => {
		const textarea = document.getElementById(`textarea_${text.id}`);

		const newText = {
			...text,
			text: e.target.value,
			height:
				text.height > textarea.scrollHeight
					? text.height
					: textarea.scrollHeight,
			width:
				text.width > textarea.scrollWidth ? text.width : textarea.scrollWidth,
		};

		const { textHeight, textWidth } = calculateTextSize(newText);

		setCurrentStateText({
			...newText,
			height: 
			// textHeight < TEXT_MIN_HEIGHT ? TEXT_MIN_HEIGHT :
			 textHeight,
			width: textWidth 
			// < TEXT_MIN_WIDTH ? TEXT_MIN_WIDTH : textWidth,
		});

		handleTextDrag(text.id, {
			...newText,
			height: textHeight ,
			// < TEXT_MIN_HEIGHT ? TEXT_MIN_HEIGHT : textHeight,
			width: textWidth 
			// < TEXT_MIN_WIDTH ? TEXT_MIN_WIDTH : textWidth,
		});
	};

	const handleDragEnd = (e) => {
		const newText = {
			...currentStateText,
			x: e.target.x() / (zoomValue / 100),
			y: e.target.y() / (zoomValue / 100),
		};
		setCurrentStateText(newText);
		handleTextDrag(text.id, newText);
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
			isEditing,
			handleRemoveTextArea,
			handlePositions,
		};
	});

	return (
		<>
			{isEditing && (
				<>
					<Html
						groupProps={{
							x: currentStateText.x * (zoomValue / 100),
							y: currentStateText.y * (zoomValue / 100),
						}}
					>
						<textarea
							value={currentStateText.text}
							onChange={handleChangeText}
							style={{ ...style, "-webkit-text-stroke-color": text.color }}
							id={`textarea_${text.id}`}
							wrap="off"
							onContextMenu={(e) => e.preventDefault()}
						/>
					</Html>
				</>
			)}

			<>
				<Text
					ref={shapeRef}
					{...text}
					visible={!isEditing}
					key={text.id}
					fontSize={
						currentStateText.fontSize
							? currentStateText.fontSize * (zoomValue / 100)
							: 12
					}
					text={currentStateText.text}
					wrap="char"
					x={currentStateText.x ? currentStateText.x * (zoomValue / 100) : 0}
					y={currentStateText.y ? currentStateText.y * (zoomValue / 100) : 0}
					height={
						currentStateText.height
							? currentStateText.height * (zoomValue / 100)
							: 0
					}
					width={
						currentStateText.width
							? currentStateText.width * (zoomValue / 100)
							: 0
					}
					draggable={!currentStateText.isLocked}
					onDragEnd={handleDragEnd}
					onClick={handleClick}
					onTap={handleClick}
					onTransform={handleTransform}
					onTransformEnd={handleTransformEnd}
					fill={currentStateText.outlined ? bgColor : currentStateText.color}
					// padding={8}
					fontStyle={`${currentStateText.italic ? "italic" : ""} ${
						currentStateText.bold ? "bold" : ""
					}`}
					textDecoration={`${currentStateText.underLine ? "underline" : ""}`}
					align={currentStateText.align}
					letterSpacing={
						currentStateText.letterSpacing
							? parseInt(currentStateText.letterSpacing)
							: 0
					}
					strokeWidth={text.strokeWidth}
					stroke={currentStateText.color}
					fontFamily={currentStateText.fontFamily}
					lineHeight={currentStateText.lineHeight || 1}
					name="text"
					opacity={text.opacity}
					shadowOffset={{ x: text.shadowOffset, y: text.shadowOffset }}
					shadowColor={text.shadowColor}
					onDblClick={() => {
						// setSelectedElement(null);
						setIsEditing(true);
					}}
					onDblTap={() => {
						// setSelectedElement(null);
						setIsEditing(true);
					}}
					boundBoxFunc={(oldBox, newBox) => {
						if (newBox.width < 30 || newBox.height < 10) return oldBox;

						return newBox;
					}}
					onMouseOver={() => setStrokeElement && setStrokeElement(text)}
					onMouseOut={() => setStrokeElement && setStrokeElement({})}
				/>
			</>
			{/* )} */}
		</>
	);
});

export default TextKonva;
