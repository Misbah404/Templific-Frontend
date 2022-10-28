import React, { useEffect, useState } from "react";
import { css } from "aphrodite";
import { connect, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { TextField, Button, ModalView } from "../../components";
import { UPDATE_CARD_INFO } from "../../graphQueries";
import { ROUTES, strings } from "../../constants";
import styles from "./styles";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useMutation } from "@apollo/client";
import { verifyUser } from "../../actions/AuthActions";
import { Store } from "react-notifications-component";
import moment from "moment";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const Settings = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(() => false);

  return (
    <div
      className={`${css(
        styles.main
      )} d-flex flex-column align-items-start justify-content-start`}>
      <div className={`${css(styles.section)} w-100`}>
        {props?.user?.subscribed && props.user.subscriptionId ? (
          <div className={`${css(styles.formWrapper)}`}>
            <div className={`d-flex flex-column align-items-center `}>
              <h2 className={`${css(styles.mainHeading)} font-weight-bold`}>
                Payment Method
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
            {props?.user?.cardNumber ? (
              <>
                {props.user?.subscriptionEnd &&
                props.user?.subscriptionEndDate ? (
                  <>
                    <p
                      className={`${css(styles.textSize)}`}
                      style={{ marginBottom: "1vw" }}>
                      <strong>Current payment method:</strong>
                      <br /> *{props?.user?.cardNumber}
                    </p>
                    <p
                      className={`${css(styles.textSize)}`}
                      style={{ marginBottom: "1vw", maxWidth: "25vw" }}>
                      Your subscription is cancelled. You will lose access by{" "}
                      <b>
                        {moment(props.user.subscriptionEndDate).format(
                          "MMM, DD YYYY"
                        )}
                      </b>
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      className={`${css(styles.textSize)}`}
                      style={{ marginBottom: "1vw" }}>
                      <strong>Current payment method:</strong>
                      <br /> *{props?.user?.cardNumber}
                    </p>
                    <p
                      className={`${css(styles.textSize)}`}
                      style={{ marginBottom: "1vw", maxWidth: "25vw" }}>
                      Update your current method below. Once updated your
                      current card wont be charged anymore.
                    </p>
                    <Elements stripe={stripePromise}>
                      <CheckoutForm {...props} setShowModal={setShowModal} />
                    </Elements>
                  </>
                )}
              </>
            ) : (
              <div>
                {props.user?.subscriptionEnd &&
                props.user?.subscriptionEndDate ? (
                  <div className={`${css(styles.textSize)}`}>
                    Your subscription is cancelled. You will lose access by{" "}
                    <b>
                      {moment(props.user.subscriptionEndDate).format(
                        "MMM, DD YYYY"
                      )}
                    </b>
                  </div>
                ) : (
                  <div className={`${css(styles.anotherArea)}`}>
                    <p className={`${css(styles.textSize)}`}>
                      Your are subscribed through paypal. You can upgrade
                      payment method from your paypal account
                    </p>
                    {/* <p
                      className={`cursor-pointer d-table m-auto ${css(
                        styles.anotherAccText
                      )} ${css(styles.textSize)} text-center`}
                      onClick={() => setShowModal(true)}
                    >
                      Cancel my Account
                    </p> */}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            className={`d-flex flex-column justify-content-center align-items-center ${css(
              styles.notSubscribe
            )}`}>
            <p className={`${css(styles.notSubscribeText)}`}>
              You are not subscribed to Templific.
            </p>

            <Button
              title={`Subscribe now`}
              ripple={false}
              className={`m-auto d-block ${css(styles.submitBtn)}`}
              onClick={() => history.push(ROUTES.PAYMENT)}
            />
          </div>
        )}
      </div>

      <ModalView
        showModal={showModal}
        setShowModal={setShowModal}
        title={`Cancel Account`}
        cancelText={`No, Thanks`}
        cancelOnClick={() => setShowModal(false)}
        submitText={`Cancel`}
        // submitOnClick={cancelSubscrition}
      >
        <p className={`${css(styles.modalText)}`}>
          Are you sure you would like to cancel your account. If so you will
          loose access at the next billing cycle.
        </p>
      </ModalView>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const actions = {};

export default connect(mapStateToProps, actions)(Settings);
