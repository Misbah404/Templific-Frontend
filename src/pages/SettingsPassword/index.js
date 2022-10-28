import React, { useEffect, useState } from "react";
import { css } from "aphrodite";
import { connect, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { changeCurrentPassword } from "../../services/userHelper";
import { TextField, Button, ModalView } from "../../components";
import styles from "./styles";
import _ from "lodash";
import {
  CONFRIM_PASSWORD_MISMATCH_ERROR,
  INVALID_PASSWORD,
} from "../../constants";
import Util from "../../services/Util";
import { logoutModal } from "../../actions/LayoutAction";

const SettingsPassword = (props) => {
  const { user } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(() => false);
  const [currentPass, setCurrentPass] = useState(() => "");
  const [newPass, setNewPass] = useState(() => "");
  const [confirmPass, setConfirmPass] = useState(() => "");

  const [responseModal, setResponseModal] = useState(false);

  const [responseMessage, setResponseMessage] = useState({
    err: "",
    success: "",
  });

  const [errors, setErrors] = useState(() => ({}));

  const _validateForm = () => {
    const errors = {};

    if (_.isNil(currentPass) || _.isEmpty(currentPass)) {
      errors.currentPass = Util.isRequiredErrorMessage("Current Password");
    }

    if (_.isNil(newPass) || _.isEmpty(newPass)) {
      errors.newPass = Util.isRequiredErrorMessage("New Password");
    }

    if (!_.isEmpty(newPass) && !Util.isPasswordValid(newPass)) {
      errors.newPass = INVALID_PASSWORD;
    }

    if (_.isNil(confirmPass) || _.isEmpty(confirmPass)) {
      errors.confirmPass = Util.isRequiredErrorMessage("Confirm Password");
    }

    if (_.isEqual(currentPass, newPass)) {
      errors.confirmPass = "New password and current password is same";
    }
    if (!_.isEqual(newPass, confirmPass)) {
      errors.confirmPass = CONFRIM_PASSWORD_MISMATCH_ERROR;
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const handleResetPassModal = () => {
    if (_validateForm()) {
      setErrors({});
      setShowModal(true);
    }
  };

  const handleUpdatePassword = async () => {
    changeCurrentPassword(
      user.email,
      user.email,
      currentPass,
      newPass,
      confirmPass,
      user.accessToken,
      // success callback
      (data) => {
        setShowModal(false);
        setResponseMessage({
          err: "",
          success: "Password successfully updated",
        });

        setResponseModal(true);

        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");
      },
      // error callback
      (err) => {
        console.error(err.error.message);
        setShowModal(false);
        setResponseMessage({
          err:
            err.error.message.toLowerCase() === "internal server error"
              ? "Something went wrong"
              : err.error.message,
          success: "",
        });

        if (err?.error?.message?.includes("Missing or invalid credentials")) {
          dispatch(logoutModal({ data: true }));
        } else {
          setResponseModal(true);
        }
      }
    );
  };

  return (
    <div
      className={`${css(styles.main)} d-flex flex-column align-items-center`}>
      <div className={`${css(styles.section)} w-100`}>
        <div className={`${css(styles.formWrapper)}`}>
          <div className={`d-flex flex-column align-items-center`}>
            <h2 className={`${css(styles.mainHeading)} font-weight-bold`}>
              Update Password
            </h2>
            <div
              className={`${css(
                styles.bakeryIconWrap
              )} d-flex align-items-center justify-content-center`}>
              <svg
                className={`${css(styles.bakeryIcon)}`}
                x='0px'
                y='0px'
                viewBox='0 0 52.7 36.6'
                height='4vw'
                width='4vw'>
                <path
                  className='st0ty'
                  d='M2.2,13.5v19.7c0,0.9,0.7,1.6,1.6,1.6h45.2c0.9,0,1.6-0.7,1.6-1.6V13.5H2.2z M28.5,26.8H9.2c-0.6,0-1-0.4-1-1 s0.4-1,1-1h19.3c0.6,0,1,0.4,1,1S29,26.8,28.5,26.8z M38.1,20.7h-29c-0.6,0-1-0.4-1-1s0.4-1,1-1h29c0.6,0,1,0.4,1,1 S38.7,20.7,38.1,20.7z'></path>
                <path
                  className='st0ty'
                  d='M50.5,7.5V3.4c0-0.9-0.7-1.6-1.6-1.6H3.7c-0.9,0-1.6,0.7-1.6,1.6v4.1H50.5z'></path>
                <path
                  className='st1ty'
                  d='M48.9,0.8H3.7C2.3,0.8,1.2,2,1.2,3.4v29.9c0,1.4,1.2,2.6,2.6,2.6h45.2c1.4,0,2.6-1.2,2.6-2.6V3.4 C51.5,2,50.4,0.8,48.9,0.8z M3.7,1.8h45.2c0.9,0,1.6,0.7,1.6,1.6v5.1H2.2V3.4C2.2,2.5,2.9,1.8,3.7,1.8z M48.9,34.8H3.7 c-0.9,0-1.6-0.7-1.6-1.6V14.5h48.4v18.7C50.5,34.1,49.8,34.8,48.9,34.8z'></path>
                <path
                  className='st2ty'
                  d='M38.1,20.7h-29c-0.6,0-1,0.4-1,1s0.4,1,1,1h29c0.6,0,1-0.4,1-1S38.7,20.7,38.1,20.7z'></path>
                <path
                  className='st2ty'
                  d='M28.5,26.8H9.2c-0.6,0-1,0.4-1,1s0.4,1,1,1h19.3c0.6,0,1-0.4,1-1S29,26.8,28.5,26.8z'></path>
              </svg>
            </div>
          </div>
          <form
            className={`${css(styles.form)}`}
            onSubmit={(e) => e.preventDefault()}>
            <div className={`row`}>
              <div className={`col-sm-12`}>
                <TextField
                  type='password'
                  autoFocus
                  placeholder={`Current Password`}
                  name='current_pass'
                  styles={styles.formInput}
                  value={currentPass}
                  onChange={(value) => setCurrentPass(value.target.value)}
                  error={errors.currentPass}
                  focused
                />
              </div>
            </div>
            <div className={`row`}>
              <div className={`col-sm-12`}>
                <TextField
                  type='password'
                  placeholder={`New Password`}
                  name='new_pass'
                  styles={styles.formInput}
                  value={newPass}
                  onChange={(value) => setNewPass(value.target.value)}
                  error={errors.newPass}
                />
              </div>
            </div>
            <div className={`row`}>
              <div className={`col-sm-12`}>
                <TextField
                  type='password'
                  placeholder={`Re-Password`}
                  name='confirm_pass'
                  styles={styles.formInput}
                  value={confirmPass}
                  onChange={(value) => setConfirmPass(value.target.value)}
                  error={errors.confirmPass}
                />
              </div>
            </div>

            <div className={`row`}>
              <div className={`col-sm-12`}>
                <Button
                  title={`Update`}
                  ripple={false}
                  className={`m-auto d-block ${css(styles.submitBtn)}`}
                  onClick={handleResetPassModal}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <ModalView
        showModal={showModal}
        setShowModal={setShowModal}
        title={`Update Password`}
        cancelText={`No, Thanks`}
        cancelOnClick={() => setShowModal(false)}
        submitText={`Update`}
        submitOnClick={handleUpdatePassword}>
        <p className={`${css(styles.modalText)}`}>
          Are you sure want to update your password.
        </p>
      </ModalView>

      <ModalView
        showModal={responseModal}
        setShowModal={setResponseModal}
        title={`Response`}
        showFooter={false}>
        {responseMessage.success && (
          <p className={`${css(styles.modalText)}`}>
            {responseMessage.success}
          </p>
        )}

        {responseMessage.err && (
          <p className={`${css([styles.modalText, styles.errorMessage])}`}>
            {responseMessage.err}
          </p>
        )}
      </ModalView>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const actions = {};

export default connect(mapStateToProps, actions)(SettingsPassword);
