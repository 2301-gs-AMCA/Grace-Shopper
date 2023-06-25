import { fetchItem } from "../api/items";
import { useState, useEffect } from "react";
export default function Shop() {

  const[item,setItem] = useState({});

  useEffect(()=>{
    async function populateShop(){
      let result = await fetchItem(1);
      console.log(result)
     return setItem(result);
    }
    populateShop();
  },[])




  return <div>SHOP
    <p>this is {item.name}</p>
  </div>;
}

