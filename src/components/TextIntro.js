import React from "react";
import { capitalizeFirstLetter } from "../util/capitalize";
import { useFetchTextIntroImage } from "../customHooks/useFetchData";

const TextIntro = ({ textIntro, indexPosition }) => {
  const { id, title, text, image } = textIntro;
  const state = useFetchTextIntroImage(image);
  const { data } = state;

  const styleByIndex =
    indexPosition % 2 === 0
      ? "m-4 d-flex flex-wrap justify-content-around"
      : "m-4 d-flex flex-wrap justify-content-around flex-row-reverse";

  const bubble =
    indexPosition % 2 === 0 ? (
      <div className="bubble1"></div>
    ) : (
      <div className="bubble2"></div>
    );
  return (
    <div className={`index-item${indexPosition + 1}`} key={id}>
      <div className={styleByIndex}>
        {bubble}
        <div className="intro">
          <h2 className="pattaya text-black" style={{ fontSize: "24px" }}>
            {capitalizeFirstLetter(title)}
          </h2>
          <p className="poppins">{text}</p>
        </div>
        <div className="text-center">
          <div>
            <img
              src={data}
              alt={"cover_images"}
              className="image-index m-2 rounded "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextIntro;
