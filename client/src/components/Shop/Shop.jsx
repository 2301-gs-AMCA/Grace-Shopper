import { useEffect, useState } from "react";
import { fetchAllItems, fetchItem } from "../../api/items";
import Items from "./Items";
import SingleItem from "./SingleItem";
("../../App.css");

export default function Shop() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  async function getItems() {
    try {
      const result = await fetchAllItems();
      console.log("result from getItems: ", result);
      setItems(result.items);
    } catch (error) {
      console.error(error);
    }
  }

  async function selectItem(itemId) {
    try {
      const result = await fetchItem(itemId);
      console.log("result from selectItem: ", result);
      setSelectedItem(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div id="items-shop">
      {selectedItem.id ? (
        <SingleItem selectedItem={selectedItem} />
      ) : (
        <Items items={items} selectItem={selectItem} />
      )}
    </div>
  );
}
