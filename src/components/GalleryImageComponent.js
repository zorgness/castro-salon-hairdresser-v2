import React from "react";
import { useFetchGalleryImages } from "../customHooks/useFetchData";

const GalleryImageComponent = ({ galleryId }) => {
  const imagePath = process.env.REACT_APP_AWS_S3_URL;
  const state = useFetchGalleryImages(galleryId);
  const { data, error, status } = state;

  if (status === "done") {
    return (
      <div>
        {data?.map(({ id, name }, index) => {
          return (
            <div className={`item-show-item${index + 1} show-item`} key={id}>
              <img
                src={imagePath + name}
                alt={name}
                width={240}
                height={"auto"}
                className="rounded "
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default GalleryImageComponent;
