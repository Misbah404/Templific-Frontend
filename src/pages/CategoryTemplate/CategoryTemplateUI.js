import { css } from "aphrodite";
import React from "react";
import { Button, ModalView, SelectBox, TextField } from "../../components";
import { AppStyles, Images } from "../../theme";
import styles from "./styles";
import SVG from "react-inlinesvg";
import { Dropdown, InputGroup } from "react-bootstrap";

function CategoryTemplateUI(props) {
	const {
		addTemplateModal,
		toggleTemplateModal,
		templateName,
		setTemplateName,
		handleSubmitTemplateName,
		templateList,
		editModal,
		toggleEditModal,
		openEditModal,
		mainCategoryList,
		subCategoryList,
		subCategory,
		mainCategory,
		setSubCategory,
		setMainCategory,
		handleUpdateTemplate,
		closeModal,
		handleDeleteTemplate,
		onClickTemplate,
		selectedSubCategory,
	} = props;

	const renderCards = () => {
		return (
			<div className={`w-100 ${css(styles.tempRow)}`}>
				{templateList?.length > 0 &&
					templateList.map((res) => <>{cardItem(res)}</>)}
			</div>
		);
	};

	const cardAction = (res) => {
		return (
			<div className={css(styles.cardAction)}>
				{/* <img src={Images.ellipse} className={css(styles.cardActionImage)} /> */}

				<Dropdown>
					<Dropdown.Toggle
						id="dropdown-autoclose-true"
						variant="transparent"
						style={{ padding: 0 }}
					>
						<img src={Images.ellipse} className={css(styles.cardActionImage)} />
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => openEditModal(res)}>
							Edit
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleDeleteTemplate(res)}>
							Delete
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	};

	const cardItem = (res) => {
		return (
			<div className={`${css(styles.tempCol)}`} key={res.id}>
				{cardAction(res)}
				<div
					className="d-flex flex-column align-items-center justify-content-center w-100 h-100"
					onClick={() => onClickTemplate(res)}
				>
					<img
						src={res?.image?.url}
						alt={res.name}
						className={`${css(styles.templateImg)}`}
					/>
					<p className={`${css(styles.templateName)}`}>{res.name}</p>
				</div>
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
					onClick={handleSubmitTemplateName}
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

	const renderEditModalContent = () => {
		return (
			<div className="d-flex align-items-start flex-column w-100">
				<div className={`position-relative w-100`}>
					<SelectBox
						styles={[styles.canvasInput]}
						label="Main Category"
						name={`main-category`}
						value={mainCategory}
						onChange={(value) => {
							setMainCategory(value.target.value);
							setSubCategory("");
						}}
					>
						<option disabled selected value="">
							Choose main category
						</option>

						{mainCategoryList.map((res) => (
							<option value={res?.id} key={res?.id}>
								{res?.name}
							</option>
						))}
					</SelectBox>

					<SelectBox
						styles={[styles.canvasInput]}
						label="Sub Category"
						name={`main-category`}
						value={subCategory}
						onChange={(value) => setSubCategory(value.target.value)}
						disabled={!!!mainCategory}
					>
						<option disabled selected value="">
							Choose sub category
						</option>

						{subCategoryList.map((res) => (
							<option value={res?.id} key={res?.id}>
								{res?.name}
							</option>
						))}
					</SelectBox>

					<TextField
						label={"Template name"}
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

				<h2 className={`${css(styles.mainHeading)}`}>
					{selectedSubCategory?.name ?? "All templates"}
				</h2>

				{renderCards()}
			</div>
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

			<ModalView
				title={"Edit Template"}
				cancelText={"Cancel"}
				submitText={"Save"}
				showModal={editModal}
				setShowModal={toggleEditModal}
				cancelOnClick={closeModal}
				submitOnClick={handleUpdateTemplate}
			>
				{renderEditModalContent()}
			</ModalView>
		</div>
	);
}

export default CategoryTemplateUI;
