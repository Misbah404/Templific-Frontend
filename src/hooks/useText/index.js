import { createRef } from "react";
import { v4 as uuid } from "uuid";

import calculateSize from "calculate-size";

const useText = (
	zoomValue,
	state,
	setState,
	ref,
	canvasData,
	allElements,
	setAllElements
) => {
	const handleAddText = () => {
		let newText = {
			text: "Text",
			id: uuid(),
			y: canvasData.canvasInPx.canvasHeight / 2,
			x: canvasData.canvasInPx.canvasWidth / 2,
			fontSize: 20 / (zoomValue / 100),
			width: 50 / (zoomValue / 100),
			height: 20 / (zoomValue / 100),
			isLocked: false,
			color: "#000",
			bold: false,
			italic: false,
			underLine: false,
			align: "left",
			letterSpacing: 0,
			fontFamily: "Arial",
			outlined: false,
			shapeRef: createRef(),
			transformedText: "Aa",
			name: "text",
			opacity: 1,
			strokeWidth: 1,
			shadowOffset: 0,
			shadowColor: "#000",
			lineHeight: 1,
		};

		setAllElements([...allElements, newText]);

		setState({ ...state, allElements: [...state.allElements, newText] });
	};

	const handleTextDrag = (id, updatedText) => {
		const elements = [...allElements];
		const textIdx = elements.findIndex((rect) => rect.id === id);
		if (elements[textIdx] && textIdx !== -1) {
			elements[textIdx] = {
				...updatedText,
			};

			setState({ ...state, allElements: elements });
			setAllElements(elements);
		}
	};

	const calculateTextSize = (element) => {
		const { fontFamily, fontSize, bold, letterSpacing, text, lineHeight } =
			element;

		let textWidth = 0;
		let textHeight = 0;

		const textArray = text.split("\n");

		textArray.map((text) => {
			if (text?.trim() === "") {
				return;
			}
			let { width } = calculateSize(text, {
				font: fontFamily,
				fontSize: `${fontSize}px`,
				fontStyle: bold ? "bold" : "none",
				lineHeight: lineHeight + "px",
				// letterSpacing,
			});

			if (width > textWidth) {
				textWidth = width;
			}

			const letterSpacingWidth =
				(text.length * parseInt(letterSpacing / (zoomValue / 100))) / 3.5;

			textWidth += letterSpacingWidth;

			const { height } = calculateSize(text, {
				font: fontFamily,
				fontSize: `${fontSize}px`,
				fontStyle: bold ? "bold" : "none",
				letterSpacing: letterSpacing * (zoomValue / 100),
				lineHeight,
				// width: `${width}px`,
			});

			textHeight += height * parseFloat(lineHeight);
		});

		return { textHeight, textWidth: textWidth + 8 };
	};

	const handleUpdateText = (data, id, selectedElement) => {
		const elements = [...allElements];
		const idx = elements.findIndex((text) => text.id === id);

		if (idx !== -1) {
			elements[idx] = {
				...elements[idx],
				...data,
			};

			// changing height and width on fontSize change
			// if (data.fontSize !== undefined) {
			const { textHeight, textWidth } = calculateTextSize(elements[idx]);

			elements[idx] = {
				...elements[idx],
				height: textHeight - textHeight / 5,
				width: textWidth + textWidth / 5,
			};
			// }

			setAllElements(elements);
			setState({ ...state, allElements: [...elements] });
		}
	};

	const handleTransformText = (item, id) => {
		const elements = [...allElements];
		const idx = elements.findIndex((text) => text.id === id);

		if (idx !== -1) {
			if (item.val === "lowerCase")
				elements[idx] = {
					...elements[idx],
					text: elements[idx].text.toLowerCase(),
					transformedText: "aa",
				};
			if (item.val === "upperCase")
				elements[idx] = {
					...elements[idx],
					text: elements[idx].text.toUpperCase(),
					transformedText: "AA",
				};

			if (item.val === "capitalize")
				elements[idx] = {
					...elements[idx],
					text: elements[idx].text
						.split(" ")
						.map((word) => {
							return (
								word[0].toUpperCase() + word.slice(1, word.length).toLowerCase()
							);
						})
						.join(" "),
					transformedText: "Aa",
				};

			const { textHeight, textWidth } = calculateTextSize(elements[idx]);

			elements[idx] = {
				...elements[idx],
				height: textHeight - textHeight / 5,
				width: textWidth + textWidth / 5,
			};

			setAllElements(elements);
			setState({ ...state, allElements: [...elements] });
		}
	};

	const handleDuplicateText = (id) => {
		const elements = [...allElements];

		const idx = elements.findIndex((text) => text.id === id);

		if (idx !== -1) {
			let newText = { ...elements[idx] };
			newText = {
				...newText,
				x: canvasData.canvasInPx.canvasWidth / 2 / (zoomValue / 100),
				y: canvasData.canvasInPx.canvasHeight / 2 / (zoomValue / 100),
				id: uuid(),
				shapeRef: createRef(),
			};

			setAllElements([...allElements, newText]);
			setState({ ...state, allElements: [...elements, newText] });
		}
	};

	const handleTextAlignment = (type, id, selectedElement) => {
		const elements = [...allElements];

		const idx = elements.findIndex((text) => text.id === id);

		let textHeight = 0;
		let textWidth = 0;

		if (selectedElement?.ref?.current && selectedElement.ref.current.attrs) {
			textHeight = selectedElement.ref.current.textHeight;
			textWidth = selectedElement.ref.current.textWidth;
		}

		if (idx !== -1) {
			let newText = { ...elements[idx] };
			if (type === "top")
				newText = {
					...newText,
					y: 2,
				};

			if (type === "middle")
				newText = {
					...newText,
					y: canvasData.canvasInPx.canvasHeight / 2,
				};
			if (type === "bottom")
				newText = {
					...newText,
					y: canvasData.canvasInPx.canvasHeight - textHeight,
				};

			if (type === "left")
				newText = {
					...newText,
					x: 0,
				};

			if (type === "center")
				newText = {
					...newText,
					x: canvasData.canvasInPx.canvasWidth / 2,
				};

			if (type === "right")
				newText = {
					...newText,
					x: canvasData.canvasInPx.canvasWidth - textWidth,
				};

			elements[idx] = { ...newText };
			setAllElements([...elements]);
			setState({ ...state, allElements: [...elements] });
		}
	};

	const handleAddGlyph = (glyph, id) => {
		const elements = [...allElements];
		const idx = elements.findIndex((text) => text.id === id);

		if (idx !== -1) {
			elements[idx] = {
				...elements[idx],
				text: elements[idx].text + glyph,
			};

			const { textHeight, textWidth } = calculateTextSize(elements[idx]);

			elements[idx] = {
				...elements[idx],
				height: textHeight - textHeight / 5,
				width: textWidth + textWidth / 5,
			};

			setAllElements(elements);
			setState({ ...state, allElements: [...elements] });
		}
	};

	return {
		handleTextDrag,
		handleAddText,
		handleUpdateText,
		handleDuplicateText,
		handleTextAlignment,
		calculateTextSize,
		handleTransformText,
		handleAddGlyph,
	};
};

export default useText;
