import React from "react";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../util/capitalize";
import { useFetchGallery } from ".././customHooks/useFetchData";
import GalleryImageComponent from "./GalleryImageComponent";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const GalleryShow = () => {
  const params = useParams();

  const state = useFetchGallery(params?.id);

  const { data, status } = state;

  if (status === "fetching") {
    return <Loader />;
  }

  if (status === "done") {
    return (
      <>
        <div style={{ background: "white", padding: "40px" }}></div>
        <div className="content-container index-item1">
          <div
            className="bubble3"
            style={{ backgroundColor: "lavender" }}
          ></div>

          <h1
            className="pattaya text-center m-5 text-decoration-underline"
            style={{ fontSize: "48px", position: "relative" }}
          >
            {capitalizeFirstLetter(data?.title ?? "")}
          </h1>

          <div className="d-flex justify-content-center m-4">
            <div>
              <p
                style={{ width: "380px", fontSize: "20px" }}
                className="text-start popins"
              >
                {data?.text}
              </p>
            </div>
          </div>

          <div>
            <GalleryImageComponent galleryId={data?.id} />
          </div>

          <div className="text-center m-5">
            <Link
              to="/gallerie"
              className="btn btn-dark"
              style={{ borderRadius: "40px" }}
            >
              retour
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default GalleryShow;
