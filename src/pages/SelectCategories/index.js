import React, { useRef, useState } from "react";
import { ConeStriped } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../constants";
import { Images } from "../../theme";
import SelectCategoriesUI from "./SelectCategoriesUI";

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

function SelectCategories() {
	const history = useHistory();
	const [addTemplateModal, setAddTemplateModal] = useState(() => false);
	const [addCategoryModal, setAddCategoryModal] = useState(() => false);
	const [templateName, setTemplateName] = useState(() => "");
	const [mainCategory, setMainCategory] = useState(() => "");
	const [subCategory, setSubCategory] = useState(() => "");
	const [imageFile, setImageFile] = useState(() => null);
	const filePickerRef = useRef();

	const toggleTemplateModal = () => {
		setAddTemplateModal(!addTemplateModal);
	};

	const toggleAddCategoryModal = () => {
		setAddCategoryModal(!addCategoryModal);
	};

	const handleClickItemCard = () => {
		console.log("hello world")
		history.push(ROUTES.SELECT_SUB_CATEGORIES);
	};

	const triggerFilePickerClick = () => {
		filePickerRef?.current?.click();
	};

	const handleSetImage = (e) => {
		console.log(e.target.files);
		const file = e.target.files?.[0];
		console.log({ file });
		if (file?.type === "image/png" || file?.type === "image/jpeg")
			setImageFile(e.target.files?.[0]);
	};

	return (
		<SelectCategoriesUI
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
			handleClickItemCard={handleClickItemCard}
		/>
	);
}

export default SelectCategories;
