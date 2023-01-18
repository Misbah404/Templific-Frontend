import React, { useEffect, useState, createRef } from "react";
import JSZip from "jszip";
import { css } from "aphrodite";
import SVG from "react-inlinesvg";
import { connect, useDispatch } from "react-redux";
import { Prompt, useHistory, useLocation, matchPath } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { changeDpiDataUrl } from "changedpi";
import {
	Button,
	SideBar,
	ModalView,
	Loader,
	SelectBox,
	TextField,
} from "../../../components";
import { ROUTES } from "../../../constants";
import styles from "./styles";
import { Colors, Images } from "../../../theme";
import { CustomStage, ElementDropDown, ToolBar } from "./components";
import { disableSideBar, logoutModal } from "../../../actions/LayoutAction";
import {
	addUserTemplate,
	downloadTemplateAction,
	saveTemplateAction,
	triggerOpenCategoryModal,
} from "../../../actions/CanvasDataAction";
import { Form, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
	CREATE_PREDFINED_TEMPLATE,
	CREATE_USER_TEMPLATE,
	GET_DEMO_TEMPLATE,
	GET_TRANSACTION_TEMPLATE,
	UPDATE_PREDEFINED_TEMPLATE,
	UPDATE_USER_TEMPLATE,
	UPLOAD_FILE_TO_SERVER,
} from "../../../graphQueries";
import _ from "lodash";
import { Store } from "react-notifications-component";
import { jsPDF } from "jspdf";
import { addFonts } from "../../../actions/CanvasDataAction";
import { GET_GLYPHS } from "../../../services/userHelper";
import { useGetCategoryData } from "../../../api";

