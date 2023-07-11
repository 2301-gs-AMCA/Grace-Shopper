import React from "react";
import { useState, useEffect } from "react";
import { fetchAllItems, postItem } from "../api/items";
import ItemTable from "./ItemTable";
export default function Dashboard() {
  const [item, setItem] = useState({});
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemCost, setItemCost] = useState(0);
  const [inventory_qty, setInventory_qty] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [Table, setTable] = useState("");
  const [loadTable, setLoadTable] = useState(true);
  const [trigger, setTrigger] = useState(false);

  /**useEffect is triggered by
   * trigger,for the addItem function
   * and
   * allItems for the RenderTableItems function
   *
   * addItem only executes when trigger is true
   * and calls a reload of the page.
   */

  useEffect(() => {
    async function addItem(itemObj) {
      if (trigger === true) {
        console.log("ItemObject", item);
        try {
          const newItem = await postItem(itemObj);
          console.log("newItem", newItem);
          alert(`${newItem.message}`);
          setTrigger(false);
          window.location.reload(true);
        } catch (error) {
          throw error;
        }
      }
    }
    /**getAllItems fetch all items
     * and only executes if loadTable is true */
    async function getAllItems() {
      if (loadTable === true) {
        try {
          const { items } = await fetchAllItems();
          setAllItems(items);
        } catch (error) {
          throw error;
        }
      }
    }
    /**RenderTableItems only executes if allItems isn't empty
     * and will setloadTable to false to prevent loop*/
    function RenderTableItems(allItems) {
      if (allItems.length != 0 && allItems != undefined) {
        setTable(<ItemTable items={allItems} />);
        console.log("table is", Table);
        setLoadTable(false);
      }
    }

    addItem(item);
    getAllItems().then(RenderTableItems(allItems));
  }, [trigger, allItems]);

  function handleNewItem() {
    setItem({
      itemName,
      itemDescription,
      itemCost,
      itemCategory,
      inventory_qty,
      isAvailable,
    });
    console.log("clicked", item);
    setTrigger(true);
    
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Items and Inventory</h2>
        <form action="" className="form-container">
          <h3>Add a Item</h3>
          <br />
          <label htmlFor="">
            Name:
            <input
              type="text"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
          </label>
          <br />
          <label htmlFor="">
            description:
            <textarea
              type="text"
              onChange={(e) => {
                setItemDescription(e.target.value);
              }}
            />
          </label>
          <br />
          <label htmlFor="">
            Cost:
            <input
              type="number"
              onChange={(e) => {
                setItemCost(e.target.value);
              }}
            />
          </label>
          <br />
          <label htmlFor="">
            Category:
            <select
              name="Categories"
              value={itemCategory}
              onChange={(e) => {
                setItemCategory(e.target.value);
              }}
            >
              <option value="plush">plush</option>
              <option value="pets">pets</option>
              <option value="shoes">shoes</option>
              <option value="accessories">accessories</option>
              <option value="bedding">bedding</option>
            </select>
          </label>
          <br />
          <label htmlFor="">
            inventory_qty:
            <input
              type="number"
              onChange={(e) => {
                setInventory_qty(e.target.value);
              }}
            />
          </label>
          <br />
          <label htmlFor="">
            Is it available:
            <input
              type="checkbox"
              onChange={(e) => {
                setIsAvailable(e.target.value);
              }}
            />
          </label>
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleNewItem();
            }}
          >
            submit
          </button>
        </form>
        {/*Table for Inventory Items*/}
        {Table}
      </div>
    </div>
  );
}
