import _ from "lodash";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useGetCategoryData, useMainCategory } from "../../api";
import { ROUTES } from "../../constants";
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
	const { uploadCategoryImage, handleCreateSubCategory } = useMainCategory();
	const [addTemplateModal, setAddTemplateModal] = useState(() => false);
	const [addCategoryModal, setAddCategoryModal] = useState(() => false);
	const [templateName, setTemplateName] = useState(() => "");
	const [mainCategory, setMainCategory] = useState(() => "");
	const [subCategory, setSubCategory] = useState(() => "");
	const [imageFile, setImageFile] = useState(() => null);
	const [isLoading, setIsLoading] = useState(() => false);
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

		if (!!imageFile?.name === false || _.isEmpty(imageFile?.name)) {
			isValid = false;
			setError("Image is required.");
			return isValid;
		}

		if (_.isEmpty(subCategory?.trim())) {
			isValid = false;
			setError("Sub Category is required.");
			return;
		}

		// const categoryWithSameName = mainCategoryList?.find(
		// 	(category) => category?.name === mainCategory
		// );

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
	};

	const handleUploadErrorCallback = (message) => {
		setIsLoading(false);
		setError(message);
	};

	const handleCreateSuccessCallback = () => {
		setIsLoading(false);
		Util.postNotification(
			"Category Created",
			"Category Successfully Created.",
			"success"
		);
		closeModals();
		getSubCategory();
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
		templateName && setTemplateName("");
		setImageFile(null);
		isLoading && setIsLoading(false);
		error && setError("");
	};

	const selectedMainCategory = mainCategoryList?.find(
		(category) => category?.id === params?.id
	);

	const subCategoryOfMainCategory = subCategoryList?.filter(
		(c) => c?.mainCategory?.id == params?.id
	);

	return (
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
		/>
	);
}

const mapStateToProps = (state) => {
	return {
		mainCategoryList: state?.category?.mainCategory,
		subCategoryList: state?.category?.subCategory,
	};
};

export default connect(mapStateToProps)(SelectCategories);
