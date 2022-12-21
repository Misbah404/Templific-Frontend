import _ from "lodash";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetCategoryData, useMainCategory } from "../../api";
import { SideBar } from "../../components";
import { ROUTES, SOMETHING_WRONG } from "../../constants";
import Util from "../../services/Util";
import SelectCategoriesUI from "./SelectCategoriesUI";

function SelectCategories(props) {
	const history = useHistory();
	const {
		handleCreateMainCategory,
		uploadCategoryImage,
		updateCategoryMain,
		deleteMainCategory,
	} = useMainCategory();
	const { getMainCategory } = useGetCategoryData();

	const mainCategoryList = props?.mainCategoryList;

	const [addTemplateModal, setAddTemplateModal] = useState(() => false);
	const [addCategoryModal, setAddCategoryModal] = useState(() => false);
	const [deleteModal, setDeleteModal] = useState(() => false);
	const [mainCategory, setMainCategory] = useState(() => "");
	const [subCategory, setSubCategory] = useState(() => "");
	const [imageFile, setImageFile] = useState(() => null);
	const [isLoading, setIsLoading] = useState(() => false);
	const [error, setError] = useState(() => "");
	const [isEditing, setIsEditing] = useState(() => false);
	const [editCategory, setEditCategory] = useState(() => {});

	const filePickerRef = useRef();

	const toggleTemplateModal = () => {
		setAddTemplateModal(!addTemplateModal);
	};

	const toggleAddCategoryModal = () => {
		setAddCategoryModal(!addCategoryModal);
	};

	const toggleDeleteModal = () => {
		setDeleteModal(!deleteModal);
	};

	const handleClickItemCard = (res) => {
		history.push(ROUTES.SELECT_SUB_CATEGORIES?.replace(":id", res.id));
	};

	const triggerFilePickerClick = () => {
		filePickerRef?.current?.click();
	};

	const handleSetImage = (e) => {
		const file = e.target.files?.[0];

		if (file?.type === "image/png" || file?.type === "image/jpeg") {
			setImageFile(e.target.files?.[0]);
			error && setError("");
		} else {
			if (file?.type) setError("Invalid file type.");
		}
	};

	const _isValidPayloadCategory = () => {
		let isValid = true;

		if (
			(!!imageFile?.name === false || _.isEmpty(imageFile?.name)) &&
			isEditing === false
		) {
			isValid = false;
			setError("Image is required.");
			return isValid;
		}

		if (_.isEmpty(mainCategory?.trim())) {
			isValid = false;
			setError("Category is required.");
			return;
		}

		const categoryWithSameName = mainCategoryList?.find(
			(category) => category?.name === mainCategory
		);

		if (
			!_.isEmpty(categoryWithSameName) &&
			categoryWithSameName &&
			isEditing == false
		) {
			isValid = false;
			setError("Category name is already taken.");
			return;
		}

		if (isEditing) {
			const sameName = mainCategoryList?.find(
				(category) =>
					category?.name === mainCategory && category?.id !== editCategory?.id
			);

			if (!_.isEmpty(sameName) && sameName) {
				isValid = false;
				setError("Category name is already taken.");
				return;
			}
		}

		return isValid;
	};

	const createCategory = () => {
		if (_isValidPayloadCategory()) {
			setIsLoading(true);

			const payload = {
				file: imageFile,
			};

			uploadCategoryImage(
				payload,
				handleUploadSuccessCallback,
				handleUploadErrorCallback
			);
		}
	};

	const updateCategory = () => {
		if (_isValidPayloadCategory()) {
			setIsLoading(true);
			if (imageFile?.name) {
				const payload = {
					file: imageFile,
				};

				uploadCategoryImage(
					payload,
					handleUploadSuccessCallback,
					handleUploadErrorCallback
				);
			} else {
				const payload = {
					name: mainCategory,
					id: editCategory?.id,
				};

				updateCategoryMain(
					payload,
					handleCreateSuccessCallback,
					handleCreateErrorCallback
				);
			}
		}
	};

	const handleUploadSuccessCallback = (data) => {
		if (isEditing) {
			const payload = {
				name: mainCategory,
				imageId: data?.id,
				id: editCategory?.id,
			};

			updateCategoryMain(
				payload,
				handleCreateSuccessCallback,
				handleCreateErrorCallback
			);
		} else {
			const payload = {
				name: mainCategory,
				imageId: data?.id,
			};

			handleCreateMainCategory(
				payload,
				handleCreateSuccessCallback,
				handleCreateErrorCallback
			);
		}
	};

	const handleUploadErrorCallback = (message) => {
		setIsLoading(false);
		setError(message);
	};

	const handleCreateSuccessCallback = () => {
		setIsLoading(false);
		if (isEditing) {
			Util.postNotification(
				"Category Updated",
				"Category Successfully Updated.",
				"success"
			);
		} else
			Util.postNotification(
				"Category Created",
				"Category Successfully Created.",
				"success"
			);
		closeModals();
		getMainCategory();
	};

	const handleCreateErrorCallback = (message) => {
		setIsLoading(false);
		setError(message);
	};

	const closeModals = () => {
		addCategoryModal && setAddCategoryModal(false);
		addTemplateModal && setAddTemplateModal(false);
		mainCategory && setMainCategory("");
		subCategory && setSubCategory("");
		setImageFile(null);
		isLoading && setIsLoading(false);
		error && setError("");
		setEditCategory({});
		isEditing && setIsEditing(false);
		deleteModal && setDeleteModal(false);
	};

	const setEditModal = (data) => {
		setMainCategory(data?.name);
		setIsEditing(true);
		setAddCategoryModal(true);
		setEditCategory(data);
	};

	const handleCategoryForDelete = (data) => {
		setEditCategory(data);
		setDeleteModal(true);
	};

	const _validateAddTemplate = () => {
		let isValid = true;

		if (_.isEmpty(mainCategory)) {
			setError("Main Category is required");
			isValid = false;
			return;
		}

		if (_.isEmpty(subCategory)) {
			setError("Sub category is required");
			isValid = false;
			return;
		}

		const findSubCategory = props?.subCategoryList?.find(
			(category) =>
				category?.id === subCategory &&
				category?.mainCategory?.id === mainCategory
		);

		if (_.isEmpty(findSubCategory)) {
			setError("Sub Category is not of main category.");
			isValid = false;
			return isValid;
		}

		return isValid;
	};

	const createTemplate = () => {
		if (_validateAddTemplate()) {
			closeModals();
			history.push(
				ROUTES.SELECT_ADMIN_TEMPLATE?.replace(
					":categoryId",
					mainCategory
				).replace(":subCategoryId", subCategory)
			);
		}
	};

	const deleteSuccessCallback = () => {
		Util.postNotification(
			"Category Deleted.",
			"Category Deleted Successfully.",
			"success"
		);

		getMainCategory();
		closeModals();
	};

	const handleDeleteErrorCallback = () => {
		Util.postNotification("Category Delete", SOMETHING_WRONG, "danger");
	};

	const handleDeleteCategory = () => {
		const payload = {
			isDelete: true,
			id: editCategory?.id,
		};

		deleteMainCategory(
			payload,
			deleteSuccessCallback,
			handleDeleteErrorCallback
		);
	};

	const subCategoryList = props?.subCategoryList?.filter(
		(category) => category?.mainCategory?.id === mainCategory
	);

	return (
		<>
			{props?.layout?.sideBar && <SideBar />}

			<SelectCategoriesUI
				history={history}
				addCategoryModal={addCategoryModal}
				addTemplateModal={addTemplateModal}
				mainCategory={mainCategory}
				subCategory={subCategory}
				filePickerRef={filePickerRef}
				imageFile={imageFile}
				isLoading={isLoading}
				error={error}
				mainCategoryList={mainCategoryList}
				isEditing={isEditing}
				editCategory={editCategory}
				subCategoryList={subCategoryList}
				toggleAddCategoryModal={toggleAddCategoryModal}
				toggleTemplateModal={toggleTemplateModal}
				setMainCategory={setMainCategory}
				setSubCategory={setSubCategory}
				handleSetImage={handleSetImage}
				triggerFilePickerClick={triggerFilePickerClick}
				handleClickItemCard={handleClickItemCard}
				createCategory={createCategory}
				closeModals={closeModals}
				setEditModal={setEditModal}
				updateCategory={updateCategory}
				createTemplate={createTemplate}
				handleDeleteCategory={handleDeleteCategory}
				toggleDeleteModal={toggleDeleteModal}
				deleteModal={deleteModal}
				layout={props?.layout}
				handleCategoryForDelete={handleCategoryForDelete}
				showAddTemplateButton={
					props?.mainCategoryList?.length > 0 &&
					props?.subCategoryList?.length > 0
				}
			/>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		mainCategoryList: state?.category?.mainCategory || [],
		subCategoryList: state?.category?.subCategory || [],
		layout: state.layout,
	};
};

export default connect(mapStateToProps)(SelectCategories);
