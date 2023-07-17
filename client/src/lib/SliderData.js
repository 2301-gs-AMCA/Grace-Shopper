import { fetchImageByItemId } from "../api/assets";

//builds initial seed of images for the slider for items in client.
//may add a admin function to make it changeable.
export async function buildSlideshow() {
  const collection = [];
  let initialSeed = 9;
  for (let i = 1; i <= initialSeed; i++) {
    const img = await fetchImageByItemId(i);

    collection.push(img[0]);
  }

  return collection;
}
