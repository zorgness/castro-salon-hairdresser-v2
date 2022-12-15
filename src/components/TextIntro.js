import React, { useMemo, useCallback } from "react";
import { capitalizeFirstLetter } from "../util/capitalize";
import { useFetchTextIntroImage } from "../customHooks/useFetchData";
import { replaceMulCharInString } from "./../util/replaceMulCharInString";
import { wordsToStringify } from "../data/wordsToStrongify";

const TextIntro = ({ textIntro, indexPosition }) => {
  const { id, title, text, image } = textIntro;
  const state = useFetchTextIntroImage(image);
  const { data } = state;

  const textTransform = (text) => {
    console.log("render");
    if (!text) {
      return;
    }
    const toDisplay = replaceMulCharInString(text, wordsToStringify);
    if (toDisplay.includes("*")) {
      const textSeparate = toDisplay.split("*");
      return textSeparate;
    } else return <p>{toDisplay}</p>;
  };

  const textToDisplay = textTransform(text);

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

  const text1 = "Ressortir en beauté qui vous êtes";
  const text2 = "Célébrer l'unique femme que vous êtes";

  const textImportant =
    indexPosition % 2 === 0 ? (
      <div className={`index-item${indexPosition + 2} text-center`}>
        <h4 className="m-3 josefine">{text1.toUpperCase()}</h4>
      </div>
    ) : (
      <div className={`index-item${indexPosition + 2} text-center`}>
        <h4 className="m-3 josefine">{text2.toUpperCase()}</h4>
      </div>
    );

  return (
    <div className={`index-item${indexPosition + 1}`} key={id}>
      <div className={styleByIndex}>
        {bubble}
        <div className="intro">
          <h2 className="pattaya text-black" style={{ fontSize: "24px" }}>
            {capitalizeFirstLetter(title)}
          </h2>
          {textToDisplay.length > 1
            ? textToDisplay.map((part, index) => {
                return (
                  <div key={index}>
                    <p
                      dangerouslySetInnerHTML={{ __html: part }}
                      className=""
                    ></p>
                    {index < textToDisplay.length - 1 ? (
                      <hr className="separate-text" />
                    ) : null}
                  </div>
                );
              })
            : textToDisplay}
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
      {textImportant}
    </div>
  );
};

export default TextIntro;
