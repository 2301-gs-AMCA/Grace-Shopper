import React from "react";
import CheckoutForm from "./CheckoutForm";
import AddressForm from "./AddressForm";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Cart from "./Cart/Cart";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { AddressElement, Elements } from "@stripe/react-stripe-js";
export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const { cart, setCart } = useCart();
  const { user, setUser } = useAuth();
  const [total, setTotal] = useState();

  // Make sure to call loadStripe outside of a component’s render to avoid
  // recreating the Stripe object on every render.
  // This is your test publishable API key.
  const stripePromise = loadStripe(
    "pk_test_51NSsoYE7507WjCKqIHB47wC9Rbde4kjHYAz86GW1C6OIQ9MxrfkeIW9nZ3JQl2iP1XiAzWUAypM1rct31aDbQ3vA00Ti2mZTHE"
  );

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart.items),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data from create-payment-intent", data);
        setTotal(total);
        setClientSecret(data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      Checkout
      <h2> Total Price: $ {cart.totalPrice ? cart.totalPrice : 0}</h2>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <AddressForm />

          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
