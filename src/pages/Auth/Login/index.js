import React, { useState } from "react";
import { css } from "aphrodite";
import { connect, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import _ from "lodash";
import Util from "../../../services/Util";
import { TextField, Button } from "../../../components";
import {
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD,
  IS_REQUIRED_ERROR,
  ROUTES,
  strings,
} from "../../../constants";
import styles from "./styles";
import { useLazyQuery, useMutation } from "@apollo/client";
import { USER_LOGIN } from "../../../graphQueries";
import { userSignIn } from "../../../actions/AuthActions";
import { logoutModal } from "../../../actions/LayoutAction";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(() => "");
  const [pass, setPass] = useState(() => "");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    requestError: null,
  });
  const history = useHistory();

  // const { userSignIn } = props;

  const [signInRequest, { loading }] = useMutation(USER_LOGIN, {
    onCompleted(data) {
      if (data && data.login && data.login.jwt) {
        localStorage.setItem("token", data.login.jwt);
        dispatch(userSignIn(data.login));
        if (data.login.user.verified) {
          history.push(ROUTES.SELECT_TEMPLATE);
        } else {
          history.push({
            pathname: ROUTES.CODE_CONFIRMATION,
            state: { email },
          });
        }
      }
    },

    onError(err) {
      console.error(err, err.message);
      if (err.message === "Invalid identifier or password") {
        setErrors({
          requestError: "Invalid Email or Password",
          email: null,
          password: null,
        });
      } else {
        setErrors({
          requestError: err.message,
          email: null,
          password: null,
        });
      }

      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  const handleChange = (e) => {
    if (e.target.name === strings.EMAIL) {
      setEmail(e.target.value);
    }

    if (e.target.name === strings.PASSWORD) {
      setPass(e.target.value);
    }
  };

  const _validateForm = () => {
    const errors = {};

    if (_.isNil(email) || _.isEmpty(email)) {
      // email is required
      errors.email = Util.isRequiredErrorMessage("Email");
    }

    if (!_.isEmpty(email) && !Util.isEmailValid(email)) {
      // invalid password
      errors.email = INVALID_EMAIL_ERROR;
    }

    if (_.isEmpty(pass)) {
      // password is required
      errors.password = Util.isRequiredErrorMessage("password");
    }

    if (!_.isEmpty(errors)) {
      setErrors({ ...errors, requestError: null });

      return false;
    }

    setErrors({});

    return true;
  };

  const handleSubmit = () => {
    if (_validateForm()) {
      signInRequest({ variables: { email, password: pass } });
    }
  };

  return (
    <>
      <h2 className={`${css(styles.formHeading)}`}>{strings.LOG_IN}</h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`d-flex flex-column`}>
        <div className={`row`}>
          <div className={`col-sm-12`}>
            <TextField
              type='email'
              placeholder={strings.EMAIL}
              name={strings.EMAIL}
              styles={[styles.formInput, styles.fieldColor]}
              value={email}
              onChange={handleChange}
              error={errors.email}
              focused
            />
          </div>
          <div className={`col-sm-12`}>
            <TextField
              type='password'
              placeholder={strings.PASSWORD}
              name={strings.PASSWORD}
              styles={[styles.formInput, styles.fieldColor]}
              value={pass}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          {errors && errors?.requestError && (
            <span className={`${css(styles.requestError)}`}>
              {errors.requestError}
            </span>
          )}
        </div>
        <NavLink
          to={ROUTES.FORGOT_PASSWORD}
          className={`${css(styles.forgotLink)}`}>
          {strings.FORGOT_PASSWORD}
        </NavLink>
        <Button
          type='submit'
          title={strings.LOGIN}
          ripple={false}
          className={`w-100 ${css(styles.submitBtn)} ${css(styles.formInput)}`}
          onClick={handleSubmit}
          isLoading={loading}
        />
      </form>
      <div className={`${css(styles.anotherArea)} float-left`}>
        <p className={`${css(styles.anotherAccText)} text-center`}>
          Don't have an account?{" "}
          <NavLink to={ROUTES.SIGNUP} className={`${css(styles.anotherLink)}`}>
            {strings.SIGN_UP}
          </NavLink>{" "}
        </p>
      </div>
    </>
  );
};

const mapStateToProps = () => ({});

const actions = {
  // userSignIn,
};

export default connect(mapStateToProps, actions)(Login);
