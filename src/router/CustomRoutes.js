import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_USER_INITIAL_DATA } from "../graphQueries";
import jwt_decode from "jwt-decode";
import UserModuleLayout from "./UserModuleLayout";
import AuthLayout from "./AuthLayout";
import DashboardLayout from "./DashboardLayout";
import _ from "lodash";

import {
	ROUTES,
	settingMenuItems,
	homeMenuItems,
	settingInnerMenu,
} from "../constants";
import {
	Login,
	Signup,
	CodeConfirmation,
	ForgotPassword,
	NewPassword,
	Payment,
	PageNotFound,
	Connect,
	Dashboard,
	DashboardCreate,
	Settings,
	SettingsSubscribtion,
	SettingsPassword,
	SelectTemplate,
	EtsyAuthentication,
	PrivacyPolicy,
	TermsOfUse,
	LoadGroupTemplates,
	Analytics,
	SelectCategories,
	SelectSubCategory,
	CategoryTemplate,
	SelectAdminTemplate,
} from "../pages";

import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyUser } from "../actions/AuthActions";
import { logoutModal } from "../actions/LayoutAction";

const NoAuthRoute = ({ ...props }) => {
	if (!_.isEmpty(props?.user?.accessToken) && props?.user?.verified) {
		if (!props.user.subscribed && props.path === ROUTES.PAYMENT) {
			return (
				<AuthLayout paymentPage={props.paymentPage}>
					<Route {...props} />
				</AuthLayout>
			);
		} else if (
			props.path === ROUTES.TERMS_OF_USE ||
			props.path === ROUTES.PRIVACY_POLICY
		) {
			return (
				<AuthLayout paymentPage={props.paymentPage}>
					<Route {...props} />
				</AuthLayout>
			);
		} else return <Redirect to={ROUTES.DASHBOARD} />;
	}

	return (
		<AuthLayout paymentPage={props.paymentPage}>
			<Route {...props} />
		</AuthLayout>
	);
};

const UserModule = ({ ...props }) => {
	return (
		<UserModuleLayout>
			<Route {...props} />
		</UserModuleLayout>
	);
};

const AuthRoute = ({ ...props }) => {
	if (_.isEmpty(props?.user?.accessToken)) {
		return <Redirect to={ROUTES.LOGIN} />;
	}

	if (!props?.user?.verified && !_.isEmpty(props?.user?.accessToken)) {
		return <Redirect to={ROUTES.CODE_CONFIRMATION} />;
	}

	if (props.user.accountSuspended && props.path === ROUTES.DASHBOARD_CREATE) {
		return <Redirect to={ROUTES.SELECT_TEMPLATE} />;
	}

	if (props.path === ROUTES.DASHBOARD_CREATE) {
		if (!props.user.subscribed) {
			return <Redirect to={ROUTES.PAYMENT} />;
		}
	}

	return (
		<DashboardLayout>
			<Route {...props} />
		</DashboardLayout>
	);
};

