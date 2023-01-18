import { css } from "aphrodite";
import React, { useState } from "react";
import { Button, SideBar, TextField } from "../../components";
import { ROUTES } from "../../constants";
import { AppStyles, Images } from "../../theme";
import styles from "./styles";
import SVG from "react-inlinesvg";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function UserModuleSubCategory(props) {
	const params = useParams();
	const history = useHistory();
	const { subCategoryList, mainCategory } = props;
	const [search, setSearch] = useState(() => "");

	const handleClickItemCard = (data) => {
		history.push(
			ROUTES.USER_CATEGORY_TEMPLATES.replace(
				":mainCategoryId",
				params?.mainCategoryId
			).replace(":subCategoryId", data?.id)
		);
	};

	const filteredSubCategory = subCategoryList?.filter((category) =>
		category?.name?.toLowerCase().match(search?.toLowerCase())
	);

	const renderCards = () => {
		return (
			<div className={`w-100 ${css(styles.tempRow)}`}>
				{filteredSubCategory?.map((res) => (
					<>{cardItem(res)}</>
				))}
			</div>
		);
	};

	const cardItem = (res) => {
		return (
			<div
				className={`d-flex flex-column align-items-center justify-content-center ${css(
					styles.tempCol
				)}`}
				key={res.id}
			>
				<div
					className="w-100 h-100 d-flex flex-column align-items-center justify-content-center"
					onClick={() => handleClickItemCard(res)}
				>
					<img
						src={res?.image?.url}
						alt={res?.image?.name}
						className={`${css(styles.templateImg)}`}
					/>

					<div className={`${css(styles.templateName)}`}>{res?.name}</div>
				</div>
			</div>
		);
	};

	const actionButtons = () => {
		return (
			<div className={`${css(styles.buttonWrapper)}`}>
				<TextField
					placeholder="Search Category"
					icon={Images.searchBarIcon}
					styles={[styles.formInput]}
					iconStyles={[styles.searchIcon]}
					value={search}
					onChange={(e) => setSearch(e?.target?.value)}
				/>
			</div>
		);
	};

	const emptyList = () => {
		return (
			<div className="d-flex justify-content-center align-items-center">
				<span className={`${css(styles.mainHeading)}`}>
					No categories for now.
				</span>
			</div>
		);
	};

	return (
		<>
			{props?.layout?.sideBar && <SideBar />}

			<div
				className={`${css(
					styles.main
				)} d-flex flex-column align-items-center justify-content-start`}
			>
				<div
					className={`${css(
						styles.templateBox
					)} d-flex flex-column align-items-center justify-content-center position-relative`}
				>
					<div
						className={`d-flex justify-content-between align-items-center w-100 ${css(
							styles.headerWrapper
						)}`}
					>
						<h2 className={`${css(styles.mainHeading)}`}>
							{mainCategory?.name || "All Sub Categories"}
						</h2>
						{actionButtons()}
					</div>

					{[...filteredSubCategory]?.length > 0 ? renderCards() : emptyList()}
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state, params) => {
	let subCategoryList = state?.category?.subCategory?.filter(
		(category) =>
			category?.mainCategory?.id == params?.match?.params?.mainCategoryId
	);

	subCategoryList = subCategoryList?.map((item) => {
		const templateList = state?.category?.preDefineTemplates?.filter(
			(temp) => temp?.subCategory?.id === item?.id
		);

		return {
			...item,
			templateList,
		};
	});

	subCategoryList = subCategoryList.filter(
		(sub) => sub?.templateList?.length !== 0
	);

	const mainCategory = state?.category?.mainCategory?.find(
		(category) => category?.id == params?.match?.params?.mainCategoryId
	);

	return {
		layout: state?.layout,
		subCategoryList,
		mainCategory: mainCategory ?? {},
	};
};

export default connect(mapStateToProps)(UserModuleSubCategory);
