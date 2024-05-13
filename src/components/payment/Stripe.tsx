import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./stripe.scss";
import { client } from "../../helpers/utils";
import ReactGA from 'react-ga4';
import i18n from '../../helpers/i18n';

const stripePromise = loadStripe("pk_live_51OP1pEIDi1lKDmgLtS21cdqmc6EMw2M5iFaVXV8mk970Nln9y34U4SgzYFu1zQVxyvbDc5QvCe3u8S4gma16bGM600EuOW1dm4");

export const Stripe: React.FC = () => {
  const [clientSecret, setClientSecret] = useState("");

  const [showPayForm, setShowPayForm] = useState(false);

  function handlePrepaidClick() {
    setShowPayForm(true);
    ReactGA.event({
      category: `SHOW PAY FORM`,
      action: `PAY FORM IS SHOWN`,
      label: `PAY FORM`,
    });
  }

  useEffect(() => {
    client.post("/create-payment-intent", {
      headers: {
        "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'
      },
      items: { id: "astro-forecast", amount: 1 }
    })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
  }, []);

  useEffect(() => {
    ReactGA.initialize("G-W995KS9W3X");
  }, []);

  const appearance = {
    theme: 'stripe',
    labels: 'floating'
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div style={{ marginLeft: 0, width: 250 }}>
      <button onClick={handlePrepaidClick}>{i18n.t('Read whole forecast')}</button>
      {showPayForm && (
        <div className="custom-font">
          <div style={{color: 'black'}} className="center-div">2$ dollars</div>
          {clientSecret && (
            <div className="center-div">
              <Elements options={options as any} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
            </div>
          )}
        </div>
      )}
    </div>
  );
}