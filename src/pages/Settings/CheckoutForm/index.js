import React, { useState } from "react";
import { css } from "aphrodite";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { TextField, Button, Checkbox } from "../../../components";
import { CHECKBOX_THEME, ROUTES, strings } from "../../../constants";
import styles from "../styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { UPDATE_CARD_INFO } from "../../../graphQueries";
import { verifyUser } from "../../../actions/AuthActions";
import { Store } from "react-notifications-component";
import { logoutModal } from "../../../actions/LayoutAction";

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
  const [error, setError] = useState("");

  const [onSubscriptionComplete] = useMutation(UPDATE_CARD_INFO, {
    onCompleted(data) {
      dispatch(
        verifyUser({ ...data.updateUsersPermissionsUser.data.attributes })
      );

      setError("");

      setLoading(false);

      Store.addNotification({
        title: "Successfully Updated",
        message: "Your payment method is updated",
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

      elements.getElement(CardElement).clear();
      setCardName("");
    },

    onError(err) {
      console.error(err);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

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
          setError(result.error.message);
          setLoading(false);
        } else {
          updatePaymentMethod({
            customerId: customerId,
            paymentMethodId: result.paymentMethod.id,
            last4Digits: result?.paymentMethod?.card?.last4,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong");
        setLoading(false);
      });
  }

  function updatePaymentMethod({ customerId, paymentMethodId, last4Digits }) {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/payment/updatePaymentMethod`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${props.user.accessToken}`,
        },
        body: JSON.stringify({
          customerId: customerId,
          paymentMethodId: paymentMethodId,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          throw result;
        }
        return result;
      })
      .then((result) => {
        return {
          paymentMethodId: paymentMethodId,
          subscription: result,
        };
      })
      .then((data) => {
        onSubscriptionComplete({
          variables: {
            id: props.user.id,
            cardNumber: last4Digits,
            nameOnCard: cardName,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setError("Something went wrong");
        setLoading(false);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const card = elements.getElement(CardElement);

    createPaymentMethod({ card });
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

        <div className={` ${css([styles.inputStyle, styles.formInput])}`}>
          <CardElement options={options} />
        </div>

        <div className={`row`}>
          <div className={`col-sm-12`}>
            <Button
              title={`Save Changes`}
              ripple={false}
              className={`m-auto d-block ${css(styles.submitBtn)}`}
              onClick={handleSubmit}
              isLoading={loading}
            />

            {/* <div className={`${css(styles.anotherArea)}`}>
              <p
                className={`cursor-pointer d-table m-auto ${css(
                  styles.anotherAccText
                )} ${css(styles.textSize)} text-center`}
                onClick={() => props.setShowModal(true)}
              >
                Cancel my Account
              </p>
            </div> */}
          </div>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const actions = {};

export default connect(mapStateToProps, actions)(CheckoutForm);
