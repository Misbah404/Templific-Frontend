import React from "react";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import _ from "lodash";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { css } from "aphrodite";
import styles from "./Styles";
import { TextField, Button } from "../";
import { Images, AppStyles } from "../../theme";
import Util from "../../services/Util";
import { getCardIntentRequest } from "../../actions/PaymentAction";

class StripePaymentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isLoading: false,
    };
  }
  componentDidMount() {
    const payload = {};
    if (this.props.data) {
      payload.token = this.props.data.access_token;
    }

    this.props.getCardIntentRequest(payload, (res) => {
      // stop loader
      this.setState({
        isLoading: false,
      });
    });
  }
  onInputChange = (e, fieldName) => {
    this.setState({
      [fieldName]: e.target.value,
    });
  };

  // start loading
  startLoading = () => {
    this.setState({
      isLoading: true,
    });
  };
  // stop loading

  stopLoading = () => {
    this.setState({
      isLoading: false,
    });
  };

  handleSubmit = async (event) => {
    // start btn loading
    event.preventDefault();
    this.startLoading();

    // validate name field here beacuse if name field empty then return from here
    if (_.isEmpty(this.state.name)) {
      // stop loading
      this.stopLoading();
      return Util.topAlertError("Name field not be empty");
    }

    if (!Util.isValidName(this.state.name)) {
      // stop loading
      this.stopLoading();
      return Util.topAlertError("Enter valid name");
    }

    const { stripe, elements, cardIntent: setupIntentKey } = this.props;

    const { error, setupIntent } = await stripe.confirmCardSetup(
      setupIntentKey.setupIntent.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: this.state.name },
        },
      }
    );

    // success return
    if (setupIntent) {
      this.props.onPaymentDone();
      // stop loading
      this.stopLoading();
    } else if (error) {
      // get error message and show to user
      Util.topAlertError(error.message);
      // stop loading
      this.stopLoading();
    } else {
      Util.topAlertError("something went wrong");

      // stop loading
      this.stopLoading();
    }
  };

  render() {
    const { stripe } = this.props;

    return (
      <div className={css(styles.paymentSec)}>
        <form onSubmit={this.handleSubmit}>
          <div className="mt-2 row">
            <div className="col-md-8 col-sm-12">
              <label className={`mt-4 mb-2 ${css(styles.labelForm)}`}>
                Card holder full name
              </label>
              <TextField
                className={`${css(styles.inputControl)}`}
                // label="Card holder full name"
                onChange={(e) => this.onInputChange(e, "name")}
                value={this.state.name}
                placeholder="John Smith"
                focused
              />
              <label className={`mt-4 mb-2 ${css(styles.labelForm)}`}>
                Long card number
              </label>
              <div className={css(styles.formWrapper)}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "14px",
                        color: "#000",
                        letterSpacing: "0.025em",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#c23d4b",
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className={css(styles.stripeTextContainer)}>
                <p className={`mb-2 ${css(styles.para)}`}>
                  Trusted, Safe & Secure{" "}
                </p>
                <p className={`mb-2 ${css(styles.para1)}`}>
                  Financial Conduct Authority (FCA) Approved
                </p>
                <div>
                  <img
                    className={css(styles.stripeImage)}
                    src={Images.stripe}
                    alt="stripe"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`row`}>
            <div className={`col-md-12`}>
              <p className={`mt-4 ${css(styles.paymentText)}`}>
                All payment information is stored securely with Stripe. <br />
                Your card won’t be charged until you explicitly select a plan
                and confirm your subscription type.
              </p>
            </div>
          </div>
          <div className={`row`}>
            <div className={`col-md-8 col-sm-12`}></div>
            <div className={`col-md-4 col-sm-12`}>
              <div className={css(styles.nextBtnContainer)}>
                <Button
                  title="Next"
                  isLoading={this.state.isLoading}
                  className={css(styles.nextBtn)}
                />
                {/* <button className={css(styles.nextBtn)}>Next</button> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const InjectedCheckoutForm = (props) => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <StripePaymentView stripe={stripe} elements={elements} {...props} />
    )}
  </ElementsConsumer>
);

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const StripePayment = (props) => (
  <Elements stripe={stripePromise}>
    <InjectedCheckoutForm {...props} />
  </Elements>
);

const mapStateToProps = ({ payment }) => ({
  cardIntent: payment.cardIntent,
  saveCardInfo: payment.cardSaveInfo,
});

const actions = { getCardIntentRequest };

export default connect(mapStateToProps, actions)(StripePayment);
