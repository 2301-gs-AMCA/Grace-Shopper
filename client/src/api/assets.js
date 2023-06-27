export async function fetchImageByItemId(itemId) {
    
    const URL = `/api/assets/img/${itemId}`
  try {
    const response = await fetch(URL);
    const {img} = await response.json();
    console.log("testinf 2",img);
    return img;
  } catch (err) {
    throw err;
  }
}
