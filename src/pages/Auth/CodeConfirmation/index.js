import React, { useEffect, useState } from "react";
import { css } from "aphrodite";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { ROUTES, strings } from "../../../constants";
import styles from "./styles";
import { CodeInput } from "../../../components";
import { Images } from "../../../theme";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import { generateOtp } from "../../../services/userHelper";

const CodeConfirmation = (props) => {
	const { email, accessToken } = props.user;
	console.log({ user: props.user });
	const location = useLocation();
	const history = useHistory();
	const [otp, setOtp] = useState(() => "");
	const [pass, setPass] = useState(() => "");
	const [topIcon, setTopIcon] = useState(() => Images.sendMail);
	const [heading, setHeading] = useState(() => "Check Your Email");
	const [redirectLink, setRedirectLink] = useState(() => ROUTES.PAYMENT);
	const [wrongEmailLink, setWrongEmailLink] = useState(() => ROUTES.SIGNUP);

	useEffect(() => {
		if (!_.isNil(location.state) && location.state.forgotCode) {
			setTopIcon(Images.verifyEmail);
			setHeading("Verify Email");
			setRedirectLink(ROUTES.NEW_PASSWORD);
			setWrongEmailLink(ROUTES.FORGOT_PASSWORD);
		}

		if (_.isNil(location.state) || _.isNil(location.state.email)) {
			history.replace(ROUTES.HOME);
		} else {
			generateOtp(location.state.email, () => {});
		}
	}, []);

	return (
		<div className={`d-flex align-items-center flex-column`}>
			<img src={topIcon} className={css(styles.sendMailIcon)} />
			<h2 className={`${css(styles.formHeading)}`}>{heading}</h2>
			<p className={`${css(styles.EnterCodeTagLine)}`}>
				Please enter the 4 digits code
			</p>
			<CodeInput link={redirectLink} email={location.state.email} />
			<NavLink
				to={wrongEmailLink}
				className={`${css(styles.EnterCodeTagLine)} ${css(
					styles.wrongEmail
				)} font-weight-bold text-center`}
			>
				{strings.WRONG_EMAIL}
			</NavLink>
		</div>
	);
};

const mapStateToProps = ({ user }) => ({ user });

const actions = {};

export default connect(mapStateToProps, actions)(CodeConfirmation);
