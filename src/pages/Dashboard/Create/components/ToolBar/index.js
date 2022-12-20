import SVG from "react-inlinesvg";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { css } from "aphrodite";
import { connect } from "react-redux";
import { PaintBucket } from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ElementDropDown, TextTools, ToolbarButton } from "..";
import styles from "./styles";
import { Images } from "../../../../../theme";

const ToolBar = (props) => {
	const {
		selectedStage,
		layout,
		selectElement,
		setSelectElement,
		zoomValue,
		multiNodesElement,
	} = props;

	const [showPicker, setShowPicker] = useState(false);
	const [color, setColor] = useState("#000");
	const [showRangeSlider, setShowRangeSlider] = useState(false);

	const [rangeSlider, setRangeSlider] = useState(1);

	useEffect(() => {
		if (selectElement && selectElement.color) {
			setColor(selectElement.color);
		}

		if (selectElement && selectElement.opacity) {
			setRangeSlider(selectElement.opacity);
		}

		setShowPicker(false);
	}, [selectElement]);

	const handleLockElement = () => {
		if (selectElement && Object.keys(selectElement).length > 0)
			selectedStage?.canvas?.current?.handleElementLockUpdate(selectElement.id);
		else if (multiNodesElement?.length > 0) {
			selectedStage?.canvas?.current?.handleElementLockUpdate();
		}

		setSelectElement({
			...selectElement,
			isLocked: !selectElement.isLocked,
		});
	};

	const handleChangeColor = (e) => {
		setColor(e.hex);
		selectedStage?.canvas?.current?.handleChangeElement({ color: e.hex });
	};

	const handleChangeComplete = (e) => {
		selectedStage?.canvas?.current?.handleStateAfterColorChanged();
	};

	const handleRangeChange = (e) => {
		setRangeSlider(e.target.value);

		if (selectElement.type === "text") {
			selectedStage?.canvas?.current?.handleUpdateText(
				{ opacity: e.target.value },
				selectElement.id
			);
		}

		if (
			selectElement.type === "line" ||
			selectElement.type === "rect" ||
			selectElement.type === "ellipse" ||
			selectElement.type === "arrow" ||
			selectElement.type === "polygon" ||
			selectElement.type === "image" ||
			selectElement.type === "star"
		) {
			selectedStage?.canvas?.current?.handleChangeElement({
				opacity: e.target.value,
			});
		} else if (multiNodesElement?.length > 0) {
			selectedStage?.canvas?.current?.handleChangeElement({
				opacity: e.target.value,
			});
		}
	};

	return (
		<div className={` ${css(styles.topBar)}`}>
			<div className="d-flex justify-content-between align-items-center">
				<div className="d-flex justify-content-start ">
					{/* {layout.sideBar && layout.sideBarElement === "elements" && ( */}
					<ElementDropDown
						selectedStage={selectedStage}
						selectElement={selectElement}
						layout={layout}
					/>
					{/* )} */}

					{selectElement && selectElement.type === "text" && (
						<TextTools
							selectedStage={selectedStage}
							selectElement={selectElement}
							zoomValue={zoomValue}
						/>
					)}
				</div>

				<div className={`d-flex justify-content-start`}>
					{selectElement &&
						selectElement.id &&
						selectElement.type !== "text" &&
						selectElement.type !== "image" && (
							<>
								<OverlayTrigger
									overlay={<Tooltip>{"Fill"}</Tooltip>}
									placement={"bottom"}
								>
									{({ ref, ...triggerHandler }) => (
										<button
											onClick={() => setShowPicker(true)}
											className={`d-flex justify-content-center align-items-center ${css(
												styles.toolbarIconBtn
											)}`}
											{...triggerHandler}
										>
											<PaintBucket
												className={`${css(styles.toolbarIcon)}`}
												color={"#000"}
												size={120}
												ref={ref}
											/>
										</button>
									)}
								</OverlayTrigger>

								{showPicker && (
									<div className={`${css(styles.popover)}`}>
										<div
											onClick={() => setShowPicker(false)}
											className={`${css(styles.cover)}`}
										/>
										<SketchPicker
											color={color}
											disableAlpha
											onChange={handleChangeColor}
											onChangeComplete={handleChangeComplete}
										/>
									</div>
								)}
							</>
						)}

					<OverlayTrigger
						overlay={<Tooltip>{"Undo"}</Tooltip>}
						placement={"bottom"}
					>
						{({ ref, ...triggerHandler }) => (
							<button
								className={`d-flex justify-content-center align-items-center ${css(
									styles.toolbarIconBtn
								)}`}
								onClick={() => selectedStage?.canvas?.current?.handleUndo()}
								{...triggerHandler}
							>
								<SVG
									height="auto"
									width="auto"
									src={Images.undoIcon}
									className={`${css(styles.toolbarIcon)}`}
									ref={ref}
								/>
							</button>
						)}
					</OverlayTrigger>

					{/* <ToolbarButton
            image={Images.undoIcon}
            conditionStyle={null}
            tooltip="Undo"
            handleClick={() => selectedStage?.canvas?.current?.handleUndo()}
          /> */}
					<OverlayTrigger
						overlay={<Tooltip>{"Redo"}</Tooltip>}
						placement={"bottom"}
					>
						{({ ref, ...triggerHandler }) => (
							<button
								className={`d-flex justify-content-center align-items-center ${css(
									styles.toolbarIconBtn
								)}`}
								onClick={() => selectedStage?.canvas?.current?.handleRedo()}
								{...triggerHandler}
							>
								<SVG
									ref={ref}
									height="auto"
									width="auto"
									src={Images.redoIcon}
									className={`${css(styles.toolbarIcon)}`}
								/>
							</button>
						)}
					</OverlayTrigger>

					{((selectElement && selectElement.id) ||
						multiNodesElement?.length > 0) && (
						<>
							<OverlayTrigger
								overlay={<Tooltip>{"Transparent Element"}</Tooltip>}
								placement={"bottom"}
							>
								{({ ref, ...triggerHandler }) => (
									<button
										className={`d-flex justify-content-center align-items-center ${css(
											styles.toolbarIconBtn
										)}`}
										onClick={() => setShowRangeSlider(true)}
										{...triggerHandler}
									>
										<SVG
											ref={ref}
											height="auto"
											width="auto"
											src={Images.transparencyIcon}
											className={`${css([styles.toolbarIcon])}`}
										/>
									</button>
								)}
							</OverlayTrigger>

							{showRangeSlider && (
								<div className={`${css(styles.rangePopOver)}`}>
									<div
										onClick={() => setShowRangeSlider(false)}
										className={`${css(styles.cover)}`}
									/>
									<div
										className={`d-flex justify-content-center align-items-center ${css(
											styles.rangeSliderWrapper
										)}`}
									>
										<input
											type="range"
											max="1"
											min="0"
											step="0.05"
											value={rangeSlider}
											onChange={handleRangeChange}
											className={`${css(styles.rangeSlider)}`}
										/>
									</div>
								</div>
							)}

							<OverlayTrigger
								overlay={<Tooltip>{"Lock Element"}</Tooltip>}
								placement={"bottom"}
							>
								{({ ref, ...triggerHandler }) => (
									<button
										className={`d-flex justify-content-center align-items-center ${css(
											[
												styles.toolbarIconBtn,
												selectElement.isLocked && styles.toolBarDelete,
											]
										)}`}
										onClick={handleLockElement}
										{...triggerHandler}
									>
										<SVG
											ref={ref}
											height="auto"
											width="auto"
											src={Images.lockIcon}
											className={`${css([styles.toolbarIcon])}`}
										/>
									</button>
								)}
							</OverlayTrigger>

							<OverlayTrigger
								overlay={<Tooltip>{"Delete Element"}</Tooltip>}
								placement={"bottom"}
							>
								{({ ref, ...triggerHandler }) => (
									<button
										className={`d-flex justify-content-center align-items-center ${css(
											[styles.toolbarIconBtn]
										)}`}
										onClick={() =>
											selectedStage?.canvas?.current?.handleDeleteElement()
										}
										{...triggerHandler}
									>
										<i className={`far fa-trash-alt`} ref={ref}></i>
									</button>
								)}
							</OverlayTrigger>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	layout: state.layout,
});

export default connect(mapStateToProps)(ToolBar);
