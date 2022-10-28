import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import { css } from "aphrodite";
import { AppStyles } from "../../theme";
import { ROUTES, strings } from "../../constants";
import OtpInput from "react-otp-input";
import { Button } from "..";
import { useHistory } from "react-router-dom";
import {
  generateOtp,
  validateEmailOtp,
  validateForgotPasswordOtp,
} from "../../services/userHelper";
import { useDispatch } from "react-redux";
import { verifyUser } from "../../actions/AuthActions";
import _ from "lodash";
import { useRef } from "react";

const CodeInput = (props) => {
  const { link, email, codeLength, separator } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [codeTime, setCodeTime] = useState(strings.CODE_TIME);
  const [time, setTime] = useState(codeTime);
  const [resendDisabled, setResendDisabled] = useState(() => true);
  const [otp, setOtp] = useState(() => false);
  const [error, setError] = useState("");

  const otpRef = useRef()

  // Suggested by Laurent
  useEffect(() => {
    time > 0 && setTimeout(() => setTime(time - 1), 1000);

    time === 0 && setResendDisabled(false);
  }, [time]);

  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;

  const resendCode = () => {
    setCodeTime(codeTime * 2);
    setTime(codeTime);
    setResendDisabled(true);
    generateOtp(email);
  };

  const onHandleChange = (otp) => {
    setOtp(otp);

    error && setError("");

    // otp.length === 4 && history.replace(link);
    if (otp.length === 4) {
      if (link === ROUTES.NEW_PASSWORD) {
        validateForgotPasswordOtp(
          email,
          otp,
          (data) => {
            setOtp(false);
            history.replace({ pathname: link, state: { code: otp, email } });
          },

          (err) => {
            if (!_.isEmpty(err?.error)) {
              if (
                err.error.message.includes(
                  "The email account that you tried to reach does not exist"
                )
              ) {
                setError("Invalid email address");
              } else if (err.error.message.toLowerCase() === "invalid code") {
                setError("Invalid code");
              } else if (
                err.error.message.toLowerCase() === "code is already used"
              ) {
                setError("Otp Code has been used");
              } else if (
                err.error.message.toLowerCase() === "code is expired"
              ) {
                setError("Otp Code has been expired");
              } else {
                setError("Something went wrong");
              }

              setOtp("");
              // otpRef?.current?.focusNextInput()
            }
          }
        );
      } else {
        validateEmailOtp(
          email,
          otp,
          (data) => {
            dispatch(verifyUser({ verified: true }));
            setOtp("");
            history.replace(link);
          },

          (err) => {
            if (!_.isEmpty(err?.error)) {
              if (
                err.error.message.includes(
                  "The email account that you tried to reach does not exist"
                )
              ) {
                setError("Invalid email address");
              } else if (err.error.message.toLowerCase() === "invalid code") {
                setError("Invalid code");
              } else if (
                err.error.message.toLowerCase() === "code is already used"
              ) {
                setError("Otp Code has been used");
              } else if (
                err.error.message.toLowerCase() === "code is expired"
              ) {
                setError("Otp Code has been expired");
              } else {
                setError("Something went wrong");
              }

              setOtp("");
            }
          }
        );
      }

      otpRef.current?.focusInput(0)
      // otpRef.current.state.activeInput = 0
    }
  };


  return (
    <div className={`d-flex align-items-center flex-column`}>
      <OtpInput
        value={otp}
        onChange={(otp) => onHandleChange(otp)}
        numInputs={codeLength}
        separator={separator}
        shouldAutoFocus
        isInputNum
        containerStyle={css(styles.inputWrap)}
        inputStyle={css(styles.inputStyles)}
        ref={otpRef}
      />
      <p className={`${css(styles.normalTextSize)}`}>
        {`${("0" + minutes).slice(-2)} : ${("0" + seconds).slice(-2)}`}
      </p>

      {error && (
        <p className={`${css([styles.normalTextSize, styles.error])}`}>
          {error}
        </p>
      )}
      <div className={`text-center`}>
        <p
          className={`font-weight-bold ${css(styles.normalTextSize)} ${css(
            styles.emailAddress
          )}`}
        >
          {email}
        </p>
        <div
          className={`font-weight-bold ${css(styles.normalTextSize)}`}
          style={{ ...AppStyles.mRight5 }}
        >
          {strings.DONT_RECEIVED_CODE}
          <Button
            onClick={() => resendCode()}
            disabled={resendDisabled}
            className={`${css(styles.resendBtn)}`}
            title={strings.RESEND_CODE}
          />
        </div>
      </div>
    </div>
  );
};
CodeInput.propTypes = {
  email: PropTypes.string,
  codeSubmit: PropTypes.func,
  codeLength: PropTypes.number,
  link: PropTypes.string,
};
CodeInput.defaultProps = {
  email: "example@gmail.com",
  codeSubmit: (code) => {},
  codeLength: 4,
  separator: false,
  link: ROUTES.PAYMENT,
};

export default CodeInput;
