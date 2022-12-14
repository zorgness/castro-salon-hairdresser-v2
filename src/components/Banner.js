import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Banner = () => {
  return (
    <Carousel fade indicators={false} controls={false}>
      <Carousel.Item>
        <div className="banner banner1 ban">
          <div className="container">
            <h1>
              <strong>ANAIS DE CASTRO LEMOS</strong>
            </h1>
            <h5>Professionnal Hair Stylist</h5>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="banner banner2 ban">
          <div className="container">
            <h1>
              <strong>ANAIS DE CASTRO LEMOS</strong>
            </h1>
            <h5>Professionnal Hair Stylist</h5>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="banner banner3 ban">
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
