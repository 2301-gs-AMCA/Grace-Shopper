import { useState, useEffect } from "react";
import { fetchAllItems, fetchItem } from "../../api/items";
import Items from "./Items";
import SingleItem from "./SingleItem";
import { Link } from "react-router-dom";

("../../App.css");

export default function Shop() {
  const [items, setItems] = useState([]);
  const [theseItems, setTheseItems] = useState([]);

  const categories = ["plush", "pets", "shoes", "accessories", "bedding"];

  async function getItems() {
    try {
      const result = await fetchAllItems();
      console.log("result from getItems: ", result);
      setItems(result.items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div id="items-shop">
      <Items items={items} />
    </div>
  );
}
