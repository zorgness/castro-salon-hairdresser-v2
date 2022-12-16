import React from "react";
import { useFetchGalleryImages } from "../customHooks/useFetchData";
import { imagePath } from "./.././config";

const GalleryImageComponent = ({ galleryId }) => {
  const state = useFetchGalleryImages(galleryId);
  const { data, status } = state;

  if (status === "done") {
    return (
      <div className="d-flex justify-content-around flex-wrap gap-3">
        {data?.map(({ id, name }, index) => {
          return (
            <div key={id}>
              <img
                src={imagePath + name}
                alt={name}
                width={240}
                height={"auto"}
                className={`rounded shadow p-1 gallery-image  gallery-image${
                  index + 1
                }`}
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
