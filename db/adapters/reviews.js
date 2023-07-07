const client = require("../client");
//CREATES athe reviews table
async function createReviewsTable(Objreview) {
  try {
    const { rows: review } = await client.query(
      `
        INSERT INTO reviews(itemId,userId,title,rating,review)
        VALUES($1,$2,$3,$4,$5)
        RETURNING*;
        `,
      [
        Objreview.itemId,
        Objreview.userId,
        Objreview.title,
        Objreview.rating,
        Objreview.review,
      ]
    );
    return review;
  } catch (error) {
    throw error;
  }
}

async function postReview(revObj) {
    try {
      const { rows: rvw } = await client.query(
        `
          INSERT INTO reviews(itemId,userId,title,rating,review)
          VALUES($1,$2,$3,$4,$5)
          RETURNING *;
          `,
        [revObj.itemid, revObj.userid, revObj.title, revObj.rating, revObj.review]
      );
      return rvw;
    } catch (error) {
      console.error(error);
    }
  }
//GET all Reviews from a user
async function getAllReviewsByUserId(id) {
  console.log(id);
  try {
    const { rows: rvw } = await client.query(
      `
        SELECT reviews.id, reviews.itemid, reviews.title, reviews.rating, reviews.review, 
        CASE 
            WHEN items_imgs.itemId IS NULL THEN '[]'::json 
            ELSE JSON_AGG(JSON_BUILD_OBJECT('id', items_imgs.id, 'image', items_imgs.image)) 
        END AS imagereel
        FROM reviews
        LEFT JOIN items_imgs ON reviews.itemid = items_imgs.itemid
        WHERE reviews.userid = $1
        GROUP BY reviews.id, reviews.itemid, reviews.title, reviews.rating, reviews.review, items_imgs.itemid;
 
        `,
      [id]
    );
    return rvw;
  } catch (err) {
    throw err;
  }
}
//update review fileds, supposed to keep original if null or empty using
//COALESCE
async function updateReviews(revObj) {
  try {
    const { rows: rvw } = await client.query(
      `
        UPDATE reviews 
        SET 
        title = COALESCE(NULLIF($2, ''),title),
        rating = COALESCE($3,rating),
        review = COALESCE(NULLIF($4, ''),review)
        WHERE id = $1
        RETURNING *;
        `,
      [revObj.id, revObj.title, revObj.rating, revObj.review]
    );
    return rvw;
  } catch (error) {
    console.error(error);
  }
}



async function deleteReview(id){
    try{
    const {rows:rvw} = await client.query(`
    DELETE FROM reviews
    Where id = $1;
    `,[id]);
    return rvw
    }catch(err){
        throw err
    }
}

module.exports = { createReviewsTable, getAllReviewsByUserId, updateReviews, deleteReview,postReview};
