export async function updateUserInfo(username) {
  try {
    const response = await fetch("/api/users/updateUser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    });
    console.log(response);
    return result;
  } catch (error) {
    throw error;
  }
}
