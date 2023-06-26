const client = require('../client');
// const {images, items} = require('../seedData');

async function createImagesTable(imgObj){
   
    try {
        const {rows: image}= await client.query(`
        INSERT INTO items_imgs(image)
        VALUES($1)
        RETURNING*;
        `,[imgObj.image]);
        
        return image;
    } catch (error) {
        throw error;
    }
}

async function addImagestoItem(itemId,imageId){
    try {
        const {rows: itemImage} = await client.query(`
        INSERT INTO items_images_throughtable(itemId,imageId)
        VALUES ($1,$2)
        RETURNING*
        `,[itemId,imageId]);
    } catch (err) {
        throw err;
    }
}

module.exports = {createImagesTable,addImagestoItem};