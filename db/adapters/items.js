const client = require("../client");

 async function createItem(itemObj) {
  console.log("createItem:",itemObj)
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO Items(name, description, cost, categoryId,available,tags) 
            VALUES($1, $2, $3, $4, $5, $6) 
            ON CONFLICT (name) DO NOTHING 
            RETURNING *;
          `,
      [itemObj.name,itemObj.description,itemObj.cost,itemObj.categoryId,itemObj.available,itemObj.tags]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createItem,
};
