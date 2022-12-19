import _ from "lodash";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useGetCategoryData, useMainCategory } from "../../api";
import { SideBar } from "../../components";
import { ROUTES, SOMETHING_WRONG } from "../../constants";
import Util from "../../services/Util";
import { Images } from "../../theme";
import SelectSubCategoryUI from "./SelectSubCategoryUI";

const template_types = [
	{
		image: Images.singleCard,
		title: "Single",
		templateType: "single",
		layout: {
			row: 1,
			col: 1,
		},
	},
	{
		image: Images.doubleCard,
		title: "Double-Sided",
		templateType: "double",
		layout: {
			row: 1,
			col: 1,
		},
	},
	{
		image: Images.bookFoldCard,
		title: "Book - Fold",
		templateType: "bookFold",
		layout: {
			row: 1,
			col: 2,
		},
	},
	{
		image: Images.tentFoldCard,
		title: "Tent Fold",
		templateType: "tentFold",
		layout: {
			row: 2,
			col: 1,
		},
	},
	{
		image: Images.geofilterCard,
		title: "Geofilter",
		templateType: "geoFilter",
		layout: {
			row: 1,
			col: 1,
		},
	},
	{
		image: Images.customCard,
		title: "Custom",
		templateType: "customCard",
		layout: {
			row: 1,
			col: 1,
		},
	},
];

