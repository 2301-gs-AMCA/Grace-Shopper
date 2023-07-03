const reviewRouter = require("express").Router();
const { getAllReviewsByUserId, updateReviews } = require("../db/adapters/reviews");
const {authRequired} = require("./utils");



reviewRouter.use("/",async (req,res,next)=>{
    console.log("a request is made to reviews")
    next();
});

//GET /api/reviews/:userId
reviewRouter.get("/:userId",authRequired,async (req,res,next)=>{
    const {userId} = req.params;

    const reviews = await getAllReviewsByUserId(userId);
   

    res.send({
        success:true,
        message: "reviews recieved",
        reviews
    })
    
})

//PATCH /api/reviews/update
reviewRouter.patch("/update", authRequired, async (req, res, next) => {
  
  console.log("body", req.body);
  try {
    const editedReview = req.body;

    const review = await updateReviews(editedReview);
    console.log("review", review);
    res.send({
      success: true,
      message: "post updated",
      review
    });
  } catch (error) {
    throw error;
  }
});

module.exports = reviewRouter
