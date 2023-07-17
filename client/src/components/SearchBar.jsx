import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllItems } from "../api/items";

export default function searchBar({ searchWord }) {
  const [items, setItems] = useState([]);
  const [theseItems, setTheseItems] = useState(items);
  useEffect(() => {
    async function getItems() {
      const result = await fetchAllItems();
      setItems(result.items);
    }
  });
}
