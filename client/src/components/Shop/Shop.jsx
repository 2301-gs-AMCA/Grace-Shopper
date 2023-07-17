import { useState, useEffect } from "react";
import { fetchAllItems } from "../../api/items";
import Items from "./Items";
import CategorySidebar from "./CategorySidebar";
import { motion as m } from "framer-motion";
("../../App.css");

export default function Shop({ items }) {
  const [theseItems, setTheseItems] = useState([]);

  async function getItems() {
    try {
      const result = await fetchAllItems();
      console.log("result from getItems: ", result);
      if (!items) {
        setTheseItems(result.items);
      }
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
      <h2>Shop</h2>
      <br></br>
      <CategorySidebar />
      <Items items={theseItems} />
    </m.div>
  );
}
