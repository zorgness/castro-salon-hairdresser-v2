import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GalleryImageAdmin from "./GalleryImageAdmin";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Butterfly from "../../images/butterfly.png";
import { fetchDataWithMethod } from "../../Api/FetchDataWithMethod";
import { useFetchGallery } from "../.././customHooks/useFetchData";
import {
  uploadImageFile,
  deleteImageFromS3,
  transformFileName,
} from "../../../src/S3/S3";
import Compressor from "compressorjs";

const GalleryEditAdmin = () => {
  const params = useParams();
  const navigate = useNavigate();

  const state = useFetchGallery(params?.id);

  const { data, status } = state;

  const [nameImages, setNameImages] = useState([]);
  const [titleEdit, setTitleEdit] = useState("");
  const [textEdit, setTextEdit] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const urlMain = process.env.REACT_APP_URL_MAIN;
  const urlBlogPosts = `${urlMain}/api/blog_posts/${params.id}`;

  useEffect(() => {
    setTitleEdit(data?.title);
    setTextEdit(data?.text);
  }, [data?.title, data?.text]);

  const handleTitle = (e) => {
    setTitleEdit(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleText = (e) => {
    setTextEdit(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleCompressedUpload = (e) => {
    setError("");
    setSuccess("");
    const images = e.target.files;

    for (let i = 0; i < images.length; i++) {
      const quality = images[i].size > 9000 ? 0.1 : 0.8;

      new Compressor(images[i], {
        quality: quality, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          setSelectedFiles((prevState) => [...prevState, compressedResult]);
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length > 3) {
      setError("3 images maximum");
      return;
    }

    if (titleEdit !== "" && textEdit !== "") {
      if (selectedFiles.length < data?.productImages?.length) {
        setError("not enough images");
      }

      if (selectedFiles.length > data?.productImages.length) {
        setError("too many images");
      }

      const options = { title: titleEdit, text: textEdit };
      await fetchDataWithMethod(urlBlogPosts, "PUT", options);

      for (let i = 0; i < nameImages.length; i++) {
        deleteImageFromS3(nameImages[i].name);
      }

      for (let i = 0; i < data?.productImages.length; i++) {
        const options = {
          post: data?.["@id"],
          name: transformFileName(selectedFiles[i]),
        };
        uploadImageFile(selectedFiles[i]);
        await fetchDataWithMethod(
          urlMain + data?.productImages[i],
          "PUT",
          options
        );
      }

      localStorage.removeItem(`infoGallery${data?.id}`);
      localStorage.removeItem(`infoGalleryImage${data?.id}`);
      localStorage.removeItem("infoGalleries");

      navigate("/admin_gallery_index");
    }
  };

  console.log(nameImages);
  return (
    <div className="index-item1">
      <h1
        className="pattaya text-center text-decoration-underline m-3"
        style={{ fontSize: "48px" }}
      >
        Gallery Edition
      </h1>
      {status === "done" ? (
        <GalleryImageAdmin galleryId={data?.id} getNameImages={setNameImages} />
      ) : null}

      <br />

      <Fragment>
        <div className="text-danger text-right">
          <p>{error}</p>
        </div>

        {success && (
          <div className="text-success text-right">
            <p>
              {success}
              <img src={Butterfly} alt="butterfly" className="avatar-small" />
            </p>
          </div>
        )}
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                placeholder="titre"
                id=""
                value={titleEdit || ""}
                onChange={handleTitle}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={textEdit || ""}
                onChange={handleText}
              />
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Multiple images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => handleCompressedUpload(e)}
              />
            </Form.Group>

            <Form.Group className="text-center">
              <Button
                style={{
                  backgroundColor: "hotpink",
                  border: "1px solid hotpink",
                }}
                type="submit"
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </Fragment>
    </div>
  );
};

export default GalleryEditAdmin;
