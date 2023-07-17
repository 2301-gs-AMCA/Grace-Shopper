export async function updateUserInfo(username) {
  try {
    const response = await fetch("/api/users/updateUser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    });
    return response;
  } catch (error) {
    throw error;
  }
}
