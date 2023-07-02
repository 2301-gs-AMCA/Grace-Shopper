
import { updateReview } from "../api/reviews"
import { useState,useEffect} from "react"

export default function pupupEditWindow({props}){
    const [update,setUpdate] = useState({});
    const [title,setTitle] = useState("");
    const [rating,setRating] = useState("");
    const [review,setReview] = useState("");
    const postId = props.id;
    
    useEffect(()=>{
        async function postUpdate(){
        
            console.log(title,rating,review)
            
            console.log("current update",update)
            try{
            const response = await updateReview(update)
            console.log("update error", response)
            const result = await response.json();
            return result
            }catch(err){
                console.error(err)
            }
            
        }
        postUpdate();
    },[update])
    function handleSubmit(){
        setUpdate({id:postId,title:title,rating:rating,review:review});

    }
    
    console.log(props)
    return(
     <div className="popup-container">
        <form action="">
            <label htmlFor="">Title
            <input type="text" placeholder={props.title} onChange={(e)=>{setTitle(e.target.value)}}/>
            </label>
            <label htmlFor="">rating
            <input type="Number" min="1" max="5" placeholder={props.rating } onChange={(e)=>{setRating(e.target.value)}}/>
            out of 5
            </label>
            <label htmlFor="">body
            <textarea type="text" placeholder={props.review} onChange={(e)=>{setReview(e.target.value)}}/>
            </label>
        </form>
        <button onClick={()=>{
                handleSubmit();
        }}>SUBMIT</button>
     </div>   
    )
}