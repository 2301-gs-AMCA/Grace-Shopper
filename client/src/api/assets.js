

//GET image by item ID
export async function fetchImageByItemId(itemId) {
    
    const URL = `/api/assets/img/${itemId}`
  try {
    const response = await fetch(URL);
    const {img} = await response.json();
    
    return img;
  } catch (err) {
    throw err;
  }
}
export async function addImageToItem(imgObj){
  
  try {
    const response = await fetch(`/api/assets/img/${imgObj.itemId}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imgObj.image),
    });
    const result = response.json();
   return result;
  } catch (error) {
    throw error
  }
}
