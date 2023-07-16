export async function registerUser(username, password) {
  try {
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    console.log("Result from register user: ", result);
    return result;
  } catch (error) {
    console.error("trouble posting user from register user", error);
  }
}

export async function fetchGuest() {
  try {
    const response = await fetch("/api/auth/guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("result fetchguest:", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function login(username, password) {
  try {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  const response = await fetch(`/api/auth/logout`);
  const { success, message } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return {
    success,
    message,
  };
}

export async function fetchMe() {
  try {
    const response = await fetch("/api/auth/me");
    const result = await response.json();
    console.log("Result from fetchMe: ", result);

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMyCart() {
  try {
    const response = await fetch("/api/auth/myCart");
    const result = await response.json();
    console.log("result fetchMyCart", result);

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUsersOrders() {
  try {
    const response = await fetch(`/api/order/myOrders`);
    const result = await response.json();
    console.log("Result from fetchUsersOrders: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