function SelectCategories(props) {
	const history = useHistory();
	const { mainCategoryList, subCategoryList } = props;
	const params = useParams();
	const { getSubCategory } = useGetCategoryData();
	const {
		uploadCategoryImage,
		handleCreateSubCategory,
		handleUpdateSubCategory,
	} = useMainCategory();
	const [addTemplateModal, setAddTemplateModal] = useState(() => false);
	const [addCategoryModal, setAddCategoryModal] = useState(() => false);
	const [templateName, setTemplateName] = useState(() => "");
	const [mainCategory, setMainCategory] = useState(() => "");
	const [subCategory, setSubCategory] = useState(() => "");
	const [imageFile, setImageFile] = useState(() => null);
	const [isLoading, setIsLoading] = useState(() => false);
	const [editCategory, setEditCategory] = useState(() => ({}));
	const [isEditing, setIsEditing] = useState(() => false);
	const [error, setError] = useState(() => "");
	const filePickerRef = useRef();

	const toggleTemplateModal = () => {
		setAddTemplateModal(!addTemplateModal);
	};

	const toggleAddCategoryModal = () => {
		setAddCategoryModal(!addCategoryModal);
	};

	const handleItemClick = (res) => {
		history.push(
			ROUTES.CATEGORY_TEMPLATE?.replace(":categoryId", params?.id).replace(
				":subCategoryId",
				res?.id
			)
		);
	};

	const triggerFilePickerClick = () => {
		filePickerRef?.current?.click();
	};

	const handleSetImage = (e) => {
		const file = e.target.files?.[0];

		if (file?.type === "image/png" || file?.type === "image/jpeg")
			setImageFile(e.target.files?.[0]);
	};

	const _isValidPayloadCategory = () => {
		let isValid = true;

		if (
			(!!imageFile?.name === false || _.isEmpty(imageFile?.name)) &&
			isEditing !== true
		) {
			isValid = false;
			setError("Image is required.");
			return isValid;
		}

		if (_.isEmpty(subCategory?.trim())) {
			isValid = false;
			setError("Sub Category is required.");
			return;
		}

		console.log({ mainCategory });

		// if (!_.isEmpty(categoryWithSameName) && categoryWithSameName) {
		// 	isValid = false;
		// 	setError("Category name is already taken.");
		// 	return;
		// }

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

	const handleUploadSuccessCallback = (data) => {
		if (!!!isEditing) {
			const payload = {
				name: subCategory,
				imageId: data?.id,
				mainCategoryId: params?.id,
			};

			handleCreateSubCategory(
				payload,
				handleCreateSuccessCallback,
				handleCreateErrorCallback
			);
		} else {
			const payload = {
				name: subCategory,
				imageId: data?.id,
				mainCategoryId: params?.id,
				id: editCategory?.id,
			};

			handleUpdateSubCategory(
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
		!!!isEditing
			? Util.postNotification(
					"Category Created",
					"Category Successfully Created.",
					"success"
			  )
			: Util.postNotification(
					"Category Updated",
					"Category Successfully Updated.",
					"success"
			  );
		closeModals();
		getSubCategory();
	};

	const handleDeleteCategory = (data) => {
		const payload = {
			id: data?.id,
			isDelete: true,
		};

		handleUpdateSubCategory(
			payload,
			() => {
				getSubCategory();
				Util.postNotification(
					"Category Deleted",
					"Category Successfully Deleted.",
					"success"
				);
			},
			(message) => {
				Util.postNotification(
					"Category Update Failed",
					message ?? SOMETHING_WRONG,
					"danger"
				);
			}
		);
	};

	const handleCreateErrorCallback = (message) => {
		setIsLoading(false);
		setError(message);
	};

	const _validateAddTemplateModal = () => {
		let isValid = true;

		if (_.isEmpty(mainCategory)) {
			isValid = false;
			setError("Main Category is required.");
			return isValid;
		}

		if (_.isEmpty(subCategory)) {
			isValid = false;
			setError("Sub Category is required.");
			return isValid;
		}

		return isValid;
	};

	const handleAddModal = () => {
		if (_validateAddTemplateModal()) {
			history.push(
				ROUTES.SELECT_ADMIN_TEMPLATE.replace(
					":categoryId",
					mainCategory
				).replace(":subCategoryId", subCategory)
			);
			closeModals();
		}
	};

	const closeModals = () => {
		addCategoryModal && setAddCategoryModal(false);
		addTemplateModal && setAddTemplateModal(false);
		mainCategory && setMainCategory("");
		subCategory && setSubCategory("");
		templateName && setTemplateName("");
		setImageFile(null);
		isLoading && setIsLoading(false);
		error && setError("");
		setIsEditing(false);
		setEditCategory({});
	};

	const openEditModal = (data) => {
		setMainCategory(data?.mainCategory?.id);
		setSubCategory(data?.name);
		setEditCategory(data);
		setIsEditing(true);
		setAddCategoryModal(true);
	};

	const handleEditCategoryReq = () => {
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
					id: editCategory?.id,
					name: subCategory,
					mainCategory: mainCategory,
				};
				handleUpdateSubCategory(
					payload,
					handleCreateSuccessCallback,
					handleCreateErrorCallback
				);
			}
		}
	};

	const selectedMainCategory = mainCategoryList?.find(
		(category) => category?.id === params?.id
	);

	const subCategoryOfMainCategory = subCategoryList?.filter(
		(c) => c?.mainCategory?.id == params?.id
	);

	const subCategoryListOptions = subCategoryList?.filter(
		(c) => c?.mainCategory?.id == mainCategory
	);

	return (
		<>
			{props?.layout?.sideBar && <SideBar />}

			<SelectSubCategoryUI
				template_types={template_types}
				history={history}
				addCategoryModal={addCategoryModal}
				addTemplateModal={addTemplateModal}
				templateName={templateName}
				mainCategory={mainCategory}
				subCategory={subCategory}
				setTemplateName={setTemplateName}
				toggleAddCategoryModal={toggleAddCategoryModal}
				toggleTemplateModal={toggleTemplateModal}
				setMainCategory={setMainCategory}
				setSubCategory={setSubCategory}
				filePickerRef={filePickerRef}
				imageFile={imageFile}
				handleSetImage={handleSetImage}
				triggerFilePickerClick={triggerFilePickerClick}
				handleItemClick={handleItemClick}
				selectedMainCategory={selectedMainCategory}
				mainCategoryList={mainCategoryList}
				isLoading={isLoading}
				createCategory={createCategory}
				error={error}
				subCategoryOfMainCategory={subCategoryOfMainCategory}
				openEditModal={openEditModal}
				isEditing={isEditing}
				handleEditCategoryReq={handleEditCategoryReq}
				handleDeleteCategory={handleDeleteCategory}
				subCategoryListOptions={subCategoryListOptions}
				handleAddModal={handleAddModal}
				closeModals={closeModals}
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
		mainCategoryList: state?.category?.mainCategory,
		subCategoryList: state?.category?.subCategory,
		layout: state?.layout,
	};
};

export default connect(mapStateToProps)(SelectCategories);
