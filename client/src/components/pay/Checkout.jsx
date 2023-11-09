import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

const CheckoutForm = ({dates, guestEmail, formattedDates}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

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
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
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
      const stripeSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        setIsLoading(true);
    
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: `http://localhost:5173/success?dates=${dates}`,
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
        layout: "tabs"
      }

      const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_qxjnhra', 'template_r675kfb', e.target, 'LTlQv0sg7RiYlKMB4' )
          .then((result) => {
              console.log(result.text);
              {e.target}
          }, (error) => {
              console.log(error.text);
          });
    
          e.target.reset()
      };

      const handleSubmit = (e) =>{
        sendEmail(e)
        stripeSubmit(e)
      }
   
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
    <LinkAuthenticationElement
      id="link-authentication-element"
      onChange={(e) => setEmail(e.target.value)}
    />
    <PaymentElement id="payment-element" options={paymentElementOptions} />
    <button disabled={isLoading || !stripe || !elements} id="submit">
      <span id="button-text">
        <input name="dates" value={formattedDates} type="hidden"/>
        <input name="email" value={guestEmail} type="hidden"/>
        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
      </span>
    </button>
    {/* Show any error or success messages */}
    {message && <div id="payment-message">{message}</div>}
  </form>
  )
}

export default CheckoutForm
