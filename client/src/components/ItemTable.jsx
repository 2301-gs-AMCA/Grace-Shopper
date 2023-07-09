import React from 'react'
import { useState, useEffect } from 'react'
import Popup from "reactjs-popup";
import PopupEditItemWindow from './PopupEditItemWindow';
export default function ItemTable({items}) {
  console.log("tableItems",items)
  const[refresh,setRefresh] = useState(false);
// const [inventory.setInventory] = useState()
let html = "";
useEffect(()=>{
Table()
},[refresh])
function isAvailableCheck(check){
if(check){
    return "yes"
}
else{
    return "no"
}
}
function Table(){
  
    items.map((item)=>{
    html = (
        <table className="item-table">
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
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>${item.cost}</td>
            <td>{item.category}</td>
            <td>{isAvailableCheck(item.isavailable)}</td>
            <td>{item.inventory_qty}</td>
            <td>
            <Popup trigger={<button> Edit</button>} position="left">
                  <PopupEditItemWindow item={item} setRefresh={setRefresh} />
                </Popup>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    )
    })
}
Table();
return (
    <div>
        {html}
    </div>
  )
}
