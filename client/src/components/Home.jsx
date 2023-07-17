// import React from "react";
import Imageslider from "../assets/Imageslider";
import { motion as m } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "../App.css";

export default function Home() {
  const { user, loggedIn } = useAuth();
  return (
    <m.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      <h1 className="home-header">Welcome to AMCA</h1>
      <h2 className="home-sub-header">Where comfy meets cozy</h2>

      <figure>
        <Imageslider />
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
        {(loggedIn === false || user.isGuest) && (
          <p>
            <Link to="/login">
              {" "}
              <u>Login</u>
            </Link>
            {""} or
            <Link to="/register">
              {" "}
              <u>Register Here</u>
            </Link>
          </p>
        )}
      </div>
    </m.div>
  );
}
