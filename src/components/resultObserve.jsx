import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./layout/Spinner";
import makeArrayStreamTray from "./utils/makeArrayStreamTray";
import makeArrayStreamMassFlow from "./utils/makeArrayStreamMassFlow";

const ResultObserve = () => {
  const [allData, setAllData] = useState();
  let feedStreams = [];
  let drawStreams = [];

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
    feedStreams = makeArrayStreamTray(allData.txtData.feedStages);
    drawStreams = makeArrayStreamTray(allData.txtData.drawStages);

    makeArrayStreamMassFlow(allData.txtData.feedStages, allData.excelData.feedProperties);
  }

  console.log(allData);
  console.log(feedStreams);

  if (allData) {
    return (
      <div className="d-flex align-items-center">
        <div className="container mt-4">
          <div className="row text-center align-middle">
            <div className="mb-4">
              <h1>Колонна @{allData.txtData.colNumb}</h1>
            </div>
          </div>

          <div className="row text-center align-middle mb-4">
            <div className="col-md-4">
              <h3 className="mb-4">Сырьевые потоки</h3>
              <h5>Ступени подачи сырья</h5>
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
              <h3 className="mb-4">Продуктовые потоки</h3>
              <h5>Ступени отбора продуктов</h5>
              <ul>
                {drawStreams.map((stream) => (
                  <li key={drawStreams.indexOf(stream)}>
                    С <b>{stream.value}</b> тарелки отбирается поток {stream.key}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row text-center align-middle">
            <div className="col-md-4">
              <h5>Массовые расходы сырьевых потоков, кг/ч</h5>
              <ul>
                {feedStreams.map((stream) => (
                  <li key={feedStreams.indexOf(stream)}>
                    Поток {stream.key} поступает на {stream.value} тарелку
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <h5>Массовые расходы продуктовых потоков, кг/ч</h5>
              <ul>
                {drawStreams.map((stream) => (
                  <li key={drawStreams.indexOf(stream)}>
                    С {stream.value} тарелки отбирается поток {stream.key}
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
