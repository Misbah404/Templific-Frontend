import React, { useState } from "react";
import { css } from "aphrodite";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { TextField, Button, Checkbox } from "../../../../components";
import { CHECKBOX_THEME, ROUTES, strings } from "../../../../constants";
import styles from "../styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { UPDATE_CARD_INFO } from "../../../../graphQueries";
import { verifyUser } from "../../../../actions/AuthActions";
import { PayPalButton } from "react-paypal-button-v2";
import moment from "moment";
import { logoutModal } from "../../../../actions/LayoutAction";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const options = {
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontWeight: "500",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "12",
      fontSmoothing: "antialiased",
      ":focus": {
        borderColor: "rgb(82 60 230 / 70%)",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#000",
    },
  },
};

const CheckoutForm = (props) => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [cardName, setCardName] = useState(() => "");
  const [cardNum, setCardNum] = useState(() => "");
  const [cardExpiry, setCardExpiry] = useState(() => "");
  const [cvc, setCvc] = useState(() => "");
  const [isChecked, setIsChecked] = useState(() => false);
  const [cardLastDigits, setCardLastDigits] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const [onSubscriptionComplete] = useMutation(UPDATE_CARD_INFO, {
    onCompleted(data) {
      dispatch(
        verifyUser({ ...data.updateUsersPermissionsUser.data.attributes })
      );

      if (props.user.etsyConnected === false) history.push(ROUTES.CONNECT);

      setLoading(false);
    },

    onError(err) {
      console.error(err);
      setLoading(false);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  const paypalSubscribe = (data, actions) => {
    setIsChecked(true);
    return actions.subscription.create({
      plan_id:
        props?.user?.trialUsed === true
          ? process.env.REACT_APP_PAYPAL_PLAN_ID
          : process.env.REACT_APP_PAYPAL_PLAN_TRIAL_ID,
    });
  };

  const paypalOnError = (err) => {
    console.error(err);
  };

  const paypalOnApprove = async (data, detail) => {
    // call the backend api to store transaction details

    const subscription = await detail.subscription.get();

    const initiateTime = subscription.status_update_time;
    const customerId = subscription.subscriber.payer_id;
    const subscriptionId = subscription.id;
    const onTrial = true;
    const customerName = subscription.subscriber.name.given_name;
    const trialEnd =
      moment(initiateTime).add(15, "days").format("YYYY-MM-DDTHH:mm:ss") + "Z";

    const monthCycle =
      new Date(moment(initiateTime).add(1, "month").format()).getTime() / 1000;

    onSubscriptionComplete({
      variables: {
        id: props.user.id,
        subscribed: true,
        onTrial: true,
        subscriptionId,
        subscriptionStartDate: subscription.start_time,
        trialEndDate: props.user.trialUsed ? null : trialEnd.toString(),
        trialUsed: true,
        nameOnCard: customerName,
        paypalCustomerId: customerId,
        paypalMonthCycleEnd: props.user.trialUsed
          ? monthCycle.toString()
          : (new Date(trialEnd).getTime() / 1000).toString(),
      },
    });
  };

  const handleChange = (e) => {
    if (e.target.name === strings.NAME_ON_CREDITCARD) {
      setCardName(e.target.value);
    }

    if (e.target.name === strings.CREDITCARD_NUMBER) {
      setCardNum(e.target.value);
    }

    if (e.target.name === strings.CREDITCARD_EXPIRY) {
      setCardExpiry(e.target.value);
    }

    if (e.target.name === strings.CREDITCARD_CVC) {
      setCvc(e.target.value);
    }
  };

  function createPaymentMethod({ card }) {
    const customerId = props.user.stripeCustomerId;
    let billingName = cardName;

    stripe
      .createPaymentMethod({
        type: "card",
        card: card,
        billing_details: {
          name: billingName,
        },
      })
      .then((result) => {
        if (result.error) {
          setLoading(false);
          throw result.error;
        } else {
          createSubscription({
            customerId: customerId,
            paymentMethodId: result.paymentMethod.id,
            last4Digits: result?.paymentMethod?.card?.last4,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setErrors(err.message);
        setLoading(false);
      });
  }

  function createSubscription({ customerId, paymentMethodId, last4Digits }) {
    return (
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/payment/subscribe`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${props.user.accessToken}`,
        },
        body: JSON.stringify({
          customerId: customerId,
          paymentMethodId: paymentMethodId,
        }),
      })
        .then((response) => {
          return response.json();
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.error) {
            // The card had an error when trying to attach it to a customer.
            throw result;
          }
          return result;
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the additional details we need.
        .then((result) => {
          return {
            paymentMethodId: paymentMethodId,
            // priceId: priceId,
            subscription: result,
          };
        })
        .then((data) => {
          onSubscriptionComplete({
            variables: {
              id: props.user.id,
              subscribed: true,
              onTrial: props.user?.trialUsed !== true ? true : false,
              subscriptionId: data.subscription.id,
              cardNumber: last4Digits,
              trialEndDate:
                data?.subscription?.trial_end &&
                moment(data?.subscription?.trial_end * 1000).format(
                  "YYYY-MM-DDTHH:mm:ss",
                  true
                ) + "Z",
              nameOnCard: cardName,
              paypalCustomerId: "",
            },
          });
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          if (error?.message) {
            setErrors(error.message);
            return;
          }

          if (error?.error?.message) {
            setErrors(error.error.message);
          }
        })
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isChecked === false && props.user?.trialUsed !== true) {
      setErrors("Please accept privacy policy and terms of use");
      return;
    }

    // if (merchant === "paypal") {
    // } else {
    if (cardName.trim() === "") {
      setErrors("Card Name is required");
      return;
    }

    const card = elements.getElement(CardElement);
    setLoading(true);
    createPaymentMethod({ card });
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`row`}>
          <div className={`col-sm-12`}>
            <TextField
              placeholder={strings.NAME_ON_CREDITCARD}
              name={strings.NAME_ON_CREDITCARD}
              styles={styles.formInput}
              value={cardName}
              onChange={handleChange}
              autoFocus
            />
          </div>
        </div>

        <div className={` ${css([styles.formInput])}`}>
          <CardElement options={options} />
        </div>

        <div className={`row`}>
          <div className={`col-sm-12`}>
            <div className={`${css(styles.subscribField)}`}>
              <p
                className={`m-0 font-weight-bold ${css(styles.subscribeText)}`}>
                Subscribtion: $9.99 + 0.25$ per order fee
              </p>
            </div>
          </div>
        </div>

        <div
          className={`d-flex justify-content-center align-items-center`}
          style={{ margin: "1vw 0" }}>
          <hr className={`flex-grow-1`} />

          <span className={`${css(styles.or)}`}>or</span>

          <hr className={`flex-grow-1`} />
        </div>

        <div className={`row`}>
          <div className={`col-sm-12`}>
            <PayPalButton
              amount={"7.99"}
              currency={"USD"}
              createSubscription={paypalSubscribe}
              onApprove={(data, details) => paypalOnApprove(data, details)}
              onError={paypalOnError}
              catchError={paypalOnError}
              onCancel={paypalOnError}
              options={{
                clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                vault: true,
              }}
              style={{
                shape: "rect",
                color: "blue",
                layout: "horizontal",
                label: "subscribe",
                height: 35,
              }}
            />

            {props?.user?.trialUsed !== true && (
              <div className={`d-flex`}>
                <Checkbox
                  theme={CHECKBOX_THEME.THEME1}
                  isChecked={isChecked}
                  onClick={() => setIsChecked(!isChecked)}
                  title='I agree to the '
                />
                <NavLink
                  to={ROUTES.TERMS_OF_USE}
                  style={{ marginLeft: "0.3vw" }}
                  className={`${css(styles.checkboxFont)} ${css(
                    styles.themeColor
                  )}`}>
                  Terms of Use{" "}
                </NavLink>
                <span
                  style={{ margin: "0 0.3vw" }}
                  className={`${css(styles.checkboxFont)}`}>
                  and
                </span>
                <NavLink
                  to={ROUTES.PRIVACY_POLICY}
                  className={`${css(styles.checkboxFont)}  ${css(
                    styles.themeColor
                  )}`}>
                  Privacy Policy
                </NavLink>
              </div>
            )}

            {errors && (
              <div className={`${css(styles.error)}`}>
                <span>{errors}</span>
              </div>
            )}

            <Button
              type='submit'
              title={`Get Started!`}
              ripple={false}
              className={`w-100 ${css([styles.formInput, styles.submitBtn])} `}
              isLoading={loading}
            />
            <div className={`${css(styles.anotherArea)}`}>
              <p className={`${css(styles.anotherAccText)} text-center`}>
                Do it later?{" "}
                <NavLink
                  to={ROUTES.DASHBOARD}
                  className={`${css(styles.anotherLink)}`}>
                  Go Home
                </NavLink>{" "}
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const actions = {};

export default connect(mapStateToProps, actions)(CheckoutForm);
