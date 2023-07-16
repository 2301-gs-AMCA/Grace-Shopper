import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";
export default function AddressForm() {
  return (
    <div>
      <form>
        <h3>Shipping</h3>
        <AddressElement 
        onChange={(event) => {
            if (event.complete) {
              // Extract potentially complete address
              const address = event.value.address;
            }
          }}
          options={{ mode: "shipping" }} />
      </form>
    </div>
  );
}
