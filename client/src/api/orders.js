export async function getOrders() {
  try {
    const response = await fetch(`/api/order`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getOrder(orderId) {
  try {
    const response = await fetch(`/api/order/${orderId}`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getMyOrders() {
  try {
    const response = await fetch(`/api/order/myOrders`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentOrder() {
  try {
    const response = await fetch(`/api/order/myOrders`);
    const result = await response.json();

    if (result.success) {
      const result2 = result.orders[orders.length - 1];
      return result2;
    } else {
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getUsersOrders(userId) {
  try {
    const response = await fetch(`/api/order/${userId}`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function postOrder(userId) {
  try {
    const response = await fetch(`/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function patchOrder(orderId, updatedOrder) {
  try {
    const response = await fetch(`/api/order/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function patchOrderUser(orderId, userId) {
  try {
    const response = await fetch(`/api/order/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        userId,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
