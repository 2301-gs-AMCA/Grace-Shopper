const client = require("../client");

async function getItemById(itemId) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `SELECT
      itms.id,
      itms.name,
      itms.description,
      itms.cost,
      itms.category,
      itms."isAvailable",
      CASE
        WHEN it_imgs.id IS NULL THEN '[]'::json
        ELSE JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', it_imgs.id,
            'image', it_imgs.image
          )
        )
      END AS imagereel,
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', rvws.id,
          'username', usrs.username,
          'title', rvws.title,
          'rating', rvws.rating,
          'review', rvws.review
        )
      ) AS reviewlist
    FROM
      items itms
    LEFT JOIN
      items_imgs it_imgs ON itms.id = it_imgs.itemId
    LEFT JOIN
      reviews rvws ON itms.id = rvws.itemId
    LEFT JOIN
      users usrs ON rvws.userId = usrs.id
    WHERE
      itms.id = $1
    GROUP BY
      itms.id, itms.name, itms.description, itms.cost, itms.category, itms.isavailable, it_imgs.id
    ORDER BY
      itms.id;
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

async function getItemsByCategory(itemCategory) {
  try {
    const { items } = await client.query(
      ` SELECT itms.id,itms.name,itms.description,itms.cost,itms.category,itms."isAvailable" , 
      CASE WHEN it_imgs.itemId IS NULL THEN '[]'::json
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
      WHERE itms.category = $1
      GROUP BY it_imgs.itemid,itms.id
      ORDER BY itms.id;
        `,
      [itemCategory]
    );
    if (!items) {
      return null;
    }
    return items;
  } catch (error) {
    throw error;
  }
}

async function getAllItems() {
  try {
    const { rows } = await client.query(`
    SELECT itms.id,itms.name,itms.description,itms.cost,itms.category,itms."isAvailable" , CASE WHEN it_imgs.itemId IS NULL THEN '[]'::json
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
            INSERT INTO items(name, description, cost, category) 
            VALUES($1, $2, $3, $4) 
            ON CONFLICT (name) DO NOTHING 
            RETURNING *;
          `,
      [itemObj.name, itemObj.description, itemObj.cost, itemObj.category]
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
        SET name=$2, description=$3, cost=$4, "isAvailable"=$5
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
  getItemsByCategory,
  getAllItems,
  createItem,
  updateItem,
};
