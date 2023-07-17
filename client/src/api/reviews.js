///GET all user Reviews
export async function fetchUserReviews(userId) {
  if (!userId) {
    return "userid is null";
  }
  try {
    const response = await fetch(`/api/reviews/${userId}`);
    const reviews = await response.json();

    return reviews;
  } catch (err) {
    console.error(err);
  }
}
///PATCH an review
export async function updateReview(editedReview) {
  try {
    const response = await fetch("/api/reviews/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedReview),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function postReviewApi(postrevObj) {
  try {
    const response = await fetch(`/api/reviews/${postrevObj.itemid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postrevObj),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteReviewApi(id) {
  try {
    const response = await fetch(`/api/reviews/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
}
