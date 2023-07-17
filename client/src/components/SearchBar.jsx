import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { fetchAllItems } from "../api/items";
import Shop from "./Shop/Shop";
import "./SearchBar.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Searchbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [theseItems, setTheseItems] = useState(items);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    async function getItems() {
      const result = await fetchAllItems();
      setItems(result.items);
    }
    getItems();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const searchItems = items.filter((item) => {
      return (
        item.name.includes(searchWord) ||
        item.category.includes(searchWord) ||
        item.description.includes(searchWord)
      );
    });
    if (pathname !== "/shop") {
      navigate("/shop");
    }
    setTheseItems(searchItems);
    setSearchWord("");
  }

  return (
    <div>
      <form onSubmit={handleSearch} id="search_bar">
        <input
          id="search_bar_input"
          type="text"
          name="search"
          placeholder="search for an item"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button>Search</button>
      </form>
      <div>{pathname === "/shop" && <Shop items={theseItems} />}</div>
    </div>
  );
}
