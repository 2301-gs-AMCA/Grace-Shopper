import ItemRow from "./ItemRow";
import { Link } from "react-router-dom";
import SingleItem from "./SingleItem";
import AddToCart from "./AddToCart";

export default function Items({ items }) {
  return (
    <div>
      <h2>Shop</h2>
      <div className="items-container">
        {items.map((item) => {
          return (
            <div className="item-card">
              <Link key={item.id} to={`/shop/items/${item.id}`}>
                <ItemRow item={item} />
              </Link>
              <AddToCart item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
