const client = require('../client');
// const {images, items} = require('../seedData');

async function createImagesTable(imgObj){
   
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
        SELECT id,image FROM items_imgs WHERE itemId = ($1);
        `,[itemId]);
        return image;
    } catch (error) {
        throw error;
    }
}

// async function addImagestoItem(imgObj){
   
//     try {
//         const {rows: itemImage} = await client.query(`
//         INSERT INTO items_images_throughtable(itemId,imageId)
//         SELECT itms.id, img.id
//         FROM items itms
//         JOIN items_imgs img ON img.itemId = itms.id
//         WHERE img.itemId = $1
//         RETURNING *;
//         `,[imgObj.itemId]);
//         return itemImage;
//     } catch (err) {
//         throw err;
//     }
// }

module.exports = {createImagesTable,getAllImages,getImagesByItemId};