import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../Api/FecthData";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Popup from "./PopUp";
import { galleryDestroy } from "./adminDestroy";
import { deleteImageFromS3 } from "../../S3/S3";
import { capitalizeFirstLetter } from "../../util/capitalize";
import { useFetchGalleries } from "../../customHooks/useFetchData";
import GalleryThumbnail from "../GalleryThumbnail";

const GalleryIndexAdmin = () => {
  const state = useFetchGalleries();
  const { data, status } = state;

  const urlMain = process.env.REACT_APP_URL_MAIN;

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [idBlogPost, setIdBlogPost] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    setIdBlogPost(id);
  };

  const handleDelete = (id) => {
    galleryDestroy(id);
    handleClose();

    const toDeleteFromS3 = data?.filter((member) => member.id === id);

    for (let i = 0; i < toDeleteFromS3[0].productImages.length; i++) {
      const filesName = fetchData(urlMain + toDeleteFromS3[0].productImages[i]);

      filesName.then((data) => {
        deleteImageFromS3(data.name);
      });
    }

    localStorage.removeItem("infoGalleries");
    localStorage.removeItem(`infoGallery${id}`);
    localStorage.removeItem(`infoGalleryImage${id}`);
    navigate("/gallerie");
  };

  return (
    <>
      <div style={{ background: "white", padding: "40px" }}></div>
      <div className="index-item1">
        <div
          className="pattaya text-center text-decoration-underline"
          style={{ fontSize: "48px" }}
        >
          Gallery Index
        </div>

        {show && (
          <Popup
            show={show}
            idItem={idBlogPost}
            handleClose={handleClose}
            handleDelete={handleDelete}
            setShow={setShow}
          />
        )}

        <div className="text-end m-5">
          <Link
            to={"/admin_gallery_new"}
            className="btn btn-primary"
            style={{
              backgroundColor: " #670BFF",
              border: "1px solid  #670BFF",
            }}
          >
            Nouveau
          </Link>
        </div>

        {status === "done"
          ? data?.map(({ id, title }) => {
              return (
                <Fragment key={id}>
                  <div className="border border-secondary rounded m-5 p-3 bg-light">
                    <div className="m-3 text-center ">
                      <h2 className="pattaya text-secondary">
                        {capitalizeFirstLetter(title ?? "")}
                      </h2>
                      <GalleryThumbnail galleryId={id} />
                    </div>

                    <div className="d-flex justify-content-around">
                      <Link to={`/admin_gallery_edit/${id}`} key={id}>
                        <Button variant="secondary">Modifier</Button>
                      </Link>
                      <Button variant="danger" onClick={() => handleShow(id)}>
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </Fragment>
              );
            })
          : null}
      </div>
    </>
  );
};

export default GalleryIndexAdmin;
