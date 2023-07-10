import React from "react";
import { useState, useEffect } from "react";
import { fetchItem } from "../api/items";
import { useLocation } from "react-router-dom";
export default function ItemPage() {
  const [Item, setItem] = useState({});
  const [html, setHtml] = useState("");
  const [img, setImg] = "";
  const location = useLocation();
  console.log("current Location:", location);
  function endOfUrl(url) {
    url = url.split("/");
    url = url.pop();
    return url;
  }
  const itemId = endOfUrl(location.pathname);
  useEffect(() => {
    async function fetch() {
      const { item } = await fetchItem(itemId);
      setItem(item);
      const image = await Item.imagereel[0].image;
    }

    fetch();
  }, []);
  console.log("Item", Item);

  return (
    <div>
      <h1>{Item.name}</h1>
      <div>
        <p>description: {Item.description}</p>
        <p>Price:${Item.cost}</p>
        <p>Availability:{Item.isAvailable}</p>
      </div>
    </div>
  );
}
