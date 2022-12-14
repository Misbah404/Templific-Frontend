import { useLazyQuery } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import {
	getMainCategories,
	setPredefineTemplates,
	setSubCategory,
} from "../actions/categoryAction";
import {
	GET_MAIN_CATEGORIES,
	GET_PREDEFINED_TEMPLATES,
	GET_SUB_CATEGORIES,
} from "../graphQueries";

function useGetCategoryData() {
	const dispatch = useDispatch();

	const [getMainCategory] = useLazyQuery(GET_MAIN_CATEGORIES, {
		onCompleted(data) {
			const res = data?.mainCategories?.data;

			const result = res?.map((item) => {
				const obj = {
					id: item?.id,
					name: item?.attributes?.name,
					image: {
						name: item?.attributes?.image?.data?.attributes?.name,
						url: item?.attributes?.image?.data?.attributes?.url,
					},
				};

				return obj;
			});

			dispatch(getMainCategories(result));
		},
		onError(err) {
			console.log(err);
		},
	});

	const [getSubCategory] = useLazyQuery(GET_SUB_CATEGORIES, {
		onCompleted(data) {
			const res = data?.subCategories?.data;

			const result = res?.map((item) => {
				const obj = {
					id: item?.id,
					name: item?.attributes?.name,
					image: {
						name: item?.attributes?.image?.data?.attributes?.name,
						url: item?.attributes?.image?.data?.attributes?.url,
					},
					mainCategory: {
						name: item?.attributes?.main_category?.data?.attributes?.name,
						id: item?.attributes?.main_category?.data?.id,
					},
				};

				return obj;
			});

			dispatch(setSubCategory(result));
		},
		onError(err) {
			console.log({ err });
		},
	});

	const [getPredefinedTemplates] = useLazyQuery(GET_PREDEFINED_TEMPLATES, {
		onCompleted(data) {
			console.log({ data });
			const res = data?.preDefineTemplates?.data;
			const response = [];
			if (res && res?.length > 0) {
				for (let item of res) {
					const attributes = item?.attributes ?? {};
					const payload = {
						id: item?.id,
						name: attributes?.name,
						height: attributes?.height,
						width: attributes?.width,
						unit: attributes?.unit,
						zoomValue: attributes?.zoomValue,
						canvasAttrs: attributes?.canvasAttrs,
						template: attributes?.template,
						image: {
							id: attributes?.image?.data?.id,
							url: attributes?.image?.data?.attributes?.url,
						},
						subCategory: {
							id: attributes?.sub_category?.data?.id,
						},
					};

					response.push({ ...payload });
				}
			}

			console.log({ response });
			dispatch(setPredefineTemplates(response));
		},
		onError(err) {
			console.log(err);
		},
	});

	return { getMainCategory, getSubCategory, getPredefinedTemplates };
}

export default useGetCategoryData;
