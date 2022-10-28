import React, { useEffect, useState } from "react";
import { css } from "aphrodite";
import { connect, useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { TextField, Button } from "../../components";
import { ROUTES, strings } from "../../constants";
import styles from "./styles";
import { Images } from "../../theme";
import { initiateSession } from "../../services/etsyHelper";
import { verifyUser } from "../../actions/AuthActions";
import { Store } from "react-notifications-component";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_ETSY_CONNECTION } from "../../graphQueries";
import { logoutModal } from "../../actions/LayoutAction";

const Connect = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [removeEtsyConnection] = useMutation(UPDATE_USER_ETSY_CONNECTION, {
    onCompleted(data) {
      dispatch(
        verifyUser({
          etsyConnected: false,
          etsy_refreshToken: "",
        })
      );

      Store.addNotification({
        title: "Successfully Disconnected",
        message: "Your etsy shop is disconnected",
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
    },
    onError(err) {
      console.error(err);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  useEffect(() => {
    if (location?.state?.connected) {
      // setTimeout(() => {
      history.push(ROUTES.SELECT_TEMPLATE);
      // }, 4000);
    }
  }, [location.state]);

  const connectToEtsy = () => {
    initiateSession();
  };

  const disconnectEtsyShop = () => {
    removeEtsyConnection({
      variables: {
        etsyConnected: false,
        etsy_refreshToken: "",
        id: props.user.id,
        etsyShopId: "",
        etsyUserId: "",
      },
    });
  };

  return (
    <div
      className={`${css(
        styles.main
      )} d-flex flex-column align-items-center justify-content-center`}>
      <h2 className={`${css(styles.mainHeading)} font-weight-bold`}>
        Connect Your Shop
      </h2>
      <div
        className={`${css(
          styles.bakeryIconWrap
        )} d-flex align-items-center justify-content-center`}>
        <img
          src={Images.connect}
          alt={`Bakery Icon`}
          className={`${css(styles.bakeryIcon)}`}
        />
      </div>

      {!props?.user?.etsyConnected ? (
        <>
          <div className={`${css(styles.connectContent)} text-center`}>
            <p className={`${css(styles.para)} ${css(styles.textSize)}`}>
              Your Etsy shop isn’t connected.
            </p>
            <p className={`${css(styles.para)} ${css(styles.textSize)}`}>
              Hint! Its easiest if you first log in to the shop you want to
              connect in a seperate tab.
            </p>
          </div>
          <Button
            ripple={false}
            title={`Connect An Etsy Shop`}
            className={`${css(styles.connectBtn)} ${css(styles.textSize)}`}
            onClick={() =>
              // history.push({ pathname: ROUTES.DASHBOARD, search: "connected=true" })
              connectToEtsy()
            }
          />
          <NavLink
            to={ROUTES.DASHBOARD}
            className={`${css(styles.noThanks)} ${css(styles.textSize)}`}>
            No thanks, I’ll do it later
          </NavLink>
        </>
      ) : (
        <>
          <div className={`${css(styles.connectContent)} text-center`}>
            <p className={`${css(styles.para)} ${css(styles.textSize)}`}>
              Your Etsy shop is connected.
            </p>
          </div>
          <Button
            ripple={false}
            title={`Disconnect An Etsy Shop`}
            className={`${css(styles.connectBtn)} ${css(styles.textSize)}`}
            onClick={() => disconnectEtsyShop()}
          />
          {/* <NavLink
            to={ROUTES.DASHBOARD}
            className={`${css(styles.noThanks)} ${css(styles.textSize)}`}
          >
            No thanks, I’ll do it later
          </NavLink> */}
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const actions = {};

export default connect(mapStateToProps, actions)(Connect);
