// import React from "react";
import { Imageslider } from "../assets/Imageslider";
import { SliderData } from "../assets/SliderData";

export default function Home() {
  return (
    <div className="home-page">
      <h1 className="home-header">Welcome to AMCA</h1>
      <h2 className="home-sub-header">Where comfy meets cozy</h2>
      <figure>
        <Imageslider slides={SliderData} />
      </figure>
      <p className="home-description">
        If you have found yourself visiting this website, then you are about to
        embark on a journey of which you have never <u>truly</u> endeavored. The
        journey... of Comfort. Here at AMCA, we promise to provide only the most
        comforting items and accessories. Our goal is to keep you on your couch
        for as long as humanly possible without feeling a slight itch or any
        discomfort whatsoever. If your goal is to be comfortable, we wish to
        fulfill that. But, Be Careful... the Power of Comfort is Strong.
      </p>
    </div>
  );
}
