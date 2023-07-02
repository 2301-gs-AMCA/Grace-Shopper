const client = require('../client');

async function createReviewsTable(Objreview){
   
    try {
        const {rows: review}= await client.query(`
        INSERT INTO reviews(itemId,userId,title,rating,review)
        VALUES($1,$2,$3,$4,$5)
        RETURNING*;
        `,[Objreview.itemId,Objreview.userId,Objreview.title,Objreview.rating,Objreview.review]);
        
        return review;
    } catch (error) {
        throw error;
    }
}

async function getAllReviewsByUserId (id){
    console.log(id)
    try {
        const {rows:rvw} = await client.query(`
        SELECT id, itemid,title, rating, review FROM reviews
        WHERE userid = $1 
        `,[id])
        return rvw;
    } catch (err) {
            throw err;
    }
}

async function updateReviews(revObj){
    
    try {
        const {rows:rvw} = await client.query(`
        UPDATE reviews 
        SET 
        title = COALESCE($2,title),
        rating = COALESCE($3,rating),
        review = COALESCE($4,review)
        WHERE id = $1
        RETURNING *;
        `,[revObj.id,revObj.title,revObj.rating,revObj.review])
        return rvw;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {createReviewsTable,getAllReviewsByUserId,updateReviews}