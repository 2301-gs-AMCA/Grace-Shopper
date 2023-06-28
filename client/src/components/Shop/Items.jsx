import ItemRow from "./ItemRow";
import { Link } from "react-router-dom";
import SingleItem from "./SingleItem";

export default function Items({ items }) {
  return (
    <div>
      <div className="items-container">
        {items.map((item) => {
          return (
            <Link key={item.id} to={`/shop/items/${item.id}`}>
              <ItemRow key={item.id} item={item} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
