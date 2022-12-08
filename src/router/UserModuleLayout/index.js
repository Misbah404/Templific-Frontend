import { css } from "aphrodite";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ROUTES, strings } from "../../constants";
import { Colors } from "../../theme";
import styles from "./styles";
import SVG from "react-inlinesvg";
import { useLocation, matchPath } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import {
	disableSideBar,
	enableSideBar,
	logoutModal,
} from "../../actions/LayoutAction";
import { useLazyQuery } from "@apollo/client";
import { GET_DEFAULT_ELEMENTS } from "../../graphQueries";
import {
	downloadTemplateAction,
	addElementBlob,
} from "../../actions/CanvasDataAction";
import { userLogout } from "../../actions/AuthActions";

const UserModuleLayout = (props) => {
	let history = useHistory();
	const dispatch = useDispatch();

	const { sideMenuItems, darkSidePanel } = props.children.props;
	const [sidePanelMenu, setSidePanelMenu] = useState([]);
	const location = useLocation();
	const [hideSidePanel, setHideSidePanel] = useState(() => false);

	const [getDefaultElements] = useLazyQuery(GET_DEFAULT_ELEMENTS, {
		onCompleted(data) {
			const dataObj = {};

			data.defaultElement?.data?.attributes?.element?.map((element) => {
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

	useEffect(() => {
		const allItems = [...sideMenuItems]?.filter(
			(item) => item.name !== "stats" && item?.name !== "category"
		);

		setSidePanelMenu([...allItems]);
		dispatch(disableSideBar());
		if (!_.isNil(location.state) && location.state.hideSidePanel) {
			setHideSidePanel(true);
		} else {
			setHideSidePanel(false);
		}
	}, [location]);

	useEffect(() => {
		getDefaultElements();
	}, []);

	const handleEnableSidebar = (element) => {
		if (element === props.layout.sideBarElement) {
			handleDisableSidebar();
		} else {
			if (
				location.pathname === ROUTES.SELECT_TEMPLATE &&
				element !== "template"
			) {
				// disable
				props.layout.sideBar && handleDisableSidebar();
			} else dispatch(enableSideBar({ sideBarElement: element }));
		}
	};

	const handleDownloadTemplate = () => {
		dispatch(downloadTemplateAction(true));
	};

	const handleDisableSidebar = () => {
		dispatch(disableSideBar());
	};

	const params = matchPath(location.pathname, {
		path: ROUTES.TEMPLATE_TRANSACTION,
	});

	return (
		<>
			<header
				className={`${css(styles.header)}`}
				// onClick={handleDisableSidebar}
			>
				<div className={`d-flex ${css(styles.leftArea)}`}>
					{props.children.props.hasBack && (
						<span
							onClick={() => history.push(ROUTES.DASHBOARD)}
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
							location.pathname === ROUTES.SETTINGS_SUBSCRIBTION) && (
							<li className={`d-inline-flex`}>
								<span
									className={` ${css(styles.menuLi)} ${css(styles.menuItem)}`}
								>
									Settings
								</span>
							</li>
						)}
						{location.pathname !== ROUTES.SETTINGS &&
							location.pathname !== ROUTES.SETTINGS_PASSWORD &&
							location.pathname !== ROUTES.SETTINGS_SUBSCRIBTION && (
								<>
									{params?.path === ROUTES.TEMPLATE_TRANSACTION && (
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
						{strings.TEMPLIFIC}
					</h1>
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
									>
										{res &&
										res.link &&
										res.name !== "stats" &&
										res?.name !== "category" ? (
											<NavLink
												to={res.link}
												className={`menu-link ${res.name} ${
													location.pathname == res.link
														? css(styles.activelink)
														: ""
												} ${css(styles.menuLink)}`}
											>
												<SVG
													width="auto"
													height="auto"
													src={res.image}
													title={res.name}
													fill={location.pathname == res.link ? "filled" : ""}
													className={`${css(styles.menuImage)}`}
												/>
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
												{res.name !== "template" && res.name !== "stats" && (
													<div
														className={`menu-link template ${res.name} ${
															res.name === props.layout.sideBarElement &&
															css(styles.activelink)
														} ${
															res.name === "group templates" && "groupTemplate"
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
			</section>
		</>
	);
};

const mapStateToProps = (state) => ({
	layout: state.layout,
	user: state.user,
});

export default connect(mapStateToProps)(UserModuleLayout);
