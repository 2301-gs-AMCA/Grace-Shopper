import { useParams } from "react-router-dom";
import { fetchItem } from "../../api/items";
import { useEffect, useState } from "react";

export default function SingleItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    async function getGetItemById() {
      const result = await fetchItem(itemId);
      console.log("result getItemById: ", result);
      setItem(result.item);
    }
    getGetItemById();
  }, []);

  return (
    <div className="item-card">
      <p>{item.name}</p>
      <p>{item.description}</p>
      <p>{item.cost}</p>
    </div>
  );
}
