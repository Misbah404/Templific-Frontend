import React, { useEffect, useState } from "react";
import { css } from "aphrodite";
import { connect, useDispatch } from "react-redux";
import styles from "./styles";
import { Images } from "../../theme";
import { ModalView, TextField, SideBar } from "../../components";
import _ from "lodash";
import { MAX_CANVAS_SIZE, ROUTES } from "../../constants";
import { useHistory, useParams } from "react-router-dom";
import { disableSideBar } from "../../actions/LayoutAction";

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

const SelectAdminTemplate = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const params = useParams();
	const [showSizeModal, setShowSizeModal] = useState(() => false);
	const [showLayoutModal, setShowLayoutModal] = useState(() => false);
	const [showTempModal, setShowTempModal] = useState(() => false);
	const [showAddNewCategory, setShowAddNewCategory] = useState(() => false);
	const [templateType, setTemplateType] = useState({});

	const [canvasWidth, setCanvasWidth] = useState(() => 1000);
	const [canvasHeight, setCanvasHeight] = useState(() => 1000);
	const [selectedUnit, setSelectedUnit] = useState(() => "pixels");

	const [templateName, setTemplateName] = useState(() => "");
	const [templateCategory, setTemplateCategory] = useState(() => "");
	const [addNewCategory, setAddNewCategory] = useState(() => "");

	const [rows, setRows] = useState(() => 1);
	const [columns, setColumns] = useState(() => 1);
	const [errors, setErrors] = useState(() => "");

	useEffect(() => {
		if (_.isEmpty(templateCategory) || _.isNil(templateCategory)) {
			const categories = Object.keys(props?.canvasData?.categories);

			if (categories && categories.length > 0) {
				setTemplateCategory(categories[0]);
			}
		}
	}, [props?.canvasData?.categories]);

	useEffect(() => {
		errors && setErrors("");
	}, [
		canvasWidth,
		canvasHeight,
		rows,
		columns,
		addNewCategory,
		showAddNewCategory,
	]);

	const disableSidebar = () => {
		dispatch(disableSideBar());
	};

	const initialState = () => {
		setTimeout(() => {
			setCanvasWidth(1000);
			setCanvasHeight(1000);
			setSelectedUnit("pixels");
			setRows(1);
			setColumns(1);
			setErrors("");
			setTemplateName("");
			setAddNewCategory("");
		}, 500);
	};

	const isTemplateSizeValid = () => {
		if (canvasWidth <= 0 || canvasHeight <= 0) {
			setErrors("Invalid Width or Height");
			return false;
		} else {
			if (
				canvasHeight > MAX_CANVAS_SIZE[selectedUnit] ||
				canvasWidth > MAX_CANVAS_SIZE[selectedUnit]
			) {
				setErrors(
					`Max height or width must be less than or equal to ${MAX_CANVAS_SIZE[selectedUnit]}${selectedUnit}`
				);
				return false;
			} else {
				return true;
			}
		}
	};

	const handleSubmitTemplateSize = () => {
		if (isTemplateSizeValid()) {
			setShowSizeModal(false);
			if (templateType.templateType === "customCard") setShowLayoutModal(true);
			else setShowTempModal(true);
		}
	};

	const handleSubmitTemplateLayout = () => {
		if (rows <= 0 || columns <= 0) {
			setErrors("Invalid rows or columns");
		} else if (rows > 25 || columns > 25) {
			setErrors("Rows or Columns must not be greater than 25");
		} else {
			setShowLayoutModal(false);
			setShowTempModal(true);
		}
	};

	const handleSubmit = () => {
		const allTemplatesName = Object.values(props?.canvasData?.templates) || [];

		if (_.isEmpty(templateName || _.isNil(templateName))) {
			setErrors("Template name is required");

			return;
		}

		const templateWithSameName = allTemplatesName?.find(
			(temp) => temp.name?.toLowerCase() === templateName?.toLowerCase()
		);

		if (!_.isEmpty(templateWithSameName)) {
			setErrors("Template with this name is already created.");
			return;
		}

		let heightInPX = canvasHeight;
		let widthInPX = canvasWidth;

		if (selectedUnit === "mm") {
			widthInPX = widthInPX * 3.7795275591;
			heightInPX = heightInPX * 3.7795275591;
		}

		if (selectedUnit === "inches") {
			widthInPX = widthInPX * 96;
			heightInPX = heightInPX * 96;
		}

		const data = {
			templateName: templateName.trim(),
			templateCategory: {
				templateCategory,
				categoryId: ""
			},
			templateType,
			canvas: {
				canvasHeight,
				canvasWidth,
				selectedUnit,
			},
			canvasInPx: {
				canvasHeight: heightInPX,
				canvasWidth: widthInPX,
				selectedUnit: "px",
			},
			mainCategory: params?.categoryId,
			subCategory: params?.subCategoryId,
		};

		if (data.templateType.templateType === "customCard") {
			data.templateType.layout = {
				row: parseInt(rows),
				col: parseInt(columns),
			};
		}

		history.push({ pathname: ROUTES.ADMIN_TEMPLATE_CREATE, state: data });
	};

	const handleChangeUnit = (e) => {
		let newWidth = 0;
		let newHeight = 0;

		if (selectedUnit === "pixels") {
			if (e.target.value === "inches") {
				newWidth = canvasWidth / 96;
				newHeight = canvasHeight / 96;
			}

			if (e.target.value === "mm") {
				newWidth = canvasWidth / 3.7795275591;
				newHeight = canvasHeight / 3.7795275591;
			}
		}

		if (selectedUnit === "mm") {
			if (e.target.value === "pixels") {
				newWidth = canvasWidth * 3.7795275591;
				newHeight = canvasHeight * 3.7795275591;
			}

			if (e.target.value === "inches") {
				newWidth = canvasWidth / 25.4;
				newHeight = canvasHeight / 25.4;
			}
		}

		if (selectedUnit === "inches") {
			if (e.target.value === "pixels") {
				newWidth = canvasWidth * 96;
				newHeight = canvasHeight * 96;
			}

			if (e.target.value === "mm") {
				newWidth = canvasWidth * 25.4;
				newHeight = canvasHeight * 25.4;
			}
		}

		newWidth = parseFloat(newWidth.toFixed(2));
		newHeight = parseFloat(newHeight.toFixed(2));

		setSelectedUnit(e.target.value);
		setCanvasWidth(newWidth);
		setCanvasHeight(newHeight);
	};

	const template_categories = _.isEmpty(props?.canvasData?.categories)
		? []
		: Object.keys(props.canvasData.categories);

	return (
		<>
			{props.layout.sideBar && <SideBar />}

			<div
				className={`${css(
					styles.main
				)} d-flex flex-column align-items-center justify-content-center`}
				onClick={disableSidebar}
			>
				<div
					className={`${css(
						styles.templateBox
					)} d-flex flex-column align-items-center justify-content-center position-relative`}
				>
					<span
						onClick={() => history.push(ROUTES.SELECT_CATEGORIES)}
						className={`cursor-pointer ${css(styles.closePopup)}`}
					>
						<i className={`fa fa-times font-weight-light`} />
					</span>
					<h2 className={`${css(styles.mainHeading)}`}>
						Lets get Started! Create a new template
					</h2>
					<div className={`w-100 ${css(styles.tempRow)}`}>
						{template_types.map((res, idx) => (
							<div
								className={`d-flex flex-column align-items-center justify-content-center ${css(
									styles.tempCol
								)}`}
								onClick={() => {
									if (res.title === "Geofilter") {
										setCanvasWidth(1080);
										setCanvasHeight(1920);
									}
									setTemplateType({
										templateType: res.templateType,
										layout: res.layout,
									});
									setShowSizeModal(true);
								}}
								key={res.title}
							>
								<img
									src={res.image}
									alt={res.title}
									className={`${css(styles.templateImg)}`}
								/>
								<p className={`${css(styles.templateName)}`}>{res.title}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<ModalView
				showModal={showSizeModal}
				setShowModal={setShowSizeModal}
				title={`Set Template Size`}
				cancelText={`Cancel`}
				cancelOnClick={() => {
					setShowSizeModal(false);
					initialState();
				}}
				submitText={`Next`}
				submitOnClick={handleSubmitTemplateSize}
			>
				<div>
					<div className={`d-flex`}>
						<form onSubmit={(e) => e.preventDefault()}>
							<div
								className={`${css(
									styles.formRow
								)} d-flex align-items-center justify-content-between`}
							>
								<p className={`${css(styles.formlabel)}`}>Units:</p>
								<div>
									<label
										className={`d-inline-flex align-items-center ${css(
											styles.unitLabel
										)}`}
									>
										<input
											type="radio"
											className={`${css(styles.unitRadio)}`}
											onChange={handleChangeUnit}
											value="inches"
											checked={selectedUnit === "inches"}
										/>
										inches
									</label>
									<label
										className={`d-inline-flex align-items-center ${css(
											styles.unitLabel
										)}`}
									>
										<input
											type="radio"
											className={`${css(styles.unitRadio)}`}
											onChange={handleChangeUnit}
											value="mm"
											checked={selectedUnit === "mm"}
										/>
										mm
									</label>
									<label
										className={`d-inline-flex align-items-center ${css(
											styles.unitLabel
										)}`}
									>
										<input
											type="radio"
											className={`${css(styles.unitRadio)}`}
											onChange={handleChangeUnit}
											value="pixels"
											checked={selectedUnit === "pixels"}
										/>
										pixels
									</label>
								</div>
							</div>
							<div
								className={`${css(
									styles.formRow
								)} d-flex align-items-center justify-content-between`}
							>
								<p className={`${css(styles.formlabel)}`}>Canvas:</p>
								<div className={`d-flex align-items-center`}>
									<div className={`position-relative`}>
										<TextField
											name={`canvas-width`}
											styles={[styles.canvasInput]}
											value={canvasWidth}
											onChange={(value) => setCanvasWidth(value.target.value)}
											type="number"
											autofocus
										/>
										<span
											className={`d-flex align-items-center position-absolute ${css(
												styles.canvasFieldSufix
											)}`}
										>
											w
										</span>
									</div>
									<span style={{ margin: "0 0.5vw", fontSize: "1.2vw" }}>
										{" "}
										x{" "}
									</span>
									<div className={`position-relative`}>
										<TextField
											name={`canvas-height`}
											styles={[styles.canvasInput]}
											value={canvasHeight}
											onChange={(value) => setCanvasHeight(value.target.value)}
											type="number"
										/>
										<span
											className={`d-flex align-items-center position-absolute ${css(
												styles.canvasFieldSufix
											)}`}
										>
											h
										</span>
									</div>
								</div>
							</div>
							{errors && (
								<div className="d-flex align-items-center">
									<span className={`${css(styles.errors)}`}>{errors}</span>
								</div>
							)}
						</form>
					</div>
				</div>
			</ModalView>

			<ModalView
				showModal={showLayoutModal}
				setShowModal={setShowLayoutModal}
				title={`Set Template Layout`}
				cancelText={`Cancel`}
				cancelOnClick={() => {
					setShowLayoutModal(false);
					initialState();
				}}
				submitText={`Next`}
				submitOnClick={handleSubmitTemplateLayout}
			>
				<div>
					<div className={`d-flex`}>
						<form onSubmit={(e) => e.preventDefault()}>
							<div
								className={`${css(
									styles.formRow
								)} d-flex align-items-center justify-content-between`}
							>
								<div className={`d-flex align-items-center`}>
									<p className={`${css(styles.formlabel)}`}>Rows:</p>
									<div className={`position-relative`}>
										<TextField
											name={`canvas-width`}
											styles={[styles.canvasInput]}
											value={rows}
											onChange={(value) => setRows(value.target.value)}
											type="number"
											autofocus
										/>
									</div>
									<p
										className={`${css(styles.formlabel)}`}
										style={{ marginLeft: "1vw" }}
									>
										Columns:
									</p>
									<div className={`position-relative`}>
										<TextField
											name={`canvas-height`}
											styles={[styles.canvasInput]}
											value={columns}
											onChange={(value) => setColumns(value.target.value)}
											type="number"
										/>
									</div>
								</div>
							</div>

							{errors && (
								<div className="d-flex align-items-center">
									<span className={`${css(styles.errors)}`}>{errors}</span>
								</div>
							)}
						</form>
					</div>
				</div>
			</ModalView>

			<ModalView
				showModal={showTempModal}
				setShowModal={setShowTempModal}
				title={`Save as New Template`}
				cancelText={`Cancel`}
				cancelOnClick={() => {
					setShowTempModal(false);
					initialState();
				}}
				submitText={`Create`}
				submitOnClick={handleSubmit}
			>
				<div className={`d-flex flex-column`}>
					<TextField
						styles={[styles.canvasInput]}
						label="Template Name"
						name={`template-name`}
						value={templateName}
						onChange={(value) => setTemplateName(value.target.value)}
						autofocus
					/>

					{errors && (
						<div className="d-flex align-items-center">
							<span className={`${css(styles.errors)}`}>{errors}</span>
						</div>
					)}
				</div>
			</ModalView>
		</>
	);
};

const mapStateToProps = (state) => ({
	layout: state.layout,
	canvasData: state.canvasData,
	user: state.user,
});

const actions = {};

export default connect(mapStateToProps, actions)(SelectAdminTemplate);
