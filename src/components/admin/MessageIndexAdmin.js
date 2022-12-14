import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Popup from "./PopUp";
import { fetchData } from "../../Api/FecthData";
import { messageDestroy } from "./adminDestroy";

const MessageIndexAdmin = () => {
  const urlMain = process.env.REACT_APP_URL_MAIN;
  const urlContact = `${urlMain}/api/messages`;

  const [messages, setMessages] = useState([]);

  const [show, setShow] = useState(false);
  const [idMessage, setIdMessage] = useState(null);

  useEffect(() => {
    fetch(urlContact)
      .then((response) => response.json())
      .then((data) => setMessages(data["hydra:member"]))
      .catch((error) => console.log(error.messages));
  }, [urlContact]);

  const dateFormater = (date) => {
    const formatedDate = new Date(date);
    return formatedDate.toLocaleDateString();
  };

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    setIdMessage(id);
  };

  const handleDelete = (id) => {
    messageDestroy(id);
    setMessages(messages.filter((message) => message.id !== id));
    handleClose();
  };

  return (
    <>
      <div style={{ background: "white", padding: "40px" }}></div>
      <div className="index-item1">
        <div className="m-3">
          <h1
            className="pattaya text-center text-decoration-underline"
            style={{ fontSize: "48px" }}
          >
            Messages
          </h1>
        </div>

        {show && (
          <Popup
            show={show}
            idItem={idMessage}
            handleClose={handleClose}
            handleDelete={handleDelete}
            setShow={setShow}
          />
        )}

        <div className="d-flex justify-content-around flex-wrap gap-4 m-5">
          {messages.map(({ id, email, object, text, created_at }) => {
            return (
              <Card
                key={id}
                style={{
                  width: "18rem",
                  border: "2px solid chocolate",
                  borderRadius: "12px",
                }}
              >
                <Card.Header className="text-end">{email}</Card.Header>
                <Card.Body>
                  <Card.Title>{object}</Card.Title>
                  <Card.Text>{text}</Card.Text>
                  <Card.Text className="text-end">
                    {dateFormater(created_at)}
                  </Card.Text>
                </Card.Body>
                <Button
                  style={{
                    backgroundColor: "chocolate",
                    border: "2px solid chocolate",
                  }}
                  onClick={() => handleShow(id)}
                >
                  Supprimer
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MessageIndexAdmin;
