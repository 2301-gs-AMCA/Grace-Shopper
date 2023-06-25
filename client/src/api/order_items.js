export async function postOrderItem(orderId, itemId, item_quantity, price) {
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
        price,
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
  item_quantity,
  price
) {
  try {
    const response = await fetch(`api/order_items/${orderItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        itemId,
        item_quantity,
        price,
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
    const response = await fetch(`api/order_items/${orderItemId}`, {
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
