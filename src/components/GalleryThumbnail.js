import React from "react";
import { useFetchGalleryImages } from "./../customHooks/useFetchData";

const GalleryThumbnail = ({ galleryId }) => {
  const imagePath = process.env.REACT_APP_AWS_S3_URL;
  const state = useFetchGalleryImages(galleryId);
  const { data, status } = state;

  if (status === "done") {
    return (
      <img
        src={imagePath + data?.[0]?.name}
        alt={""}
        className="avatar-super-large shadow p-1"
      />
    );
  } else {
    return null;
  }
};

export default GalleryThumbnail;
