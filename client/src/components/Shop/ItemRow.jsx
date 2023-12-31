import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";

export default function ItemRow({ item }) {
  return (
    <div>
      <img src={item.imagereel[0].image} alt="imageNotFound" />
      <p>{item.name}</p>
      <p>{item.description}</p>
      <p>price: ${item.cost}</p>
    </div>
  );
}
