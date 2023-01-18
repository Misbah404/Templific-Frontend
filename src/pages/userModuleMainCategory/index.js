import { css } from "aphrodite";
import React, { useState } from "react";
import { Button, SideBar, TextField } from "../../components";
import { ROUTES } from "../../constants";
import { AppStyles, Images } from "../../theme";
import styles from "./styles";
import SVG from "react-inlinesvg";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function UserModuleMainCategory(props) {
	const params = useParams();
	const history = useHistory();
	const { mainCategoryList, mainCategory } = props;
	const [search, setSearch] = useState(() => "");

	const handleClickItemCard = (data) => {
		history.push(
			ROUTES.USER_SUB_CATEGORIES.replace(":mainCategoryId", data?.id)
		);
	};

	const filteredSubCategory = [...mainCategoryList]?.filter((category) =>
		category?.name?.toLowerCase().match(search?.toLowerCase())
	);

	console.log(filteredSubCategory);

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
				)} d-flex flex-column align-items-start justify-content-start`}
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
							{
								"Get started! Customize our preset templates categories, or create a new template from scratch"
							}
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
	let mainCategoryList = state?.category.mainCategory?.map((main) => {
		let subCategories = state?.category?.subCategory?.filter(
			(sub) => sub?.mainCategory?.id === main?.id
		);

		subCategories = subCategories?.map((sub) => {
			const temp = state?.category?.preDefineTemplates?.filter(
				(template) => template?.subCategory?.id === sub?.id
			);

			return {
				...sub,
				templateList: [...temp],
			};
		});

		subCategories = subCategories?.filter(
			(sub) => sub?.templateList?.length !== 0
		);

		return {
			...main,
			subCategoryList: subCategories,
		};
	});

	mainCategoryList = mainCategoryList?.filter(
		(main) => main?.subCategoryList?.length !== 0
	);

	return {
		layout: state?.layout,
		mainCategoryList: mainCategoryList ?? [],
	};
};

export default connect(mapStateToProps)(UserModuleMainCategory);
