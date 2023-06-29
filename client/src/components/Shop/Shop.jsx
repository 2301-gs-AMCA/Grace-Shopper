import { useState, useEffect } from "react";
import { fetchAllItems } from "../../api/items";
import Items from "./Items";
import CategorySidebar from "./CategorySidebar";

("../../App.css");

export default function Shop() {
  const [items, setItems] = useState([]);

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
      <CategorySidebar />
      <Items items={items} />
    </div>
  );
}
