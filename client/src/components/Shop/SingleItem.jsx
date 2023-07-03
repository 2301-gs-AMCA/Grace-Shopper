import { useParams } from "react-router-dom";
import { fetchItem } from "../../api/items";
import { useEffect, useState } from "react";

export default function SingleItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [image,setImage] = useState("");
  const [reviews,setReviews] = useState("")

  //runs when setItem is ran
  useEffect(() => {
    //gets the item
     async function getItemById() {
      const result =  await fetchItem(itemId);
      console.log("result getItemById: ", result);
      setItem(result.item);
      console.log("call 1",result.item)
      await fetchImg(result.item);
    }
    //the function that fetches the first image off the image reel
    async function nextFunc(itm){
      console.log("call 3")
      return itm.imagereel[0].image;
    }
    //fetches image because image needs to be awaited to load with 
    //page, for some reason.
    //may replace with the imagereel as a whole reel instead.if we have time
    async function fetchImg(itm){
      console.log("call 2")
      let img = await nextFunc(itm)
     
      setImage(img);
      await fetchReviews(itm);
    }
    // pulls reviews for item
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
