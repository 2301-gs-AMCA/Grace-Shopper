import { useEffect, useState} from "react";

export default function ItemRow({ item }) {
 

  return (
    <div className="item-card">
      <img src={item.imagereel[0].image} alt="imageNotFound" />
      <p>{item.name}</p>
      <p>{item.description}</p>
      <p>price: ${item.cost}</p>
    </div>
  );
}
