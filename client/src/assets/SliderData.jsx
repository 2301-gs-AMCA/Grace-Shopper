import { fetchImageByItemId } from "../api/assets";
import useState from "react";

let SliderData=[]
const collection = [];

async function buildSlideshow() {
  let initialSeed = 9;
  for (let i = 1; i <= initialSeed; i++) {
    const img = await fetchImageByItemId(i);
    console.log("busllshit:", img);
    collection.push(img[0]);
  }
  SliderData = collection
  console.log("this is shit", SliderData);
}

buildSlideshow();

export {SliderData}