import React from "react";
import brune from "../images/brune.jpeg";

const GridImage = () => {
  return (
    <div className="row-grid">
      <div className="column-grid">
        <img src={brune} alt="" style={{ width: "100%" }} />
      </div>
      <div className="column-grid">
        <img src={brune} alt="" style={{ width: "100%" }} />
      </div>
      <div className="column-grid">
        <img src={brune} alt="" style={{ width: "100%" }} />
      </div>
      <div className="column-grid">
        <img src={brune} alt="" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default GridImage;
