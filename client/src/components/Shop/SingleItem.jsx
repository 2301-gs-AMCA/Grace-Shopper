import { useParams } from "react-router-dom";
import { fetchItem } from "../../api/items";
import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import { postReviewApi } from "../../api/reviews";
import useAuth from "../../hooks/useAuth";
import { Row, Col, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SingleItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [image, setImage] = useState("");
  const [reviews, setReviews] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [postReview, setPostReview] = useState({});
  const [refresh, setRefresh] = useState(true);
  const { user } = useAuth();

  //runs when setItem is ran
  useEffect(() => {
    if (refresh === true) {
      //gets the item
      async function getItemById() {
        const result = await fetchItem(itemId);
        setItem(result.item);
        await fetchImg(result.item);
      }
      //the function that fetches the first image off the image reel
      async function nextFunc(itm) {
        return itm.imagereel[0].image;
      }
      //fetches image because image needs to be awaited to load with
      //page, for some reason.
      //may replace with the imagereel as a whole reel instead.if we have time
      async function fetchImg(itm) {
        let img = await nextFunc(itm);

        setImage(img);
        await fetchReviews(itm);
      }
      // pulls reviews for item
      async function fetchReviews(itm) {
        let revHtml = await itm.reviewlist.map((review) => {
          return (
            <div key={review.id} className="review-card">
              <p>author:{review.username}</p>
              <h3>{review.title}</h3>
              <p>rating: {review.rating} out of 5</p>
              <p>{review.review}</p>
            </div>
          );
        });

        setReviews(revHtml);
      }
      async function postUserReview() {
        try {
          const response = await postReviewApi(postReview);
          const result = await response.json();

          setPostReview(null);
          return result;
        } catch (err) {
          console.error(err);
          setPostReview(null);
        }
      }

      getItemById();

      if (postReview != {} || postReview != null) {
        postUserReview();
      }
      setRefresh(false);
    }
  }, [setItem, refresh]);

  function handleSubmit(e) {
    //sets POSTOBJ

    setPostReview({
      userId: user.id,
      itemId: itemId,
      title: title,
      rating: rating,
      review: review,
    });
    setRefresh(true);
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Card className="mt-2">
            <Card.Body>
              <h1>{item.name} </h1>
              <p>Description: {item.description} </p>
              <p>Price: ${item.cost} </p>
              <p>
                <img src={image} alt="imageNotFound" />
              </p>

              <AddToCart item={item} />
            </Card.Body>
            <Card.Footer>
              <br></br>
              <div>
                <h2>Write a review:</h2>
                <form id="submit-review-container" action="">
                  <label htmlFor="">
                    Title
                    <input
                      type="text"
                      placeholder="Title"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </label>
                  <label htmlFor="">
                    rating
                    <input
                      type="Number"
                      min="1"
                      max="5"
                      placeholder="5"
                      style={{ width: "50px" }}
                      onChange={(e) => {
                        setRating(e.target.value);
                      }}
                    />
                    out of 5
                  </label>
                  <label htmlFor="">
                    body
                    <textarea
                      type="text"
                      placeholder="review"
                      onChange={(e) => {
                        setReview(e.target.value);
                      }}
                    />
                  </label>
                </form>
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                    console.log(e.target);
                  }}
                >
                  SUBMIT
                </button>
              </div>
              <br />
              <br />
              <div>
                <h2>Reviews:</h2>
                {reviews}
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
