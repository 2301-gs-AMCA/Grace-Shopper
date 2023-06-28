const client = require("../client");

async function getItemById(itemId) {
  console.log(itemId)
  try {
    const {
      rows: [item],
    } = await client.query(
      ` SELECT itms.id,itms.name,itms.description,itms.cost,itms.isavailable , CASE WHEN it_imgs.itemId IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id',it_imgs.id,
          'image',it_imgs.image
        )
      )END AS imagereel
      FROM items itms
      JOIN items_imgs it_imgs 
      ON itms.id = it_imgs.itemId
      WHERE itms.id = $1
      GROUP BY it_imgs.itemid,itms.id
      ORDER BY itms.id;
        `,
      [itemId]
    );
    if (!item) {
      return null;
    }
    return item;
  } catch (error) {
    throw error;
  }
}

async function getAllItems() {
  try {
    const { rows } = await client.query(`
    SELECT itms.id,itms.name,itms.description,itms.cost,itms.isavailable , CASE WHEN it_imgs.itemId IS NULL THEN '[]'::json
    ELSE
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'id',it_imgs.id,
        'image',it_imgs.image
      )
    )END AS imagereel
    FROM items itms
    JOIN items_imgs it_imgs 
    ON itms.id = it_imgs.itemId
    GROUP BY it_imgs.itemid,itms.id
    ORDER BY itms.id;`);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createItem(itemObj) {
 
  try {
    const {
      rows: [item],
    } = await client.query(
      `
            INSERT INTO Items(name, description, cost) 
            VALUES($1, $2, $3) 
            ON CONFLICT (name) DO NOTHING 
            RETURNING *;
          `,
      [itemObj.name, itemObj.description, itemObj.cost]
    );

    return item;
  } catch (error) {
    throw error;
  }
}

async function updateItem(itemId, name, description, cost, isAvailable) {
  
  try {
    const {
      rows: [item],
    } = await client.query(
      `
        UPDATE items
        SET name=$2, description=$3, cost=$4, isAvailable=$5
        WHERE id = $1
        RETURNING *;
      `,
      [itemId, name, description, cost, isAvailable]
    );
    return item;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getItemById,
  getAllItems,
  createItem,
  updateItem,
};
