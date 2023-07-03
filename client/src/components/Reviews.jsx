import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { fetchUserReviews } from "../api/reviews";
import Popup from 'reactjs-popup';
import PopupEditWindow from "./PopupEditWindow"




export default function Reviews(){
    const {user}=useAuth();
    const [userReviews,setUserReviews] = useState("");
    const [refresh,setRefresh] = useState(true);
    
useEffect(()=>{
    
    if(refresh === true){
    async function fetchreviews(){
        const {reviews} = await fetchUserReviews(user.id);
        
        let html = await reviews.map((review)=>{
            console.log("review",review)
            return(
            <div className="review-card">
            <h3>{review.title}</h3>
            <p>rating: {review.rating} out of 5</p>
            <p>{review.review}</p>
            <Popup trigger={<button> Edit</button>} position="center">
            <PopupEditWindow review={review} setRefresh={setRefresh}/>
        </Popup>
            <button>delete</button>
            </div>
            )  
        })
        setUserReviews(html);
        setRefresh(false);
    }
    if(user.username != "Guest"){
        
        fetchreviews();
    }
}
    

},[user,refresh])
    return(<div>
    <h1>Reviews</h1>
    <div className="reviews">
        {userReviews}
    </div>

    </div>);
};