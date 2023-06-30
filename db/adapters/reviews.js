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

module.exports = {createReviewsTable}