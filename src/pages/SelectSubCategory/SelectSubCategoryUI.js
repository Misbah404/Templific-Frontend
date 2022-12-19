import { css } from "aphrodite";
import React from "react";
import { Button, ModalView, SelectBox, TextField } from "../../components";
import { AppStyles, Images } from "../../theme";
import styles from "./styles";
import SVG from "react-inlinesvg";
import { Dropdown, InputGroup } from "react-bootstrap";

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
		openEditModal,
		isEditing,
		handleEditCategoryReq,
		handleDeleteCategory,
		subCategoryListOptions,
		closeModals,
		handleAddModal,
		imageFile,
		showAddTemplateButton,
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
						<Dropdown.Item onClick={() => handleDeleteCategory(res)}>
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
					className="d-flex flex-column align-items-center justify-content-center  w-100 h-100"
					onClick={() => handleItemClick(res)}
				>
					<img
						src={res?.image?.url}
						alt={res?.image?.name}
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
				{showAddTemplateButton && (
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
				)}

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
						Choose category
					</option>

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
					disabled={!!!mainCategory}
				>
					<option disabled selected value="">
						Choose category
					</option>

					{subCategoryListOptions.map((res, idx) => (
						<option value={res?.id} key={idx}>
							{res?.name}
						</option>
					))}
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

				{imageFile?.name && (
					<p className={`text-center ${css(styles.formlabel)}`}>
						{" "}
						{imageFile.name?.length + 3 > 42
							? imageFile.name?.substring(0, 39) + "..."
							: imageFile.name}{" "}
					</p>
				)}

				<input
					ref={filePickerRef}
					type="file"
					onChange={handleSetImage}
					style={{ display: "none" }}
					accept=".png, .jpg, .jpeg"
				/>

				{isEditing ? (
					<SelectBox
						styles={[styles.canvasInput]}
						label="Main Category"
						name={`main-category`}
						value={mainCategory}
						onChange={(value) => setMainCategory(value.target.value)}
					>
						<option disabled selected value="">
							Choose category
						</option>

						{mainCategoryList.map((res, idx) => (
							<option value={res?.id} key={res?.id}>
								{res?.name}
							</option>
						))}
					</SelectBox>
				) : (
					<>
						<p className={`${css(styles.formlabel)}`}>Main Category:</p>
						<div className={`position-relative w-100`}>
							<TextField
								name={`main-category`}
								styles={[styles.canvasInput]}
								value={selectedMainCategory?.name}
								disabled={true}
							/>
						</div>
					</>
				)}

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

				<h2 className={`${css(styles.mainHeading)}`}>
					{selectedMainCategory?.name ?? "All Sub Categories"}
				</h2>

				{renderCards()}
			</div>

			<ModalView
				title={"Add Template"}
				cancelText={"Cancel"}
				submitText={"Create"}
				showModal={addTemplateModal}
				setShowModal={toggleTemplateModal}
				cancelOnClick={closeModals}
				submitOnClick={handleAddModal}
				isLoading={isLoading}
			>
				{renderTemplateModalContent()}
			</ModalView>

			<ModalView
				title={!!!isEditing ? "Add Sub Category" : "Edit Sub Category"}
				cancelText={"Cancel"}
				submitText={isEditing ? "Update" : "Create"}
				showModal={addCategoryModal}
				setShowModal={toggleAddCategoryModal}
				cancelOnClick={closeModals}
				submitOnClick={isEditing ? handleEditCategoryReq : createCategory}
				isLoading={isLoading}
			>
				{renderCategoryModalContent()}
			</ModalView>
		</div>
	);
}

export default SelectSubCategoryUI;
