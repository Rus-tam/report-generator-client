import React, { useContext, useEffect } from "react";
import Spinner from "./layout/Spinner";
import makeArrayStreamMassFlow from "./utils/makeArrayStreamMassFlow";
import WorkingContext from "../context/workingContext";
import Button from "react-bootstrap/Button";
import FeedModal from "./modal-windows/AddStreamsModal";
import { useNavigate } from "react-router-dom";
import NavBar from "./layout/Navbar";

const ResultObserve = () => {
  const navigate = useNavigate();
  const { allData, getAllData, handleShowFeed, handleShowDraw, handleGenerateRep } = useContext(WorkingContext);
  let feedProperties = [];
  let drawProperties = [];

  useEffect(() => {
    getAllData();
    const name = localStorage.getItem("Name");

    name === null ? navigate("/enter-name") : null;
  }, []);

  if (allData) {
    feedProperties = [...makeArrayStreamMassFlow(allData.txtData.feedStages, allData.excelData.feedProperties)];
    drawProperties = [...makeArrayStreamMassFlow(allData.txtData.drawStages, allData.excelData.drawProperties)];
  }

  // console.log(allData);

  if (allData) {
    return (
      <div>
        <NavBar />
        <div className="d-flex align-items-center" id="resultObservePage">
          <div className="container-fluid mt-4">
            <div className="row text-center align-middle">
              <div>
                <h1>
                  Колонна @{allData.txtData.colNumb} ({allData.txtData.numberOfTrays} тарелок)
                </h1>
              </div>
            </div>

            <div className="row text-center mb-4">
              <div className="col-md-4">
                <h3 className="mb-4">Сырьевые потоки</h3>
                <h6>Ступени подачи сырья</h6>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <h3 className="mb-4">Продуктовые потоки</h3>
                <h6>Ступени отбора продуктов</h6>
              </div>
            </div>

            <div className="row text-left mb-4">
              <div className="col-md-4">
                <ul>
                  {feedProperties.map((stream) => (
                    <li key={feedProperties.indexOf(stream)}>
                      <p>
                        Поток <b>{stream.stream}</b> поступает на <b>{stream.stage}</b> тарелку c расходом{" "}
                        <b>{stream.property["Mass Flow [kg/h]"]}</b> кг/ч и температурой{" "}
                        <b>{stream.property["Temperature [C]"]}</b> <sup>o</sup>C
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <ul>
                  {drawProperties.map((stream) => (
                    <li key={drawProperties.indexOf(stream)}>
                      <p>
                        С <b>{stream.stage}</b> ступени отбирается поток <b>{stream.stream}</b> c расходом{" "}
                        <b>{stream.property["Mass Flow [kg/h]"]}</b> кг/ч и температурой{" "}
                        <b>{stream.property["Temperature [C]"]}</b> <sup>o</sup>C
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="row text-center mb-4">
              <div className="col-md-4">
                <div>
                  <Button variant="primary" onClick={handleShowFeed}>
                    Выбрать дополнительные сырьевые потоки
                  </Button>

                  <FeedModal />
                </div>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div>
                  <Button variant="primary" onClick={handleShowDraw}>
                    Выбрать дополнительные продуктовые потоки
                  </Button>

                  <FeedModal />
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <Button variant="success" size="lg" onClick={handleGenerateRep}>
                Сгенерировать отчет
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default ResultObserve;
