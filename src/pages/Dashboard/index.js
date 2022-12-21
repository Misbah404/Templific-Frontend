import React, { useEffect, useState } from "react";
import { css } from "aphrodite";
import { connect, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory, Redirect } from "react-router-dom";
import { TextField, Button, Templific_Toast } from "../../components";
import { ROUTES, strings } from "../../constants";
import styles from "./styles";
import { Images } from "../../theme";
import _ from "lodash";

const Dashboard = (props) => {
	const dispatch = useDispatch();
	const [showToast, setShowToast] = useState(false);
	const history = useHistory();
	const query = new URLSearchParams(useLocation().search);
	const connected = query.get("connected");

	return <Redirect to={ROUTES.USER_MAIN_CATEGORY} />;

	return (
		<>
			{showToast && (
				<Templific_Toast toastTitle="Your etsy store is now connected!" />
			)}

			<div
				className={`${css(
					styles.main
				)} d-flex flex-column align-items-center justify-content-center`}
			>
				<img src={Images.firstDesign} className={`${css(styles.emptyImage)}`} />
				<h2 className={`${css(styles.mainHeading)} font-weight-bold`}>
					Your first design is going to be amazing
				</h2>
				<Button
					title={`Create Template`}
					className={`${css(styles.connectBtn)}`}
					leftIcon
					onClick={() => history.push(ROUTES.SELECT_TEMPLATE)}
				>
					<i className={`fa fa-plus ${css(styles.plusBtn)}`} />
				</Button>
			</div>
		</>
	);
};

const mapStateToProps = ({ user, canvasData }) => ({ user, canvasData });

const actions = {};

export default connect(mapStateToProps, actions)(Dashboard);
