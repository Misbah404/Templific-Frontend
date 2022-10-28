import React, { useState } from "react";
import { css } from "aphrodite";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { TextField, Button } from "../../../components";
import {
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD,
  ROUTES,
  strings,
} from "../../../constants";
import styles from "./styles";
import _ from "lodash";
import Util from "../../../services/Util";
import { AUTH_SIGNUP } from "../../../actions/ActionTypes";
import { useDispatch } from "react-redux";
import { userSignIn, userSignUpRequest } from "../../../actions/AuthActions";
import { useMutation } from "@apollo/client";
import { USER_SIGN_UP } from "../../../graphQueries";
import { generateOtp } from "../../../services/userHelper";
import { logoutModal } from "../../../actions/LayoutAction";

const Signup = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(() => "");
  const [pass, setPass] = useState(() => "");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    requestError: null,
  });

  const [signUpRequest, { data, loading, error }] = useMutation(USER_SIGN_UP, {
    onCompleted(data) {
      if (data && data.register && data.register.jwt) {
        localStorage.setItem("token", data.register.jwt);
        dispatch(userSignIn(data.register));

        history.push({ pathname: ROUTES.CODE_CONFIRMATION, state: { email } });
      }
    },

    onError(err) {
      console.error(err, err.message);
      if (err.message === "Email is already taken") {
        setErrors({
          requestError: err.message,
          email: null,
          password: null,
        });
      } else {
        setErrors({
          requestError: "Something went wrong",
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

    if (!_.isEmpty(pass) && !Util.isPasswordValid(pass)) {
      // invalid password
      errors.password = INVALID_PASSWORD;
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
      // history.push(ROUTES.CODE_CONFIRMATION);
      signUpRequest({ variables: { email, password: pass, username: email } });
    }
  };

  return (
    <>
      <h2 className={`${css(styles.formHeading)}`}>{strings.SIGN_UP}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={`row`}>
          <div className={`col-sm-12`}>
            <TextField
              type='email'
              placeholder={strings.EMAIL}
              name={strings.EMAIL}
              styles={styles.formInput}
              value={email}
              onChange={handleChange}
              error={errors.email}
              autoFocus
            />
          </div>
          <div className={`col-sm-12`}>
            <TextField
              type='password'
              placeholder={strings.PASSWORD}
              name={strings.PASSWORD}
              styles={styles.formInput}
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
        <Button
          type='submit'
          title={strings.SIGN_UP}
          ripple={false}
          className={`w-100 ${css(styles.submitBtn)} ${css(styles.formInput)}`}
          onClick={handleSubmit}
          isLoading={loading}
        />
      </form>
      <div className={`${css(styles.anotherArea)}`}>
        <p className={`${css(styles.anotherAccText)} text-center`}>
          Already have an account?{" "}
          <NavLink to={ROUTES.LOGIN} className={`${css(styles.anotherLink)}`}>
            {strings.LOGIN}
          </NavLink>{" "}
        </p>
      </div>
    </>
  );
};

const mapStateToProps = () => ({});

// const actions =
// (dispatch) => {
//   return {
//     userSignUpRequest: (payload) =>
//       dispatch({ type: AUTH_SIGNUP.REQUEST, payload }),
//   };
// };

export default connect(mapStateToProps, null)(Signup);
