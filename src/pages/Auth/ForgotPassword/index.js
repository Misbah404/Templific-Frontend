import React, { useState } from "react";
import { css } from "aphrodite";
import { connect, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { TextField, Button } from "../../../components";
import {
  INVALID_EMAIL_ERROR,
  IS_REQUIRED_ERROR,
  ROUTES,
  strings,
} from "../../../constants";
import styles from "./styles";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import Util from "../../../services/Util";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_DATA } from "../../../graphQueries";
import { userSignUpRequest } from "../../../actions/AuthActions";
import { logoutModal } from "../../../actions/LayoutAction";

const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(() => "");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const [getUser, { loading }] = useLazyQuery(GET_USER_DATA, {
    onCompleted(data) {
      if (
        data?.usersPermissionsUsers?.data &&
        data?.usersPermissionsUsers?.data.length > 0
      ) {
        const user = data?.usersPermissionsUsers?.data[0];

        if (user && user.attributes && user.attributes.verified) {
          history.push({
            pathname: ROUTES.CODE_CONFIRMATION,
            state: { forgotCode: true, email },
          });
        } else {
          setErrors({ ...errors, email: "User is not verified" });
        }
      } else {
        setErrors({ ...errors, email: "Account with this email not found" });
      }
    },
    onError(err) {
      console.error(err.message);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  const handleChange = (e) => {
    if (e.target.name === strings.EMAIL) {
      setEmail(e.target.value);
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

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (_validateForm()) {
      getUser({ variables: { email } });
    }
  };

  return (
    <>
      <h2 className={`${css(styles.formHeading)}`}>{strings.CANT_LOGIN}</h2>
      <p className={`${css(styles.formSubHeading)}`}>
        Will send a recovery code to
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
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
        </div>
        <Button
          type='submit'
          title={strings.SEND_LINK}
          ripple={false}
          className={`w-100 ${css(styles.submitBtn)} ${css(styles.formInput)}`}
          onClick={handleSubmit}
          isLoading={loading}
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

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ForgotPassword);
