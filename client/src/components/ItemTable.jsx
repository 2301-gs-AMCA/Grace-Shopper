import React from "react";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import PopupEditItemWindow from "./PopupEditItemWindow";
import { deleteItemApi } from "../api/items";

export default function ItemTable({ items }) {
  console.log("tableItems", items);
  const [html, setHtml] = useState("");
//removetableRefresh and refreshes in general, im using window.location.reload();
  const [tableRefresh, setTableRefresh] = useState(true);
  // const [inventory.setInventory] = useState()

  useEffect(() => {
    console.log("itemTable refresh Position", tableRefresh);
    async function handleDelete(id){
      try {
        console.log("triggered");
        const response = await deleteItemApi(id);
        alert(response);
        location.reload()
      } catch (error) {
        throw error
      }
    } 

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
                    <PopupEditItemWindow
                      item={item}
                      setTableRefresh={setTableRefresh}
                    />
                  </Popup>
                  <button onClick={()=>{handleDelete(item.id)}}>remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
      setHtml(temp);
      setTableRefresh(false);
    }
    if(tableRefresh === true){
      Table();
    }
  }, [tableRefresh]);
  function isAvailableCheck(check) {
    if (check) {
      return "yes";
    } else {
      return "no";
    }
  }
  
  
  return <div>{html}</div>;
}
