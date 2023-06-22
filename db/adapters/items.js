const client = require("../client");

async function getItemById(itemId) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
        SELECT * FROM items WHERE id =$1;`,
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
      SELECT * FROM items
      ORDER BY id;`);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createItem(itemObj) {
  console.log("createItem:", itemObj);
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
