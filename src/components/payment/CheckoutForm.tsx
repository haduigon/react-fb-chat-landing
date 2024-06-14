import { useEffect, useRef, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "react-router-dom";
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';
import i18n from '../../helpers/i18n';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null) as any;
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, _setSearchParams] = useSearchParams();
  const pixelId: string = searchParams.get('pixelId') || '';

  const name: string = searchParams.get('name') || '';

  useEffect(() => {
    ReactGA.initialize("G-W995KS9W3X");
  }, []);


  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }: any) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });

  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    ReactPixel.track('Purchase');
    ReactGA.event({
      category: `PAID`,
      action: `IT SHOULD BE PAID`,
      label: `PAID REDIRECT TO DOWNLOAD`,
    });

    if (!stripe || !elements) {

      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `https://ro.destiny4you.com/#/download?name=${name}&pixelId=${pixelId}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
    paymentMethodOrder: ['card', 'apple_pay', 'google_pay']
  }

  const payRef = useRef<null | HTMLFormElement>(null);
  useEffect(() => {
    if (payRef.current) {
      setTimeout(() => {
        payRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 2000)

    }
  }, []);

  return (
    <form id="payment-form" onSubmit={handleSubmit} ref={payRef} style={{width: 250, padding: 0}}>

      <PaymentElement id="payment-element" options={paymentElementOptions as any} />
      <button disabled={isLoading || !stripe || !elements} id="submit" >
        <span id="button-text custom-font" >
          {isLoading ? <div className="spinner" id="spinner"></div> : i18n.t("Read whole forecast")}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}