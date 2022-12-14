import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Banner = () => {
  return (
    <Carousel fade indicators={false} controls={false}>
      <Carousel.Item>
        <div className="banner-contact banner5 ban">
          <div className="container">
            <h1>
              <strong>ANAIS DE CASTRO LEMOS</strong>
            </h1>
            <h5>Professionnal Hair Stylist</h5>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="banner-contact banner6 ban">
          <div className="container">
            <h1>
              <strong>ANAIS DE CASTRO LEMOS</strong>
            </h1>
            <h5>Professionnal Hair Stylist</h5>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="banner-contact banner7 ban">
          <div className="container">
            <h1>
              <strong>ANAIS DE CASTRO LEMOS</strong>
            </h1>
            <h5>Professionnal Hair Stylist</h5>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
