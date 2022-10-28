import React, { useMemo } from "react";
import { css } from "aphrodite";
import { useLocation } from "react-router-dom";
import styles from "./styles";
import { Images } from "../../theme";
import { strings } from "../../constants";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import { ROUTES } from "../../constants";

const AuthLayout = (props) => {
  const { paymentPage } = props;
  const location = useLocation();

  const leftPurpleArea = useMemo(() => {
    return (
      <div
        className={`d-flex flex-column align-items-center text-center ${css(
          styles.leftBackground
        )}`}
        style={{
          width:
            location.pathname === ROUTES.PAYMENT ||
            location.pathname === ROUTES.LOGIN
              ? "40vw"
              : "30vw",
        }}
      >
        <h1 className={`${css(styles.AuthTitle)} font-pacifico`}>
          {strings.TEMPLIFIC}
        </h1>
        {location.pathname === ROUTES.PAYMENT ||
        location.pathname === ROUTES.LOGIN ? (
          <div className={`${css(styles.joinSec)}`}>
            <p className={`${css(styles.joinArea)}`}>Join the party!</p>
            <div className={`${css(styles.joinBox)}`}>
              <img
                src={Images.handWave}
                className={`${css(styles.handWave)}`}
              />
              <p className={`${css(styles.joinHeading)}`}>
                Easily create templates to sell on Etsy
              </p>
              <p className={`${css(styles.joinPrice)}`}>
                <span className={`${css(styles.price)}`}>9.99</span>/mo
              </p>
              <p className={`${css(styles.joinPriceRate)}`}>
                +$0.25 per order{" "}
              </p>
              <ul className={`${css(styles.joinUl)} text-left check-list`}>
                <li className={`${css(styles.joinLi)}`}>
                  Create and store unlimited templates
                </li>
                <li className={`${css(styles.joinLi)}`}>
                  Customer demo - So your customers can try before they purchase
                </li>
                <li className={`${css(styles.joinLi)}`}>
                  Connects directly to your Etsy store
                </li>
                <li className={`${css(styles.joinLi)}`}>
                  Support for you and your customers
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <p className={`${css(styles.AuthTagLine)}`}>{strings.TAG_LINE}</p>
            {/* <img src={Images.authFlag} alt="tree"   /> */}
            <SVG
              src={Images.authFlag}
              width="12vw"
              height="8vw"
              className={`${css(styles.AuthLeftImage)}`}
            />
          </>
        )}
      </div>
    );
  }, [location.pathname]);

  return (
    <>
      <div className={`d-flex ${css(styles.authPage)}`}>
        {leftPurpleArea}
        <div
          className={`d-flex justify-content-center align-items-center ${css(
            styles.contentArea
          )}`}
        >
          <div className={`${css(styles.innerBox)} d-flex flex-column`}>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

AuthLayout.propTypes = {
  paymentPage: PropTypes.bool,
};

AuthLayout.defaultProps = {
  paymentPage: false,
};

export default AuthLayout;
