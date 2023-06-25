import { fetchItem, fetchAllItems } from "../api/items";
import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
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
    <div>
      <h2>Shop</h2>
      <div className="shop">
        <div className="items-container">
          {items.map((item) => {
            return <ItemCard key={item.id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
