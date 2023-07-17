import { Link } from "react-router-dom";

export default function CategorySidebar() {
  const categories = [
    { id: 0, name: "Plush" },
    { id: 1, name: "Pets" },
    { id: 2, name: "Shoes" },
    { id: 3, name: "Accessories" },
    { id: 4, name: "Bedding" },
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
