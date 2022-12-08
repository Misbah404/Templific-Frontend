import { useLazyQuery } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import { getMainCategories, setSubCategory } from "../actions/categoryAction";
import { GET_MAIN_CATEGORIES, GET_SUB_CATEGORIES } from "../graphQueries";

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

	return { getMainCategory, getSubCategory };
}

export default useGetCategoryData;
