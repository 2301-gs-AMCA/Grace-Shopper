import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Items from "./Items";
import { fetchItemsByCategory } from "../../api/items";
export default function CategoryItems() {
  const { category } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      const result = await fetchItemsByCategory(category);

      setItems(result);
    }
    getItems();
  }, []);

  return (
    <div id="items-shop">
      <Items items={items} />
    </div>
  );
}
