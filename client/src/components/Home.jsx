// import React from "react";
import { Imageslider } from "../assets/Imageslider";
import { SliderData } from "../assets/SliderData";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { user, loggedIn, isLoggedIn } = useAuth();
  return (
    <div className="home-page">
      <h1 className="home-header">Welcome to AMCA</h1>
      <h2 className="home-sub-header">Where comfy meets cozy</h2>
      <figure className="figure">
        <Imageslider slides={SliderData} />
      </figure>
      <div className="home-description">
        If you have found yourself visiting this website, then you are about to
        embark on a journey of which you have never <u>truly</u> endeavored. The
        journey... of Comfort. Here at AMCA, we promise to provide only the most
        comforting items and accessories. Our goal is to keep you on your couch
        for as long as humanly possible without feeling a slight itch or any
        discomfort whatsoever. If your goal is to be comfortable, we wish to
        fulfill that. However, be Careful... the Power of Comfort is Strong.
        <br></br>
        {loggedIn === false && (
          <p>
            <a link="login" href="/login">
              {" "}
              <u>Login</u>
            </a>
            {""} or
            <a
              link="register"
              href="/register"
              style={{ textDecoration: "underline" }}
            >
              {" "}
              Register Here
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
