import { useRef, useEffect, createRef } from "react";
import { useImperativeHandle } from "react";
import { forwardRef, useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import { Html, Portal } from "react-konva-utils";
import { css, StyleSheet } from "aphrodite";
import { v4 as uuid } from "uuid";

import {
	useArrow,
	useEllipse,
	useLine,
	usePolygon,
	useRect,
	useText,
	useUndoRedoState,
	useImage,
	useStar,
} from "../../../../../hooks";
import ContextMenu from "../ContextMenu";
import ImageKonva from "../ImageKonva";
import {
	LineKonva,
	RectKonva,
	EllipseKonva,
	PolygonKonva,
	ArrowKonva,
	TextKonva,
} from "../index";
import StarKonva from "../StarKonva";
import TransformerKonva from "../TransformerKonva";
import GifImage from "../GifImage";
import _ from "lodash";

const CustomStage = forwardRef((props, ref) => {
	const {
		canvasData,
		id,
		handleChangeRef,
		selectedStage,
		zoomValue,
		handleSelectElementParent,
		layoutId,
		rowId,
		handleCanvasUpdate,
		isBleed,
		isTrim,
		isDemo,
		triggerSaveTemplate,
		triggerDownloadTemplate,
		setMultiNodesElement,
	} = props;

	const { state, setState, goBack, goForward, states } = useUndoRedoState({
		bgColor: "#ffffff",
		allElements: [],
	});

	const [allElements, setAllElements] = useState(() => []);

	const [contextMenu, setContextMenu] = useState(() => false);

	const [strokeElement, setStrokeElement] = useState(() => {});

	const trRef = useRef();
	const strokeRef = createRef();
	const selectionRectRef = useRef();
	const layerRef = useRef();

	const selection = useRef({
		visible: false,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
	});

	const [contextMenuAttrs, setContextMenuAttrs] = useState({
		pageX: 0,
		pageY: 0,
	});

	const [templateFonts, setTemplateFonts] = useState([]);
	const [selectedId, selectShape] = useState(null);
	const [nodesArray, setNodes] = useState([]);

	const [copyNodeAttrs, setCopyNodeAttrs] = useState({});
	const [copyMultiElements, setCopyMultiElements] = useState([]);

	const {
		drawLineEnabled,
		handleSetDrawLineEnabled,
		handleLineOnMouseDown,
		handleLineOnMouseMove,
		handleLineOnMouseUp,
		handleLineDrag,
		handleUpdateLine,
		handleUpdateStrokeWidth,
	} = useLine(zoomValue, state, setState, ref, allElements, setAllElements);

	const {
		drawRectangleEnabled,
		handleSetDrawRectangleEnabled,
		handleRectangleOnMouseDown,
		handleRectangleOnMouseMove,
		handleRectangleOnMouseUp,
		handleRectangleDrag,
		handleUpdateRect,
		handleAddRandomRectangle,
	} = useRect(
		zoomValue,
		state,
		setState,
		ref,
		allElements,
		setAllElements,
		canvasData
	);

	const {
		drawEllipseEnabled,
		handleSetDrawEllipseEnabled,
		handleEllipseOnMouseDown,
		handleEllipseOnMouseMove,
		handleEllipseOnMouseUp,
		handleEllipseDrag,
		handleUpdateEllipse,
		handleAddRandomEllipse,
	} = useEllipse(
		zoomValue,
		state,
		setState,
		ref,
		allElements,
		setAllElements,
		canvasData
	);

	const {
		newPolygon,
		curMousePos,
		drawPolygonEnabled,
		handleSetDrawPolygonEnabled,
		handlePolygonOnMouseDown,
		handlePolygonOnMouseMove,
		handlePolygonDrag,
		handleMouseOutStartPoint,
		handleMouseOverStartPoint,
		handleDragMovePoint,
		handleUpdatePolygon,
		handleAddRandomPolygon,
	} = usePolygon(
		zoomValue,
		state,
		setState,
		ref,
		allElements,
		setAllElements,
		canvasData
	);

	const {
		drawArrowEnabled,
		handleSetDrawArrowEnabled,
		handleArrowOnMouseDown,
		handleArrowOnMouseMove,
		handleArrowOnMouseUp,
		handleArrowDrag,
		handleUpdateArrow,
	} = useArrow(zoomValue, state, setState, ref, allElements, setAllElements);

	const {
		handleTextDrag,
		handleAddText,
		handleUpdateText,
		handleTransformText,
		handleAddGlyph,
		handleDuplicateText,
		handleTextAlignment,
		calculateTextSize,
	} = useText(
		zoomValue,
		state,
		setState,
		ref,
		canvasData,
		allElements,
		setAllElements
	);

	const {
		handleAddImage,
		handleImageDrag,
		handleDeleteImage,
		handleUpdateImage,
	} = useImage(
		zoomValue,
		state,
		setState,
		ref,
		canvasData,
		allElements,
		setAllElements
	);

	const { handleStarDrag, handleUpdateStar, handleAddRandomStar } = useStar(
		zoomValue,
		state,
		setState,
		ref,
		allElements,
		setAllElements,
		canvasData
	);

	const [selectedElement, setSelectedElement] = useState({});

	const [bgColor, setBgColor] = useState("#ffffff");
	let contextMenuRef = useRef();
	const isDrawing = useRef(false);
	const oldPos = useRef(null);
	const Konva = window.Konva;

	useEffect(() => {
		document.addEventListener("mousedown", handleCloseContextMenu);

		return () => {
			document.removeEventListener("mousedown", handleCloseContextMenu);
		};
	}, []);

	useEffect(() => {
		selectedElement && setSelectedElement({});
	}, [selectedStage]);

	useEffect(() => {
		setMultiNodesElement(nodesArray);
	}, [nodesArray]);

	useEffect(() => {
		if (selectedElement && selectedElement.id) {
			setCopyMultiElements([]);
			setNodes([]);
			handleSelectElementParent(selectedElement);
		} else {
			handleSelectElementParent(false);
		}

		if (selectedElement?.id === strokeElement?.id) {
			setStrokeElement({});
		}
	}, [selectedElement]);

	useEffect(() => {
		if (
			!contextMenu &&
			copyNodeAttrs &&
			Object.keys(copyNodeAttrs).length > 0
		) {
			if (!copyNodeAttrs.isCopied && copyNodeAttrs.isCopied === false) {
				setCopyNodeAttrs({});
			}
		}
	}, [contextMenu]);

	useEffect(() => {
		handleCanvasUpdate(layoutId, rowId, id, {
			allElements,
			bgColor,
		});
	}, [allElements, bgColor]);

	const handleContextMenu = (e) => {
		e.evt.preventDefault();
		selection.current.visible = false;

		const stageHeight = e.currentTarget?.attrs?.height;
		const stageWidth = e.currentTarget?.attrs?.width;

		let pageX = e.evt.layerX;
		let pageY = e.evt.layerY;

		let resultY = Math.abs(stageHeight - pageY);
		let resultX = Math.abs(stageWidth - pageX);

		if (resultY < 290) {
			pageY = stageHeight - 290;
		}

		if (resultX < 180) {
			pageX = stageWidth - 180;
		}

		setContextMenu(true);
		setContextMenuAttrs({ pageX, pageY });

		if (e.target?.attrs?.name !== "bgColor")
			setCopyNodeAttrs({ ...e.target.attrs, isCopied: false });
	};

	const handleCloseContextMenu = (e) => {
		if (contextMenuRef && !contextMenuRef.current?.contains(e.target))
			setContextMenu(false);
	};

	const handleCopyNode = () => {
		if (!_.isEmpty(nodesArray)) {
			const elements = allElements?.filter((element) =>
				nodesArray.includes(element.id)
			);

			console.log({ elements });
			if (elements?.length > 0) setCopyMultiElements(elements);
			setCopyNodeAttrs({});
		} else if (!_.isEmpty(selectedElement)) {
			setCopyNodeAttrs({
				...selectedElement,
				isCopied: true,
			});
			setCopyMultiElements([]);
		}
	};

	const handleCutNode = () => {
		if (!_.isEmpty(selectedElement)) {
			setCopyNodeAttrs((oldState) => ({
				...oldState,
				...selectedElement,
				isCopied: true,
			}));

			const newAllElements = [...allElements].filter(
				(el) => el?.id !== selectedElement?.id
			);
			setSelectedElement({});
			setAllElements([...newAllElements]);
			setState({ ...state, allElements: [...newAllElements] });
		}
	};

	const handleCloneNode = () => {
		if (copyNodeAttrs && Object.keys(copyNodeAttrs).length > 0) {
			const newElement = {
				...copyNodeAttrs,
				id: uuid(),
				shapeRef: createRef(),
				x: copyNodeAttrs.x + 10,
				y: copyNodeAttrs.y + 10,
			};

			if (newElement.name === "arrow" || newElement.name === "line") {
				newElement.points = newElement.points.map((p) => p + 10);
			}

			if (newElement.name === "text") {
				newElement.fontSize = newElement.fontSize / (zoomValue / 100);
				const { textHeight, textWidth } = calculateTextSize({ ...newElement });
				newElement.height = textHeight;
				newElement.width = textWidth;
			}

			setAllElements([...allElements, { ...newElement }]);
			setState({ ...state, allElements: [...allElements, { ...newElement }] });
		}
	};

	console.log({
		copyMultiElements,
		nodesArray,
		elementsLength: allElements?.length,
	});

	const handlePasteNode = (fromKey = false) => {
		if (copyNodeAttrs && Object.keys(copyNodeAttrs).length > 0) {
			const height =
				(canvasData.canvasInPx?.canvasHeight * (zoomValue / 100) -
					(copyNodeAttrs.height ?? 0)) /
				2.5;

			const width =
				(canvasData.canvasInPx?.canvasWidth * (zoomValue / 100) -
					(copyNodeAttrs.width ?? 0)) /
				2.5;

			const element = {
				...copyNodeAttrs,
				x: fromKey === false ? contextMenuAttrs.pageX : width,
				y: fromKey === false ? contextMenuAttrs.pageY : height,
				id: uuid(),
				shapeRef: createRef(),
			};
			delete element.ref;

			if (element.name === "ellipse") {
				element.height = element.radiusY * 2;
				element.width = element.radiusX * 2;
			}

			if (
				element.name === "line" ||
				element.name === "arrow" ||
				element.name === "polygon"
			) {
				let xPoint = Math.abs(
					parseInt(element.x) - parseInt(element.points[0])
				);
				let yPoint = Math.abs(
					parseInt(element.y) - parseInt(element.points[1])
				);

				if (element.name === "polygon") {
					element.points = element.points.map((p, i) => {
						return p.map((pl, j) => {
							if (j % 2 === 0) {
								return pl + xPoint;
							} else {
								return pl + yPoint;
							}
						});
					});
				} else {
					element.points = element.points.map((p, i) => {
						if (i % 2 === 0) {
							return p + xPoint;
						} else {
							return p + yPoint;
						}
					});
				}

				element.x = 0;
				element.y = 0;
			}

			if (element.height && element.width && element.name != "text") {
				element.height = element.height;
				element.width = element.width;
			}

			if (element.name === "text") {
				// element.fontSize = element.fontSize / (zoomValue / 100);
				const { textHeight, textWidth } = calculateTextSize({ ...element });
				element.height = textHeight;
				element.width = textWidth;
			}

			delete element?.["isCopied"];

			setAllElements([...allElements, { ...element }]);
			setState({ ...state, allElements: [...allElements, { ...element }] });
			setSelectedElement({ ...element });
		} else if (copyMultiElements?.length > 0) {
			const elementsToCopy = [];

			for (let el of copyMultiElements) {
				const height =
					(canvasData.canvasInPx?.canvasHeight / (zoomValue / 100)) * 0.05;

				const width =
					(canvasData.canvasInPx?.canvasWidth / (zoomValue / 100)) * 0.05;

				const element = {
					...el,
					x: el.x + width,
					y: el.y + height,

					id: uuid(),
					shapeRef: createRef(),
				};
				delete element.ref;

				if (element.name === "ellipse") {
					element.height = element.radiusY * 2;
					element.width = element.radiusX * 2;
				}

				if (
					element.name === "line" ||
					element.name === "arrow" ||
					element.name === "polygon"
				) {
					let xPoint = Math.abs(
						parseInt(element.x) - parseInt(element.points[0])
					);
					let yPoint = Math.abs(
						parseInt(element.y) - parseInt(element.points[1])
					);

					if (element.name === "polygon") {
						element.points = element.points.map((p, i) => {
							return p.map((pl, j) => {
								if (j % 2 === 0) {
									return pl + xPoint;
								} else {
									return pl + yPoint;
								}
							});
						});
					} else {
						element.points = element.points.map((p, i) => {
							if (i % 2 === 0) {
								return p + xPoint;
							} else {
								return p + yPoint;
							}
						});
					}

					element.x = 0;
					element.y = 0;
				}

				if (element.height && element.width && element.name != "text") {
					element.height = element.height;
					element.width = element.width;
				}

				if (element.name === "text") {
					// element.fontSize = element.fontSize / (zoomValue / 100);
					const { textHeight, textWidth } = calculateTextSize({ ...element });
					element.height = textHeight;
					element.width = textWidth;
				}

				delete element?.["isCopied"];

				elementsToCopy.push(element);
			}
			setAllElements([...allElements, ...elementsToCopy]);
			setState({ ...state, allElements: [...allElements, ...elementsToCopy] });
		}
	};

	const handleChangePositions = (operation) => {
		if (copyNodeAttrs && Object.keys(copyNodeAttrs).length > 0) {
			const objIdx = allElements.findIndex(
				(element) => element.id === copyNodeAttrs.id
			);

			if (objIdx === -1) {
				return;
			}

			const movingObject = { ...allElements[objIdx] };

			let newElements = allElements.filter(
				(element) => element.id !== copyNodeAttrs.id
			);

			if (operation === "send forward") {
				newElements.splice(objIdx + 1, 0, movingObject);
			}

			if (operation === "send backward") {
				if (objIdx !== 0) newElements.splice(objIdx - 1, 0, movingObject);
				else newElements = [{ ...movingObject }, ...newElements];
			}

			if (operation === "send back") {
				newElements = [{ ...movingObject }, ...newElements];
			}

			if (operation === "send to front") {
				newElements = [...newElements, { ...movingObject }];
			}
			setAllElements(newElements);

			setState({ ...state, allElements: [...newElements] });

			setSelectedElement({ ...selectedElement });
		}
	};

	const handleDeleteElementContextMenu = () => {
		if (copyNodeAttrs && Object.keys(copyNodeAttrs).length > 0) {
			const allNewElements = allElements.filter(
				(element) => element.id !== copyNodeAttrs.id
			);

			if (allNewElements.length !== allElements.length) {
				handleSelectElementParent();
				setSelectedElement({});
			}

			setAllElements([...allNewElements]);
			setState({ ...state, allElements: [...allNewElements] });
		}
	};

	const updateSelectionRect = () => {
		const node = selectionRectRef.current;
		node.setAttrs({
			visible: selection.current.visible,
			x: Math.min(selection.current.x1, selection.current.x2),
			y: Math.min(selection.current.y1, selection.current.y2),
			width: Math.abs(selection.current.x1 - selection.current.x2),
			height: Math.abs(selection.current.y1 - selection.current.y2),
			fill: "rgba(0, 161, 255, 0.3)",
		});
		node.getLayer().batchDraw();
	};

	const handleMouseDown = (e) => {
		isDrawing.current = true;

		// line
		if (drawLineEnabled) {
			handleLineOnMouseDown(e);
			return;
		}
		// rect
		if (drawRectangleEnabled) {
			handleRectangleOnMouseDown(e);
			return;
		}

		// ellipse
		if (drawEllipseEnabled) {
			handleEllipseOnMouseDown(e);
			return;
		}
		// polygon
		if (drawPolygonEnabled) {
			handlePolygonOnMouseDown(e);
			return;
		}

		if (drawArrowEnabled) {
			handleArrowOnMouseDown(e);
			return;
		}

		if (allElements?.length > 0) {
			allElements.forEach((element) => {
				if (element.name === "text" && element?.shapeRef?.current?.isEditing) {
					element.shapeRef.current?.handleRemoveTextArea(e);
				}
			});
		}

		const isElement = e.target.findAncestor(".elements-container");
		const isTransformer = e.target.findAncestor("Transformer");

		if (isElement || isTransformer) {
			return;
		}

		handleDeSelectElement(e);

		const pos = e.target.getStage().getPointerPosition();
		selection.current.visible = true;
		selection.current.x1 = pos.x;
		selection.current.y1 = pos.y;
		selection.current.x2 = pos.x;
		selection.current.y2 = pos.y;
		updateSelectionRect();
	};

	const handleMouseMove = (e) => {
		// if (!isDrawing.current) return;

		if (isDrawing.current) {
			if (drawLineEnabled) {
				handleLineOnMouseMove(e);
				return;
			}

			// rect
			if (drawRectangleEnabled) {
				handleRectangleOnMouseMove(e);
				return;
			}

			// ellipse
			if (drawEllipseEnabled) {
				handleEllipseOnMouseMove(e);
				return;
			}

			// polygon
			if (drawPolygonEnabled) {
				handlePolygonOnMouseMove(e);
				return;
			}

			if (drawArrowEnabled) {
				handleArrowOnMouseMove(e);
				return;
			}
		}

		if (!selection.current.visible) {
			return;
		}

		const pos = e.target.getStage().getPointerPosition();
		selection.current.x2 = pos.x;
		selection.current.y2 = pos.y;
		updateSelectionRect();
	};

	const onClickTap = (e) => {
		// if we are selecting with rect, do nothing
		let stage = e.target.getStage();
		let layer = layerRef.current;
		let tr = trRef.current;

		// if click on empty area - remove all selections
		if (e.target === stage) {
			selectShape(null);
			setNodes([]);
			tr.nodes([]);
			layer.draw();
			return;
		}

		// do nothing if clicked NOT on our rectangles
		if (
			!e.target.hasName(".rect") ||
			!e.target.hasName(".line") ||
			!e.target.hasName(".arrow") ||
			!e.target.hasName(".image") ||
			!e.target.hasName(".text") ||
			!e.target.hasName(".polygon") ||
			!e.target.hasName(".ellipse")
		) {
			return;
		}

		// do we pressed shift or ctrl?
		const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
		const isSelected = tr.nodes().indexOf(e.target) >= 0;

		if (!metaPressed && !isSelected) {
			// if no key pressed and the node is not selected
			// select just one
			tr.nodes([e.target]);
		} else if (metaPressed && isSelected) {
			// if we pressed keys and node was selected
			// we need to remove it from selection:
			const nodes = tr.nodes().slice(); // use slice to have new copy of array
			// remove node from array
			nodes.splice(nodes.indexOf(e.target), 1);
			tr.nodes(nodes);
		} else if (metaPressed && !isSelected) {
			// add the node into selection
			const nodes = tr.nodes().concat([e.target]);
			tr.nodes(nodes);
		}
		layer.draw();
	};

	const handleMouseUp = (e) => {
		isDrawing.current = null;

		if (drawLineEnabled) {
			handleLineOnMouseUp(e);
			return;
		}

		// rect
		if (drawRectangleEnabled) {
			handleRectangleOnMouseUp(e);
			return;
		}

		// ellipse
		if (drawEllipseEnabled) {
			handleEllipseOnMouseUp(e);
			return;
		}

		if (drawArrowEnabled) {
			handleArrowOnMouseUp(e);
			return;
		}

		if (drawPolygonEnabled) {
			isDrawing.current = true;
			return;
		}

		oldPos.current = null;
		if (!selection.current.visible) {
			return;
		}

		const selBox = selectionRectRef.current.getClientRect();

		const elements = [];
		const elementsIds = [];
		layerRef.current
			.find(".image, .text, .rect, .line, .ellipse, .polygon, .arrow")
			.forEach((elementNode) => {
				const elBox = elementNode.getClientRect();
				if (Konva.Util.haveIntersection(selBox, elBox)) {
					if (elementNode?.attrs?.isLocked !== true) {
						elements.push(elementNode);
						if (elementNode?.attrs?.id)
							elementsIds.push(elementNode?.attrs?.id);
					}
				}
			});

		console.log({ elements });
		setNodes(elementsIds);

		trRef.current.nodes?.(elements);
		selection.current.visible = false;
		// disable click event
		Konva.listenClickTap = false;
		updateSelectionRect();
	};

	const handleDeleteElement = () => {
		if (!_.isEmpty(selectedElement)) {
			const elementToDelete = allElements.find(
				(element) => element.id === selectedElement?.id
			);

			if (
				elementToDelete?.name === "text" &&
				elementToDelete?.shapeRef?.current?.isEditing
			) {
				return;
			}

			const updatedElements = allElements.filter(
				(element) => element?.id !== selectedElement?.id
			);

			setAllElements([...updatedElements]);
			setState({ ...state, allElements: [...updatedElements] });

			handleSelectElementParent();
			setSelectedElement({});
			trRef.current.nodes?.([]);
		} else if (!_.isEmpty(nodesArray)) {
			const newElements = [...allElements].filter(
				(e) => !nodesArray.includes(e?.id)
			);

			setAllElements([...newElements]);
			setState({ ...state, allElements: [...newElements] });
			setStrokeElement({});
			trRef.current.nodes?.([]);
			setNodes([]);
		}
	};

	const handleChangeElement = (data) => {
		if (!_.isEmpty(selectedElement)) {
			if (selectedElement.type === "line") {
				handleUpdateLine(selectedElement, data);
			}

			if (selectedElement.type === "rect") {
				handleUpdateRect(selectedElement, data);
			}

			if (selectedElement.type === "arrow") {
				handleUpdateArrow(selectedElement, data);
			}

			if (selectedElement.type === "polygon") {
				handleUpdatePolygon(selectedElement, data);
			}

			if (selectedElement.type === "ellipse") {
				handleUpdateEllipse(selectedElement, data);
			}

			if (selectedElement.type === "image") {
				handleUpdateImage(selectedElement, data);
			}

			if (selectedElement.type === "star") {
				handleUpdateStar(selectedElement, data);
			}
		} else if (nodesArray?.length > 0) {
			const newElements = allElements.map((element) => {
				if (nodesArray?.includes(element?.id)) {
					return {
						...element,
						...data,
					};
				}
				return element;
			});

			setAllElements([...newElements]);
			setState({ ...state, allElements: [...newElements] });
			// setStrokeElement({});
			// trRef.current.nodes?.([]);
			// setNodes([]);
		}
	};

	const handleDeSelectElement = (e) => {
		try {
			const clickedOnEmpty =
				e.target === e?.target?.getStage() || e.target.attrs.name === "bgColor";
			if (clickedOnEmpty) {
				setSelectedElement(null);
				selectShape(null);
				setNodes([]);
				trRef.current?.nodes([]);
				layerRef.current?.draw();
			}
		} catch (error) {
			// setSelectedElement(null);
		}
	};

	const handleSelectElement = (type, shape, ref = null) => {
		setSelectedElement({
			...shape,
			type,
			id: shape.id,
			isLocked: shape.isLocked,
			ref,
		});
	};

	const handleCreateChilds = (child) => {
		try {
			let newState = [];
			if (child?.allElements && child?.allElements.length > 0) {
				// for updating template initial state
				newState = child.orderingElements.map((item) => ({
					...item,
					shapeRef: createRef(),
				}));
			} else {
				const listOfIndex = Object.keys(child.orderingElements).sort();

				listOfIndex.forEach((elementIdx) => {
					newState.push(child.orderingElements[elementIdx]);
				});
			}
			setAllElements(newState);

			if (child.bgColor) {
				setBgColor(child.bgColor);
			}

			setState({ ...state, bgColor: child.bgColor, allElements: newState });
		} catch (error) {
			console.error(error);
		}
	};

	const handleUndo = () => {
		let indexNo = goBack();
		const currentState = states[indexNo];

		setAllElements(currentState.allElements);
		if (bgColor !== currentState.bgColor) setBgColor(currentState.bgColor);

		handleSelectElementParent();
		setSelectedElement({});
		trRef.current.nodes?.([]);
	};

	const handleRedo = () => {
		let indexNo = goForward();
		const currentState = states[indexNo];

		setAllElements(currentState.allElements);
		if (bgColor !== currentState.bgColor) setBgColor(currentState.bgColor);

		handleSelectElementParent();
		setSelectedElement({});
	};

	const handleUpdateBgColor = (color) => {
		if (color !== bgColor) {
			setBgColor(color);

			setState({ ...state, bgColor: color });
		}
	};

	const handleStateAfterColorChanged = () => {
		setState({
			...state,
			allElements,
			bgColor,
		});
	};

	const enableElementDisableElse = (element) => {
		element !== "line" && handleSetDrawLineEnabled(false);
		element !== "rectangle" && handleSetDrawRectangleEnabled(false);
		element !== "ellipse" && handleSetDrawEllipseEnabled(false);
		element !== "polygon" && handleSetDrawPolygonEnabled(false);
		element !== "arrow" && handleSetDrawArrowEnabled(false);
	};

	const handleElementLockUpdate = (id) => {
		if (id) {
			const allShapes = [...allElements];
			const idx = allShapes.findIndex((shape) => shape.id === id);
			if (allShapes[idx]) {
				allShapes[idx] = {
					...allShapes[idx],
					isLocked: !allShapes[idx].isLocked,
				};
				setState({ ...state, allElements: [...allShapes] });
				setAllElements(allShapes);
			}

			if (id === selectedElement?.id) {
				setSelectedElement({
					...selectedElement,
					isLocked: !selectedElement?.isLocked,
				});
			}
		} else {
			const newElements = allElements?.map((element) => {
				if (nodesArray?.includes(element?.id)) {
					return {
						...element,
						isLocked: true,
					};
				}

				return element;
			});

			setState({ ...state, allElements: [...newElements] });
			setAllElements(newElements);
			setNodes([]);
			trRef.current.nodes?.([]);
		}
	};

	const handleAddRandomElements = (element) => {
		if (element.name === "ellipse") {
			handleAddRandomEllipse(element);
		}

		if (element.name === "rect") {
			handleAddRandomRectangle(element);
		}

		if (element.name === "polygon") {
			handleAddRandomPolygon(element);
		}

		if (element.name === "star") {
			handleAddRandomStar(element);
		}
	};

	useImperativeHandle(ref, () => {
		return {
			enableDrawLine: () => {
				handleSetDrawLineEnabled(true);
				enableElementDisableElse("line");
			},
			enableDrawRectangle: () => {
				handleSetDrawRectangleEnabled(true);
				enableElementDisableElse("rectangle");
			},

			enableDrawEllipse: () => {
				handleSetDrawEllipseEnabled(true);
				enableElementDisableElse("ellipse");
			},
			enableDrawPolygon: () => {
				handleSetDrawPolygonEnabled(true);
				enableElementDisableElse("polygon");
			},
			enableDrawArrow: () => {
				handleSetDrawArrowEnabled(true);
				enableElementDisableElse("arrow");
			},

			handleDuplicateChange(childs) {
				handleCreateChilds(childs);
			},

			handleAddFontFamily(fontFamily) {
				if (props.fonts[fontFamily]?.url) {
					const allFonts = {
						...templateFonts,
						[fontFamily]: {
							name: props.fonts[fontFamily]?.fontFamily,
							url: props.fonts[fontFamily]?.url,
						},
					};

					setTemplateFonts({ ...allFonts });
				}
			},

			handleGetImage() {
				const image = ref.current?.getStage()?.toDataURL();
				return image;
			},

			elements: {
				bgColor,
				allElements,
			},

			handleElementLockUpdate,
			handleUndo,
			handleRedo,
			handleUpdateBgColor,
			bgColor,
			handleAddText,
			handleDeleteElement,
			handleChangeElement,
			handleStateAfterColorChanged,
			handleUpdateStrokeWidth,
			handleUpdateText,
			handleTransformText,
			handleAddGlyph,
			handleDuplicateText,
			handleAddImage,
			handleTextAlignment,
			handleAddRandomElements,
			setSelectedElement,
			handleCopyNode,
			handlePasteNode,
			handleCutNode,
			nodesArray,
			handleMouseDown: (e) => {
				let removeSelectedElement = true;
				if (allElements?.length > 0) {
					allElements.forEach((element) => {
						if (
							element.name === "text" &&
							element?.shapeRef?.current?.isEditing
						) {
							element.shapeRef.current?.handleRemoveTextArea(e);

							const textarea = document.getElementById(
								`textarea_${element.id}`
							);
							if (e.target === textarea) {
								removeSelectedElement = false;
							}
						}
					});
				}

				if (removeSelectedElement) {
					setSelectedElement({});
				}
			},

			templateFonts,
			stage: ref.current,

			...ref?.current?.getStage(),
		};
	});

	let canvasHeight = canvasData.canvasInPx.canvasHeight;
	let offsetY = isBleed ? parseInt(canvasHeight / 8) : 0;
	canvasHeight = isBleed ? canvasHeight + offsetY : canvasHeight;

	let canvasWidth = canvasData.canvasInPx.canvasWidth;
	let offsetX = isBleed ? parseInt(canvasWidth / 8) : 0;
	canvasWidth = isBleed ? canvasWidth + offsetX : canvasWidth;

	canvasWidth = isTrim ? canvasWidth + 80 : canvasWidth;
	canvasHeight = isTrim ? canvasHeight + 80 : canvasHeight;

	offsetX = isTrim ? offsetX + 40 : offsetX;
	offsetY = isTrim ? offsetY + 40 : offsetY;

	return (
		<div
			style={{
				height: `${canvasHeight * (zoomValue / 100)}px`,
				width: `${canvasWidth * (zoomValue / 100)}px`,
				marginTop: "10px",
				scrollBehavior: "smooth",
				overflow: "hidden",
				backgroundColor: bgColor,
			}}
			className={`${props.className} ${css([
				styles.main,
				selectedStage?.key === id && styles.outlineClass,
			])}`}
			// onMouseDown={handleMouseDown}
			key={id}
		>
			<Stage
				id={id}
				ref={ref}
				key={id}
				height={canvasHeight * (zoomValue / 100)}
				width={canvasWidth * (zoomValue / 100)}
				onClick={(e) => {
					if (id === selectedStage?.key) onClickTap(e);
					else handleChangeRef(id);
				}}
				onMouseMove={handleMouseMove}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onTouchStart={handleDeSelectElement}
				onContextMenu={handleContextMenu}
				style={{
					height: `${canvasHeight * (zoomValue / 100)}px`,
					width: `${canvasWidth * (zoomValue / 100)}px`,
				}}
			>
				{/* background color rect */}
				<Layer>
					<Rect
						width={canvasWidth * (zoomValue / 100)}
						height={canvasHeight * (zoomValue / 100)}
						fill={bgColor}
						stroke={bgColor}
						name="bgColor"
						zIndex={-1000}
					/>
				</Layer>
				{/* background color rect */}

				{isTrim && (
					<Layer>
						<Rect
							width={30 * (zoomValue / 100)}
							height={30 * (zoomValue / 100)}
							x={-10 * (zoomValue / 100)}
							y={-10 * (zoomValue / 100)}
							stroke={"#000"}
							name="bgColor"
						/>

						<Rect
							width={30 * (zoomValue / 100)}
							height={30 * (zoomValue / 100)}
							x={(canvasWidth - 20) * (zoomValue / 100)}
							y={-10 * (zoomValue / 100)}
							stroke={"#000"}
							name="bgColor"
						/>

						<Rect
							width={30 * (zoomValue / 100)}
							height={30 * (zoomValue / 100)}
							x={(canvasWidth - 20) * (zoomValue / 100)}
							y={-10 * (zoomValue / 100)}
							stroke={"#000"}
							name="bgColor"
						/>
						<Rect
							width={30 * (zoomValue / 100)}
							height={30 * (zoomValue / 100)}
							x={-10 * (zoomValue / 100)}
							y={(canvasHeight - 20) * (zoomValue / 100)}
							stroke={"#000"}
							name="bgColor"
						/>

						<Rect
							width={30 * (zoomValue / 100)}
							height={30 * (zoomValue / 100)}
							x={(canvasWidth - 20) * (zoomValue / 100)}
							y={(canvasHeight - 20) * (zoomValue / 100)}
							stroke={"#000"}
							name="bgColor"
						/>
					</Layer>
				)}

				{isDemo && (
					<Layer offsetY={-25 * (zoomValue / 100)}>
						{[...Array(parseInt((canvasWidth / 50).toFixed())).keys()].map(
							(yOffset, j) => (
								<>
									{[
										...Array(parseInt((canvasHeight / 50).toFixed())).keys(),
									].map((xOffset, i) => (
										<>
											<Text
												text="DEMO"
												fontStyle="bold"
												fill={"#1a1a1a"}
												rotation={-30}
												x={(xOffset + i * 50) * (zoomValue / 100)}
												y={(yOffset + j * 50) * (zoomValue / 100)}
												fontSize={12 * (zoomValue / 100)}
											/>
											<Text
												text="DEMO"
												fontStyle="bold"
												fill={"#d9d9d9"}
												rotation={-30}
												x={(xOffset + i * 50) * (zoomValue / 100)}
												y={(yOffset + j * 50 + 10) * (zoomValue / 100)}
												fontSize={12 * (zoomValue / 100)}
											/>
										</>
									))}
								</>
							)
						)}
					</Layer>
				)}

				<Layer
					offsetX={parseInt(-(offsetX / 2)) * (zoomValue / 100)}
					offsetY={parseInt(-(offsetY / 2)) * (zoomValue / 100)}
					ref={layerRef}
				>
					<Portal enabled={contextMenu}>
						{contextMenu && (
							<Html
								divProps={{
									position: "absolute",
									top: `${contextMenuAttrs.pageY}px`,
									left: `${contextMenuAttrs.pageX}px`,
									zIndex: 100000,
								}}
							>
								<div
									style={{
										position: "absolute",
										top: `${contextMenuAttrs.pageY}px`,
										left: `${contextMenuAttrs.pageX}px`,
										zIndex: 100000,
									}}
									ref={contextMenuRef}
								>
									<ContextMenu
										copyNodeAttrs={copyNodeAttrs}
										setContextMenu={setContextMenu}
										handleCopyNode={handleCopyNode}
										handlePasteNode={handlePasteNode}
										handleChangePositions={handleChangePositions}
										handleCloneNode={handleCloneNode}
										handleDeleteElementContextMenu={
											handleDeleteElementContextMenu
										}
									/>
								</div>
							</Html>
						)}
					</Portal>

					{allElements &&
						allElements.map((element) => (
							<>
								{element.name === "line" && (
									<LineKonva
										line={element}
										key={element.id}
										handleLineDrag={handleLineDrag}
										isSelected={element.id === selectedElement?.id}
										handleSelectElement={() =>
											handleSelectElement("line", element)
										}
										zoomValue={zoomValue}
										ref={element.shapeRef}
										trRef={trRef}
										strokeRef={strokeRef}
										setStrokeElement={setStrokeElement}
										setNodes={setNodes}
										nodesArray={nodesArray}
										strokeEnabled={
											strokeElement?.id === element?.id &&
											selectedElement?.id !== element.id
										}
									/>
								)}

								{element.name === "rect" && (
									<RectKonva
										rect={element}
										zoomValue={zoomValue}
										handleSelectElement={() =>
											handleSelectElement("rect", element)
										}
										isSelected={element.id === selectedElement?.id}
										handleRectangleDrag={handleRectangleDrag}
										ref={element.shapeRef}
										trRef={trRef}
										strokeRef={strokeRef}
										setStrokeElement={setStrokeElement}
										setNodes={setNodes}
										nodesArray={nodesArray}
										strokeEnabled={
											strokeElement?.id === element?.id &&
											selectedElement?.id !== element.id
										}
									/>
								)}

								{element.name === "star" && (
									<StarKonva
										star={element}
										zoomValue={zoomValue}
										handleSelectElement={() =>
											handleSelectElement("star", element)
										}
										isSelected={element.id === selectedElement?.id}
										handleStarDrag={handleStarDrag}
										ref={element.shapeRef}
										trRef={trRef}
										setNodes={setNodes}
										nodesArray={nodesArray}
										strokeRef={strokeRef}
										setStrokeElement={setStrokeElement}
										strokeEnabled={
											strokeElement?.id === element?.id &&
											selectedElement?.id !== element.id
										}
									/>
								)}

								{element.name === "arrow" && (
									<ArrowKonva
										key={element.id}
										arrow={element}
										handleArrowDrag={handleArrowDrag}
										isSelected={element.id === selectedElement?.id}
										handleSelectElement={() =>
											handleSelectElement("arrow", element)
										}
										zoomValue={zoomValue}
										ref={element.shapeRef}
										trRef={trRef}
										strokeRef={strokeRef}
										setNodes={setNodes}
										nodesArray={nodesArray}
										setStrokeElement={setStrokeElement}
										strokeEnabled={
											strokeElement?.id === element?.id &&
											selectedElement?.id !== element.id
										}
									/>
								)}

								{element.name === "ellipse" && (
									<EllipseKonva
										ellipse={element}
										zoomValue={zoomValue}
										handleSelectElement={() =>
											handleSelectElement("ellipse", element)
										}
										isSelected={element.id === selectedElement?.id}
										handleEllipseDrag={handleEllipseDrag}
										ref={element.shapeRef}
										trRef={trRef}
										strokeRef={strokeRef}
										setStrokeElement={setStrokeElement}
										setNodes={setNodes}
										nodesArray={nodesArray}
										strokeEnabled={
											strokeElement?.id === element?.id &&
											selectedElement?.id !== element.id
										}
									/>
								)}

								{element.name === "polygon" && (
									<PolygonKonva
										key={element.id}
										poly={element}
										points={element.points ? element.points : []}
										curMousePos={curMousePos}
										handleMouseOverStartPoint={handleMouseOverStartPoint}
										handleMouseOutStartPoint={handleMouseOutStartPoint}
										handleDragMovePoint={handleDragMovePoint}
										zoomValue={zoomValue}
										handlePolygonDrag={handlePolygonDrag}
										handleSelectElement={() =>
											element.isFinished &&
											handleSelectElement("polygon", element)
										}
										isSelected={element.id === selectedElement?.id}
										setNodes={setNodes}
										nodesArray={nodesArray}
										ref={element.shapeRef}
										trRef={trRef}
										strokeRef={strokeRef}
										setStrokeElement={setStrokeElement}
										strokeEnabled={
											strokeElement?.id === element?.id &&
											selectedElement?.id !== element.id
										}
									/>
								)}

								{element.name === "text" && (
									<TextKonva
										key={element.id}
										text={element}
										zoomValue={zoomValue}
										isSelected={element.id === selectedElement?.id}
										stageRef={ref}
										ref={element.shapeRef}
										canvasData={canvasData}
										fonts={props.fonts}
										bgColor={bgColor}
										trRef={trRef}
										handleSelectElement={(ref) =>
											handleSelectElement("text", element, ref)
										}
										handleTextDrag={handleTextDrag}
										setSelectedElement={setSelectedElement}
										calculateTextSize={calculateTextSize}
										strokeRef={strokeRef}
										setStrokeElement={setStrokeElement}
										setNodes={setNodes}
										nodesArray={nodesArray}
										strokeEnabled={
											strokeElement?.id === element?.id &&
											selectedElement?.id !== element.id
										}
									/>
								)}

								{element.name === "image" && (
									<>
										{element.src.endsWith(".gif") ? (
											<GifImage
												key={element.id}
												image={element}
												zoomValue={zoomValue}
												isSelected={element.id === selectedElement?.id}
												handleSelectElement={(ref) =>
													handleSelectElement("image", element, ref)
												}
												handleImageDrag={handleImageDrag}
												stageRef={ref}
												setSelectedElement={setSelectedElement}
												images={props.images}
												handleDeleteImage={handleDeleteImage}
												bgColor={bgColor}
												ref={element.shapeRef}
												trRef={trRef}
												user={props.user}
												setNodes={setNodes}
												nodesArray={nodesArray}
												strokeRef={strokeRef}
												setStrokeElement={setStrokeElement}
												strokeEnabled={
													strokeElement?.id === element?.id &&
													selectedElement?.id !== element.id
												}
											/>
										) : (
											<ImageKonva
												key={element.id}
												image={element}
												zoomValue={zoomValue}
												isSelected={element.id === selectedElement?.id}
												handleSelectElement={(ref) =>
													handleSelectElement("image", element, ref)
												}
												handleImageDrag={handleImageDrag}
												stageRef={ref}
												setSelectedElement={setSelectedElement}
												images={props.images}
												handleDeleteImage={handleDeleteImage}
												bgColor={bgColor}
												ref={element.shapeRef}
												trRef={trRef}
												user={props.user}
												strokeRef={strokeRef}
												setNodes={setNodes}
												nodesArray={nodesArray}
												setStrokeElement={setStrokeElement}
												strokeEnabled={
													strokeElement?.id === element?.id &&
													selectedElement?.id !== element.id
												}
											/>
										)}
									</>
								)}
							</>
						))}

					{newPolygon && Object.keys(newPolygon).length > 0 && (
						<PolygonKonva
							key={newPolygon.id}
							poly={newPolygon}
							points={newPolygon.points ? newPolygon.points : []}
							curMousePos={curMousePos}
							handleMouseOverStartPoint={handleMouseOverStartPoint}
							handleMouseOutStartPoint={handleMouseOutStartPoint}
							handleDragMovePoint={handleDragMovePoint}
							zoomValue={zoomValue}
							handlePolygonDrag={handlePolygonDrag}
							handleSelectElement={() =>
								newPolygon.isFinished && setSelectedElement(newPolygon.id)
							}
							isSelected={newPolygon.id === selectedElement}
						/>
					)}

					{
						// selectedElement &&
						// Object.keys(selectedElement).length > 0 &&
						triggerSaveTemplate !== true &&
							triggerDownloadTemplate !== true && (
								<TransformerKonva
									ref={trRef}
									selectedElement={selectedElement}
									// currentSelectedElement={currentSelectedElement}
								/>
							)
					}

					{strokeElement &&
						Object.keys(strokeElement).length > 0 &&
						triggerSaveTemplate !== true &&
						triggerDownloadTemplate !== true && (
							<TransformerKonva
								stroke={true}
								ref={strokeRef}
								selectedElement={strokeElement}
								// currentSelectedElement={currentSelectedElement}
							/>
						)}

					<Rect fill="rgba(0,0,255,0.5)" ref={selectionRectRef} />
				</Layer>
			</Stage>
		</div>
	);
});

export default CustomStage;

const styles = StyleSheet.create({
	main: {
		":hover": {
			outline: "rgb(126, 228, 249) solid 1.3px",
		},
	},

	outlineClass: {
		outline: "rgb(126, 228, 249) solid 1.3px",
	},
});
