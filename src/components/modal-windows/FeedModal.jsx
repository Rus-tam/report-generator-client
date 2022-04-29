import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import WorkingContext from "../../context/workingContext";

function FeedModal() {
  const { show, handleClose, allData, handleSelect } = useContext(WorkingContext);

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Выберите дополнительные сырьевые потоки</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSelect}>Выбрать потоки</Button>
        <Button onClick={handleClose}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FeedModal;
