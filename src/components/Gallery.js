import React from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import { useFetchGalleries } from "../customHooks/useFetchData";
import GalleryThumbnail from "./GalleryThumbnail";
import Loader from "./Loader";

const Gallery = () => {
  const state = useFetchGalleries();
  const { data, status } = state;

  return (
    <div className="content-container">
      <Banner />

      <div className="index-item1">
        <h1
          className="pattaya text-center m-3"
          style={{ fontSize: "48px", textDecoration: " black  underline" }}
        >
          Gallerie
        </h1>

        {status === "fetching" && <Loader />}

        <div className="d-flex justify-content-around flex-wrap">
          {status === "done" &&
            data?.map(({ id, title }) => {
              return (
                <Link to={`/gallerie/${id}`} key={id}>
                  <div className="m-5">
                    <h2
                      className="pattaya text-secondary text-end"
                      style={{ fontSize: "24px" }}
                    >
                      {title}
                    </h2>
                    <GalleryThumbnail galleryId={id} />
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
