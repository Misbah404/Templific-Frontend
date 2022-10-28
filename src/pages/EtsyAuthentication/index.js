import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Colors } from "../../theme";
import { css } from "aphrodite";
import styles from "./styles";
import _ from "lodash";
import { ROUTES } from "../../constants";
import { useHistory, useLocation } from "react-router-dom";
import { getAccessToken } from "../../services/etsyHelper";
import { connect, useDispatch } from "react-redux";
import { Store } from "react-notifications-component";
import { verifyUser } from "../../actions/AuthActions";

const EtsyAuthentication = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location && location.search && !_.isNil(location.search)) {
      const { search } = location;
      let code = search.split("=");
      code = code[1].split("&")[0];

      getToken(code);
    }
  }, []);

  const getToken = (code) => {
    getAccessToken(
      code,
      props.user.accessToken,
      successCallback,
      errorCallback
    );
  };

  const successCallback = (data) => {
    localStorage.setItem("etsy_access_token", data.access_token);
    localStorage.setItem("etsy_refresh_token", data.refresh_token);

    dispatch(
      verifyUser({
        etsyConnected: true,
        etsy_refreshToken: data.refresh_token,
      })
    );

    Store.addNotification({
      title: "Successfully Connected",
      message: "Your etsy shop is connected",
      type: "success",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: true,
      },
    });

    history.push({ pathname: ROUTES.CONNECT, state: { connected: true } });
  };

  const errorCallback = (data) => {
    try {
      const errorTitle =
        data?.error?.message === "Create shop first before connecting to etsy."
          ? "Shop not found"
          : "Oops";

      const errorMessage =
        data?.error?.message ||
        data?.error_description ||
        "Something went wrong.";

      Store.addNotification({
        title: errorTitle,
        message: errorMessage,
        type: "danger",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true,
        },
      });

      history.push(ROUTES.CONNECT);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div
      className={` d-flex justify-content-center align-items-center w-100 ${css(
        styles.main
      )}`}>
      <BarLoader sizeUnit={"px"} size={150} color={Colors.kgGreen} />
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(EtsyAuthentication);
