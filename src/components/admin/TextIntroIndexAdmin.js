import React, { useState, Fragment } from "react";
import { fetchData } from "../../Api/FecthData";
import Button from "react-bootstrap/Button";
import Popup from "./PopUp";
import { deleteImageFromS3 } from "../../S3/S3";
import { textIntroDestroy } from "./adminDestroy";
import TextIntroShowAdmin from "./TextIntroShowAdmin";
import { useFetchTextIntro } from "../../customHooks/useFetchData";
import { Link } from "react-router-dom";
import { urlMain } from "../../config";

const TextIntroIndex = () => {
  const state = useFetchTextIntro();

  const { data, status } = state;

  const [toDisplay, setToDisplay] = useState(null);

  React.useEffect(() => {
    setToDisplay(data);
  }, [data]);

  const [show, setShow] = useState(false);
  const [idTextIntro, setIdTextIntro] = useState("");

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    setIdTextIntro(id);
  };

  const handleDelete = (id) => {
    textIntroDestroy(id);
    handleClose();
    const toDeleteFromS3 = data.filter((member) => member.id === id);
    setToDisplay(data.filter((member) => member.id !== id));
    const fileName = fetchData(urlMain + toDeleteFromS3[0].image);
    fileName.then((data) => {
      deleteImageFromS3(data.name);
      localStorage.removeItem(`infoIndexImage${data.image}`);
    });

    localStorage.removeItem("infoIndex");
  };

  return (
    <>
      <div style={{ background: "white", padding: "40px" }}></div>
      <div>
        <div
          className="pattaya text-center text-decoration-underline mt-3"
          style={{ fontSize: "48px" }}
        >
          Introduction
        </div>

        {show && (
          <Popup
            show={show}
            idItem={idTextIntro}
            handleClose={handleClose}
            handleDelete={handleDelete}
            setShow={setShow}
          />
        )}

        <div className="text-end m-5">
          <Link
            to={"/admin_text_intro_new"}
            className="btn btn-primary"
            style={{
              backgroundColor: " #670BFF",
              border: "1px solid  #670BFF",
            }}
          >
            Nouveau
          </Link>
        </div>

        {status === "done" &&
          toDisplay?.map((textIntro, index) => {
            return (
              <Fragment key={index}>
                <TextIntroShowAdmin
                  textIntro={textIntro}
                  indexPosition={index}
                />
                <div className="text-center">
                  <Button
                    variant="danger"
                    onClick={() => handleShow(textIntro.id)}
                    className="mb-3"
                  >
                    Supprimer
                  </Button>
                </div>
              </Fragment>
            );
          })}
      </div>
    </>
  );
};

export default TextIntroIndex;
