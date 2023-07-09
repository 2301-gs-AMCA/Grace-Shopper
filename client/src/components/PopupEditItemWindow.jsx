import { patchItem } from "../api/items";
import { useState,useEffect} from "react"
/// A popup window to input the update info for review
export default function pupupEditItemWindow(props){
    const [update,setUpdate] = useState({});
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemCost, setItemCost] = useState(0);
    const [inventory_qty, setInventory_qty] = useState(0);
    const [isAvailable, setIsAvailable] = useState(false);
    const item = props.item;
    const itemId = item.id;

    
    useEffect(()=>{
        /// when submit is clicked and the update state 
        ///isnt null, then it will run the PATCH
        if(update !={}){
        async function postUpdate(){
        
            console.log(itemName,itemDescription,itemCategory,itemCost,inventory_qty,isAvailable)
            
            console.log("current update",update)
            try{
            const response = await patchItem(update)
            console.log("updated item", response)
        
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
        setUpdate({id:itemId,name:itemName,description:itemDescription,category:itemCategory,cost:itemCost,inventory_qty:inventory_qty,isavailable:isAvailable});
        const popUp = document.getElementById("popup-root")
        props.setRefresh(true);
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
                <select name="availability" placeholder={item.isavailable} value={isAvailable} onChange={(e)=>{setIsAvailable(e.target.value)}}>
                    <option value="yes" selected={true}>yes</option>
                    <option value="no" selected={false}>no</option>
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