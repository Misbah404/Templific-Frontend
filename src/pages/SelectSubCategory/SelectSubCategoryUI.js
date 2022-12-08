import { css } from "aphrodite";
import React from "react";
import { Button, ModalView, SelectBox, TextField } from "../../components";
import { AppStyles, Images } from "../../theme";
import styles from "./styles";
import SVG from "react-inlinesvg";
import { InputGroup } from "react-bootstrap";

function SelectSubCategoryUI(props) {
	const {
		template_types,
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
		handleItemClick,
		selectedMainCategory,
		mainCategoryList,
		isLoading,
		createCategory,
		error,
		subCategoryOfMainCategory,
	} = props;

	const renderCards = () => {
		return (
			<div className={`w-100 ${css(styles.tempRow)}`}>
				{subCategoryOfMainCategory.map((res) => (
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
				key={res.id}
				onClick={() => handleItemClick(res)}
			>
				{cardAction()}
				<img
					src={res?.image?.url}
					alt={res?.image?.name}
					className={`${css(styles.templateImg)}`}
				/>
				<p className={`${css(styles.templateName)}`}>{res.name}</p>
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
						<span>Add Sub-Category</span>
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

				<SelectBox
					styles={[styles.canvasInput]}
					label="Main Category"
					name={`main-category`}
					value={mainCategory}
					onChange={(value) => setMainCategory(value.target.value)}
				>
					<option disabled>Choose category</option>

					{mainCategoryList.map((res, idx) => (
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
				>
					<option disabled>Choose category</option>

					{/* {template_categories.map((res, idx) => (
						<option value={res} key={idx}>
							{res}
						</option>
					))} */}
				</SelectBox>
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
						value={selectedMainCategory?.name}
						disabled={true}
					/>
				</div>

				<InputGroup className={`align-items-end position-relative`}>
					<TextField
						wrapClass={`flex-grow-1`}
						styles={[styles.canvasInput]}
						label="Sub Category Name"
						name={`sub-name`}
						value={subCategory}
						onChange={(value) => setSubCategory(value.target.value)}
						autofocus
					/>
				</InputGroup>

				{error && <div className={`${css(styles.errors)}`}>{error}</div>}
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

				<h2 className={`${css(styles.mainHeading)}`}>All Sub Categories</h2>

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
				isLoading={isLoading}
			>
				{renderTemplateModalContent()}
			</ModalView>

			<ModalView
				title={"Add Sub Category"}
				cancelText={"Cancel"}
				submitText={"Create"}
				showModal={addCategoryModal}
				setShowModal={toggleAddCategoryModal}
				cancelOnClick={toggleAddCategoryModal}
				submitOnClick={createCategory}
				isLoading={isLoading}
			>
				{renderCategoryModalContent()}
			</ModalView>
		</div>
	);
}

export default SelectSubCategoryUI;
