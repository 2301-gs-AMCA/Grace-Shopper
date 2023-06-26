import React from 'react'
import { useState,useEffect } from 'react'
import { fetchItem } from '../api/items'
import { useLocation} from 'react-router-dom'
export default function ItemPage() {
    const [Item,setItem] = useState({});
    const location = useLocation();
    console.log("current Location:",location)
    // useEffect(async()=>{
    //     setItem(await fetchItem())
    // },[Item])

  return (
    <div>ItemPage</div>
  )
}
