const client = require("../client");

async function createCart(userId, totalPrice) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
                INSERT INTO cart (userId, totalPrice)
                VALUES ($1, $2)
                RETURNING *;
            `,
      [userId, totalPrice]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function getCartById(cartId) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
    SELECT ca.id, ca.userId, ca.totalPrice,
    CASE WHEN itms.cartId IS NULL THEN '[]'::json
    ELSE
    JSON_AGG(
        JSON_BUILD_OBJECT (
            'id', itms.id,
            'name', itms.name,
            'description', itms.description,
            'cost', itms.cost,
            'category', itms.category,
            'isAvailable', itms.isAvailable,
            'quantity', caitms.item_quantity,
            'price', caitms.price
        )
    ) END AS items
    FROM cart ca
    FULL OUTER JOIN cart_items caitms
        ON ca.id = caitms.orderId
    FULL OUTER JOIN items itms
        ON caitms.itemId = itms.id
    JOIN users us
        ON us.id = ca.userId
    WHERE ca.id = $1
    GROUP BY ca.id, caitms.orderId;
`,
      [cartId]
    );
    if (!cart) {
      return null;
    }
    return cart;
  } catch (error) {
    throw error;
  }
}

async function getAllCarts() {
  try {
    const { rows: cart } = await client.query(
      `
        SELECT ca.id, ca.userId, ca.totalPrice,
        CASE WHEN itms.cartId IS NULL THEN '[]'::json
        ELSE
        JSON_AGG(
            JSON_BUILD_OBJECT (
                'id', itms.id,
                'name', itms.name,
                'description', itms.description,
                'cost', itms.cost,
                'category', itms.category,
                'isAvailable', itms.isAvailable,
                'quantity', caitms.item_quantity,
                'price', caitms.price
            )
        ) END AS items
        FROM cart ca
        FULL OUTER JOIN cart_items caitms
            ON ca.id = caitms.orderId
        FULL OUTER JOIN items itms
            ON caitms.itemId = itms.id
      `
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function getUsersCart(userId) {
  try {
    const { rows: cart } = await client.query(
      `
                SELECT ca.id, ca.userId, ca.totalPrice,
                CASE WHEN caitms.cartId IS NULL THEN '[]'::json
                ELSE
                JSON_AGG(
                    JSON_BUILD_OBJECT (
                        'id', itms.id,
                        'name', itms.name,
                        'description', itms.description,
                        'cost', itms.cost,
                        'category', itms.category,
                        'isAvailable', itms.isAvailable,
                        'quantity', caitms.item_quantity,
                        'price', caitms.price
                    )
                ) END AS items
                FROM cart ca
                FULL OUTER JOIN cart_items caitms
                    ON ca.id = caitms.cartId
                FULL OUTER JOIN items itms
                    ON caitms.itemId = itms.id
                JOIN users us
                    ON us.id = ords.userId
                WHERE us.id = $1
            `,
      [userId]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateCart(cartId, totalPrice) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
                UPDATE cart
                SET totalprice = $2
                WHERE id = $1
                RETURNING *;
            `,
      [cartId, totalPrice]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function destroyCart(cartId) {
  try {
    const { rows: cart_items } = await client.query(
      `
            DELETE FROM cart_items
            WHERE cart_id = $1`,
      [cartId]
    );

    const { row: cart } = await client.query(
      `
            DELETE
            FROM cart
            WHERE id = $1;`,
      [cartId]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart,
  getUsersCart,
  getAllCarts,
  getCartById,
  updateCart,
  destroyCart,
};
