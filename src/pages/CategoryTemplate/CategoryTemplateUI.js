import { css } from "aphrodite";
import React from "react";
import { Button, ModalView, SelectBox, TextField } from "../../components";
import { AppStyles, Images } from "../../theme";
import styles from "./styles";
import SVG from "react-inlinesvg";
import { InputGroup } from "react-bootstrap";

function CategoryTemplateUI(props) {
	const {
		template_types,
		addTemplateModal,
		toggleTemplateModal,
		templateName,
		setTemplateName,
		selectedUnit,
		canvasHeight,
		setCanvasHeight,
		canvasWidth,
		setCanvasWidth,
		showSizeModal,
		initialState,
		errors,
		handleChangeUnit,
		toggleShowSizeModal,
		handleSubmitTemplateName,
	} = props;

	const renderCards = () => {
		return (
			<div className={`w-100 ${css(styles.tempRow)}`}>
				{template_types.map((res) => (
					<>{cardItem(res)}</>
				))}
			</div>
		);
	};

	const cardAction = () => {
		return (
			<div className={css(styles.cardAction)}>
				<img src={Images.ellipse} className={css(styles.cardActionImage)} />
			</div>
		);
	};

	const cardItem = (res) => {
		return (
			<div
				className={`d-flex flex-column align-items-center justify-content-center ${css(
					styles.tempCol
				)}`}
				key={res.title}
			>
				{cardAction()}
				<img
					src={res.image}
					alt={res.title}
					className={`${css(styles.templateImg)}`}
				/>
				<p className={`${css(styles.templateName)}`}>{res.title}</p>
			</div>
		);
	};

	const actionButtons = () => {
		return (
			<div className={`${css(styles.buttonWrapper)}`}>
				<Button
					className={css(styles.addTemplate)}
					leftIcon
					btnWrap={styles.addTemplateWrap}
					onClick={toggleTemplateModal}
				>
					<div
						className={`${css(AppStyles.flexRow)} ${css(
							AppStyles.alignItemsCenter
						)} ${css(AppStyles.spaceBetween)}`}
					>
						<SVG
							src={Images.plus}
							height={"auto"}
							width={"auto"}
							className={`${css(styles.addIcon)}`}
						/>
						<span>Add Template</span>
					</div>
				</Button>
			</div>
		);
	};

	const renderTemplateModalContent = () => {
		return (
			<div className="d-flex align-items-start flex-column w-100">
				<p className={`${css(styles.formlabel)}`}>Template Name:</p>
				<div className={`position-relative w-100`}>
					<TextField
						name={`canvas-height`}
						styles={[styles.canvasInput]}
						value={templateName}
						onChange={(e) => setTemplateName(e.target.value)}
						autofocus
					/>
				</div>
			</div>
		);
	};

	const renderTemplateSizeContent = () => {
		return (
			<div>
				<div className={`d-flex`}>
					<form onSubmit={(e) => e.preventDefault()}>
						<div
							className={`${css(
								styles.formRow
							)} d-flex align-items-center justify-content-between`}
						>
							<p className={`${css(styles.formlabel)}`}>Units:</p>
							<div>
								<label
									className={`d-inline-flex align-items-center ${css(
										styles.unitLabel
									)}`}
								>
									<input
										type="radio"
										className={`${css(styles.unitRadio)}`}
										onChange={handleChangeUnit}
										value="inches"
										checked={selectedUnit === "inches"}
									/>
									inches
								</label>
								<label
									className={`d-inline-flex align-items-center ${css(
										styles.unitLabel
									)}`}
								>
									<input
										type="radio"
										className={`${css(styles.unitRadio)}`}
										onChange={handleChangeUnit}
										value="mm"
										checked={selectedUnit === "mm"}
									/>
									mm
								</label>
								<label
									className={`d-inline-flex align-items-center ${css(
										styles.unitLabel
									)}`}
								>
									<input
										type="radio"
										className={`${css(styles.unitRadio)}`}
										onChange={handleChangeUnit}
										value="pixels"
										checked={selectedUnit === "pixels"}
									/>
									pixels
								</label>
							</div>
						</div>
						<div
							className={`${css(
								styles.formRow
							)} d-flex align-items-center justify-content-between`}
						>
							<p className={`${css(styles.formlabel)}`}>Canvas:</p>
							<div className={`d-flex align-items-center`}>
								<div className={`position-relative`}>
									<TextField
										name={`canvas-width`}
										styles={[styles.canvasInput]}
										value={canvasWidth}
										onChange={(value) => setCanvasWidth(value.target.value)}
										type="number"
										autofocus
									/>
									<span
										className={`d-flex align-items-center position-absolute ${css(
											styles.canvasFieldSufix
										)}`}
									>
										w
									</span>
								</div>
								<span style={{ margin: "0 0.5vw", fontSize: "1.2vw" }}>
									{" "}
									x{" "}
								</span>
								<div className={`position-relative`}>
									<TextField
										name={`canvas-height`}
										styles={[styles.canvasInput]}
										value={canvasHeight}
										onChange={(value) => setCanvasHeight(value.target.value)}
										type="number"
									/>
									<span
										className={`d-flex align-items-center position-absolute ${css(
											styles.canvasFieldSufix
										)}`}
									>
										h
									</span>
								</div>
							</div>
						</div>
						{errors && (
							<div className="d-flex align-items-center">
								<span className={`${css(styles.errors)}`}>{errors}</span>
							</div>
						)}
					</form>
				</div>
			</div>
		);
	};

	return (
		<div
			className={`${css(
				styles.main
			)} d-flex flex-column align-items-center justify-content-center`}
		>
			<div
				className={`${css(
					styles.templateBox
				)} d-flex flex-column align-items-center justify-content-center position-relative`}
			>
				{actionButtons()}

				<h2 className={`${css(styles.mainHeading)}`}>All templates</h2>

				{renderCards()}
			</div>

			<ModalView
				showModal={showSizeModal}
				setShowModal={toggleShowSizeModal}
				title={`Set Template Size`}
				cancelText={`Cancel`}
				cancelOnClick={() => {
					toggleShowSizeModal();
					initialState();
				}}
				submitText={`Create`}
				// submitOnClick={handleSubmitTemplateSize}
			>
				{renderTemplateSizeContent()}
			</ModalView>

			<ModalView
				title={"Add Template"}
				cancelText={"Cancel"}
				submitText={"Create"}
				showModal={addTemplateModal}
				setShowModal={toggleTemplateModal}
				cancelOnClick={toggleTemplateModal}
				submitOnClick={handleSubmitTemplateName}
			>
				{renderTemplateModalContent()}
			</ModalView>
		</div>
	);
}

export default CategoryTemplateUI;
