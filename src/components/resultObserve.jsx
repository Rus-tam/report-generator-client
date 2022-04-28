import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./layout/Spinner";
import makeArrayStreamTray from "./utils/makeArrayStreamTray";
import makeArrayStreamMassFlow from "./utils/makeArrayStreamMassFlow";

const ResultObserve = () => {
  const [allData, setAllData] = useState();
  let feedStreams = [];
  let drawStreams = [];
  let feedProperties = [];
  let drawProperties = [];

  useEffect(() => {
    getAllData();
  }, []);

  // Поиск имени пользователя
  const name = localStorage.getItem("Name");

  // Получение информации
  const getAllData = async () => {
    const response = await axios.get("http://localhost:5000/", {
      headers: {
        Name: name,
      },
    });

    if (response.status === 200) {
      setAllData(response.data);
    } else {
      alert("Сервер лежит, поди и ты полежи");
    }
  };

  if (allData) {
    feedStreams = [...makeArrayStreamTray(allData.txtData.feedStages)];
    drawStreams = [...makeArrayStreamTray(allData.txtData.drawStages)];

    feedProperties = [...makeArrayStreamMassFlow(allData.txtData.feedStages, allData.excelData.feedProperties)];
    drawProperties = [...makeArrayStreamMassFlow(allData.txtData.drawStages, allData.excelData.drawProperties)];
  }

  console.log(allData);

  if (allData) {
    return (
      <div className="d-flex align-items-center">
        <div className="container mt-4">
          <div className="row text-center align-middle">
            <div className="mb-4">
              <h1>Колонна @{allData.txtData.colNumb}</h1>
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
                {feedStreams.map((stream) => (
                  <li key={feedStreams.indexOf(stream)}>
                    Поток {stream.key} поступает на <b>{stream.value}</b> тарелку
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <ul>
                {drawStreams.map((stream) => (
                  <li key={drawStreams.indexOf(stream)}>
                    С <b>{stream.value}</b> тарелки отбирается поток {stream.key}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row text-center mb-4">
            <div className="col-md-4">
              <h6>Сырьевые потоки</h6>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <h6>Продуктовые потоки</h6>
            </div>
          </div>

          <div className="row text-left">
            <div className="col-md-4">
              <ul>
                {feedProperties.map((stream) => (
                  <li key={feedProperties.indexOf(stream)}>
                    Расход потока <b>{stream.stream}</b> составляет <b>{stream.properties["Mass Flow [kg/h]"]}</b> кг/ч
                    с температурой <b>{stream.properties["Temperature [C]"]}</b> <sup>o</sup>C
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <ul>
                {drawProperties.map((stream) => (
                  <li key={drawProperties.indexOf(stream)}>
                    Расход потока <b>{stream.stream}</b> составляет <b>{stream.properties["Mass Flow [kg/h]"]}</b> кг/ч
                    с температурой <b>{stream.properties["Temperature [C]"]}</b> <sup>o</sup>C
                  </li>
                ))}
              </ul>
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
