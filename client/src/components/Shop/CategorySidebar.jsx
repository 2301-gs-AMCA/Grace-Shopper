import { Link } from "react-router-dom";

export default function CategorySidebar() {
  const categories = ["plush", "pets", "shoes", "accessories", "bedding"];
  return (
    <div className="sidebar">
      {categories.map((category) => {
        return (
          <Link key={category.id} to={`/shop/${category}`}>
            {category}
          </Link>
        );
      })}
    </div>
  );
}
