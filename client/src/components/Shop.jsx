import { fetchItem, fetchAllItems } from "../api/items";
import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import "../App.css";
export default function Shop() {
  const [item, setItem] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItem() {
      let result = await fetchItem(1);
      console.log(result);
      return setItem(result);
    }

    async function populateShop() {
      let result = await fetchAllItems();
      console.log("this is all items:", result.items);
      setItems(result.items);
    }
    populateShop();
  }, []);

  return (
    <div className="items-shop">
      <h1>Shop</h1>
      <div className="items-container">
        {items.map((item) => {
          return (
            <ItemCard key={item.id} item={item} className="items-single" />
          );
        })}
      </div>
    </div>
  );
}
