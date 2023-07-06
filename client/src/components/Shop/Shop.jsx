import { useState, useEffect } from "react";
import { fetchAllItems } from "../../api/items";
import Items from "./Items";
import CategorySidebar from "./CategorySidebar";
import { motion as m } from "framer-motion";
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
    <m.div
      id="items-shop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <CategorySidebar />
      <Items items={items} />
    </m.div>
  );
}
