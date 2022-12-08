import { useMutation } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutModal } from "../actions/LayoutAction";
import {
	CREATE_MAIN_CATEGORY,
	CREATE_SUB_CATEGORY,
	UPLOAD_FILE_TO_SERVER,
} from "../graphQueries";

const useMainCategory = () => {
	const dispatch = useDispatch();
	const [createMainCategory] = useMutation(CREATE_MAIN_CATEGORY);
	const [uploadFile] = useMutation(UPLOAD_FILE_TO_SERVER);
	const [createSubCategory] = useMutation(CREATE_SUB_CATEGORY);

	const handleCreateMainCategory = (
		payload,
		createSuccessCallback,
		createErrorCallback
	) => {
		createMainCategory({ variables: payload })
			.then((data) => {
				console.log({ data });
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
				console.log({ err });
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
				console.log({ data });
				const response = {
					...data?.data?.upload?.data?.attributes,
					id: data?.data?.upload?.data?.id,
				};

				successCallback(response);
			})
			.catch((err) => {
				console.log({ err: err.message });
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
				console.log({ data });
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
				console.log({ err });
				if (err.message.includes("Received status code 401")) {
					dispatch(logoutModal({ data: true }));
					return;
				}

				if (createErrorCallback) {
					createErrorCallback("Invalid Input.");
				}
			});
	};

	return {
		handleCreateMainCategory,
		uploadCategoryImage,
		handleCreateSubCategory,
	};
};

export default useMainCategory;
