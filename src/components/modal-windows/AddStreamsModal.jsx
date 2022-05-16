import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import WorkingContext from "../../context/workingContext";
import FeedForm from "./FeedForm";
import DrawForm from "./DrawForm";

const FeedModal = () => {
  const { show, handleClose, handleSelect, allData, feedModal } = useContext(WorkingContext);

  if (allData) {
    return (
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Выберите дополнительные {feedModal ? "сырьевые" : "продуктовые"} потоки
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="col-md-12">{feedModal ? <FeedForm /> : <DrawForm />}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSelect}>Выбрать потоки</Button>
          <Button onClick={handleClose}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default FeedModal;
