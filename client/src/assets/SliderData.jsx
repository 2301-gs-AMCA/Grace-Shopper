import { fetchImageByItemId } from "../api/assets";
import useState from "react";

const collection = [];
//builds initial seed of images for the slider for items in client.
//may add a admin function to make it changeable.
async function buildSlideshow() {
  let initialSeed = 9;
  for (let i = 1; i <= initialSeed; i++) {
    const img = await fetchImageByItemId(i);

    collection.push(img[0]);
  }

  return collection;
}

let SliderData = await buildSlideshow();

export default SliderData;