function CustomRoutes(props) {
	const { user } = props;

	const dispatch = useDispatch();
	const repeatedProps = {
		user,
		paymentPage: false,
		exact: true,
		forAdminOnly: false,
	};

	const [getInitialData] = useLazyQuery(GET_USER_INITIAL_DATA, {
		onCompleted(data) {
			const obj = {
				...data?.usersPermissionsUser?.data?.attributes,
				id: data?.usersPermissionsUser?.data?.id,
				userAuthenticated: true,
				accessToken: localStorage.getItem("token") || "",
			};

			dispatch(verifyUser(obj));
		},

		onError(err) {
			console.error(err.message);
			if (err.message.includes("Received status code 401")) {
				dispatch(logoutModal({ data: true }));
			}
		},
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token && !_.isNil(token)) {
			const decodedToken = jwt_decode(token);
			let expiryDuration = decodedToken.exp - new Date().getTime() / 1000;

			if (expiryDuration > 1) {
				getInitialData({ variables: { id: decodedToken.id } });
			}
		}
	}, []);

	return (
		<Switch>
			{/* Non Logged In users routes are below */}
			<NoAuthRoute path={ROUTES.HOME} component={Login} {...repeatedProps} />

			<NoAuthRoute path={ROUTES.LOGIN} component={Login} {...repeatedProps} />

			<NoAuthRoute path={ROUTES.SIGNUP} component={Signup} {...repeatedProps} />

			<NoAuthRoute
				path={ROUTES.CODE_CONFIRMATION}
				component={CodeConfirmation}
				{...repeatedProps}
			/>

			<NoAuthRoute
				path={ROUTES.FORGOT_PASSWORD}
				component={ForgotPassword}
				{...repeatedProps}
			/>

			<NoAuthRoute
				path={ROUTES.PRIVACY_POLICY}
				component={PrivacyPolicy}
				{...repeatedProps}
			/>

			<NoAuthRoute
				path={ROUTES.TERMS_OF_USE}
				component={TermsOfUse}
				{...repeatedProps}
			/>

			<NoAuthRoute
				path={ROUTES.NEW_PASSWORD}
				component={NewPassword}
				{...repeatedProps}
			/>

			<NoAuthRoute
				path={ROUTES.PAYMENT}
				component={Payment}
				{...repeatedProps}
				paymentPage={true}
			/>

			{/* Loged in users Routes are below */}
			<AuthRoute
				path={ROUTES.CONNECT}
				component={Connect}
				hasBack={false}
				sideMenuItems={settingMenuItems}
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.DASHBOARD}
				component={Dashboard}
				hasBack={false}
				sideMenuItems={settingMenuItems}
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.DASHBOARD_CREATE}
				component={DashboardCreate}
				hasBack={false}
				sideMenuItems={[...homeMenuItems, ...settingMenuItems]}
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.ADMIN_TEMPLATE_UPDATE}
				component={DashboardCreate}
				hasBack={false}
				sideMenuItems={[...homeMenuItems, ...settingMenuItems]}
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.ADMIN_TEMPLATE_CREATE}
				component={DashboardCreate}
				hasBack={false}
				sideMenuItems={[...homeMenuItems, ...settingMenuItems]}
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.EDIT_TEMPLATE}
				component={DashboardCreate}
				hasBack={false}
				sideMenuItems={[...homeMenuItems, ...settingMenuItems]}
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.SELECT_ADMIN_TEMPLATE}
				component={SelectAdminTemplate}
				hasBack={true}
				sideMenuItems={[...homeMenuItems, ...settingMenuItems]}
				darkSidePanel
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.SETTINGS}
				component={Settings}
				hasBack={true}
				sideMenuItems={settingInnerMenu}
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.SETTINGS_SUBSCRIBTION}
				component={SettingsSubscribtion}
				hasBack={true}
				sideMenuItems={settingInnerMenu}
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.SETTINGS_PASSWORD}
				component={SettingsPassword}
				hasBack={true}
				sideMenuItems={settingInnerMenu}
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.ANALYTICS}
				component={Analytics}
				sideMenuItems={[...homeMenuItems, ...settingMenuItems]}
				darkSidePanel
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.SELECT_TEMPLATE}
				component={SelectTemplate}
				sideMenuItems={[...homeMenuItems, ...settingMenuItems]}
				darkSidePanel
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.SELECT_CATEGORIES}
				component={SelectCategories}
				sideMenuItems={[...homeMenuItems, ...settingMenuItems]}
				darkSidePanel
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.SELECT_SUB_CATEGORIES}
				component={SelectSubCategory}
				sideMenuItems={[...homeMenuItems, ...settingMenuItems]}
				darkSidePanel
				hasBack
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.CATEGORY_TEMPLATE}
				component={CategoryTemplate}
				sideMenuItems={[...homeMenuItems, ...settingMenuItems]}
				darkSidePanel
				hasBack
				{...repeatedProps}
			/>

			<AuthRoute
				path={ROUTES.ETSY_AUTH}
				component={EtsyAuthentication}
				{...repeatedProps}
			/>

			<UserModule
				path={ROUTES.TEMPLATE_DEMO}
				component={DashboardCreate}
				sideMenuItems={[...homeMenuItems]}
			/>

			<UserModule
				path={ROUTES.TEMPLATE_TRANSACTION}
				component={DashboardCreate}
				sideMenuItems={[...homeMenuItems]}
			/>

			<UserModule
				path={ROUTES.TEMPLATE_GROUP_DEMO}
				component={LoadGroupTemplates}
				sideMenuItems={[...homeMenuItems]}
			/>

			<UserModule
				path={ROUTES.TEMPLATE_GROUP_TRANSACTION}
				component={LoadGroupTemplates}
				sideMenuItems={[...homeMenuItems]}
			/>
			{/* Keep this in last always */}
			<NoAuthRoute path={Route.PAGE_NOT_FOUND} component={PageNotFound} />
		</Switch>
	);
}

export default CustomRoutes;
