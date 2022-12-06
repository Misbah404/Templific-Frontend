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
				title={"Add Template"}
				cancelText={"Cancel"}
				submitText={"Create"}
				showModal={addTemplateModal}
				setShowModal={toggleTemplateModal}
				cancelOnClick={toggleTemplateModal}
				submitOnClick={toggleTemplateModal}
			>
				{renderTemplateModalContent()}
			</ModalView>
		</div>
	);
}

export default CategoryTemplateUI;
