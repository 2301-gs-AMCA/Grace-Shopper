const { getImagesByItemId } = require("../db/adapters/assets");
const imgRouter = require("express").Router();

imgRouter.use((req, res, next) => {
  console.log("A request is being made to /assets/img");
  next();
});

//api/assets/img/:itemid
imgRouter.get("/img/:itemId", async (req, res, next) => {
    try{
  const {itemId} = req.params;
  const img = await getImagesByItemId(itemId);
  res.send({
    success: true,
    message: "ImageFound",
    img,
  });
}catch(err){
   throw err 
}
});

module.exports = imgRouter
