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
