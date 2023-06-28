const client = require("../client");

async function createOrder(userId, totalPrice) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
                INSERT INTO orders (userId, totalPrice)
                VALUES ($1, $2)
                RETURNING *;
            `,
      [userId, totalPrice]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
    const {
      rows: [order],
    } = await client.query(`
            SELECT * from orders WHERE id=${orderId}
            ORDER by id;
        `);
    if (!order) {
      return null;
    }
    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT ords.id, ords.userId, ords.totalPrice,
      CASE WHEN orditms.orderId IS NULL THEN '[]'::json
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
      FROM orders ords
      FULL OUTER JOIN order_items orditms
          ON ords.id = orditms.orderId
      FULL OUTER JOIN items itms
          ON orditms.itemId = itms.id
      GROUP BY ords.id, orditms.orderId;
      `
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getAllUsersOrders(userId) {
  try {
    const { rows: orders } = await client.query(
      `
                SELECT ords.id, ords.userId, ords.totalPrice,
                CASE WHEN orditms.orderId IS NULL THEN '[]'::json
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
                FROM orders ords
                FULL OUTER JOIN order_items orditms
                    ON ords.id = orditms.orderId
                FULL OUTER JOIN items itms
                    ON orditms.itemId = itms.id
                JOIN users us
                    ON us.id = ords.userId
                WHERE us.id = $1
                GROUP BY ords.id, orditms.orderId;
            `,
      [userId]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getAllOrdersByUsername(username) {
  try {
    const { rows: orders } = await client.query(
      `
                SELECT ords.id, ords.userId, ords.totalPrice,
                CASE WHEN orditms.orderId IS NULL THEN '[]'::json
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
                FROM orders ords
                FULL OUTER JOIN order_items orditms
                    ON ords.id = orditms.orderId
                FULL OUTER JOIN items itms
                    ON orditms.itemId = itms.id
                JOIN users us
                    ON us.id = ords.userId
                WHERE us.username = $1
                GROUP BY ords.id, orditms.orderId;
            `,
      [username]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function updateOrder(orderId, totalPrice) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
                UPDATE orders
                SET totalprice = $2
                WHERE id = $1
                RETURNING *;
            `,
      [orderId, totalPrice]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getAllUsersOrders,
  getAllOrdersByUsername,
  getAllOrders,
  getOrderById,
  updateOrder,
};
