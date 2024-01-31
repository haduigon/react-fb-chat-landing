import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./stripe.scss";
import { client } from "../../helpers/utils";

const stripePromise = loadStripe("pk_live_51OP1pEIDi1lKDmgLtS21cdqmc6EMw2M5iFaVXV8mk970Nln9y34U4SgzYFu1zQVxyvbDc5QvCe3u8S4gma16bGM600EuOW1dm4");

export const Stripe: React.FC = () => {
  const [clientSecret, setClientSecret] = useState("");

  const [showPayForm, setShowPayForm] = useState(false);

  useEffect(() => {
    client.post("/create-payment-intent", {
      headers: {
        "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'
      },
      items: { id: "xl-tshirt", amount: 2 }
    })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
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
    <div style={{ marginLeft: 10, maxWidth: 300 }}>
      <button onClick={() => setShowPayForm(true)}>Pay</button>
      {showPayForm && (
        <div className="App">
          4 dollar for your destiny
          {clientSecret && (
            <Elements options={options as any} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
}