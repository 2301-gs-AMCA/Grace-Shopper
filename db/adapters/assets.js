
const client = require('../client');
// const {images, items} = require('../seedData');

async function createImage(imgObj){
   
    try {
        const {rows: image}= await client.query(`
        INSERT INTO items_imgs(image,itemId)
        VALUES($1,$2)
        RETURNING*;
        `,[imgObj.image,imgObj.itemId]);
        
        return image;
    } catch (error) {
        throw error;
    }
}
async function getAllImages(){
    try {
        const {rows: image} = await client.query(`
        SELECT * FROM items_imgs
        ORDER BY id;
        `);
        return image
    } catch (error) {
        throw error;
    }
}
async function getImagesByItemId(itemId){
    try {
        const{rows:image} = await client.query(`
        SELECT * FROM items_imgs WHERE itemId = ($1);
        `,[itemId]);
        return image;
    } catch (error) {
        throw error;
    }
}
// async function getItemByImage(img){
//     try {
//         const {rows:item} = await client.query(`
//         SELECT itemId FROM item_imgs WHERE image = ($1);
//         `,[img]);
//         return item;
//     } catch (err) {
//         throw err;
//     }
// }





module.exports = {createImage,getAllImages,getImagesByItemId };