const Dashboard = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const { getPredefinedTemplates } = useGetCategoryData();
	const canvasData = history.location.state;
	const [stagesRefs, setStagesRefs] = useState({});
	const [isBleed, setIsBleed] = useState(false);
	const [isTrim, setIsTrim] = useState(false);
	const [selectedStage, setSelectedStage] = useState(() => null);
	const [canvasLayout, setCanvasLayout] = useState(() => {});
	const [zoomValue, setZoomValue] = useState(100);
	const [selectElement, setSelectElement] = useState({});
	const [multiNodesElement, setMultiNodesElement] = useState(() => []);
	const [showModal, setShowModal] = useState(false);
	const [deleteCanvasId, setDeleteCanvasId] = useState("");
	const [showSaveModal, setShowSaveModal] = useState(false);
	const [showDownloadModal, setShowDownloadModal] = useState(false);
	const [editNameModal, setEditNameModal] = useState(false);
	const [thumbnail, setThumbnail] = useState({});
	const [editTemplateName, setEditTemplateName] = useState("");
	const [templateNameError, setTemplateNameError] = useState("");
	const [modalError, setModalError] = useState(() => "");
	const [duplicateStageChildElements, setDuplicateStageChildElements] =
		useState({});

	const [mainCategoryId, setMainCategoryId] = useState(() => "");
	const [subCategoryId, setSubCategoryId] = useState(() => "");

	const [modalMainCategoryId, setModalMainCategoryId] = useState(() => "");
	const [modalSubCategoryId, setModalSubCategoryId] = useState(() => "");

	const [openEditCategoryModal, setOpenEditCategoryModal] = useState(
		() => false
	);

	const [isLoading, setIsLoading] = useState(() => false);
	const [downloadForm, setDownloadForm] = useState({
		type: "",
		bleed: false,
		trim: false,
		paper: false,
		typeError: "",
	});

	const [canvasAttrs, setCanvasAttrs] = useState({ ...canvasData });
	const [savedTemplateData, setSavedTemplateData] = useState({});
	const [saveTemplateRes, setSaveTemplateRes] = useState({
		success: "",
		err: "",
	});

	const [templateCheckState, setTemplateCheckState] = useState({});
	const [templateCheckStateDuplicate, setTemplateCheckStateDuplicate] =
		useState({});

	const [uploadFile] = useMutation(UPLOAD_FILE_TO_SERVER, {
		onCompleted(data) {
			setThumbnail({ ...data.upload.data.attributes, id: data.upload.data.id });
			console.log("SAVING");
			saveTemplates(data.upload.data.id);
		},

		onError(err) {
			console.error(err.message);
			setIsLoading(false);
			if (err.message.includes("Received status code 401")) {
				setShowSaveModal(false);
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [saveTemplateToDB] = useMutation(CREATE_USER_TEMPLATE, {
		onCompleted(data) {
			setSaveTemplateRes({ err: "", success: "Template Saved Successfully!" });

			const template = {
				id: data.createTemplate.data.id,
				...data.createTemplate.data.attributes,
				category: {
					name: data.createTemplate.data.attributes?.category?.data?.attributes
						?.name,
					id: data.createTemplate.data.attributes?.category?.data?.id,
				},
				image: {
					name: data.createTemplate.data.attributes?.image?.data?.attributes
						?.name,
					url: data.createTemplate.data.attributes?.image?.data?.attributes
						?.url,
					height:
						data.createTemplate.data.attributes?.image?.data?.attributes
							?.height,
					width:
						data.createTemplate.data.attributes?.image?.data?.attributes?.width,
					id: data.createTemplate.data.attributes?.image?.data?.id,
				},
			};

			setSavedTemplateData(template);

			const saveTemplateToStore = {
				...template,
			};

			dispatch(addUserTemplate(saveTemplateToStore));

			setTemplateCheckStateDuplicate({ ...templateCheckState });

			setIsLoading(false);
		},

		onError(err) {
			setIsLoading(false);

			if (err?.message?.includes("This attribute must be unique")) {
				saveTemplates();
			} else {
				setSaveTemplateRes({ err: "Something went wrong", success: "" });
				setIsLoading(false);
			}

			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [createPredefinedTemplate] = useMutation(CREATE_PREDFINED_TEMPLATE, {
		onCompleted(data) {
			setSaveTemplateRes({ err: "", success: "Template Saved Successfully!" });

			const template = {
				id: data.createPreDefineTemplate.data.id,
				...data.createPreDefineTemplate.data.attributes,
				category: {
					name: data.createPreDefineTemplate.data.attributes?.sub_category?.data
						?.attributes?.name,
					id: data.createPreDefineTemplate.data.attributes?.sub_category?.data
						?.id,
				},
				image: {
					name: data.createPreDefineTemplate.data.attributes?.image?.data
						?.attributes?.name,
					url: data.createPreDefineTemplate.data.attributes?.image?.data
						?.attributes?.url,
					height:
						data.createPreDefineTemplate.data.attributes?.image?.data
							?.attributes?.height,
					width:
						data.createPreDefineTemplate.data.attributes?.image?.data
							?.attributes?.width,
					id: data.createPreDefineTemplate.data.attributes?.image?.data?.id,
				},
			};

			setSavedTemplateData(template);

			setTemplateCheckStateDuplicate({ ...templateCheckState });

			setIsLoading(false);
			getPredefinedTemplates();
		},

		onError(err) {
			setIsLoading(false);

			if (err?.message?.includes("This attribute must be unique")) {
				saveTemplates();
			} else {
				setSaveTemplateRes({ err: "Something went wrong", success: "" });
				setIsLoading(false);
			}

			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [updateUserTemplate] = useMutation(UPDATE_USER_TEMPLATE, {
		onCompleted(data) {
			setSaveTemplateRes({ err: "", success: "Template Saved Successfully!" });
			setShowSaveModal(true);
			setIsLoading(false);

			setTemplateCheckStateDuplicate({ ...templateCheckState });

			const template = {
				id: data.updateTemplate.data.id,
				...data.updateTemplate.data.attributes,
				category: {
					name: data.updateTemplate.data.attributes?.category?.data?.attributes
						?.name,
					id: data.updateTemplate.data.attributes?.category?.data?.id,
				},
				image: {
					name: data.updateTemplate.data.attributes?.image?.data?.attributes
						?.name,
					url: data.updateTemplate.data.attributes?.image?.data?.attributes
						?.url,
					height:
						data.updateTemplate.data.attributes?.image?.data?.attributes
							?.height,
					width:
						data.updateTemplate.data.attributes?.image?.data?.attributes?.width,
					id: data.updateTemplate.data.attributes?.image?.data?.id,
				},
			};

			setSavedTemplateData(template);

			const saveTemplateToStore = {
				...template,
			};

			dispatch(addUserTemplate(saveTemplateToStore));
		},
		onError(err) {
			setSaveTemplateRes({ err: "Something went wrong", success: "" });
			setShowSaveModal(true);
			setIsLoading(false);

			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [updatePredefinedTemplate] = useMutation(UPDATE_PREDEFINED_TEMPLATE, {
		onCompleted(data) {
			setSaveTemplateRes({ err: "", success: "Template Saved Successfully!" });
			setShowSaveModal(true);
			setIsLoading(false);

			setTemplateCheckStateDuplicate({ ...templateCheckState });

			const template = {
				id: data.updatePreDefineTemplate.data.id,
				...data.updatePreDefineTemplate.data.attributes,
				category: {
					name: data.updatePreDefineTemplate.data.attributes?.sub_category?.data
						?.attributes?.name,
					id: data.updatePreDefineTemplate.data.attributes?.sub_category?.data
						?.id,
				},
				image: {
					name: data.updatePreDefineTemplate.data.attributes?.image?.data
						?.attributes?.name,
					url: data.updatePreDefineTemplate.data.attributes?.image?.data
						?.attributes?.url,
					height:
						data.updatePreDefineTemplate.data.attributes?.image?.data
							?.attributes?.height,
					width:
						data.updatePreDefineTemplate.data.attributes?.image?.data
							?.attributes?.width,
					id: data.updatePreDefineTemplate.data.attributes?.image?.data?.id,
				},
			};

			setSavedTemplateData(template);
			getPredefinedTemplates();
		},
		onError(err) {
			setSaveTemplateRes({ err: "Something went wrong", success: "" });
			setShowSaveModal(true);
			setIsLoading(false);

			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [getDemoTemplate] = useLazyQuery(GET_DEMO_TEMPLATE, {
		onCompleted(data) {
			const templates = {};

			if (data?.templates?.data?.length === 1) {
				const templateState = data?.templates?.data[0];

				handleCreateFontsOfTemplateSpecific(
					templateState?.attributes?.canvasAttrs?.allFonts
				);

				const templateData = {
					name: templateState?.attributes?.name,
					height: templateState?.attributes?.height,
					width: templateState?.attributes?.width,
					template: templateState?.attributes?.template,
					unit: templateState?.attributes?.unit,
					zoomValue: templateState?.attributes?.zoomValue,
					canvasAttrs: templateState?.attributes?.canvasAttrs,
					id: templateState?.id,
					category: {
						name: templateState?.attributes?.category?.data?.attributes?.name,
						id: templateState?.attributes?.category?.data?.id,
					},
					image: {
						name: templateState?.attributes?.image?.data?.attributes?.name,
						url: templateState?.attributes?.image?.data?.attributes?.url,
						height: templateState?.attributes?.image?.data?.attributes?.height,
						width: templateState?.attributes?.image?.data?.attributes?.width,
						id: templateState?.attributes?.image?.data?.id,
					},
				};

				setThumbnail(templateData?.image);
				setSavedTemplateData(templateData);
				setCanvasAttrs(templateData?.canvasAttrs);
				setZoomValue(templateData?.zoomValue);

				let templateDuplicate = {};
				const allStagesRef = {};
				let allLayouts = {};
				let templateFeat = {};

				const { template } = templateData;

				Object.keys(template).map((layout) => {
					allLayouts[layout] = {};
					templateDuplicate[layout] = {};

					Object.keys(template[layout])
						.sort((a, b) => a.split("***")[1] - b.split("***")[1])
						.map((row) => {
							const rowName = row.split("***")[0];

							templateDuplicate[layout][rowName] = {};
							allLayouts[layout][rowName] = [];

							Object.keys(template[layout][row])
								.sort(
									(a, b) =>
										template[layout][row][a].order -
										template[layout][row][b].order
								)
								.map((col) => {
									allStagesRef[col] = createRef();

									templateFeat[col] = {
										orderingElements: template[layout][row][col].allElements,

										allElements: template[layout][row][col].allElements,

										bgColor: template[layout][row][col].bgColor,
									};

									templateDuplicate[layout][rowName] = {
										...templateDuplicate[layout][rowName],
										[col]: {
											allElements: template[layout][row][col].allElements,
											bgColor: template[layout][row][col].bgColor,
										},
									};

									allLayouts = {
										...allLayouts,
										[layout]: {
											...allLayouts[layout],
											[rowName]: [...allLayouts[layout][rowName], col],
										},
									};
								});
						});
				});

				setTemplateCheckStateDuplicate(templateDuplicate);
				setDuplicateStageChildElements(templateFeat);
				setCanvasLayout(allLayouts);

				setStagesRefs(allStagesRef);
			}
		},

		onError(err) {
			console.error(err.message);
			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [getTransactionTemplate] = useLazyQuery(GET_TRANSACTION_TEMPLATE, {
		onCompleted(data) {
			const templates = {};

			if (data?.templates?.data?.length === 0) {
				Store.addNotification({
					title: "Sorry ;)",
					message: "Your template is not found. Contact admin department",
					type: "danger",
					insert: "bottom",
					container: "bottom-right",
					animationIn: ["animate__animated", "animate__fadeIn"],
					animationOut: ["animate__animated", "animate__fadeOut"],
					dismiss: {
						duration: 4000,
						onScreen: true,
					},
				});
			}

			if (data?.templates?.data?.length === 1) {
				const templateState = data?.templates?.data[0];

				handleCreateFontsOfTemplateSpecific(
					templateState?.attributes?.canvasAttrs?.allFonts
				);

				const templateData = {
					name: templateState?.attributes?.name,
					height: templateState?.attributes?.height,
					width: templateState?.attributes?.width,
					template: templateState?.attributes?.template,
					unit: templateState?.attributes?.unit,
					zoomValue: templateState?.attributes?.zoomValue,
					canvasAttrs: templateState?.attributes?.canvasAttrs,
					id: templateState?.id,
					category: {
						name: templateState?.attributes?.category?.data?.attributes?.name,
						id: templateState?.attributes?.category?.data?.id,
					},
					image: {
						name: templateState?.attributes?.image?.data?.attributes?.name,
						url: templateState?.attributes?.image?.data?.attributes?.url,
						height: templateState?.attributes?.image?.data?.attributes?.height,
						width: templateState?.attributes?.image?.data?.attributes?.width,
						id: templateState?.attributes?.image?.data?.id,
					},
				};

				setThumbnail(templateData?.image);
				setSavedTemplateData(templateData);
				setCanvasAttrs(templateData?.canvasAttrs);
				setZoomValue(templateData?.zoomValue);

				let templateDuplicate = {};
				const allStagesRef = {};
				let allLayouts = {};
				let templateFeat = {};

				const { template } = templateData;

				Object.keys(template).map((layout) => {
					allLayouts[layout] = {};
					templateDuplicate[layout] = {};

					Object.keys(template[layout])
						.sort((a, b) => a.split("***")[1] - b.split("***")[1])
						.map((row) => {
							const rowName = row.split("***")[0];

							templateDuplicate[layout][rowName] = {};
							allLayouts[layout][rowName] = [];

							Object.keys(template[layout][row])
								.sort(
									(a, b) =>
										template[layout][row][a].order -
										template[layout][row][b].order
								)
								.map((col) => {
									allStagesRef[col] = createRef();

									templateFeat[col] = {
										orderingElements: template[layout][row][col].allElements,

										allElements: template[layout][row][col].allElements,

										bgColor: template[layout][row][col].bgColor,
									};

									templateDuplicate[layout][rowName] = {
										...templateDuplicate[layout][rowName],
										[col]: {
											allElements: template[layout][row][col].allElements,
											bgColor: template[layout][row][col].bgColor,
										},
									};

									allLayouts = {
										...allLayouts,
										[layout]: {
											...allLayouts[layout],
											[rowName]: [...allLayouts[layout][rowName], col],
										},
									};
								});
						});
				});

				setTemplateCheckStateDuplicate(templateDuplicate);
				setDuplicateStageChildElements(templateFeat);
				setCanvasLayout(allLayouts);

				setStagesRefs(allStagesRef);
			}
		},

		onError(err) {
			console.error(err.message);
			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const handleCreateFontsOfTemplateSpecific = (allFonts) => {
		if (!_.isEmpty(allFonts)) {
			let fontObj = {};

			Object.keys(allFonts)?.map(async (item) => {
				const fontName = allFonts[item].name;
				let fontClass = fontName.split(".")[0];
				fontClass = fontClass.split(" ").join("");

				const newFont = new FontFace(fontClass, `url(${allFonts[item].url})`);

				const allGlyphs = await GET_GLYPHS(allFonts[item].url);

				document.fonts.add(newFont);

				await newFont.load();

				try {
					document.body.classList.add(fontClass);
				} catch (error) {
					console.error({ error });
				}

				fontObj[newFont.family] = {
					fontFace: newFont,
					fontClass,
					name: fontName,
					fontFamily: newFont.family,
					url: allFonts[item].url,
					isDeleted: false,
					id: uuid(),
					fontGlyphs: allGlyphs,
				};
				dispatch(addFonts({ fonts: fontObj }));
			});
		}
	};

	const editTemplate = matchPath(location.pathname, {
		path: ROUTES.EDIT_TEMPLATE,
		exact: true,
	});

	const adminEditTemplate = matchPath(location.pathname, {
		path: ROUTES.ADMIN_TEMPLATE_UPDATE,
		exact: true,
	});

	const demoTemplate = matchPath(location.pathname, {
		path: ROUTES.TEMPLATE_DEMO,
		exact: true,
	});

	const transactionTemplate = matchPath(location.pathname, {
		path: ROUTES.TEMPLATE_TRANSACTION,
		exact: true,
	});

	useEffect(() => {
		setTemplateCheckState({});
		setTemplateCheckStateDuplicate({});

		if (
			location.pathname === ROUTES.DASHBOARD_CREATE ||
			location.pathname === ROUTES.ADMIN_TEMPLATE_CREATE
		) {
			if (!!!canvasData?.fromPredefine) {
				const moderateValue = 360;
				if (
					canvasAttrs?.canvas &&
					canvasAttrs.canvas?.canvasHeight &&
					canvasAttrs.canvas?.canvasWidth
				) {
					const { canvasHeight, canvasWidth } = canvasAttrs?.canvasInPx;
					const optimizeValue =
						canvasWidth >= canvasHeight
							? canvasWidth / moderateValue
							: canvasHeight / moderateValue;

					setZoomValue(parseInt(100 / optimizeValue));
				}

				const findTemplate =
					Object.keys(props?.userTemplates).find(
						(key) =>
							props?.userTemplates[key]?.name === canvasAttrs?.templateName
					) || "";

				if (findTemplate === "") {
					handleCreateCanvas();
				} else {
					history.push(ROUTES.SELECT_TEMPLATE);
				}

				if (location?.pathname === ROUTES.ADMIN_TEMPLATE_CREATE) {
					setMainCategoryId(canvasData?.mainCategory);
					setModalMainCategoryId(canvasData?.mainCategory);
					setSubCategoryId(canvasData?.subCategory);
					setModalSubCategoryId(canvasData?.subCategory);
				}
			} else {
				const moderateValue = 360;
				if (
					canvasAttrs?.canvas &&
					canvasAttrs.canvas?.canvasHeight &&
					canvasAttrs.canvas?.canvasWidth
				) {
					const { canvasHeight, canvasWidth } =
						canvasAttrs?.canvasAttrs?.canvasInPx;
					const optimizeValue =
						canvasWidth >= canvasHeight
							? canvasWidth / moderateValue
							: canvasHeight / moderateValue;

					console.log({
						optimizeValue,
						zoomValue: parseInt(100 / optimizeValue),
					});

					// debugger;
					setZoomValue(parseInt(100 / optimizeValue));
				}

				const allStagesRef = {};
				let allLayouts = {};
				let templateFeat = {};

				let template = canvasData?.template || {};

				let templateDuplicate = {};

				Object.keys(template).map((layout) => {
					allLayouts[layout] = {};
					templateDuplicate[layout] = {};

					Object.keys(template[layout])
						.sort((a, b) => a.split("***")[1] - b.split("***")[1])
						.map((row) => {
							const rowName = row.split("***")[0];

							templateDuplicate[layout][rowName] = {};
							allLayouts[layout][rowName] = [];

							Object.keys(template[layout][row])
								.sort(
									(a, b) =>
										template[layout][row][a].order -
										template[layout][row][b].order
								)
								.map((col) => {
									allStagesRef[col] = createRef();

									templateFeat[col] = {
										orderingElements: template[layout][row][col].allElements,

										allElements: template[layout][row][col].allElements,

										bgColor: template[layout][row][col].bgColor,
									};

									templateDuplicate[layout][rowName] = {
										...templateDuplicate[layout][rowName],
										[col]: {
											allElements: template[layout][row][col].allElements,
											bgColor: template[layout][row][col].bgColor,
										},
									};

									allLayouts = {
										...allLayouts,
										[layout]: {
											...allLayouts[layout],
											[rowName]: [...allLayouts[layout][rowName], col],
										},
									};
								});
						});
				});

				setTemplateCheckStateDuplicate(templateDuplicate);
				setDuplicateStageChildElements(templateFeat);
				setCanvasLayout(allLayouts);
				setCanvasAttrs({
					...canvasData?.canvasAttrs,
					templateName: canvasData?.templateName,
				});
				setStagesRefs(allStagesRef);
			}
		}

		if (editTemplate?.path && editTemplate.path === ROUTES.EDIT_TEMPLATE) {
			const id = editTemplate?.params?.id || "";

			const templateId = Object.keys(props.userTemplates).filter(
				(temp) => props.userTemplates[temp].id === id
			);

			if (!templateId || templateId.length === 0 || id === "") {
				history.replace(ROUTES.SELECT_TEMPLATE);
			}

			const templateData = props.userTemplates[templateId[0]];

			if (!templateData || _.isEmpty(templateData) || _.isNil(templateData)) {
				history.replace(ROUTES.SELECT_TEMPLATE);
			}

			try {
				let template = templateData?.template || {};

				let templateDuplicate = {};

				setThumbnail(templateData?.image);
				setSavedTemplateData(templateData);
				setCanvasAttrs({
					...templateData?.canvasAttrs,
					templateName: templateData.name,
				});
				setZoomValue(templateData?.zoomValue);

				const allStagesRef = {};
				let allLayouts = {};
				let templateFeat = {};

				Object.keys(template).map((layout) => {
					allLayouts[layout] = {};
					templateDuplicate[layout] = {};

					Object.keys(template[layout])
						.sort((a, b) => a.split("***")[1] - b.split("***")[1])
						.map((row) => {
							const rowName = row.split("***")[0];

							templateDuplicate[layout][rowName] = {};
							allLayouts[layout][rowName] = [];

							Object.keys(template[layout][row])
								.sort(
									(a, b) =>
										template[layout][row][a].order -
										template[layout][row][b].order
								)
								.map((col) => {
									allStagesRef[col] = createRef();

									templateFeat[col] = {
										orderingElements: template[layout][row][col].allElements,

										allElements: template[layout][row][col].allElements,

										bgColor: template[layout][row][col].bgColor,
									};

									templateDuplicate[layout][rowName] = {
										...templateDuplicate[layout][rowName],
										[col]: {
											allElements: template[layout][row][col].allElements,
											bgColor: template[layout][row][col].bgColor,
										},
									};

									allLayouts = {
										...allLayouts,
										[layout]: {
											...allLayouts[layout],
											[rowName]: [...allLayouts[layout][rowName], col],
										},
									};
								});
						});
				});

				setTemplateCheckStateDuplicate(templateDuplicate);
				setDuplicateStageChildElements(templateFeat);
				setCanvasLayout(allLayouts);

				setStagesRefs(allStagesRef);
			} catch (error) {
				console.error(error);
			}
		}

		if (
			adminEditTemplate?.path &&
			adminEditTemplate.path === ROUTES.ADMIN_TEMPLATE_UPDATE
		) {
			const id = adminEditTemplate?.params?.id || "";

			const templateId = props?.preDefineTemplates?.filter(
				(temp) => temp?.id === id
			);

			if (!templateId || templateId.length === 0 || id === "") {
				history.replace(ROUTES.SELECT_CATEGORIES);
			}

			const templateData = templateId[0];

			setModalSubCategoryId(templateData?.subCategory?.id);

			const subCategoryInfoOfTemplate = props?.subCategoryList?.find(
				(s) => s?.id === templateData?.subCategory?.id
			);

			if (!_.isEmpty(subCategoryInfoOfTemplate))
				setModalMainCategoryId(subCategoryInfoOfTemplate?.mainCategory?.id);

			if (!templateData || _.isEmpty(templateData) || _.isNil(templateData)) {
				history.replace(ROUTES.SELECT_CATEGORIES);
			}

			try {
				let template = templateData?.template || {};

				console.log({ templateData });

				let templateDuplicate = {};

				setThumbnail(templateData?.image);
				setSavedTemplateData(templateData);
				setCanvasAttrs({
					...templateData?.canvasAttrs,
					templateName: templateData?.name,
				});
				setZoomValue(templateData?.zoomValue);

				const allStagesRef = {};
				let allLayouts = {};
				let templateFeat = {};

				Object.keys(template).map((layout) => {
					allLayouts[layout] = {};
					templateDuplicate[layout] = {};

					Object.keys(template[layout])
						.sort((a, b) => a.split("***")[1] - b.split("***")[1])
						.map((row) => {
							const rowName = row.split("***")[0];

							templateDuplicate[layout][rowName] = {};
							allLayouts[layout][rowName] = [];

							Object.keys(template[layout][row])
								.sort(
									(a, b) =>
										template[layout][row][a].order -
										template[layout][row][b].order
								)
								.map((col) => {
									allStagesRef[col] = createRef();

									templateFeat[col] = {
										orderingElements: template[layout][row][col].allElements,

										allElements: template[layout][row][col].allElements,

										bgColor: template[layout][row][col].bgColor,
									};

									templateDuplicate[layout][rowName] = {
										...templateDuplicate[layout][rowName],
										[col]: {
											allElements: template[layout][row][col].allElements,
											bgColor: template[layout][row][col].bgColor,
										},
									};

									allLayouts = {
										...allLayouts,
										[layout]: {
											...allLayouts[layout],
											[rowName]: [...allLayouts[layout][rowName], col],
										},
									};
								});
						});
				});

				setTemplateCheckStateDuplicate(templateDuplicate);
				setDuplicateStageChildElements(templateFeat);
				setCanvasLayout(allLayouts);

				setStagesRefs(allStagesRef);
			} catch (error) {
				console.error(error);
			}
		}

		if (demoTemplate?.path && demoTemplate?.path === ROUTES.TEMPLATE_DEMO) {
			const { demoId } = demoTemplate.params;

			getDemoTemplate({ variables: { demoId } });
		}

		if (
			transactionTemplate?.path &&
			transactionTemplate.path === ROUTES.TEMPLATE_TRANSACTION
		) {
			const { transactionId } = transactionTemplate.params;

			getTransactionTemplate({ variables: { transactionId: transactionId } });
		}
	}, [location.pathname]);

	// triggering save template
	useEffect(() => {
		selectedStage?.canvas?.current?.setSelectedElement({});

		if (props.triggerSaveTemplate) {
			if (!props.user.accountSuspended && props?.user?.isAdmin !== true)
				createCanvasThumbnail();
			else if (props?.user?.isAdmin == true) createCanvasThumbnail();
			else setShowSaveModal(true);

			dispatch(saveTemplateAction(false));
		}

		if (props.triggerDownloadTemplate) {
			setShowDownloadModal(true);
			dispatch(downloadTemplateAction(false));
		}

		if (props.triggerCategoryEditModal) {
			setOpenEditCategoryModal(true);
			dispatch(triggerOpenCategoryModal());
		}
	}, [
		props.triggerSaveTemplate,
		props.triggerDownloadTemplate,
		props.triggerCategoryEditModal,
	]);

	useEffect(() => {
		setMultiNodesElement([]);
		setSelectElement({});
		if (selectedStage && selectedStage.canvas) {
			window.addEventListener("keydown", handleKeyPress);
		} else {
			window.removeEventListener("keydown", handleKeyPress);
		}
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [selectedStage]);

	useEffect(() => {
		if (_.isEmpty(selectedStage)) {
			const key = Object.keys(stagesRefs)[0];
			const firstCanvas = stagesRefs[key];
			firstCanvas && setSelectedStage({ canvas: firstCanvas, key });
		}

		if (
			duplicateStageChildElements &&
			!_.isEmpty(duplicateStageChildElements)
		) {
			renderChildToStage();
		}
	}, [stagesRefs]);

	const handleSelectElementParent = (data) => {
		if (!data) setSelectElement({});
		else {
			setSelectElement(data);
		}
	};

	const handleKeyPress = (e) => {
		// debugger;

		const targetName = e?.target?.tagName;
		const formElements = ["INPUT", "TEXTAREA", "SELECT", "OPTION"];

		if (
			(e.ctrlKey || e.metaKey) &&
			e.key.toLowerCase() === "z" &&
			!e.shiftKey
		) {
			selectedStage.canvas.current.handleUndo();
		}

		if (
			((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "z") ||
			((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y")
		) {
			selectedStage.canvas.current.handleRedo();
		}

		if (formElements.includes(targetName)) {
			return;
		}

		if (
			e.key.toLowerCase() === "delete" ||
			e.key.toLowerCase() === "backspace"
		) {
			selectedStage.canvas.current.handleDeleteElement();
		}

		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
			selectedStage.canvas?.current?.handleCopyNode();
		}

		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
			selectedStage?.canvas?.current?.handlePasteNode(true);
		}

		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "x") {
			selectedStage?.canvas?.current?.handleCutNode();
		}
	};

	const renderChildToStage = () => {
		const allDuplicateStages = {};

		Object.keys(duplicateStageChildElements).forEach((stage, idx) => {
			if (idx === 0) {
				setSelectedStage({ canvas: stagesRefs[stage], key: stage });
			}

			if (stagesRefs[stage] && duplicateStageChildElements[stage]) {
				stagesRefs[stage]?.current?.handleDuplicateChange(
					duplicateStageChildElements[stage]
				);
			} else {
				allDuplicateStages[stage] = duplicateStageChildElements[stage];
			}
		});

		setDuplicateStageChildElements(allDuplicateStages);
	};

	const handleCreateCanvas = () => {
		const newStagesRefsObj = {};

		const layout = {};
		if (canvasAttrs?.templateType?.layout) {
			const { row, col } = canvasAttrs?.templateType?.layout;
			[...Array(row).keys()].forEach(() => {
				const rowId = uuid();
				layout[`row_${rowId}`] = [];

				[...Array(col).keys()].forEach(() => {
					const colId = uuid();
					layout[`row_${rowId}`] = [
						...layout[`row_${rowId}`],
						`stageRef_${colId}`,
					];

					newStagesRefsObj[`stageRef_${colId}`] = createRef();
				});
			});
		}

		setStagesRefs({ ...stagesRefs, ...newStagesRefsObj });
		setCanvasLayout({ ...canvasLayout, [`layout_${uuid()}`]: layout });

		const key = Object.keys(newStagesRefsObj)[0];

		setSelectedStage({ canvas: newStagesRefsObj[key], key });
	};

	const handleDuplicateStage = (layoutId) => {
		const newCanvasLayout = { ...canvasLayout };
		const duplicateLayout = {};
		const newStagesRefs = {};
		let childElements = {};

		if (newCanvasLayout && newCanvasLayout[layoutId]) {
			Object.keys(newCanvasLayout[layoutId]).forEach((row) => {
				const rowId = `row_${uuid()}`;
				duplicateLayout[rowId] = [];
				newCanvasLayout[layoutId][row].forEach((col) => {
					const newColId = uuid();
					const stageRefs = createRef();

					const bgLayer = stagesRefs[col].current.children[0]?.children;

					let children = null;
					if (demoTemplate?.path === ROUTES.TEMPLATE_DEMO) {
						children = stagesRefs[col].current.children[2]?.children;
					} else {
						children = stagesRefs[col].current.children[1]?.children;
					}

					const stageChildren = {};

					if (children && children.length > 0) {
						const orderingElements = {};
						let index = 1;
						let bgColor = "#ffffff";

						let zIndex = 0;

						bgLayer.forEach((child) => {
							if (child.attrs.name === "bgColor") {
								bgColor = child.attrs.fill;
							}
						});

						children.forEach((child) => {
							if (child.attrs.name === "line") {
								const element = {
									attrs: {
										...child.attrs,
										x: child.attrs.x ? child.attrs.x / (zoomValue / 100) : 0,
										y: child.attrs.y ? child.attrs.y / (zoomValue / 100) : 0,
										// color: child.attrs.stroke,
									},
									points: child.attrs.points.map((p) => p / (zoomValue / 100)),
									id: uuid(),
									shapeRef: createRef(),
									color: child.attrs.color,
									name: child.attrs.name,
								};

								orderingElements[index] = element;
								index += 1;
							}

							if (child.attrs.name === "rect") {
								const element = {
									...child.attrs,
									x: child.attrs.x ? child.attrs.x / (zoomValue / 100) : 0,
									y: child.attrs.y ? child.attrs.y / (zoomValue / 100) : 0,
									height: child.attrs.height
										? child.attrs.height / (zoomValue / 100)
										: 0,
									width: child.attrs.width
										? child.attrs.width / (zoomValue / 100)
										: 0,
									id: uuid(),
									shapeRef: createRef(),
								};

								orderingElements[index] = element;
								index += 1;
							}

							if (child.attrs.name === "star") {
								const element = {
									...child.attrs,
									x: child.attrs.x ? child.attrs.x / (zoomValue / 100) : 0,
									y: child.attrs.y ? child.attrs.y / (zoomValue / 100) : 0,
									innerRadius: child.attrs.innerRadius
										? child.attrs.innerRadius / (zoomValue / 100)
										: 0,
									outerRadius: child.attrs.outerRadius
										? child.attrs.outerRadius / (zoomValue / 100)
										: 0,
									id: uuid(),
									shapeRef: createRef(),
								};

								orderingElements[index] = element;
								index += 1;
							}

							if (child.attrs.name === "ellipse") {
								const element = {
									...child.attrs,
									x: child.attrs.x ? child.attrs.x / (zoomValue / 100) : 0,
									y: child.attrs.y ? child.attrs.y / (zoomValue / 100) : 0,
									height: child.attrs.radiusY
										? (child.attrs.radiusY * 2) / (zoomValue / 100)
										: 0,
									width: child.attrs.radiusX
										? (child.attrs.radiusX * 2) / (zoomValue / 100)
										: 0,
									radiusX: child.attrs.radiusX
										? child.attrs.radiusX / (zoomValue / 100)
										: 0,
									radiusY: child.attrs.radiusY
										? child.attrs.radiusY / (zoomValue / 100)
										: 0,
									id: uuid(),
									shapeRef: createRef(),
								};

								orderingElements[index] = element;
								index += 1;
							}

							if (child.attrs.name === "polygon") {
								const element = {
									...child.attrs,
									x: child.attrs.x ? child.attrs.x / (zoomValue / 100) : 0,
									y: child.attrs.y ? child.attrs.y / (zoomValue / 100) : 0,

									points: child.attrs.points.map((p) => p / (zoomValue / 100)),
									id: uuid(),
									shapeRef: createRef(),
								};

								orderingElements[index] = element;
								index += 1;
							}

							if (child.attrs.name === "arrow") {
								const element = {
									attrs: {
										...child.attrs,
										x: child.attrs.x ? child.attrs.x / (zoomValue / 100) : 0,
										y: child.attrs.y ? child.attrs.y / (zoomValue / 100) : 0,
									},
									points: child.attrs.points.map((p) => p / (zoomValue / 100)),
									id: uuid(),
									shapeRef: createRef(),
									color: child.attrs.color,
									name: child.attrs.name,
								};

								orderingElements[index] = element;
								index += 1;
							}

							if (child.attrs.name === "image") {
								const element = {
									...child.attrs,
									x: child.attrs.x ? child.attrs.x / (zoomValue / 100) : 0,
									y: child.attrs.y ? child.attrs.y / (zoomValue / 100) : 0,
									height: child.attrs.height
										? child.attrs.height / (zoomValue / 100)
										: 0,
									width: child.attrs.width
										? child.attrs.width / (zoomValue / 100)
										: 0,
									id: uuid(),
									shapeRef: createRef(),
								};

								orderingElements[index] = element;
								index += 1;
							}

							if (child.attrs.name === "text") {
								const element = {
									...child.attrs,
									x: child.attrs.x ? child.attrs.x / (zoomValue / 100) : 0,
									y: child.attrs.y ? child.attrs.y / (zoomValue / 100) : 0,
									height: child.attrs.height
										? child.attrs.height / (zoomValue / 100)
										: 0,
									width: child.attrs.width
										? child.attrs.width / (zoomValue / 100)
										: 0,
									fontSize: child.attrs.fontSize
										? child.attrs.fontSize / (zoomValue / 100)
										: 0,
									id: uuid(),
									shapeRef: createRef(),
								};

								orderingElements[index] = element;
								index += 1;
							}
						});

						stageChildren[`stageRef_${newColId}`] = {
							bgColor,
							zIndex,
							orderingElements,
						};
					}

					childElements = { ...childElements, ...stageChildren };
					duplicateLayout[rowId].push(`stageRef_${newColId}`);
					newStagesRefs[`stageRef_${newColId}`] = stageRefs;
				});
			});

			childElements && setDuplicateStageChildElements(childElements);
			setCanvasLayout({
				...canvasLayout,
				[`layout_${uuid()}`]: duplicateLayout,
			});

			setStagesRefs({ ...stagesRefs, ...newStagesRefs });
		}
	};

	const handleDeleteCanvas = (layoutId) => {
		let newStagesRefs = { ...stagesRefs };
		let newCanvasLayout = { ...canvasLayout };
		if (canvasLayout && canvasLayout[layoutId]) {
			Object.keys(canvasLayout[layoutId]).forEach((rowId) => {
				canvasLayout[layoutId][rowId].forEach((stageId) => {
					if (stageId === selectedStage.key) {
						setSelectedStage(null);
					}
					delete newStagesRefs[stageId];
				});
			});

			delete newCanvasLayout[layoutId];
		}

		setStagesRefs(newStagesRefs);
		setCanvasLayout(newCanvasLayout);
		setDeleteCanvasId("");
	};

	const handleCanvasUpdate = (layoutId, rowId, colId, data) => {
		let template = { ...templateCheckState };

		if (template[layoutId] && template[layoutId][rowId]) {
			template = {
				...template,
				[layoutId]: {
					...template[layoutId],
					[rowId]: {
						...template[layoutId][rowId],
						[colId]: data,
					},
				},
			};
		} else {
			template[layoutId] = {
				...template[layoutId],
				[rowId]: {
					[colId]: data,
				},
			};
		}

		setTemplateCheckState({ ...template });

		if (_.isEmpty(templateCheckStateDuplicate)) {
			setTemplateCheckStateDuplicate({ ...template });
		}
	};

	const handleChangeRef = (id) => {
		if (selectedStage.key !== id) {
			selectedStage?.canvas?.current?.handleMouseDown();
			setSelectedStage({ canvas: stagesRefs[id], key: id });
		}
	};

	const handleZoomOut = () => {
		if (zoomValue > 0) {
			const newZoomVal = zoomValue - 10;
			if (newZoomVal < 0) {
				setZoomValue(1);
			} else setZoomValue(zoomValue - 10);
		}
	};

	const handleZoomIn = () => {
		if (zoomValue < 300) {
			setZoomValue(zoomValue + 10);
		}
	};

	const handleDisableSidebar = (e) => {
		const canvas = document.getElementsByTagName("canvas");
		let clickedOnCanvas = false;
		if (canvas?.length > 0) {
			Array.from(canvas).map((c) => {
				if (c === e.target) {
					clickedOnCanvas = true;
				}
			});
		}

		if (!clickedOnCanvas) {
			const textarea = document.createElement("textarea");
			// if (e.target !== textarea)
			//   selectedStage?.canvas?.current?.setSelectedElement({});
			selectedStage?.canvas?.current?.handleMouseDown(e);
		}
	};

	function dataURItoBlob(dataURI) {
		let arr = dataURI.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], uuid(), { type: mime });
	}

	const createCanvasThumbnail = () => {
		if (!_.isEmpty(stagesRefs)) {
			const allTemplatesName = Object.keys(props?.userTemplates) || [];

			if (
				_.isEmpty(canvasAttrs?.templateName) ||
				_.isNil(canvasAttrs?.templateName)
			) {
				setTemplateNameError("Template name is required");

				return;
			}

			let templateNameFound = false;
			allTemplatesName?.map((t) => {
				if (
					props?.userTemplates[t]?.name === canvasAttrs?.templateName?.trim() &&
					props.userTemplates[t].id !== savedTemplateData?.id
				) {
					setTemplateNameError("Template with this name is already created.");
					templateNameFound = true;
					return;
				}
			});

			if (templateNameFound) return;

			templateNameError && setTemplateNameError("");

			setIsLoading(true);
			const key = Object.keys(stagesRefs)[0];
			const image = dataURItoBlob(
				stagesRefs[key]?.current?.stage?.toDataURL({
					pixelRatio: window.devicePixelRatio,
				})
			);

			setShowSaveModal(true);

			uploadFile({ variables: { file: image } });
		}
	};

	const saveTemplates = (id) => {
		// debugger
		let template = {};

		let allFonts = {};

		!isLoading && setIsLoading(true);
		!showSaveModal && setShowSaveModal(true);

		Object.keys(canvasLayout).map((layoutKey) => {
			template[layoutKey] = {};
			Object.keys(canvasLayout[layoutKey]).map((rowKey, j) => {
				const rowName = rowKey + "***" + j;
				template[layoutKey][rowName] = {};
				canvasLayout[layoutKey][rowKey]?.map((col, i) => {
					allFonts = { ...allFonts, ...stagesRefs[col].current?.templateFonts };
					template = {
						...template,
						[layoutKey]: {
							...template[layoutKey],
							[rowName]: {
								...template[layoutKey][rowName],
								[col]: {
									...stagesRefs[col].current?.elements,
									allElements: stagesRefs[
										col
									].current?.elements?.allElements.map((element) => {
										element.shapeRef && delete element.shapeRef;
										return element;
									}),
									order: i + 1,
								},
							},
						},
					};
				});
			});
		});

		if (_.isEmpty(savedTemplateData) || _.isNil(savedTemplateData)) {
			const data = {
				height: parseInt(canvasAttrs.canvas.canvasHeight),
				width: parseInt(canvasAttrs.canvas.canvasWidth),
				template,
				name: canvasAttrs.templateName,
				unit: canvasAttrs?.canvas?.selectedUnit,
				zoomValue,
				categoryId: canvasAttrs?.templateCategory?.categoryId,
				userId: props.user.id,
				image: thumbnail?.id || id,
				demoId: uuid(),
				transactionId: `${uuid()}_${uuid()}`,
				canvasAttrs: {
					templateType: canvasAttrs?.templateType,
					canvas: canvasAttrs?.canvas,
					canvasInPx: canvasAttrs?.canvasInPx,
					allFonts,
				},
			};

			if (location?.pathname === ROUTES.ADMIN_TEMPLATE_CREATE) {
				delete data.userId;
				delete data.demoId;
				delete data.transactionId;
				data.categoryId = canvasData?.subCategory;
				data.mainCategoryId = canvasData?.mainCategory;

				createPredefinedTemplate({ variables: data });
			} else {
				console.log("SAVING");
				saveTemplateToDB({ variables: data });
			}
		} else {
			const data = {
				templateId: savedTemplateData.id,
				template,
				zoomValue,
				name: savedTemplateData.name,
				image: id,
				canvasAttrs: {
					templateType: canvasAttrs.templateType,
					canvas: canvasAttrs.canvas,
					canvasInPx: canvasAttrs.canvasInPx,
					allFonts,
				},
			};

			if (
				location?.pathname === ROUTES.ADMIN_TEMPLATE_CREATE ||
				adminEditTemplate?.path === ROUTES.ADMIN_TEMPLATE_UPDATE
			) {
				data.categoryId = canvasData?.subCategory;
				data.mainCategoryId = canvasData?.mainCategory;
				updatePredefinedTemplate({
					variables: data,
				});
			} else {
				updateUserTemplate({
					variables: data,
				});
			}
		}
	};

	const downloadTemplate = () => {
		if (_.isEmpty(downloadForm.type) || _.isNil(downloadForm.type)) {
			setDownloadForm({ ...downloadForm, typeError: "File type is required" });
			return;
		} else {
			setDownloadForm({ ...downloadForm, typeError: "" });
		}

		const currentZoomValue = zoomValue;

		setZoomValue(100);

		if (downloadForm.bleed) setIsBleed(true);
		if (downloadForm.trim) setIsTrim(true);

		setTimeout(() => {
			if (downloadForm.type === "PNG" || downloadForm.type === "JPG") {
				downloadCanvasImages(currentZoomValue);
			}

			if (downloadForm.type === "PDF") {
				downloadPdf(currentZoomValue);
			}
		}, 500);
	};

	const downloadCanvasImages = (currentZoomValue) => {
		const zip = new JSZip();

		const downloadURI = (uri, name) => {
			const link = document.createElement("a");
			link.download = name;
			link.href = uri;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(uri);
		};

		Object.keys(stagesRefs).map((canvas, i) => {
			let img =
				downloadForm.type === "JPG"
					? stagesRefs[canvas].current.stage.toDataURL({
							pixelRatio: window.devicePixelRatio,
							mimeType: "image/jpeg",
							quality: 1,
					  })
					: stagesRefs[canvas].current.stage.toDataURL({
							pixelRatio: window.devicePixelRatio,
							mimeType: "image/png",
							quality: 1,
					  });

			const daurl15dpi = changeDpiDataUrl(img, 300);

			img = daurl15dpi.substr(daurl15dpi.indexOf(",") + 1);

			const fileName = `${
				canvasAttrs.templateName || savedTemplateData.name
			}-canvas-${i + 1}.${downloadForm.type === "JPG" ? "jpg" : "png"}`;

			zip.file(fileName, img, { base64: true });
		});

		zip.generateAsync({ type: "blob" }).then(function (content) {
			// see FileSaver.js
			const url = window.URL.createObjectURL(content);
			downloadURI(url, canvasAttrs.templateName || savedTemplateData.name);
		});

		setIsBleed(false);
		setIsTrim(false);

		setZoomValue(currentZoomValue);
		setShowDownloadModal(false);

		setDownloadForm({
			type: "",
			bleed: false,
			trim: false,
			paper: false,
			typeError: "",
		});
	};

	const downloadPdf = (currentZoomValue) => {
		const stageKeys = Object.keys(stagesRefs);

		const height = stagesRefs[stageKeys[0]].current.stage.height();
		const width = stagesRefs[stageKeys[0]].current.stage.width();

		if (!!downloadForm.paper) {
			let maxHeight = 3508;
			let maxWidth = 2480;

			const doc = new jsPDF("p", "px", [maxHeight, maxWidth]);

			let calculatedHeight = 0;
			let calculatedWidth = 0;

			stageKeys.map((canvas, i) => {
				// if (i !== 0) doc.addPage();

				if (width > maxWidth - calculatedWidth) {
					calculatedHeight += height + 30;
					calculatedWidth = 0;
				}

				if (height > maxHeight - calculatedHeight) {
					doc.addPage();
					calculatedHeight = 0;
					calculatedWidth = 0;
				}

				const img = stagesRefs[canvas].current.stage.toDataURL({
					pixelRatio: window.devicePixelRatio,
					mimeType: "image/jpeg",
				});
				const daurl15dpi = changeDpiDataUrl(img, 300);

				doc.addImage(
					daurl15dpi,
					"JPEG",
					calculatedWidth,
					calculatedHeight,
					width,
					height,
					`alias-${i + 1}`
				);

				// calculatedHeight += height
				calculatedWidth += width + 30;
			});

			doc.save(
				`${canvasAttrs.templateName || savedTemplateData.name}-canvas.pdf`
			);
		} else {
			const doc = new jsPDF("p", "px", [height, width]);

			stageKeys.map((canvas, i) => {
				if (i !== 0) doc.addPage();

				const img = stagesRefs[canvas].current.stage.toDataURL({
					pixelRatio: window.devicePixelRatio,
					mimeType: "image/jpeg",
				});
				const daurl15dpi = changeDpiDataUrl(img, 600);
				doc.addImage(daurl15dpi, "JPEG", 0, 0, width, height, `alias-${i + 1}`);
			});

			doc.save(
				`${canvasAttrs.templateName || savedTemplateData.name}-canvas.pdf`
			);
		}

		setIsBleed(false);
		setIsTrim(false);

		setZoomValue(currentZoomValue);

		setShowDownloadModal(false);

		setDownloadForm({
			type: "",
			bleed: false,
			trim: false,
			paper: false,
			typeError: "",
		});
	};

	const handleTemplateNameChange = (e) => {
		// setCanvasAttrs((state) => ({ ...state, templateName: e.target.value }));
		setCanvasAttrs({ ...canvasAttrs, templateName: e.target.value });
		if (!_.isEmpty(savedTemplateData)) {
			setSavedTemplateData((state) => ({ ...state, name: e.target.value }));
		}
	};

	const compareStateChange = () => {
		const currentState = _.cloneDeep(templateCheckState);
		const duplicateState = _.cloneDeep(templateCheckStateDuplicate);

		const removeUuid = (o) => {
			if (o) {
				switch (typeof o) {
					case "object":
						if (o.shapeRef) {
							delete o?.shapeRef;
						} else {
							Object.keys(o)?.forEach((k) => removeUuid(o[k]));
						}

						break;
					case "array":
						o?.forEach((a) => removeUuid(a));
				}
			}
		};

		const removeOrder = (o) => {
			if (o) {
				switch (typeof o) {
					case "object":
						delete o?.order;

						Object.keys(o).forEach((k) => removeOrder(o[k]));
						break;
					case "array":
						o.forEach((a) => removeOrder(a));
				}
			}
		};

		removeUuid(currentState);
		removeUuid(duplicateState);

		if (demoTemplate && demoTemplate?.path === ROUTES.TEMPLATE_DEMO) {
			return false;
		}

		return !_.isEqual(currentState, duplicateState);
	};

	const handleUpdateCategory = () => {
		if (_.isEmpty(modalMainCategoryId)) {
			setModalError("Main Category is required.");
			return;
		}

		if (_.isEmpty(modalSubCategoryId)) {
			setModalError("Sub Category is required.");
			return;
		}

		const isSubCategoryOfMainCategory = props?.subCategoryList?.find(
			(sub) =>
				sub?.id === modalSubCategoryId &&
				sub?.mainCategory?.id === modalMainCategoryId
		);

		if (_.isEmpty(isSubCategoryOfMainCategory)) {
			setModalError("Sub Category is not of main category");
		}

		modalError && setModalError("");

		setMainCategoryId(modalMainCategoryId);
		setSubCategoryId(modalSubCategoryId);

		setOpenEditCategoryModal(false);
	};

	const isUserModule =
		demoTemplate?.path === ROUTES.TEMPLATE_DEMO ||
		transactionTemplate?.path === ROUTES.TEMPLATE_TRANSACTION;

	if (
		!canvasData &&
		(location.pathname === ROUTES.DASHBOARD_CREATE ||
			location.pathname === ROUTES.ADMIN_TEMPLATE_CREATE)
	) {
		history.push(ROUTES.SELECT_TEMPLATE);
		return <div></div>;
	}

	const filteredSubCategoryList = props?.subCategoryList?.filter(
		(c) => c?.mainCategory?.id === modalMainCategoryId
	);

	return (
		<>
			<Prompt
				when={compareStateChange()}
				message={`Changes are not saved. Are you sure you want to leave ?`}
			/>

			{props.layout.sideBar && <SideBar selectedStage={selectedStage} />}

			<ToolBar
				setSelectElement={setSelectElement}
				selectedStage={selectedStage}
				selectElement={selectElement}
				zoomValue={zoomValue}
				multiNodesElement={multiNodesElement}
			/>

			<div
				className={`${css(
					styles.main
				)} d-flex flex-column align-items-center justify-content-center`}
				onClick={handleDisableSidebar}
			>
				<div
					className={`d-flex justify-content-center align-items-center ${css(
						styles.templateName
					)}`}
				>
					{!isUserModule ? (
						<div
							className={`d-flex justify-content-center align-items-center flex-column`}
						>
							<TextField
								value={canvasAttrs?.templateName}
								onChange={handleTemplateNameChange}
								label={"Template Name"}
								styles={[styles.formInput]}
							/>

							{templateNameError && (
								<div className="d-flex align-items-center">
									<span className={`${css(styles.errors)}`}>
										{templateNameError}
									</span>
								</div>
							)}
						</div>
					) : (
						<span>{canvasAttrs?.templateName || savedTemplateData.name}</span>
					)}
				</div>

				{!_.isEmpty(stagesRefs) &&
					!_.isEmpty(canvasLayout) &&
					Object.keys(canvasLayout).map((layoutId) => (
						<div
							className={`d-flex flex-column align-items-center justify-content-center ${css(
								styles.canvasMainTag
							)}`}
							key={layoutId}
						>
							<div
								className={`w-100 d-flex justify-content-between align-items-center`}
							>
								<div>
									{canvasAttrs?.templateType?.templateType === "double" && (
										<span className={`${css(styles.canvasTitle)}`}>
											{Object.keys(canvasLayout).findIndex(
												(id) => id === layoutId
											) === 0
												? "Front"
												: "Back"}
										</span>
									)}
								</div>
								<div>
									<OverlayTrigger
										overlay={<Tooltip>Duplicate Artboard</Tooltip>}
										placement={"bottom"}
									>
										{({ ref, ...triggerHandler }) => (
											<i
												className={`d-inline-block cursor-pointer fas fa-clone font-weight-light ${css(
													styles.actionIcon
												)}`}
												style={{ transform: "rotate(180deg)" }}
												onClick={() => {
													if (
														canvasAttrs?.templateType?.templateType === "double"
													) {
														if (Object.keys(canvasLayout).length !== 2)
															handleDuplicateStage(layoutId);
													} else handleDuplicateStage(layoutId);
												}}
												ref={ref}
												{...triggerHandler}
											/>
										)}
									</OverlayTrigger>

									<OverlayTrigger
										overlay={<Tooltip>Delete Artboard</Tooltip>}
										placement={"bottom"}
									>
										{({ ref, ...triggerHandler }) => (
											<i
												className={`d-inline-block cursor-pointer fas fa-trash-alt font-weight-light ${css(
													styles.actionIcon
												)}`}
												onClick={() => {
													setDeleteCanvasId(layoutId);
													setShowModal(true);
												}}
												ref={ref}
												{...triggerHandler}
											/>
										)}
									</OverlayTrigger>
								</div>
							</div>
							<div>
								{canvasLayout[layoutId] &&
									Object.keys(canvasLayout[layoutId]).map((rowId) => (
										<div className="flex flex-row" key={rowId}>
											{canvasLayout[layoutId][rowId] &&
												canvasLayout[layoutId][rowId].map((colId) => (
													<CustomStage
														key={colId}
														map
														stagesRefs={stagesRefs}
														id={colId}
														layoutId={layoutId}
														rowId={rowId}
														className="d-inline-flex ml-2"
														handleChangeRef={handleChangeRef}
														selectedStage={selectedStage}
														canvasData={canvasAttrs}
														ref={stagesRefs[colId]}
														zoomValue={zoomValue}
														fonts={props.fonts}
														images={props.images}
														handleCanvasUpdate={handleCanvasUpdate}
														handleSelectElementParent={
															handleSelectElementParent
														}
														isBleed={isBleed}
														isTrim={isTrim}
														isDemo={demoTemplate?.path === ROUTES.TEMPLATE_DEMO}
														triggerSaveTemplate={props.triggerSaveTemplate}
														triggerDownloadTemplate={
															props.triggerDownloadTemplate
														}
														user={props.user}
														setMultiNodesElement={setMultiNodesElement}
													/>
												))}
										</div>
									))}
							</div>
						</div>
					))}

				<div className={`${css(styles.backSideBtnWrap)}`}>
					<Button
						title={
							canvasAttrs?.templateType?.templateType === "double"
								? "add back side"
								: `add new page`
						}
						disabled={
							canvasAttrs?.templateType?.templateType === "double" &&
							!_.isEmpty(canvasLayout) &&
							Object.keys(canvasLayout).length === 2
						}
						className={`${css(styles.backSideBtn)} `}
						onClick={handleCreateCanvas}
					>
						<i className={`fa fa-plus`} style={{ marginRight: "0.5vw" }} />
					</Button>
				</div>
			</div>
			{/* )} */}
			<div
				className={`${css(styles.zoomControl)} d-flex justify-content-between`}
			>
				<button
					className={`${css(styles.zoomControlItem)}`}
					onClick={handleZoomOut}
				>
					-
				</button>
				<span
					className={`${css(styles.zoomControlItem)}`}
					onClick={() => setZoomValue(100)}
				>
					{zoomValue}%
				</span>
				<button
					className={`${css(styles.zoomControlItem)}`}
					onClick={handleZoomIn}
				>
					+
				</button>
			</div>

			<ModalView
				title={"Delete Canvas"}
				showModal={showModal}
				setShowModal={setShowModal}
				cancelText={"No"}
				submitText={"Yes"}
				cancelOnClick={() => {
					setShowModal(false);
					setDeleteCanvasId("");
				}}
				submitOnClick={() => {
					setShowModal(false);
					handleDeleteCanvas(deleteCanvasId);
				}}
			>
				<div className={`d-flex ${css(styles.modalDelete)}`}>
					Are you sure you want to delete this canvas ?
				</div>
			</ModalView>

			<ModalView
				title={
					props.user.accountSuspended ? "Account Suspended" : "Save Template"
				}
				showModal={showSaveModal}
				setShowModal={setShowSaveModal}
				showFooter={false}
				backdrop={isLoading ? "static" : true}
			>
				{!props.user.accountSuspended ? (
					<div
						className={`d-flex justify-content-center align-items-center ${css(
							styles.modalDelete
						)}`}
					>
						{!isLoading ? (
							<>
								{saveTemplateRes?.success && (
									<span className={`${css(styles.modalDelete)}`}>
										{saveTemplateRes.success}
									</span>
								)}

								{saveTemplateRes?.err && (
									<span
										className={`${css([
											styles.modalDelete,
											styles.errorMessage,
										])}`}
									>
										{saveTemplateRes.err}
									</span>
								)}
							</>
						) : (
							<span className={`${css([styles.modalDelete])}`}>
								<Spinner
									animation="border"
									className={`${css(styles.spinner)}`}
								/>
							</span>
						)}
					</div>
				) : (
					<div className="d-flex justify-content-center align-items-center">
						<span
							className={`${css([styles.modalDelete, styles.errorMessage])}`}
						>
							Kindly pay your invoices to continue
						</span>
					</div>
				)}
			</ModalView>

			<ModalView
				title={"Download"}
				showModal={showDownloadModal}
				setShowModal={setShowDownloadModal}
				showFooter={false}
				cancelOnClick={() =>
					setDownloadForm({
						type: "",
						bleed: false,
						trim: false,
						paper: false,
						typeError: "",
					})
				}
			>
				<div className={` ${css(styles.modalDelete)}`}>
					<SelectBox
						styles={[styles.canvasInput]}
						label="File type"
						name={`template-name`}
						value={downloadForm.type}
						onChange={(value) =>
							setDownloadForm({ ...downloadForm, type: value.target.value })
						}
					>
						<option disabled selected value="">
							Choose File Type
						</option>

						{["JPG", "PNG", "PDF"].map((res, idx) => (
							<option value={res} key={res}>
								{res}
							</option>
						))}
					</SelectBox>

					{downloadForm?.typeError && (
						<span
							className={`${css([styles.modalDelete, styles.errorMessage])}`}
						>
							{downloadForm?.typeError}
						</span>
					)}

					<Button
						type="submit"
						title={"Download"}
						ripple={false}
						className={`w-100 ${css(styles.submitBtn)} ${css(
							styles.formInput
						)}`}
						onClick={downloadTemplate}
					/>

					<label class="container">
						Bleed
						<input
							type="checkbox"
							checked={downloadForm.bleed}
							onChange={(value) =>
								setDownloadForm({
									...downloadForm,
									bleed: value.target.checked,
								})
							}
						/>
						<span class="checkmark"></span>
					</label>

					<label class="container">
						Trim
						<input
							type="checkbox"
							checked={downloadForm.trim}
							onChange={(value) =>
								setDownloadForm({ ...downloadForm, trim: value.target.checked })
							}
						/>
						<span class="checkmark"></span>
					</label>

					<label class="container">
						Paper
						<input
							type="checkbox"
							checked={downloadForm.paper}
							onChange={(value) => {
								setDownloadForm({
									...downloadForm,
									paper: value.target.checked,
								});
							}}
						/>
						<span class="checkmark"></span>
					</label>
				</div>
			</ModalView>

			<ModalView
				title={"Edit Template"}
				showModal={editNameModal}
				setShowModal={() => setEditNameModal(true)}
				cancelText={"No"}
				submitText={"Yes"}
				cancelOnClick={() => {
					setEditNameModal(false);
				}}
				submitOnClick={handleTemplateNameChange}
			>
				<div>
					<TextField
						placeholder="Template Name"
						styles={[styles.formInput]}
						value={editTemplateName}
						onChange={(e) => setEditTemplateName(e.target.value)}
						label="Edit Template Name"
					/>

					{templateNameError && (
						<div className="d-flex align-items-center">
							<span className={`${css(styles.errors)}`}>
								{templateNameError}
							</span>
						</div>
					)}
				</div>
			</ModalView>

			<ModalView
				title={"Edit Template"}
				showModal={openEditCategoryModal}
				setShowModal={() => setOpenEditCategoryModal(true)}
				cancelText={"Cancel"}
				submitText={"Save"}
				cancelOnClick={() => {
					setOpenEditCategoryModal(false);
					setModalError("");
				}}
				submitOnClick={handleUpdateCategory}
			>
				<div>
					<SelectBox
						styles={[styles.canvasInput]}
						label="Main Category"
						name={`main-category`}
						value={modalMainCategoryId}
						onChange={(value) => {
							setModalMainCategoryId(value.target.value);
							setModalSubCategoryId("");
						}}
					>
						<option disabled selected value="">
							Choose category
						</option>

						{props?.mainCategoryList.map((res, idx) => (
							<option value={res?.id} key={res?.id}>
								{res?.name}
							</option>
						))}
					</SelectBox>

					<SelectBox
						styles={[styles.canvasInput]}
						label="Sub Category"
						name={`sub-category`}
						value={modalSubCategoryId}
						onChange={(value) => setModalSubCategoryId(value.target.value)}
						disabled={!!!modalMainCategoryId}
						// disabled
					>
						<option disabled selected value="">
							Choose category
						</option>

						{filteredSubCategoryList?.map((res, idx) => (
							<option value={res?.id} key={res?.id}>
								{res?.name}
							</option>
						))}
					</SelectBox>

					{modalError && (
						<div className="d-flex align-items-center">
							<span className={`${css(styles.errors)}`}>{modalError}</span>
						</div>
					)}
				</div>
			</ModalView>
		</>
	);
};

const mapStateToProps = (state) => ({
	layout: state.layout,
	fonts: { ...state.canvasData?.defaultFonts, ...state.canvasData?.fonts },
	images: { ...state.canvasData?.images, ...state.canvasData?.elements },
	triggerSaveTemplate: state.canvasData?.triggerSaveTemplate,
	triggerDownloadTemplate: state.canvasData.triggerDownloadTemplate,
	triggerCategoryEditModal: state.canvasData?.triggerCategoryEditModal,
	user: state.user,
	userTemplates: state.canvasData?.templates,
	mainCategoryList: state?.category?.mainCategory,
	subCategoryList: state?.category?.subCategory,
	preDefineTemplates: state?.category?.preDefineTemplates,
});

const actions = {};

export default connect(mapStateToProps, actions)(Dashboard);
