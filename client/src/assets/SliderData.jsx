import { fetchImageByItemId } from "../api/assets";
import useState from "react";

const collection = [];

async function buildSlideshow() {
  let initialSeed = 9;
  for (let i = 1; i <= initialSeed; i++) {
    const img = await fetchImageByItemId(i);
    console.log("busllshit:", img);
    collection.push(img[0]);
  }
  
  console.log("this is shit", collection);
  return collection
}


let SliderData= await buildSlideshow();

export default SliderData;