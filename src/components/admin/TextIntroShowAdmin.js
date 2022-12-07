import React from "react";
import { capitalizeFirstLetter } from "./../../util/capitalize";
import { useFetchTextIntroImage } from "../../customHooks/useFetchData";

const TextIntroShowAdmin = ({ textIntro, indexPosition }) => {
  const { title, text, image } = textIntro;
  const state = useFetchTextIntroImage(image);
  const { data } = state;

  return (
    <div>
      <div className="text-center">
        <img
          src={data}
          alt={"cover_images"}
          className="avatar-super-large m-3"
        />
      </div>
      <div className="m-5">
        <h2 className="pattaya text-black" style={{ fontSize: "24px" }}>
          {capitalizeFirstLetter(title)}
        </h2>
        <p>{text}</p>
      </div>
      <div className="text-center"></div>
    </div>
  );
};

export default TextIntroShowAdmin;
