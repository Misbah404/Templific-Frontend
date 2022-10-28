import React, { useEffect, useState } from "react";
import { css } from "aphrodite";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, ModalView } from "../../components";
import styles from "./styles";
import { UPDATE_CARD_INFO } from "../../graphQueries";
import { useMutation } from "@apollo/client";
import { verifyUser } from "../../actions/AuthActions";
import { Store } from "react-notifications-component";
import moment from "moment";
import { ROUTES } from "../../constants";
import { logoutModal } from "../../actions/LayoutAction";

const SettingsSubscribtion = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(() => false);
  const [nextBillingDate, setNextBillingDate] = useState(new Date());

  useEffect(() => {
    const getInfo = () => {
      if (props.user.cardNumber && props.user.subscribed) {
        fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/payment/getStripeSubscriptionInfo`,
          {
            method: "POST",
            body: JSON.stringify({
              subscriptionId: props.user.subscriptionId,
            }),
            headers: {
              Authorization: `Bearer ${props.user.accessToken}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.error) throw data.error;
            let date = data.current_period_end || 0;
            date = new Date(parseInt(date) * 1000);

            setNextBillingDate(date);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        const date = new Date(
          parseInt(props?.user?.paypalMonthCycleEnd) * 1000
        );
        setNextBillingDate(date);
      }
    };

    getInfo();
  }, []);

  const [updateSubscriptionInfo] = useMutation(UPDATE_CARD_INFO, {
    onCompleted(data) {
      dispatch(
        verifyUser({ ...data.updateUsersPermissionsUser?.data?.attributes })
      );

      Store.addNotification({
        title: "Subscription Cancelled",
        message: "Your subscription has been successfully cancelled",
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

      setShowModal(false);
    },

    onError(err) {
      console.error(err);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  const handleDeActivateSubscription = () => {
    if (props.user.subscribed && props.user.cardNumber) {
      handleStripeDeActivation();
    } else {
      handlePaypalSubscription();
    }
  };

  const handleStripeDeActivation = () => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/payment/cancelSubscription`,
      {
        method: "POST",
        body: JSON.stringify({
          subscriptionId: props.user.subscriptionId,
        }),
        headers: {
          Authorization: `Bearer ${props.user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;

        updateSubscriptionInfo({
          variables: {
            id: props?.user?.id,
            subscriptionEnd: true,
            subscriptionEndDate:
              moment(data.current_period_end * 1000).format(
                "YYYY-MM-DDTHH:mm:ss"
              ) + "Z",
            // data.current_period_end?.toString(),
            onTrial: false,
            trialEndDate:
              moment(data.current_period_end).format("YYYY-MM-DDTHH:mm:ss") +
              "Z",
          },
        });
      })
      .catch((err) => {
        console.error(err);

        Store.addNotification({
          title: "Sorry!",
          message: err.message || "Something went wrong",
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
        setShowModal(false);
      });
  };

  const handlePaypalSubscription = () => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/payment/cancelPaypalSubscription`,
      {
        method: "POST",
        body: JSON.stringify({
          subscriptionId: props.user.subscriptionId,
        }),
        headers: {
          Authorization: `Bearer ${props.user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;

        updateSubscriptionInfo({
          variables: {
            id: props?.user?.id,
            subscriptionEnd: true,
            subscriptionEndDate:
              moment(parseInt(props.user.paypalMonthCycleEnd) * 1000).format(
                "YYYY-MM-DDTHH:mm:ss",
                true
              ) + "Z",
            onTrial: false,
            trialEndDate:
              moment(parseInt(props.user.paypalMonthCycleEnd)).format(
                "YYYY-MM-DDTHH:mm:ss",
                true
              ) + "Z",
          },
        });
      })
      .catch((err) => {
        console.error(err);

        if (err) {
          Store.addNotification({
            title:
              err?.message === "Request failed with status code 422"
                ? "Subscription Cancelled"
                : "Error",
            message:
              err?.message === "Request failed with status code 422"
                ? "Subscription is already Cancelled"
                : "Something went wrong",
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

          setShowModal(false);
        }
      });
  };

  return (
    <>
      <div className={`${css(styles.main)}`}>
        {props.user.subscribed ? (
          <div className={`${css(styles.whiteBox)}`}>
            {}

            {props.user?.subscriptionEnd && props.user?.subscriptionEndDate ? (
              <div className={`${css(styles.para)}`}>
                Your subscription is cancelled. You will lose access by{" "}
                <b>
                  {moment(props.user.subscriptionEndDate).format(
                    "MMM, DD YYYY"
                  )}
                </b>
              </div>
            ) : (
              <>
                <div className={`d-flex justify-content-between`}>
                  <div>
                    <h3 className={`${css(styles.title)}`}>Premium Account</h3>
                    <p
                      className={`${css(styles.subTitle)} ${css(styles.para)}`}>
                      Monthly Plan
                    </p>
                  </div>
                  <Button
                    title={`Deactivate plan`}
                    onClick={() => {
                      setShowModal(true);
                    }}
                  />
                </div>
                <div className={`${css(styles.seprator)}`}></div>
                <p className={`${css(styles.para)}`}>
                  {props.user.onTrial ? (
                    <>Your trial period will end on</>
                  ) : (
                    <>Your next payment is $9.99, to be charged on</>
                  )}{" "}
                  {moment(nextBillingDate).format("MMM, DD YYYY")}
                </p>
                <p className={`${css(styles.para)}`}>
                  Your payment will be automatically renewed each month.
                </p>
              </>
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
        title={`Deactivate plan`}
        cancelText={`No, Thanks`}
        cancelOnClick={() => setShowModal(false)}
        submitText={`Deactivate`}
        submitOnClick={handleDeActivateSubscription}>
        <p className={`${css(styles.modalText)}`}>
          Are you sure want to deactivate your plan.
        </p>
      </ModalView>
    </>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const actions = {};

export default connect(mapStateToProps, actions)(SettingsSubscribtion);
