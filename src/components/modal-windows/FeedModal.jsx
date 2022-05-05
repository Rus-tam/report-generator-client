import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import WorkingContext from "../../context/workingContext";

const FeedModal = () => {
  const { show, handleClose, allData, handleSelect } = useContext(WorkingContext);
  const [streams, setStreams] = useState([]);

  const selectedStreams = [];

  const allStreams = allData.excelData.allStreams;

  const handleClick = (stream) => (e) => {
    if (!streams.includes(stream.stream)) {
      selectedStreams.push(stream.stream);
    }

    setStreams((streams) => [...streams, ...selectedStreams]);
  };

  if (allData) {
    return (
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Выберите дополнительные сырьевые потоки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allStreams.map((stream) => (
            <Button
              key={stream}
              className="me-1 mb-1"
              variant={selectedStreams.includes(stream) ? "danger" : "success"}
              onClick={handleClick({ stream })}
            >
              {stream}
            </Button>
          ))}
          <hr />
          <div>
            <h6>Выбранные потоки</h6>
            <ul className="list-inline">
              {streams.map((stream) => (
                <li key={stream} className="list-inline-item">
                  {stream}
                </li>
              ))}
            </ul>
          </div>
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
