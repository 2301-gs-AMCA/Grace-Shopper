const client = require("../client");

async function getOrderItemById(orderItemId) {
  try {
    const {
      rows: [orderItem],
    } = await client.query(
      `
            SELECT orditm.id as id,  orditm.itemId as itemId, orditm.price as price, orditm.orderId as orderId,
            CASE WHEN orditm.orderId IS NULL THEN '[]'::json
            ELSE
            JSON_AGG(
                JSON_BUILD_OBJECT (
                    'id', ords.id,
                    'userId', ords.userId,
                    'totalPrice', ords.totalPrice
                )
            ) END AS order,
            CASE WHEN orditm.itemId IS NULL THEN '[]'::json
            ELSE
            JSON_AGG(
                JSON_BUILD_OBJECT (
                    'id', itms.id,
                    'name', itms.name,
                    'description', itms.description,
                    'cost', itms.cost,
                    'isAvailable', itms.isAvailable
                )
            ) END AS items
            FROM order_items orditm
            FULL OUTER JOIN orders ords
                ON ords.id = orditm.orderId
            FULL OUTER JOIN items itms
                ON itms.id = orditm.itemId
            WHERE orditm.id = $1
            GROUP BY orditm.id, ords.id, itms.id
            `,
      [orderItemId]
    );
    if (!orderItem) {
      throw {
        name: "OrderItmNotFoundError",
        message: "Could not find a orderItem with that id",
      };
    }
    return orderItem;
  } catch (error) {
    throw error;
  }
}

async function addItemToOrder(orderId, itemId, item_quantity, price) {
  try {
    const {
      rows: [orderItem],
    } = await client.query(
      `
                INSERT INTO order_items(orderId, itemId, item_quantity, price)
                VALUES($1, $2, $3, $4)
                RETURNING *
                `,
      [orderId, itemId, item_quantity, price]
    );

    return orderItem;
  } catch (error) {
    throw error;
  }
}

async function updateOrderItem(orderItemId, item_quantity, price) {
  try {
    const {
      rows: [orderItem],
    } = await client.query(
      `
            UPDATE order_items
            SET item_quantity=$2, price=$3
            WHERE id=$1
            RETURNING *
            `,
      [orderItemId, item_quantity, price]
    );
    return orderItem;
  } catch (error) {
    throw error;
  }
}

async function destroyOrderItem(orderItemId) {
  try {
    const {
      row: [deletedOrdItem],
    } = await client.query(
      `
            DELETE from order_items
            WHERE id=$1
            `,
      [orderItemId]
    );
    return deletedOrdItem;
  } catch (error) {
    throw error;
  }
}

async function getOrderItemsByOrderId(orderId) {
  try {
    const {
      rows: [order_items],
    } = await client.query(
      `
        SELECT * FROM order_items
        WHERE order_items.orderId = $1
        ORDER BY id
        `,
      [orderId]
    );
    return order_items;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getOrderItemById,
  addItemToOrder,
  updateOrderItem,
  destroyOrderItem,
  getOrderItemsByOrderId,
};
