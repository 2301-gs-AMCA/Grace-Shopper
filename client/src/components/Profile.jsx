import useAuth from "../hooks/useAuth";
import {useState,useEffect} from "react"
import { Link,useNavigate} from "react-router-dom";
export default function Profile() {
  const { user } = useAuth();
  const [reviews,setReviews] = useState("");
  const navigate = useNavigate();
  console.log(user);
  
  return (
    <div className="profile">
      <h1 className="userHeader">Welcome, {user.username}!</h1>
      <div className="userInfo">
        <ul className="userInfo">
          <li>{user.username}</li>
          <li>security info</li>
          <li>settings</li>
          <li onClick={()=> navigate(`/dashboard/reviews/${user.id}`)}>Reviews</li>
        </ul>
      </div>
      <div className="itemsULike">
        <h2>Items You May Like</h2>
        <ul className="likedItems">
          <li>List of items based on your search history</li>
        </ul>
      </div>
      <div className="orderHistory">
      <h2>Order History</h2>
      <h3 className="historyItems">Your Recently Ordered Items</h3>
        <ul className="history">
          
          
          
        </ul>
      </div>
    </div>
  );
}
