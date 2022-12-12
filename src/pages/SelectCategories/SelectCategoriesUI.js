import { css } from "aphrodite";
import React from "react";
import { Button, ModalView, SelectBox, TextField } from "../../components";
import { ROUTES } from "../../constants";
import { AppStyles, Images } from "../../theme";
import styles from "./styles";
import SVG from "react-inlinesvg";
import { Dropdown } from "react-bootstrap";

function SelectCategoriesUI(props) {
	const {
		addTemplateModal,
		addCategoryModal,
		toggleTemplateModal,
		toggleAddCategoryModal,
		templateName,
		setTemplateName,
		mainCategory,
		setMainCategory,
		setSubCategory,
		subCategory,
		filePickerRef,
		handleSetImage,
		triggerFilePickerClick,
		handleClickItemCard,
		createCategory,
		isLoading,
		error,
		closeModals,
		mainCategoryList,
		isEditing,
		setEditModal,
		updateCategory,
		subCategoryList,
		createTemplate,
	} = props;

	const renderCards = () => {
		return (
			<div className={`w-100 ${css(styles.tempRow)}`}>
				{mainCategoryList?.map((res) => (
					<>{cardItem(res)}</>
				))}
			</div>
		);
	};

	const cardAction = (res) => {
		return (
			<div
				className={css(styles.cardAction)}
				onClick={(e) => e.preventDefault()}
			>
				<Dropdown trigger="hover">
					<Dropdown.Toggle
						id="dropdown-autoclose-true"
						variant="transparent"
						style={{ padding: 0 }}
					>
						<img src={Images.ellipse} className={css(styles.cardActionImage)} />
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => setEditModal(res)}>
							Edit
						</Dropdown.Item>
						<Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	};

	const cardItem = (res) => {
		return (
			<div
				className={`d-flex flex-column align-items-center justify-content-center ${css(
					styles.tempCol
				)}`}
				key={res.id}
			>
				{cardAction(res)}
				<div
					className="w-100 h-100 d-flex flex-column align-items-center justify-content-center"
					onClick={() => handleClickItemCard(res)}
				>
					<img
						src={res?.image?.url}
						alt={res?.image?.name}
						className={`${css(styles.templateImg)}`}
					/>
					<p className={`${css(styles.templateName)}`}>{res?.name}</p>
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

				<Button
					className={css(styles.addCategory)}
					leftIcon
					onClick={toggleAddCategoryModal}
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
						<span>Add Categories</span>
					</div>
				</Button>
			</div>
		);
	};

	const renderTemplateModalContent = () => {
		return (
			<div className="d-flex align-items-start flex-column w-100">
				{/* <p className={`${css(styles.formlabel)}`}>Template Name:</p> */}
				{/* <div className={`position-relative w-100`}>
					<TextField
						name={`canvas-height`}
						styles={[styles.canvasInput]}
						value={templateName}
						onChange={(e) => setTemplateName(e.target.value)}
						type="number"
					/>
				</div> */}

				<SelectBox
					styles={[styles.canvasInput]}
					label="Main Category"
					name={`main-category`}
					value={mainCategory ?? ""}
					onChange={(value) => setMainCategory(value.target.value)}
				>
					<option disabled selected value="">
						Choose category
					</option>

					{mainCategoryList?.map((res) => (
						<option value={res?.id} key={res?.id}>
							{res?.name}
						</option>
					))}
				</SelectBox>

				<SelectBox
					styles={[styles.canvasInput]}
					label="Sub Category"
					name={`sub-category`}
					value={subCategory}
					onChange={(value) => setSubCategory(value.target.value)}
				>
					<option disabled selected value="">
						Choose category
					</option>

					{subCategoryList?.map((res) => (
						<option value={res?.id} key={res?.id}>
							{res?.name}
						</option>
					))}
				</SelectBox>

				{error && <div className={`${css(styles.errors)}`}>{error}</div>}
			</div>
		);
	};

	const renderCategoryModalContent = () => {
		return (
			<div className="d-flex align-items-start flex-column w-100">
				<div
					className={`w-100 d-flex align-items-center justify-content-center ${css(
						styles.uploadImage
					)}`}
					onClick={triggerFilePickerClick}
				>
					<span>Upload Image</span>
				</div>

				<input
					ref={filePickerRef}
					type="file"
					onChange={handleSetImage}
					style={{ display: "none" }}
					accept=".png, .jpg, .jpeg"
				/>

				<p className={`${css(styles.formlabel)}`}>Main Category:</p>
				<div className={`position-relative w-100`}>
					<TextField
						name={`main-category`}
						styles={[styles.canvasInput]}
						value={mainCategory}
						onChange={(e) => setMainCategory(e.target.value)}
					/>
				</div>

				{error && <div className={`${css(styles.errors)}`}>{error}</div>}
			</div>
		);
	};

	const emptyList = () => {
		return (
			<div className="d-flex justify-content-center align-items-center">
				<span className={`${css(styles.mainHeading)}`}>
					No categories for now.
				</span>
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

				<h2 className={`${css(styles.mainHeading)}`}>All Categories</h2>

				{[...mainCategoryList]?.length > 0 ? renderCards() : emptyList()}
			</div>

			<ModalView
				title={"Add Template"}
				cancelText={"Cancel"}
				submitText={"Create"}
				showModal={addTemplateModal}
				setShowModal={toggleTemplateModal}
				cancelOnClick={closeModals}
				submitOnClick={createTemplate}
			>
				{renderTemplateModalContent()}
			</ModalView>

			<ModalView
				title={isEditing ? "Edit Category" : "Add Category"}
				cancelText={"Cancel"}
				submitText={isEditing ? "Update" : "Create"}
				showModal={addCategoryModal}
				setShowModal={toggleAddCategoryModal}
				cancelOnClick={closeModals}
				submitOnClick={isEditing ? updateCategory : createCategory}
				isLoading={isLoading}
			>
				{renderCategoryModalContent()}
			</ModalView>
		</div>
	);
}

export default SelectCategoriesUI;
