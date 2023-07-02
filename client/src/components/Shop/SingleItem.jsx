import { useParams } from "react-router-dom";
import { fetchItem } from "../../api/items";
import { useEffect, useState } from "react";

export default function SingleItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [image,setImage] = useState("");
  const [reviews,setReviews] = useState("")

  useEffect(() => {
     async function getItemById() {
      const result =  await fetchItem(itemId);
      console.log("result getItemById: ", result);
      setItem(result.item);
      console.log("call 1",result.item)
      await fetchImg(result.item);
    }
    async function nextFunc(itm){
      console.log("call 3")
      return itm.imagereel[0].image;
    }

    async function fetchImg(itm){
      console.log("call 2")
      let img = await nextFunc(itm)
     
      setImage(img);
      await fetchReviews(itm);
    }

    async function fetchReviews(itm){
    console.log("call4");
   
    let revHtml =  await itm.reviewlist.map((review)=>{
      
      return(
      <div className="review-card">
      <p>author:{review.username}</p>
      <h3>{review.title}</h3>
      <p>rating: {review.rating} out of 5</p>
      <p>{review.review}</p>
      </div>
      )
      
    })
   
    setReviews(revHtml)
    } 
    getItemById();
    
    
  }, [setItem]);


  return (
    <div className="item-card">
      <h1>{item.name}</h1>
      <img src={image} alt="imageNotFound" />
      <p>Description: {item.description}</p>
      <p>Price: ${item.cost}</p>
      <br />
      <br />
      <br />
      <div>
        <h2>Reviews:</h2>
       {reviews}
      </div>
    </div>
  );
}
