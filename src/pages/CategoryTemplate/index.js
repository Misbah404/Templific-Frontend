import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import _ from "lodash";
import { Images } from "../../theme";
import { ROUTES } from "../../constants";
import CategoryTemplateUI from "./CategoryTemplateUI";

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

function CategoryTemplate() {
	const history = useHistory();
	const params = useParams();
	const [addTemplateModal, setAddTemplateModal] = useState(() => false);
	const [templateName, setTemplateName] = useState(() => "");
	const [selectedUnit, setSelectedUnit] = useState(() => "pixels");
	const [canvasHeight, setCanvasHeight] = useState(() => 1000);
	const [canvasWidth, setCanvasWidth] = useState(() => 1000);
	const [showSizeModal, setShowSizeModal] = useState(() => false);
	const [errors, setErrors] = useState(() => "");

	console.log({ params });

	const toggleTemplateModal = () => {
		setAddTemplateModal(!addTemplateModal);
	};

	const _validateTemplateName = () => {
		let isValid = true;

		if (_.isEmpty(templateName?.trim())) {
			isValid = false;
			setErrors("Name is required.");
		}

		return isValid;
	};

	const handleSubmitTemplateName = () => {
		if (_validateTemplateName()) {
			setAddTemplateModal(false);
			history.push(
				ROUTES.SELECT_ADMIN_TEMPLATE?.replace(
					":categoryId",
					params?.categoryId
				).replace(":subCategoryId", params?.subCategoryId)
			);
		}
	};

	const handleChangeUnit = () => {};

	const toggleShowSizeModal = () => {
		setShowSizeModal(!!!showSizeModal);
	};

	const initialState = () => {
		addTemplateModal && setAddTemplateModal(false);
		templateName && setTemplateName("");
		setSelectedUnit("pixels");
		setCanvasHeight(1000);
		setCanvasWidth(1000);
		showSizeModal && setShowSizeModal(false);
	};

	return (
		<CategoryTemplateUI
			template_types={template_types}
			addTemplateModal={addTemplateModal}
			templateName={templateName}
			setTemplateName={setTemplateName}
			toggleTemplateModal={toggleTemplateModal}
			selectedUnit={selectedUnit}
			canvasHeight={canvasHeight}
			canvasWidth={canvasWidth}
			setCanvasHeight={setCanvasHeight}
			setCanvasWidth={setCanvasWidth}
			showSizeModal={showSizeModal}
			initialState={initialState}
			errors={errors}
			handleChangeUnit={handleChangeUnit}
			toggleShowSizeModal={toggleShowSizeModal}
			handleSubmitTemplateName={handleSubmitTemplateName}
		/>
	);
}

export default CategoryTemplate;
