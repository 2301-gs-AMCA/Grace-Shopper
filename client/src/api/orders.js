export async function getOrders() {
  try {
    const response = await fetch(`/api/orders`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getOrder(orderId) {
  try {
    const response = await fetch(`/api/orders/${orderId}`);
    const result = await response.json();
    console.log("result from getOrder");
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getMyOrders() {
  try {
    const response = await fetch(`/api/orders/myOrders`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getUsersOrders(userId) {
  try {
    const response = await fetch(`/api/orders/${userId}`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function postOrder(userId, totalPrice) {
  try {
    const response = await fetch(`api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        totalPrice,
      }),
    });
    const result = await response.json();
    console.log("result from postOrder: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function patchOrder(orderId, totalPrice) {
  try {
    const response = await fetch(`api/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPrice,
      }),
    });
    const result = await response.json();
    console.log("result from patchOrder: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
