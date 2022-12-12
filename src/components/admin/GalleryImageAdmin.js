import React from "react";
import { useFetchGalleryImages } from "../../customHooks/useFetchData";

const GalleryImageAdmin = ({ galleryId, getNameImages }) => {
  const imagePath = process.env.REACT_APP_AWS_S3_URL;
  const state = useFetchGalleryImages(galleryId);
  const { data, status } = state;

  React.useEffect(() => {
    data?.forEach((image) => {
      getNameImages((prev) => [...prev, image.name]);
    });
  }, [data, getNameImages]);

  if (status === "done") {
    return (
      <div className="d-flex justify-content-around flex-wrap gap-3">
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

export default GalleryImageAdmin;
