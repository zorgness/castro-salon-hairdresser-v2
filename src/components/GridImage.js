import React from "react";
import image1 from "../images/grid-image1.jpeg";
import image2 from "../images/grid-image2.jpeg";
import image3 from "../images/grid-image3.jpeg";
import image4 from "../images/grid-image4.jpeg";

const GridImage = () => {
  return (
    <div className="row-grid m-5">
      <div className="column-grid">
        <img src={image1} alt="" style={{ width: "100%" }} />
      </div>
      <div className="column-grid">
        <img src={image2} alt="" style={{ width: "100%" }} />
      </div>
      <div className="column-grid">
        <img src={image3} alt="" style={{ width: "100%" }} />
      </div>
      <div className="column-grid">
        <img src={image4} alt="" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default GridImage;
