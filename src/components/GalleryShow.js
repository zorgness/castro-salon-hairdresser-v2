import React from "react";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../util/capitalize";
import { useFetchGallery } from ".././customHooks/useFetchData";
import GalleryImageComponent from "./GalleryImageComponent";
import Loader from "../components/Loader";

const GalleryShow = () => {
  const params = useParams();

  const state = useFetchGallery(params?.id);

  const { data, status } = state;

  if (status === "fetching") {
    return <Loader />;
  }

  if (status === "done") {
    return (
      <div className="content-container index-item1">
        <div className="bubble3" style={{ backgroundColor: "lavender" }}></div>

        <h1
          className="pattaya text-center m-5 text-decoration-underline"
          style={{ fontSize: "48px", position: "relative" }}
        >
          {capitalizeFirstLetter(data?.title ?? "")}
        </h1>

        <div className="d-flex justify-content-center m-4">
          <div>
            <p style={{ width: "320px" }} className="text-start poppins">
              {data?.text}
            </p>
          </div>
        </div>

        <div>
          <GalleryImageComponent galleryId={data?.id} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default GalleryShow;
