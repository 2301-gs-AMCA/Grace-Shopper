import SliderData from "./SliderData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
export default function Imageslider() {
  const nav = useNavigate();
  const [pic, setPic] = useState(0);
  const length = SliderData.length;

  const nextSlide = () => {
    setPic(pic === length - 1 ? 0 : pic + 1);
  };

  const prevSlide = () => {
    setPic(pic === 0 ? length - 1 : pic - 1);
  };

  if (!Array.isArray(SliderData) || length <= 0) {
    return null;
  }

  return (
    <figure className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {SliderData.map((slide, id) => {
        return (
          <div
            className={id === pic ? "slide active" : "slide"}
            key={id}
            style={{ cursor: "pointer" }}
            onClick={() => {
              nav(`/shop/items/${slide.itemid}`);
            }}
          >
            {id === pic && (
              <img src={slide.image} key={id} alt="comfy" className="image" />
            )}
          </div>
        );
      })}
    </figure>
  );
}
