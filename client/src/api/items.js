export async function fetchItem(category, itemId) {
  try {
    const response = await fetch(`/api/items/${category}/${itemId}`);

    const item = await response.json();
    return item;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchItemByImg(img) {
  try {
    const response = await fetch(`/api/items/${img}`);
    const { item } = await response.json();
    return item;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllItems() {
  try {
    const response = await fetch("/api/items");
    const items = await response.json();

    return items;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchItemsByCategory(category) {
  try {
    const response = await fetch(`/api/items/${category}`);
    const items = await response.json();
    return items;
  } catch (error) {
    console.error(error);
  }
}

export async function postItem(name, description, cost) {
  try {
    const response = await fetch(`/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: {
          name,
          description,
          cost,
        },
      }),
    });
    const result = await response.json();
    console.log("Result from postItem: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function patchItem(itemId, name, description, cost) {
  try {
    const response = await fetch(`/api/items/${category}/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: {
          name,
          description,
          cost,
        },
      }),
    });
    const result = await response.json();
    console.log("result from patchItem: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
