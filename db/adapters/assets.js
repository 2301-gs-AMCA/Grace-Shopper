const client = require("../client");
// const {images, items} = require('../seedData');

async function createImage(imgObj) {
  try {
    const { rows: image } = await client.query(
      `
        INSERT INTO items_imgs(image,itemId)
        VALUES($1,$2)
        RETURNING*;
        `,
      [imgObj.image, imgObj.itemId]
    );

    return image;
  } catch (error) {
    throw error;
  }
}
async function getAllImages() {
  try {
    const { rows: image } = await client.query(`
        SELECT * FROM items_imgs
        ORDER BY id;
        `);
    return image;
  } catch (error) {
    throw error;
  }
}
async function getImagesByItemId(itemId) {
  try {
    const { rows: image } = await client.query(
      `
        SELECT * FROM items_imgs WHERE itemId = ($1);
        `,
      [itemId]
    );
    return image;
  } catch (error) {
    throw error;
  }
}
async function deleteImage(id) {
  try {
    const {
      rows: [img],
    } = await client.query(
      `
    DELETE FROM items_imgs
    Where id = $1
    Returning *;
    `,
      [id]
    );
    return img;
  } catch (err) {
    throw err;
  }
}

module.exports = { createImage, getAllImages, getImagesByItemId, deleteImage };
