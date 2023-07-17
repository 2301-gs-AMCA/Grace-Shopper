import { buildSlideshow } from "../lib/SliderData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useEffect } from "react";
export default function Imageslider() {
  const nav = useNavigate();
  const [pic, setPic] = useState(0);
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    async function getUrls() {
      const urlArr = await buildSlideshow();
      setSliderData(urlArr);
    }
    getUrls();
  }, []);

  const nextSlide = () => {
    setPic(pic === sliderData.length - 1 ? 0 : pic + 1);
  };

  const prevSlide = () => {
    setPic(pic === 0 ? sliderData.length - 1 : pic - 1);
  };

  if (!Array.isArray(sliderData) || sliderData.length <= 0) {
    return null;
  }

  return (
    <figure className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {sliderData.map((slide, id) => {
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
