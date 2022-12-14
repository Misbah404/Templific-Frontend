import { useMutation } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutModal } from "../actions/LayoutAction";
import {
	CREATE_MAIN_CATEGORY,
	CREATE_SUB_CATEGORY,
	UPDATE_MAIN_CATEGORY,
	UPDATE_PREDEFINED_TEMPLATE,
	UPDATE_SUB_CATEGORY,
	UPLOAD_FILE_TO_SERVER,
} from "../graphQueries";

const useMainCategory = () => {
	const dispatch = useDispatch();
	const [createMainCategory] = useMutation(CREATE_MAIN_CATEGORY);
	const [uploadFile] = useMutation(UPLOAD_FILE_TO_SERVER);
	const [createSubCategory] = useMutation(CREATE_SUB_CATEGORY);
	const [updateMainCategory] = useMutation(UPDATE_MAIN_CATEGORY);
	const [updateSubCategoryRequest] = useMutation(UPDATE_SUB_CATEGORY);
	const [updateTemplateRequest] = useMutation(UPDATE_PREDEFINED_TEMPLATE);

	const handleCreateMainCategory = (
		payload,
		createSuccessCallback,
		createErrorCallback
	) => {
		createMainCategory({ variables: payload })
			.then((data) => {
				if (createSuccessCallback) {
					const res = data?.data?.createMainCategory?.data;
					const mainCategory = {
						id: res.id,
						name: res.attributes?.name,
						image: {
							id: res?.attributes?.image?.data?.id,
							...res?.attributes?.image?.data?.attributes,
						},
					};

					createSuccessCallback(mainCategory);
				}
			})
			.catch((err) => {
				if (err.message.includes("Received status code 401")) {
					dispatch(logoutModal({ data: true }));
					return;
				}

				if (createErrorCallback) {
					createErrorCallback("Invalid Input.");
				}
			});
	};

	const uploadCategoryImage = (payload, successCallback, errorCallback) => {
		uploadFile({ variables: payload })
			.then((data) => {
				const response = {
					...data?.data?.upload?.data?.attributes,
					id: data?.data?.upload?.data?.id,
				};

				successCallback(response);
			})
			.catch((err) => {
				if (err.message.includes("Received status code 401")) {
					dispatch(logoutModal({ data: true }));
					return;
				}
				errorCallback && errorCallback("Invalid Input.");
			});
	};

	const handleCreateSubCategory = (
		payload,
		createSuccessCallback,
		createErrorCallback
	) => {
		createSubCategory({ variables: payload })
			.then((data) => {
				if (createSuccessCallback) {
					const res = data?.data?.createSubCategory?.data;
					const subCategory = {
						id: res.id,
						name: res.attributes?.name,
						image: {
							id: res?.attributes?.image?.data?.id,
							...res?.attributes?.image?.data?.attributes,
						},
					};

					createSuccessCallback(subCategory);
				}
			})
			.catch((err) => {
				if (err.message.includes("Received status code 401")) {
					dispatch(logoutModal({ data: true }));
					return;
				}

				if (createErrorCallback) {
					createErrorCallback("Invalid Input.");
				}
			});
	};

	const updateCategoryMain = (payload, updateSuccess, updateError) => {
		updateMainCategory({ variables: payload })
			.then((res) => {
				console.log({ res });
				updateSuccess();
			})
			.catch((err) => {
				console.log({ err });
				if (err.message.includes("Received status code 401")) {
					dispatch(logoutModal({ data: true }));
					return;
				}
				updateError && updateError("Invalid Input.");
			});
	};

	const deleteMainCategory = (payload, successCallback, errorCallback) => {
		updateMainCategory({ variables: payload })
			.then((res) => {
				console.log({ res });
				successCallback(res);
			})
			.catch((err) => {
				console.log({ err });
				if (err.message.includes("Received status code 401")) {
					dispatch(logoutModal({ data: true }));
					return;
				}
				errorCallback(err);
			});
	};

	const handleUpdateSubCategory = (payload, successCallback, errorCallback) => {
		updateSubCategoryRequest({ variables: payload })
			.then((res) => {
				console.log({ res });
				successCallback && successCallback(res);
			})
			.catch((err) => {
				console.log({ err });
				if (err.message.includes("Received status code 401")) {
					dispatch(logoutModal({ data: true }));
					return;
				}

				errorCallback && errorCallback(err.message);
			});
	};

	const handleUpdateTemplate = (
		payload,
		successCallback = () => {},
		errorCallback = () => {}
	) => {
		updateTemplateRequest({ variables: payload })
			.then((res) => {
				successCallback(res);
			})
			.catch((err) => {
				if (err.message.includes("Received status code 401")) {
					dispatch(logoutModal({ data: true }));
					return;
				}

				errorCallback && errorCallback(err.message);
			});
	};

	return {
		handleCreateMainCategory,
		uploadCategoryImage,
		handleCreateSubCategory,
		updateCategoryMain,
		deleteMainCategory,
		handleUpdateSubCategory,
		handleUpdateTemplate,
	};
};

export default useMainCategory;
