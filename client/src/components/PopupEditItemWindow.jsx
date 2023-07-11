import { patchItem } from "../api/items";
import { useState,useEffect} from "react"
/// A popup window to input the update info for review
export default function pupupEditItemWindow({item}){
    const [update,setUpdate] = useState({});
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemCategory, setItemCategory] = useState(item.category);
    const [itemCost, setItemCost] = useState(item.cost);
    const [inventory_qty, setInventory_qty] = useState(item.inventory_qty);
    const [isAvailable, setIsAvailable] = useState(item.isAvailable);
    const itemId = item.id;
    console.log("popupeditwindowProps",item)
    
    useEffect(()=>{
        /// when submit is clicked and the update state 
        ///isnt null, then it will run the PATCH
        if(Object.keys(update).length !== 0){
        async function postUpdate(){
        
            console.log(itemName,itemDescription,itemCategory,itemCost,inventory_qty,isAvailable)
            
            console.log("current update",update)
            try{
            const response = await patchItem(update)
            if(response.success === true){
                 window.location.reload(true);
            }
            
        
            return response;
            }catch(err){
                console.error(err)
            }
            
        }
        
        postUpdate();
    }
    },[update])
    function handleSubmit(e){
        ///starts PATCH,sends refresh for parent, removes popup
        setUpdate({id:itemId,name:itemName,description:itemDescription,category:itemCategory,cost:itemCost,inventory_qty:inventory_qty,isAvailable:isAvailable});
        const popUp = document.getElementById("popup-root");
        // setTableRefresh(true);
        
        popUp.remove();
        
        
    }
    
    return(
     <div className="popup-container">
        <form action="">
            <label htmlFor="">Name
            <input type="text" placeholder={item.name} onChange={(e)=>{setItemName(e.target.value)}}/>
            </label>
            <label htmlFor="">Description
            <textarea type="text" placeholder={item.description}  onChange={(e)=>{setItemDescription(e.target.value)}}/>
            </label>
            <label htmlFor="">Cost
            <input type="number" min="0" placeholder={item.cost} onChange={(e)=>{setItemCost(e.target.value)}}/>
            </label>
            <label htmlFor="">category
            <select name="Categories" placeholder={item.category} value={itemCategory} onChange={(e)=>{setItemCategory(e.target.value)}}>
              <option value="plush">plush</option>
              <option value="pets">pets</option>
              <option value="shoes">shoes</option>
              <option value="accessories">accessories</option>
              <option value="bedding">bedding</option>
            </select>
            </label>
            <label>availability
                <select name="availability" placeholder={item.isAvailable.toString()} value={isAvailable} onChange={(e)=>{setIsAvailable(e.target.value)}}>
                    <option value={true} >yes</option>
                    <option value={false} >no</option>
                </select>
            </label>
            <label htmlFor="">Inventory Quantity
            <input type="number" min="0" placeholder={item.inventory_qty} onChange={(e)=>{setInventory_qty(e.target.value)}}/>
            </label>
        </form>
        <button onClick={(e)=>{
                handleSubmit(e);
        }}>SUBMIT</button>
     </div>   
    )
}