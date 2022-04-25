import React, { useEffect, useState } from "react";
import axios from "axios";

const ResultObserve = () => {
  const [allData, setAllData] = useState();

  useEffect(() => {
    getAllData();
  }, []);

  // Поиск имени пользователя
  const name = localStorage.getItem("Name");

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

  return (
    <div className="mb-4 text-center">
      <h1>Result Observe Page</h1>
    </div>
  );
};

export default ResultObserve;
