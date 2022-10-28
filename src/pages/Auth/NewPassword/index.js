import React, { useEffect, useState } from "react";
import { css } from "aphrodite";
import { connect } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { TextField, Button } from "../../../components";
import _ from "lodash";
import Util from "../../../services/Util";
import {
  CONFRIM_PASSWORD_MISMATCH_ERROR,
  INVALID_PASSWORD,
  ROUTES,
  strings,
} from "../../../constants";
import styles from "./styles";
import { updateForgotPassword } from "../../../services/userHelper";

const NewPassword = (props) => {
  // const [email, setEmail] = useState(() => '');
  const [pass, setPass] = useState(() => "");
  const [confirmPass, setConfirmPass] = useState(() => "");
  const history = useHistory();
  const location = useLocation();

  const [errors, setErrors] = useState({
    pass: null,
    confirmPass: null,
  });

  useEffect(() => {
    if (
      _.isNil(location.state) ||
      _.isEmpty(location.state) ||
      _.isNil(location.state.code) ||
      _.isNil(location.state.email)
    ) {
      history.replace(ROUTES.HOME);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === strings.PASSWORD) {
      setPass(e.target.value);
    }
    if (e.target.name === strings.CONFIRM_PASSWORD) {
      setConfirmPass(e.target.value);
    }
  };

  const _validateForm = () => {
    const errors = {};

    if (_.isNil(pass) || _.isEmpty(pass)) {
      // email is required
      errors.pass = Util.isRequiredErrorMessage("Password");
    }

    if (!_.isEmpty(pass) && !Util.isPasswordValid(pass)) {
      // invalid password
      errors.pass = INVALID_PASSWORD;
    }

    if (_.isNil(confirmPass) || _.isEmpty(confirmPass)) {
      // email is required
      errors.confirmPass = Util.isRequiredErrorMessage("Confirm Password");
    }

    if (!_.isEmpty(confirmPass) && pass?.trim() !== confirmPass?.trim()) {
      errors.confirmPass = CONFRIM_PASSWORD_MISMATCH_ERROR;
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (_validateForm()) {
      // dispatch(userSignUpRequest(payload));
      updateForgotPassword(
        location.state.email,
        location.state.code,
        pass,
        confirmPass,

        (data) => {
          history.push(ROUTES.LOGIN);
        },

        (err) => {
          setErrors({ confirmPass: err?.error?.message });
        }
      );
    }
  };

  return (
    <>
      <h2 className={`${css(styles.formHeading)}`}>{strings.NEW_PASSWORD}</h2>
      <p className={`${css(styles.formSubHeading)}`}>Create a new password</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={`row`}>
          <div className={`col-sm-12`}>
            <TextField
              type="password"
              placeholder={strings.PASSWORD}
              name={strings.PASSWORD}
              styles={[styles.formInput, styles.fieldColor]}
              value={pass}
              onChange={handleChange}
              error={errors.pass}
              autoFocus
            />
          </div>
          <div className={`col-sm-12`}>
            <TextField
              type="password"
              placeholder={strings.CONFIRM_PASSWORD}
              name={strings.CONFIRM_PASSWORD}
              styles={[styles.formInput, styles.fieldColor]}
              value={confirmPass}
              onChange={handleChange}
              error={errors.confirmPass}
            />
          </div>
        </div>
        <Button
          type="submit"
          title={strings.UPDATE_PASSWORD}
          ripple={false}
          className={`w-100 ${css(styles.submitBtn)} ${css(styles.formInput)}`}
          onClick={handleSubmit}
        />
      </form>
      <div className={`${css(styles.anotherArea)}`}>
        <p className={`${css(styles.anotherAccText)} text-center`}>
          Return to{" "}
          <NavLink to={ROUTES.LOGIN} className={`${css(styles.anotherLink)}`}>
            {strings.LOGIN}
          </NavLink>{" "}
        </p>
      </div>
    </>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

const actions = {};

export default connect(mapStateToProps, actions)(NewPassword);
