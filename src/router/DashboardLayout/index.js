import { css } from "aphrodite";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, ModalView } from "../../components";
import { ROUTES, strings } from "../../constants";
import { Colors } from "../../theme";
import styles from "./styles";
import moment from "moment";
import SVG from "react-inlinesvg";
import { useLocation, matchPath } from "react-router-dom";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import {
	disableSideBar,
	enableSideBar,
	logoutModal,
} from "../../actions/LayoutAction";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
	GET_USER_CATEGORIES,
	GET_USER_ELEMENTS,
	GET_USER_FONTS,
	GET_USER_IMAGES,
	GET_TEMPLATES,
	GET_DEFAULT_ELEMENTS,
	UPDATE_CARD_INFO,
	GET_GROUP_TEMPLATES,
} from "../../graphQueries";
import {
	addElementBlob,
	downloadTemplateAction,
	saveTemplateAction,
	setGroupTemplates,
	setUserCategories,
	setUserElements,
	setUserFonts,
	setUserImages,
	setUserTemplates,
	triggerOpenCategoryModal,
} from "../../actions/CanvasDataAction";
import { userLogout, verifyUser } from "../../actions/AuthActions";
import { GET_GLYPHS } from "../../services/userHelper";
import { useGetCategoryData } from "../../api";

const DashboardLayout = (props) => {
	let history = useHistory();
	const dispatch = useDispatch();
	const { getMainCategory, getSubCategory, getPredefinedTemplates } =
		useGetCategoryData();
	const { sideMenuItems, darkSidePanel } = props.children.props;
	const [sidePanelMenu, setSidePanelMenu] = useState([]);
	const location = useLocation();
	const [hideSidePanel, setHideSidePanel] = useState(() => false);
	const [toggleCategoryImage, setToggleCategoryImage] = useState(() => false);
	const [togglePreDefineImage, setTogglePreDefineImage] = useState(() => false);

	const [getCategories] = useLazyQuery(GET_USER_CATEGORIES, {
		onCompleted(data) {
			const dataObj = {};

			data?.categories?.data?.map((category) => {
				const { name } = category.attributes;
				dataObj[name] = { name, id: category.id };
			});

			dispatch(setUserCategories(dataObj));
		},

		onError(err) {
			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [getImages] = useLazyQuery(GET_USER_IMAGES, {
		onCompleted(data) {
			const dataObj = {};

			data?.images?.data?.map((category) => {
				const { name, url, isDeleted } = category?.attributes;
				dataObj[`${name}_${category?.id}`] = {
					url,
					name,
					isDeleted,
					id: category?.id,
				};
			});

			dispatch(setUserImages(dataObj));
		},

		onError(err) {
			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [getUserFonts] = useLazyQuery(GET_USER_FONTS, {
		async onCompleted(data) {
			const fontObj = {};

			data?.fonts?.data?.map(async (item) => {
				let fontClass = item.attributes.name.split(".")[0];
				fontClass = fontClass.split(" ").join("");

				const newFont = new FontFace(
					// item.attributes.name.split("-")[0],
					fontClass,
					`url(${item.attributes.url})`
				);

				const allGlyphs = await GET_GLYPHS(item.attributes.url);

				await newFont.load();

				document.fonts.add(newFont);

				let fontName = item.attributes.name.split(".")[0];

				try {
					document.body.classList.add(fontClass);
				} catch (error) {
					console.error({ error });
				}

				fontObj[fontName] = {
					fontFace: newFont,
					fontClass,
					fontFamily: newFont.family,
					url: item.attributes.url,
					isDeleted: item.attributes.isDeleted,
					id: item.id,
					fontGlyphs: allGlyphs,
					name: fontName,
				};
			});

			dispatch(setUserFonts(fontObj));
		},

		onError(err) {
			console.error(err.message);

			console.error(err);
			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [getElements] = useLazyQuery(GET_USER_ELEMENTS, {
		onCompleted(data) {
			const dataObj = {};

			data?.elements?.data?.map((category) => {
				const { name, url, isDeleted } = category?.attributes;
				dataObj[`${name}_${category?.id}`] = {
					url,
					name,
					isDeleted,
					id: category?.id,
				};
			});

			dispatch(setUserElements(dataObj));
		},

		onError(err) {
			console.error(err.message, err.clientErrors);

			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [getDefaultElements] = useLazyQuery(GET_DEFAULT_ELEMENTS, {
		onCompleted(data) {
			const dataObj = {};

			data?.defaultElement?.data?.attributes?.element?.map((element) => {
				const id = element.id;
				const { url, name } = element.element.data.attributes;

				dataObj[`${name}_${id}`] = {
					name,
					id,
					url,
					default: true,
				};
			});

			dispatch(addElementBlob({ elements: dataObj }));
		},

		onError(err) {
			console.error(err.message);
			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [getTemplates] = useLazyQuery(GET_TEMPLATES, {
		onCompleted(data) {
			let templates = {};

			data?.templates?.data?.map((template) => {
				templates[`${template.attributes.name}_${template.id}`] = {
					name: template?.attributes?.name,
					height: template?.attributes?.height,
					width: template?.attributes?.width,
					template: template?.attributes?.template,
					unit: template?.attributes?.unit,
					zoomValue: template?.attributes?.zoomValue,
					canvasAttrs: template?.attributes?.canvasAttrs,
					demoId: template?.attributes?.demoId,
					id: template?.id,
					category: {
						name: template?.attributes?.category?.data?.attributes?.name,
						id: template?.attributes?.category?.data?.id,
					},
					image: {
						name: template?.attributes?.image?.data?.attributes?.name,
						url: template?.attributes?.image?.data?.attributes?.url,
						height: template?.attributes?.image?.data?.attributes?.height,
						width: template?.attributes?.image?.data?.attributes?.width,
						id: template?.attributes?.image?.data?.id,
					},
				};
			});

			dispatch(setUserTemplates(templates));
		},

		onError(err) {
			console.error(err.message);
			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	const [getGroupTemplates] = useLazyQuery(GET_GROUP_TEMPLATES, {
		onCompleted(data) {
			let groupTemplates = {};
			const allTemplates = data?.groupTemplates?.data;

			allTemplates.map((grpTemplate) => {
				let templates = {};

				const allGrpTemplates = grpTemplate?.attributes?.templates?.data;
				allGrpTemplates.map((template) => {
					templates[`${template.attributes.name}_${template.id}`] = {
						name: template?.attributes?.name,
						height: template?.attributes?.height,
						width: template?.attributes?.width,
						template: template?.attributes?.template,
						unit: template?.attributes?.unit,
						zoomValue: template?.attributes?.zoomValue,
						canvasAttrs: template?.attributes?.canvasAttrs,
						demoId: template?.attributes?.demoId,
						id: template?.id,
						category: {
							name: template?.attributes?.category?.data?.attributes?.name,
							id: template?.attributes?.category?.data?.id,
						},
						image: {
							name: template?.attributes?.image?.data?.attributes?.name,
							url: template?.attributes?.image?.data?.attributes?.url,
							height: template?.attributes?.image?.data?.attributes?.height,
							width: template?.attributes?.image?.data?.attributes?.width,
							id: template?.attributes?.image?.data?.id,
						},
					};
				});

				groupTemplates = {
					...groupTemplates,
					[`group-${grpTemplate.id}`]: {
						id: grpTemplate.id,
						demoLink: grpTemplate.attributes?.demoLink,
						name: grpTemplate.attributes?.name,
						templates: { ...templates },
					},
				};
			});

			dispatch(setGroupTemplates(groupTemplates));
		},
		onError(err) {
			console.error(err);
		},
	});

	const [updateSubscriptionInfo] = useMutation(UPDATE_CARD_INFO, {
		onCompleted(data) {
			dispatch(
				verifyUser({ ...data.updateUsersPermissionsUser?.data?.attributes })
			);
		},

		onError(err) {
			console.error(err);
			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	useEffect(() => {
		let allItems = [...sideMenuItems];

		if (props?.user?.isAdmin) {
			allItems = [...sideMenuItems]?.filter(
				(item) =>
					item.name === "category" ||
					item?.name === "bkground" ||
					item?.name === "photos" ||
					item?.name === "text" ||
					item?.name === "elements"
			);
		} else {
			allItems = [...sideMenuItems]?.filter(
				(item) => item?.name !== "category"
			);
		}

		setSidePanelMenu(allItems);
		dispatch(disableSideBar());
		if (!_.isNil(location.state) && location.state.hideSidePanel) {
			setHideSidePanel(true);
		} else {
			setHideSidePanel(false);
		}
	}, [location]);

	useEffect(() => {
		getCategories({ variables: { email: props.user.email } });
		getImages({ variables: { email: props.user.email } });
		getUserFonts({ variables: { email: props.user.email } });
		getElements({ variables: { email: props.user.email } });
		getTemplates({ variables: { email: props.user.email } });
		getDefaultElements();

		// if (props.user?.isAdmin) {
		getMainCategory();
		getSubCategory();
		getPredefinedTemplates();
		// }
	}, []);

	useEffect(() => {
		if (!_.isEmpty(props.templates))
			getGroupTemplates({ variables: { email: props.user.email } });
	}, [props.templates]);

	useEffect(() => {
		handleSubscriptionEnd();
		handleTrialEnd();
		handlePaypalCycle();
	}, [props.user]);

	const handleSubscriptionEnd = () => {
		const subscriptionEnd = props.user.subscriptionEnd;

		const subscriptionEndDate =
			new Date(props?.user?.subscriptionEndDate).getTime() / 1000 || 0;

		if (
			subscriptionEnd &&
			subscriptionEndDate &&
			subscriptionEndDate < new Date().getTime() / 1000
		) {
			updateSubscriptionInfo({
				variables: {
					id: props.user.id,
					subscribed: false,
					onTrial: false,
					subscriptionId: "",
					cardNumber: "",
					trialEndDate:
						moment(subscriptionEndDate).format("YYYY-MM-DDTHH:mm:ss") + "Z",
					nameOnCard: "",
					subscriptionEndDate:
						moment(subscriptionEndDate).format("YYYY-MM-DDTHH:mm:ss") + "Z",
					subscriptionEnd: false,
					paypalSubscriptionId: "",
					paypalMonthCycleEnd: "",
				},
			});
		}
	};

	const handleTrialEnd = () => {
		const onTrial = props.user.onTrial;
		const trialEndDate = parseInt(
			new Date(props?.user?.trialEndDate).getTime() / 1000 || 0
		);

		if (onTrial && trialEndDate && trialEndDate < new Date().getTime() / 1000) {
			updateSubscriptionInfo({
				variables: {
					id: props.user.id,
					onTrial: false,
					trialEndDate: new Date(trialEndDate),
				},
			});
		}
	};

	const handlePaypalCycle = () => {
		const paypalMonthCycleEnd = parseInt(props?.user?.paypalMonthCycleEnd);

		if (
			paypalMonthCycleEnd &&
			paypalMonthCycleEnd < new Date().getTime() / 1000 &&
			props.user.subscriptionEnd === false &&
			props.user.subscribed === true
		) {
			let newCycle = moment(paypalMonthCycleEnd * 1000)
				.add(1, "month")
				.format();

			newCycle = (new Date(newCycle).getTime() / 1000).toFixed();

			updateSubscriptionInfo({
				variables: {
					id: props.user.id,
					paypalMonthCycleEnd: newCycle,
				},
			});
		}
	};

	const handleEnableSidebar = (element) => {
		if (element === props.layout.sideBarElement) {
			handleDisableSidebar();
		} else {
			if (
				location.pathname === ROUTES.SELECT_TEMPLATE &&
				element !== "template" &&
				element !== "group templates" &&
				element !== "pre-define templates"
			) {
				// disable
				props.layout.sideBar && handleDisableSidebar();
			} else dispatch(enableSideBar({ sideBarElement: element }));
		}
	};

	const handleSaveTemplate = () => {
		dispatch(saveTemplateAction(true));
	};

	const handleDownloadTemplate = () => {
		dispatch(downloadTemplateAction(true));
	};

	const handleDisableSidebar = () => {
		dispatch(disableSideBar());
	};

	const handleLogout = () => {
		dispatch(userLogout());
		localStorage.removeItem("token");
		history.push(ROUTES.LOGIN);
	};

	const params = matchPath(location.pathname, {
		path: ROUTES.EDIT_TEMPLATE,
	});

	const adminTemplateUpdate = matchPath(location.pathname, {
		path: ROUTES.ADMIN_TEMPLATE_UPDATE,
	});

	console.log({ adminTemplateUpdate });

	console.log({ props });

	return (
		<>
			<header
				className={`${css(styles.header)}`}
				// onClick={handleDisableSidebar}
			>
				<div className={`d-flex ${css(styles.leftArea)}`}>
					{props.children.props.hasBack && (
						<span
							onClick={() => history.goBack()}
							className={`cursor-pointer d-flex align-items-center justify-content-center ${css(
								styles.menuLi
							)} ${css(styles.backBtn)}`}
						>
							<i className={`fa fa-chevron-left ${css(styles.backIcon)}`} />{" "}
							Back
						</span>
					)}
					<ul className={`d-flex`}>
						{(location.pathname === ROUTES.SETTINGS ||
							location.pathname === ROUTES.SETTINGS_PASSWORD ||
							// location.pathname === ROUTES.ANALYTICS ||
							location.pathname === ROUTES.SETTINGS_SUBSCRIBTION) && (
							<li className={`d-inline-flex`}>
								<span
									className={`${css(styles.menuLi)} ${css(styles.menuItem)}`}
								>
									Settings
								</span>
							</li>
						)}
						{location.pathname !== ROUTES.SETTINGS &&
							location.pathname !== ROUTES.SETTINGS_PASSWORD &&
							// location.pathname !== ROUTES.ANALYTICS &&
							location.pathname !== ROUTES.SETTINGS_SUBSCRIBTION && (
								<>
									<li className={`d-inline-flex`}>
										<NavLink
											to={
												props?.user?.isAdmin !== true
													? ROUTES.DASHBOARD
													: ROUTES.SELECT_CATEGORIES
											}
											className={` ${css(styles.menuLi)} ${css(
												styles.menuItem
											)}`}
										>
											{strings.HOME}
										</NavLink>
									</li>

									{(location.pathname === ROUTES.DASHBOARD_CREATE ||
										location.pathname === ROUTES.ADMIN_TEMPLATE_CREATE ||
										params?.path === ROUTES.EDIT_TEMPLATE ||
										adminTemplateUpdate?.path ===
											ROUTES.ADMIN_TEMPLATE_UPDATE) && (
										<li
											className={`d-inline-flex`}
											style={{ marginleft: "1vw" }}
										>
											<Dropdown className={`d-inline ${css(styles.menuLi)}`}>
												<Dropdown.Toggle
													id="dropdown-autoclose-true"
													variant="transparent"
													className={`d-flex p-0 align-items-center`}
												>
													<span className={`${css(styles.menuItem)}`}>
														File
													</span>
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item
														href="#"
														style={{ outline: "none" }}
														onClick={handleSaveTemplate}
													>
														Save Template
													</Dropdown.Item>
													<Dropdown.Item
														href="#"
														style={{ outline: "none" }}
														onClick={handleDownloadTemplate}
													>
														Download
													</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										</li>
									)}
								</>
							)}
					</ul>
				</div>
				<div
					className={`d-flex align-items-center justify-content-center ${css(
						styles.centerArea
					)}`}
				>
					<h1 className={`${css(styles.AuthTitle)} font-pacifico`}>
						<NavLink
							to={ROUTES.DASHBOARD}
							className={`font-pacifico ${css(styles.logoLink)}`}
						>
							{strings.TEMPLIFIC}
						</NavLink>
					</h1>
				</div>
				<div
					className={`d-flex align-items-center justify-content-end ${css(
						styles.rightArea
					)}`}
				>
					{(ROUTES.ADMIN_TEMPLATE_CREATE === location.pathname ||
						adminTemplateUpdate?.path === ROUTES.ADMIN_TEMPLATE_UPDATE) && (
						<Button
							title={`Edit Category`}
							className={`${css([
								styles.templateBtn,
								styles.editCategoryButton,
							])}`}
							leftIcon
							onClick={() => dispatch(triggerOpenCategoryModal())}
						>
							<i className={`fa fa-plus ${css(styles.plusBtn)}`} />
						</Button>
					)}

					{props?.user?.isAdmin !== true && (
						<Button
							title={`New Template`}
							className={`${css(styles.templateBtn)}`}
							leftIcon
							onClick={() => history.push(ROUTES.SELECT_TEMPLATE)}
						>
							<i className={`fa fa-plus ${css(styles.plusBtn)}`} />
						</Button>
					)}

					<Dropdown className="d-inline">
						<OverlayTrigger
							overlay={
								<Tooltip style={{ fontSize: ".8vw" }}>
									{props?.user?.email}
								</Tooltip>
							}
							placement={"left"}
						>
							{({ ref, ...triggerHandler }) => (
								<Dropdown.Toggle
									id="dropdown-autoclose-true"
									variant="transparent"
									className={`d-flex p-0 align-items-center`}
									{...triggerHandler}
								>
									<span className={`${css(styles.profileNick)}`} ref={ref}>
										{props?.user?.email?.charAt(0)}
									</span>
								</Dropdown.Toggle>
							)}
						</OverlayTrigger>

						<Dropdown.Menu>
							{props?.user?.isAdmin !== true && (
								<Dropdown.Item
									onClick={() => history.push(ROUTES.CONNECT)}
									style={{ outline: "none" }}
								>
									<i
										className={`fa fa-plus font-weight-light`}
										style={{ marginRight: "0.4vw" }}
									/>
									Add Manage Shop
								</Dropdown.Item>
							)}
							<Dropdown.Item onClick={handleLogout} style={{ outline: "none" }}>
								Logout
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</header>
			<section
				className={`${css(styles.section)}`}
				style={{ gridTemplateColumns: !hideSidePanel ? "6vw auto" : "auto" }}
			>
				{!hideSidePanel && sidePanelMenu?.length > 0 && (
					<div className={`h-100 ${css(styles.sidePanel)}`}>
						<ul
							className={`h-100 d-flex flex-column ${
								darkSidePanel ? "darkPanel " + css(styles.darkSidePanel) : ""
							} ${css(styles.sideMenu)}`}
						>
							{sidePanelMenu.map((res, idx) => {
								return (
									<li
										className={`cursor-pointer d-flex flex-column align-items-center ${
											!_.isNil(res.bottomAlign)
												? `flex-grow-1 justify-content-end ` +
												  css(styles.lastItem)
												: css(styles.sideMenuItem)
										}`}
										key={res.name}
										onMouseOver={() => {
											if (res.name === "category") setToggleCategoryImage(true);
										}}
										onMouseOut={() => {
											if (res.name === "category")
												setToggleCategoryImage(false);
										}}
									>
										{res && res.link ? (
											<NavLink
												to={res.link}
												className={`menu-link ${res.name} ${
													location.pathname == res.link
														? css(styles.activelink)
														: ""
												} ${css(styles.menuLink)}`}
											>
												{res.name !== "category" && (
													<SVG
														width="auto"
														height="auto"
														src={res.image}
														title={res.name}
														fill={location.pathname == res.link ? "filled" : ""}
														className={`${css(styles.menuImage)}`}
													/>
												)}

												{res.name === "category" && (
													<img
														src={
															props?.children?.props?.darkSidePanel
																? res.image
																: toggleCategoryImage
																? res.image
																: res.imageAlternate
														}
														className={`${css(styles.menuImage)}`}
														onMouseOver={() => setToggleCategoryImage(true)}
														onMouseOut={() => setToggleCategoryImage(false)}
													/>
												)}

												{_.isNil(res.bottomAlign) && (
													<span
														className={`${css(styles.menuName)}`}
														style={{
															color:
																location.pathname == res.link
																	? Colors.white
																	: Colors.themeColor,
														}}
													>
														{res.name}
													</span>
												)}
											</NavLink>
										) : (
											<>
												{res.name !== "template" &&
													res.name !== "group templates" &&
													res.name !== "pre-define templates" &&
													(location.pathname === ROUTES.DASHBOARD_CREATE ||
														location.pathname ===
															ROUTES.ADMIN_TEMPLATE_CREATE ||
														params?.path === ROUTES.EDIT_TEMPLATE ||
														adminTemplateUpdate?.path ===
															ROUTES.ADMIN_TEMPLATE_UPDATE) && (
														<div
															className={`menu-link ${res.name} ${
																res.name === props.layout.sideBarElement &&
																css(styles.activelink)
															} ${css(styles.menuLink)}`}
															onClick={() => handleEnableSidebar(res.name)}
														>
															<SVG
																width="auto"
																height="auto"
																src={
																	"bkground" === props.layout.sideBarElement
																		? res.imageAlternate
																		: res.image
																}
																title={res.name}
																fill={
																	res.name === props.layout.sideBarElement
																		? "filled"
																		: ""
																}
																className={`${css(styles.menuImage)}`}
															/>

															{_.isNil(res.bottomAlign) && (
																<span
																	className={`${css(styles.menuName)}`}
																	style={{
																		color:
																			res.name === props.layout.sideBarElement
																				? Colors.white
																				: Colors.themeColor,
																	}}
																>
																	{res.name}
																</span>
															)}
														</div>
													)}

												{(res.name === "template" ||
													res.name === "group templates" ||
													res.name === "pre-define templates") && (
													<div
														className={`menu-link template ${
															res.name === props.layout.sideBarElement &&
															css(styles.activelink) + " template_active"
														} ${
															res.name === "group templates" && "groupTemplate"
														}  ${css(styles.menuLink)}`}
														onClick={() => handleEnableSidebar(res.name)}
														onMouseOver={() => {
															if (res.name === "pre-define templates")
																setTogglePreDefineImage(true);
														}}
														onMouseOut={() => {
															if (res.name === "pre-define templates")
																setTogglePreDefineImage(false);
														}}
													>
														{res.name === "pre-define templates" && (
															<img
																src={
																	props?.children?.props?.darkSidePanel
																		? res.image
																		: res.name === props.layout.sideBarElement
																		? res.image
																		: togglePreDefineImage
																		? res.image
																		: res.imageAlternate
																}
																className={`${css(styles.menuImage)}`}
															/>
														)}

														{res.name !== "pre-define templates" && (
															<SVG
																width="auto"
																height="auto"
																src={res.image}
																title={res.name}
																fill={
																	res.name === props.layout.sideBarElement
																		? "filled"
																		: ""
																}
																className={`${css(styles.menuImage)}`}
															/>
														)}

														{_.isNil(res.bottomAlign) && (
															<span
																className={`${css(styles.menuName)}`}
																style={{
																	color:
																		res.name === props.layout.sideBarElement
																			? Colors.white
																			: Colors.themeColor,
																}}
															>
																{res.name}
															</span>
														)}
													</div>
												)}
											</>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				)}
				<div
					className={`h-100 inner-main position-relative ${css(
						styles.innerMain
					)}`}
				>
					{props.children}
				</div>

				<ModalView
					showModal={props.layout.logoutModal}
					title={"Session Expired"}
					submitText={`ok`}
					submitOnClick={handleLogout}
					backdrop={"static"}
				>
					<span className={`${css(styles.modalText)}`}>
						Your session has been expired kindly login again to continue
					</span>
				</ModalView>
			</section>
		</>
	);
};

const mapStateToProps = ({ user, layout, canvasData }) => ({
	layout,
	user,
	groupTemplates: canvasData.groupTemplates,
	templates: canvasData.templates,
});

export default connect(mapStateToProps)(DashboardLayout);
