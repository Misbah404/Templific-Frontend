import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import _ from "lodash";
import { Images } from "../../theme";
import { ROUTES, SOMETHING_WRONG } from "../../constants";
import CategoryTemplateUI from "./CategoryTemplateUI";
import { connect } from "react-redux";
import { useMainCategory } from "../../api";
import Util from "../../services/Util";
import { SideBar } from "../../components";

function CategoryTemplate(props) {
	const history = useHistory();
	const params = useParams();
	const { subCategoryList, mainCategoryList, templateList } = props;
	const { handleUpdateTemplate } = useMainCategory();
	const [addTemplateModal, setAddTemplateModal] = useState(() => false);
	const [templateName, setTemplateName] = useState(() => "");
	const [errors, setErrors] = useState(() => "");
	const [editModal, setEditModal] = useState(() => false);
	const [editTemplate, setEditTemplate] = useState(() => ({}));
	const [subCategory, setSubCategory] = useState(() => "");
	const [mainCategory, setMainCategory] = useState(() => "");

	const toggleTemplateModal = () => {
		setAddTemplateModal(!addTemplateModal);
	};

	const toggleEditModal = () => {
		setEditModal(!!!editModal);
	};

	const handleSubmitTemplateName = () => {
		history.push(
			ROUTES.SELECT_ADMIN_TEMPLATE?.replace(
				":categoryId",
				params?.categoryId
			).replace(":subCategoryId", params?.subCategoryId)
		);
	};

	const openEditModal = (res) => {
		console.log(res);
		setEditTemplate(res);
		setTemplateName(res?.name);
		setMainCategory(params?.categoryId);
		setSubCategory(params?.subCategoryId);
		setEditModal(true);
	};

	const _validatePayload = () => {
		let isValid = true;

		if (_.isEmpty(templateName) || !!!templateName) {
			isValid = false;
			setErrors("Template Name is required.");
			return;
		}

		if (_.isEmpty(mainCategory) || !!!mainCategory) {
			isValid = false;
			setErrors("Main Category is required.");
			return;
		}

		if (_.isEmpty(subCategory) || !!!subCategory) {
			isValid = false;
			setErrors("Sub Category is required.");
			return;
		}

		return isValid;
	};

	const closeModal = () => {
		setEditModal(false);
		setMainCategory("");
		setSubCategory("");
		setTemplateName("");
		setErrors("");
	};

	const handleDeleteTemplate = (res) => {
		const payload = {
			templateId: editTemplate?.id,
			isDelete: true,
		};

		handleUpdateTemplate(
			payload,
			() => {
				closeModal();
				Util.postNotification(
					"Template Deleted.",
					"Template Deleted Successfully.",
					"success"
				);
			},
			() => {
				Util.postNotification(
					"Template Delete failed",
					SOMETHING_WRONG,
					"danger"
				);
			}
		);
	};

	const handleUpdateTemplateReq = () => {
		if (_validatePayload()) {
			const payload = {
				templateId: editTemplate?.id,
				name: templateName,
				subCategoryId: subCategory,
			};

			handleUpdateTemplate(
				payload,
				() => {
					closeModal();
					Util.postNotification(
						"Template Updated.",
						"Template Updated Successfully.",
						"success"
					);
				},
				() => {
					Util.postNotification(
						"Template Update failed",
						SOMETHING_WRONG,
						"danger"
					);
				}
			);
		}
	};

	const onClickTemplate = (data) => {
		history.push(ROUTES.ADMIN_TEMPLATE_UPDATE?.replace(":id", data?.id));
	};

	const subCategoryFilteredMain = subCategoryList?.filter(
		(category) => category?.mainCategory?.id == mainCategory
	);

	const selectedSubCategory = props?.subCategoryList?.find(
		(s) => s?.id === params?.subCategoryId
	);

	return (
		<>
		{props?.layout?.sideBar && <SideBar />}
		
		<CategoryTemplateUI
			addTemplateModal={addTemplateModal}
			templateName={templateName}
			setTemplateName={setTemplateName}
			toggleTemplateModal={toggleTemplateModal}
			errors={errors}
			handleSubmitTemplateName={handleSubmitTemplateName}
			subCategoryList={subCategoryFilteredMain}
			mainCategoryList={mainCategoryList}
			templateList={templateList}
			toggleEditModal={toggleEditModal}
			editModal={editModal}
			openEditModal={openEditModal}
			subCategory={subCategory}
			mainCategory={mainCategory}
			setSubCategory={setSubCategory}
			setMainCategory={setMainCategory}
			handleUpdateTemplate={handleUpdateTemplateReq}
			closeModal={closeModal}
			handleDeleteTemplate={handleDeleteTemplate}
			onClickTemplate={onClickTemplate}
			selectedSubCategory={selectedSubCategory}
		/>
		</>
	);
}

const mapStateToProps = (state, params) => {
	const predefTemp = state?.category?.preDefineTemplates?.filter(
		(p) => p?.subCategory?.id == params?.match?.params?.subCategoryId
	);
	return {
		subCategoryList: [...state?.category?.subCategory],
		mainCategoryList: [...state?.category?.mainCategory],
		templateList: [...predefTemp],
		layout: state?.layout,
	};
};

export default connect(mapStateToProps)(CategoryTemplate);
