import React, { useEffect, useState } from "react";
import axios from "axios";

const ResultObserve = () => {
  const [allData, setAllData] = useState();

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const response = await axios.get("http://localhost:5000/");

    if (response.status === 200) {
      setAllData(response.data);
    } else {
      alert("Сервер лежит, поди и ты полежи");
    }
  };

  console.log(allData);

  return (
    <div>
      <h1>Result Observe Page</h1>
    </div>
  );
};

export default ResultObserve;
