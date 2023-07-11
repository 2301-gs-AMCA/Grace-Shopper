///Get a item
export async function fetchItem(itemId) {
  try {
    const response = await fetch(`/api/items/${itemId}`);

    const item = await response.json();
    return item;
  } catch (error) {
    console.error(error);
  }
}
/// GET a item by img html, Not used Yet
export async function fetchItemByImg(img) {
  try {
    const response = await fetch(`/api/items/${img}`);
    const { item } = await response.json();
    return item;
  } catch (error) {
    throw error;
  }
}
///GET all items
export async function fetchAllItems() {
  try {
    const response = await fetch("/api/items");
    const items = await response.json();

    return items;
  } catch (err) {
    console.error(err);
  }
}


/// GET item by category
export async function fetchItemsByCategory(category) {
  try {
    const response = await fetch("/api/items");
    const result = await response.json();
    console.log("allItems itemsbycategory: ", result);
    const categoryItems = result.items.filter(
      (item) => item.category === category
    );
    console.log("result categoryItems: ", categoryItems);
    return categoryItems;
  } catch (error) {
    console.error(error);
  }
}
/// POST an item, haven't used yet 
export async function postItem(itemObj) {
  try {
    const response = await fetch(`/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({itemObj}),
    });
    const result = await response.json();
    console.log("Result from postItem: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
/// PATCH an item
export async function patchItem(itemObj) {
  console.log("itemPatch Obj",itemObj)
  const itemId = itemObj.id;
  try {
    const response = await fetch(`/api/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({itemObj}),
    });
    const result = await response.json();
    console.log("result from patchItem: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteItemApi(id){
  try {
      const response = await fetch(`/api/items/delete/${id}`,{
          method: 'DELETE',
          headers:{
              'Content-Type': 'application/json'
          }
      })
      
      const {message} = await response.json();
      
      return message
  } catch (err) {
      throw err;
  }
}
