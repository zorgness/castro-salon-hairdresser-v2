import React from "react";
import { useFetchGalleryImages } from "../../customHooks/useFetchData";
import { imagePath } from "../../config";

const GalleryImageAdmin = ({ galleryId, getNameImages }) => {
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
