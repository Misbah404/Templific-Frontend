import React, { useState } from "react";
import { css } from "aphrodite";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { TextField, Button, Checkbox } from "../../../components";
import { CHECKBOX_THEME, ROUTES, strings } from "../../../constants";
import styles from "./styles";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_INITIAL_DATA } from "../../../graphQueries";
import { useDispatch } from "react-redux";
import { verifyUser } from "../../../actions/AuthActions";
import CheckoutForm from "./CheckoutForm";
import { logoutModal } from "../../../actions/LayoutAction";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const Payment = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [cardName, setCardName] = useState(() => "");
  const [cardNum, setCardNum] = useState(() => "");
  const [cardExpiry, setCardExpiry] = useState(() => "");
  const [cvc, setCvc] = useState(() => "");
  const [isChecked, setIsChecked] = useState(() => false);

  const [getUserData] = useLazyQuery(GET_USER_INITIAL_DATA, {
    onCompleted(data) {
      dispatch(
        verifyUser({
          stripeCustomerId:
            data?.usersPermissionsUser?.data?.attributes?.stripeCustomerId,
        })
      );
    },

    onError(err) {
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  useEffect(() => {
    if (!props?.user?.stripeCustomerId) {
      getUserData({ variables: { id: props.user.id } });
    }
  }, []);

  return (
    <>
      <h2 className={`${css(styles.formHeading)}`}>
        {strings.CREDITCARD_OR_PAYPAL}
      </h2>

      {props?.user?.trialUsed !== true && (
        <p className={`${css(styles.paymentTagLine)}`}>15 days free trial</p>
      )}

      <Elements stripe={stripePromise}>
        <CheckoutForm {...props} />
      </Elements>
    </>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const actions = {};

export default connect(mapStateToProps, actions)(Payment);
