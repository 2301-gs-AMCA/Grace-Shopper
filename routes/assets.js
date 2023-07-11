const {
  getImagesByItemId,
  createImage,
  deleteImage,
} = require("../db/adapters/assets");
const imgRouter = require("express").Router();
const { authRequired } = require("./utils");

imgRouter.use((req, res, next) => {
  console.log("A request is being made to /assets/img");
  next();
});

//api/assets/img/:itemid
imgRouter.get("/img/:itemId", async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const img = await getImagesByItemId(itemId);
    res.send({
      success: true,
      message: "ImageFound",
      img,
    });
  } catch (err) {
    throw err;
  }
});

imgRouter.post("/img/:itemId", async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const img = await createImage(imgObj);
    response.send({
      success: true,
      message: "image recieved",
    });
  } catch (error) {
    throw error;
  }
});

imgRouter.delete("/img/delete/:id", authRequired, async (req, res, next) => {
  const { id } = req.params;
  console.log("img being deleted ", id);
  try {
    const response = await deleteImage(id);
    res.send({
      success: true,
      message: `image deleted !`,
      response,
    });
  } catch (error) {
    throw error;
  }
});

module.exports = imgRouter;
