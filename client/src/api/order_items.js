export async function getOrderItems(orderId) {
  try {
    const response = await fetch(`/api/order_items/${orderId}`);
    const result = await response.json();
    console.log("result from getOrder", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function postOrderItem(orderId, itemId, item_quantity) {
  try {
    const response = await fetch(`/api/order_items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        itemId,
        item_quantity,
      }),
    });
    const result = await response.json();
    console.log("result from postOrderItem", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function patchOrderItem(
  orderItemId,
  orderId,
  itemId,
  item_quantity
) {
  try {
    const response = await fetch(`/api/order_items/${orderItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        itemId,
        item_quantity,
      }),
    });
    const result = await response.json();
    console.log("result from patchOrderItem: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteOrderItem(orderItemId) {
  try {
    const response = await fetch(`/api/order_items/${orderItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("result from deleteOrderItem: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
