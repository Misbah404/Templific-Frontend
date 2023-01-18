import { css } from "aphrodite";
import React, { useState } from "react";
import { Button, SideBar, TextField } from "../../components";
import { ROUTES } from "../../constants";
import { AppStyles, Images } from "../../theme";
import styles from "./styles";
import SVG from "react-inlinesvg";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function UserModuleTemplates(props) {
	const history = useHistory();
	const params = useParams();
	const { subCategory, mainCategory, preDefineTemplates } = props;
	const [search, setSearch] = useState(() => "");

	const filteredTemplates = preDefineTemplates?.filter((template) =>
		template?.name?.toLowerCase().match(search?.toLowerCase())
	);

	const handleClickItemCard = (temp) => {
		console.log({ temp });

		const data = {
			templateName: temp?.name?.trim(),
			zoomValue: temp?.zoomValue,
			canvasAttrs: temp?.canvasAttrs,
			template: temp?.template,
			canvas: {
				canvasHeight: temp?.height,
				canvasWidth: temp?.width,
				selectedUnit: temp?.unit,
			},
			canvasInPx: {
				canvasHeight: temp?.height,
				canvasWidth: temp?.width,
				selectedUnit: temp?.unit,
			},
			fromPredefine: true,
		};
		history.push({ pathname: ROUTES.DASHBOARD_CREATE, state: data });
	};

	const renderCards = () => {
		return (
			<div className={`w-100 ${css(styles.tempRow)}`}>
				{filteredTemplates?.map((res) => (
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
				onClick={() => handleClickItemCard(res)}
			>
				<div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
					<img
						src={res?.image?.url}
						alt={res?.image?.name}
						className={`${css(styles.templateImg)}`}
					/>
					<p className={`${css(styles.templateName)}`}>{res?.name}</p>
				</div>
			</div>
		);
	};

	const actionButtons = () => {
		return (
			<div className={`${css(styles.buttonWrapper)}`}>
				<TextField
					placeholder="Search Templates"
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
					No Templates for now.
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
						<div>
							<div
								className={`d-flex justify-content-start align-items-center`}
							>
								<img
									src={Images.arrowLeftIcon}
									className="cursor-pointer"
									onClick={() => history.goBack()}
								/>
								<p className={`${css(styles.mainHeading)}`}>
									{subCategory?.name || "All Sub Categories"}
								</p>
							</div>
							<div className={`${css([styles.subHeading])}`}>
								{mainCategory?.name} - {subCategory?.name}
							</div>
						</div>

						{actionButtons()}
					</div>

					{[...filteredTemplates]?.length > 0 ? renderCards() : emptyList()}
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state, params) => {
	const subCategory = state?.category?.subCategory?.find(
		(category) => category?.id == params?.match?.params?.subCategoryId
	);

	const mainCategory = state?.category?.mainCategory?.find(
		(category) => category?.id == params?.match?.params?.mainCategoryId
	);

	const preDefineTemplates = state?.category?.preDefineTemplates?.filter(
		(template) =>
			template?.subCategory?.id == params?.match?.params?.subCategoryId
	);

	return {
		layout: state?.layout,
		subCategory,
		mainCategory: mainCategory ?? {},
		preDefineTemplates,
	};
};

export default connect(mapStateToProps)(UserModuleTemplates);
