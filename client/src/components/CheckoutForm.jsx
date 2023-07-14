import React from 'react'
import { patchOrder } from '../api/orders';
import { useEffect, useState } from "react";
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import "./StripeStyle.css"

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { cart, setCart } = useCart();
  const {user,setUser} = useAuth();
  const [validationError,setValidationError]=useState(false);
  console.log("cart in checkout",cart)
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:5173/confirmation",
        receipt_email: email
      },
    });

    // if(error.type === "validation_error"){
    //   console.log("im in valid error");
    //   setValidationError(true);
    // }

    if(error){
      console.log("error in cart submit",error.type,validationError)
      try {
        async function completeOrder() {
          if(error.type === "validation_error"){
            //if a field is not filled,then stop.
            return;
          }else{
            const result = await patchOrder(cart.id, {
              id: cart.id,
              userId: user.id,
              isCart: false,
              isComplete: true,
              date: cart.order_date,
            });
            setCart(result.order);
    
            localStorage.removeItem("cart");
    
            // setClick(!click);
            

          }
          
        }
        completeOrder();
        
      } catch (error) {
        console.error(error);
      }
    }

    console.log("this is inside stripe handlesubmit:",error)
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      console.log(error)
      setMessage("An unexpected error occurred.");
    }
   
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }
  // async function handleSubmitCart(e) {
  //   e.preventDefault();
  //   if (!stripe || !elements) {
  //     // Stripe.js hasn't yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

   
  // }

  return (
    <form id="payment-form stripe " onSubmit={handleSubmit}>
      <h3>Payment</h3>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit stripe">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

