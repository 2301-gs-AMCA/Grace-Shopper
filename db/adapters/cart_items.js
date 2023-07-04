const client = require("../client");

async function getCartItemById(cartItemId) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
            SELECT caitm.id as id,  caitm.itemId as itemId, caitm.price as price, caitm.orderId as cartId,
            CASE WHEN caitm.cartId IS NULL THEN '[]'::json
            ELSE
            JSON_AGG(
                JSON_BUILD_OBJECT (
                    'id', ca.id,
                    'userId', ca.userId,
                    'totalPrice', ca.totalPrice
                )
            ) END AS cart,
            CASE WHEN caitm.itemId IS NULL THEN '[]'::json
            ELSE
            JSON_AGG(
                JSON_BUILD_OBJECT (
                    'id', itms.id,
                    'name', itms.name,
                    'description', itms.description,
                    'cost', itms.cost,
                    'category', itms.category,
                    'isAvailable', itms.isAvailable
                )
            ) END AS items
            FROM cart_items caitm
            FULL OUTER JOIN cart ca
                ON ca.id = caitm.cartId
            FULL OUTER JOIN items itms
                ON itms.id = caitm.itemId
            WHERE caitm.id = $1
            GROUP BY caitm.id, ca.id, itms.id
            `,
      [cartItemId]
    );
    if (!cartItem) {
      throw {
        name: "OrderItmNotFoundError",
        message: "Could not find a orderItem with that id",
      };
    }
    return cartItem;
  } catch (error) {
    throw error;
  }
}

async function addItemToCart(cartId, itemId, item_quantity, price) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
                INSERT INTO cart_items(cartId, itemId, item_quantity, price)
                VALUES($1, $2, $3, $4)
                RETURNING *
                `,
      [cartId, itemId, item_quantity, price]
    );

    return cartItem;
  } catch (error) {
    throw error;
  }
}

async function updateCartItem(cartItemId, item_quantity, price) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
            UPDATE cart_items
            SET item_quantity=$2, price=$3
            WHERE id=$1
            RETURNING *
            `,
      [cartItemId, item_quantity, price]
    );
    return cartItem;
  } catch (error) {
    throw error;
  }
}

async function destroyCartItem(cartItemId) {
  try {
    const result = await client.query(
      `
            DELETE from cart_items
            WHERE id=$1
            `,
      [cartItemId]
    );
    const cartItem = result.rows[0];
    return cartItem;
  } catch (error) {
    throw error;
  }
}

async function getCartItemsByCartId(cartId) {
  try {
    const {
      rows: [cart_items],
    } = await client.query(
      `
        SELECT * FROM cart_items
        WHERE cart_items.cartId = $1
        ORDER BY id
        `,
      [cartId]
    );
    return cart_items;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getCartItemById,
  addItemToCart,
  updateCartItem,
  destroyCartItem,
  getCartItemsByCartId,
};
