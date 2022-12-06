import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Images } from "../../theme";
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
	const [addTemplateModal, setAddTemplateModal] = useState(() => false);
	const [templateName, setTemplateName] = useState(() => "");

	const toggleTemplateModal = () => {
		setAddTemplateModal(!addTemplateModal);
	};

	return (
		<CategoryTemplateUI
			template_types={template_types}
			addTemplateModal={addTemplateModal}
			templateName={templateName}
			setTemplateName={setTemplateName}
			toggleTemplateModal={toggleTemplateModal}
		/>
	);
}

export default CategoryTemplate;
