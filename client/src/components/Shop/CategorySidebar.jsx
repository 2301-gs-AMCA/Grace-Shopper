import { Link } from "react-router-dom";

export default function CategorySidebar() {
  const categories = [
    { id: 0, name: "plush" },
    { id: 1, name: "pets" },
    { id: 2, name: "shoes" },
    { id: 3, name: "accessories" },
    { id: 4, name: "bedding" },
  ];
  return (
    <div className="sidebar">
      {categories.map((category) => {
        return (
          <Link
            className="sidebar-links"
            key={category.id}
            to={`/shop/${category.name}`}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}
