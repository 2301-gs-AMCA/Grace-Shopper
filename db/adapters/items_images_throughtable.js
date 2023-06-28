const client = require("../client");

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
module.export = {addImagestoItem}