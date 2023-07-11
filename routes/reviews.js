const reviewRouter = require("express").Router();
const {
  getAllReviewsByUserId,
  updateReviews,
  deleteReview,
  postReview,
} = require("../db/adapters/reviews");
const { authRequired } = require("./utils");

reviewRouter.use("/", async (req, res, next) => {
  console.log("a request is made to reviews");
  next();
});

//GET /api/reviews/:userId
reviewRouter.get("/:userId", authRequired, async (req, res, next) => {
  const { userId } = req.params;

  const reviews = await getAllReviewsByUserId(userId);

  res.send({
    success: true,
    message: "reviews recieved",
    reviews,
  });
});

//POST
reviewRouter.post("/:itemId", authRequired, async (req, res, next) => {
  //const {itemId} = req.params;
  try {
    const review = await postReview(req.body);

    if (res.ok) {
      res.send({
        success: true,
        message: "Review Submitted",
        review,
      });
    }
  } catch (error) {
    throw error;
  }
});

//PATCH /api/reviews/update
reviewRouter.patch("/update", authRequired, async (req, res, next) => {
  console.log("reviewupdate input body", req.body);
  try {
    const editedReview = req.body;

    const review = await updateReviews(editedReview);
    console.log("reviewupdate return", review);
    res.send({
      success: true,
      message: "post updated",
      review,
    });
  } catch (error) {
    throw error;
  }
});
//delete
reviewRouter.delete("/delete/:id", authRequired, async (req, res, next) => {
  const { id } = req.params;
  console.log("review being deleted ", id);
  try {
    const response = await deleteReview(id);
    res.send({
      success: true,
      message: "post deleted",
      response,
    });
  } catch (error) {
    throw error;
  }
});

module.exports = reviewRouter;
