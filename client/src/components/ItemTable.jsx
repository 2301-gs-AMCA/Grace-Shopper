import React from "react";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import PopupEditItemWindow from "./PopupEditItemWindow";
import { deleteItemApi } from "../api/items";

export default function ItemTable({ items }) {
  console.log("tableItems", items);
  const [html, setHtml] = useState("");
 

  useEffect(() => {
    /**handles the delete button and reloads the page */
    async function handleDelete(id) {
      try {
        console.log("triggered");
        const response = await deleteItemApi(id);
        alert(response);
        location.reload();
      } catch (error) {
        throw error;
      }
    }
    /**Table for the Inventory with a popup to edit and a button to delete */
    async function Table() {
      let temp = (
        <table id="inventory-Table" className="item-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Category</th>
              <th>Availability</th>
              <th>Inventory Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>${item.cost}</td>
                <td>{item.category}</td>
                <td>{isAvailableCheck(item.isAvailable)}</td>
                <td>{item.inventory_qty}</td>
                <td>
                  <Popup trigger={<button> Edit</button>} position="left">
                    <PopupEditItemWindow item={item} />
                  </Popup>
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
      setHtml(temp);
      false;
    }

    Table();
  }, []);

  /**isAvailableCheck returns a text yes or no for the table 
   * since isAvailable is boolean values */
  function isAvailableCheck(check) {
    if (check) {
      return "yes";
    } else {
      return "no";
    }
  }

  return <div>{html}</div>;
}
